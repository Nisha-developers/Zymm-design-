import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Orb from '../components/orb';
import AssistantHeader from '../components/AssistantHeader';
import AssistantInput from '../components/AssistantInput';
import ChatHistory from '../components/ChatHistoryOverlay';
import { mockUtterance } from '../data/voiceResponses';
import { respond } from '../lib/agent';
import {
  addMessage, createConversation, getConversation, patchConversation,
  titleFrom, truncateAfter, updateMessage, useConversations,
} from '../lib/chatStore';
import { simulateLevel, speak, startMic } from '../lib/voice';

const GREETING = "Hi, I'm Zymm. Tap the mic and tell me what you need.";
const SUBTITLES = {
  idle: 'Tap the mic to talk to Zymm',
  listening: 'Zymm is listening..',
  processing: 'Providing Answer...',
  speaking: 'Zymm is speaking..',
  error: 'Something went wrong. Tap the mic to try again.',
};

export default function AssistantPage({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const conversations = useConversations();
  const [convId, setConvId] = useState(location.state?.conversationId ?? null);
  const [voice, setVoice] = useState('idle'); // idle | listening | processing | speaking | error
  const [notice, setNotice] = useState('');
  const levelRef = useRef(0);
  const stopMic = useRef(null);
  const micStarting = useRef(false);
  const cancelSpeech = useRef(null);
  const mounted = useRef(true);

  const conv = conversations.find((chat) => chat.id === convId) ?? null;
  const messages = conv?.messages ?? [];
  const hasStartedChat = messages.some((m) => m.role === 'user');
  const history = messages.length
    ? messages.map((m) => ({ id: m.id, sender: m.role, text: m.text, edited: m.edited, cards: m.cards }))
    : [{ sender: 'bot', text: GREETING }];

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      stopMic.current?.();
      cancelSpeech.current?.();
    };
  }, []);

  const setLevel = (level) => {
    levelRef.current = level;
  };

  const ensureConversation = () => {
    if (convId) return convId;
    const chat = createConversation({ title: 'Voice chat', variant: 'orb' });
    setConvId(chat.id);
    return chat.id;
  };

  // Think, save the answer, speak it. If the answer has job cards, show them when Zymm finishes speaking.
  const answer = useCallback(async (id, text) => {
    setVoice('processing');
    setNotice('');
    try {
      const result = await respond({ conversation: getConversation(id), text });
      addMessage(id, { role: 'bot', text: result.text, cards: result.cards, agent: result.agent ?? null });
      patchConversation(id, { agent: result.agent ?? null, ...(result.sessionId ? { sessionId: result.sessionId } : {}) });
      if (!mounted.current) return; // you switched chats: the answer is still saved
      setVoice('speaking');
      cancelSpeech.current = speak(result.text, setLevel, () => {
        cancelSpeech.current = null;
        if (!mounted.current) return;
        setVoice('idle');
        if (result.cards?.length) {
          navigate('/job-cards', { state: { cards: result.cards, conversationId: id, lastUserMessage: text } });
        }
      });
    } catch {
      if (mounted.current) setVoice('error');
    }
  }, [navigate]);

  const sendUserText = (id, text) => {
    if (!getConversation(id).messages.some((m) => m.role === 'user')) patchConversation(id, { title: titleFrom(text) });
    addMessage(id, { role: 'user', text });
    answer(id, text);
  };

  const finishListening = () => {
    stopMic.current?.();
    stopMic.current = null;
    const id = ensureConversation();
    // Demo mode hears a scripted sentence. Live mode sends the recording to Whisper and uses what it heard.
    const heard = mockUtterance(getConversation(id).messages.filter((m) => m.role === 'user').length);
    sendUserText(id, heard);
  };

  const handleMicClick = async () => {
    if (voice === 'processing' || micStarting.current) return;
    if (voice === 'listening') return finishListening();
    cancelSpeech.current?.(); // tapping while Zymm speaks interrupts it
    cancelSpeech.current = null;
    setNotice('');
    micStarting.current = true; // a second tap while the mic opens must not open another stream
    try {
      stopMic.current = await startMic(setLevel);
    } catch {
      stopMic.current = simulateLevel(setLevel);
      setNotice('Microphone unavailable. Using the demo voice.');
    }
    micStarting.current = false;
    if (mounted.current) setVoice('listening');
    else stopMic.current?.(); // you left while the mic was opening: don't leave it on
  };

  // The microphone can mishear. Editing a message rewinds the chat to that point and Zymm answers again.
  const handleEdit = (messageId, text) => {
    if (!convId || voice === 'processing') return;
    cancelSpeech.current?.();
    cancelSpeech.current = null;
    const list = getConversation(convId).messages;
    const index = list.findIndex((m) => m.id === messageId);
    const previousBot = [...list.slice(0, index)].reverse().find((m) => m.role === 'bot');
    truncateAfter(convId, messageId);
    updateMessage(convId, messageId, { text, edited: true });
    patchConversation(convId, { agent: previousBot?.agent ?? null });
    answer(convId, text);
  };

  const handleOpenCards = (message) => {
    const index = messages.findIndex((m) => m.id === message.id);
    const lastUser = [...messages.slice(0, index)].reverse().find((m) => m.role === 'user');
    navigate('/job-cards', { state: { cards: message.cards, conversationId: convId, lastUserMessage: lastUser?.text } });
  };

  const handleOpenChat = () => navigate(`/topics/${ensureConversation()}`);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-x-hidden bg-page-gradient">
      <div className="shrink-0">
        <AssistantHeader
          title="Personal Assistant"
          subtitle={notice || SUBTITLES[voice]}
          onBack={() => navigate(-1)}
          onMenuClick={onMenuClick}
        />
      </div>

      <div className="mt-2 mb-2 shrink-0">
        <Orb isChatStarted={hasStartedChat} state={voice} levelRef={levelRef} />
      </div>

      <ChatHistory history={history} onEdit={voice === 'processing' ? undefined : handleEdit} onOpenCards={handleOpenCards} />

      <div className="shrink-0">
        <AssistantInput
          onMicClick={handleMicClick}
          onMessageClick={handleOpenChat}
          isListening={voice === 'listening'}
        />
      </div>
    </div>
  );
}
