import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import BottomInput from './BottomInput';
import { respond } from '../lib/agent';
import {
  addMessage, createConversation, getConversation, patchConversation,
  titleFrom, truncateAfter, updateMessage, useConversations,
} from '../lib/chatStore';

export default function ChatInterface({
  conversationId = null,
  isOrbChat = false,
  isHomepageChat = false,
  emptyState,
}) {
  const navigate = useNavigate();
  const [convId, setConvId] = useState(conversationId);
  const conversations = useConversations();
  const conv = conversations.find((c) => c.id === convId) ?? null;
  const messages = conv?.messages ?? [];
  const [isProcessing, setIsProcessing] = useState(false);
  const [animatingMessageId, setAnimatingMessageId] = useState(null);
  const scrollRef = useRef(null);
  const answered = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages.length, isProcessing]);

  const answer = useCallback(async (id, userMessage) => {
    const marker = `${userMessage.id}:${userMessage.text}`;
    if (answered.current === marker) return;
    answered.current = marker;
    setIsProcessing(true);
    try {
      const result = await respond({ conversation: getConversation(id), text: userMessage.text });
      const bot = addMessage(id, { role: 'bot', text: result.text, cards: result.cards, agent: result.agent ?? null });
      patchConversation(id, { agent: result.agent ?? null, ...(result.sessionId ? { sessionId: result.sessionId } : {}) });
      setAnimatingMessageId(bot.id);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Any user message without a reply yet gets one. This also covers chats opened from a suggestion and
  // chats reopened from the sidebar after a reload.
  const last = messages[messages.length - 1];
  useEffect(() => {
    if (conv && last?.role === 'user') answer(conv.id, last);
  }, [conv?.id, last?.id, last?.text]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = useCallback((text) => {
    const clean = text.trim();
    if (!clean) return;
    let id = convId;
    if (!id) {
      id = createConversation({ title: titleFrom(clean), variant: isOrbChat ? 'orb' : isHomepageChat ? 'home' : 'topic' }).id;
      setConvId(id);
    }
    addMessage(id, { role: 'user', text: clean });
  }, [convId, isHomepageChat, isOrbChat]);

  // Editing an earlier message rewinds the chat to that point and answers again.
  const handleEdit = (messageId, text) => {
    const index = messages.findIndex((m) => m.id === messageId);
    if (index < 0 || isProcessing) return;
    const previousBot = [...messages.slice(0, index)].reverse().find((m) => m.role === 'bot');
    truncateAfter(convId, messageId);
    updateMessage(convId, messageId, { text, edited: true });
    patchConversation(convId, { agent: previousBot?.agent ?? null });
  };

  const openCards = (msg) => {
    const lastUser = [...messages.slice(0, messages.indexOf(msg))].reverse().find((m) => m.role === 'user');
    navigate('/job-cards', { state: { cards: msg.cards, conversationId: convId, lastUserMessage: lastUser?.text } });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className={`px-4 ${isHomepageChat && messages.length === 0 ? '' : 'pt-20'} pb-28`}>
        {messages.length === 0 && emptyState}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.role === 'bot' ? msg.text.split(/\s+/) : msg.text}
            isUser={msg.role === 'user'}
            isAnimating={animatingMessageId === msg.id}
            isHomepageChat={isHomepageChat}
            isOrbChat={isOrbChat}
            onEdit={msg.role === 'user' && !isProcessing ? (text) => handleEdit(msg.id, text) : undefined}
            edited={msg.edited}
            cards={msg.cards}
            onOpenCards={() => openCards(msg)}
          />
        ))}

        {isProcessing && (
          <div className="flex justify-start mb-6">
            <TypingIndicator />
          </div>
        )}
        <div ref={scrollRef} />
      </div>
      <BottomInput onSend={handleSend} voiceChatId={convId} />
    </div>
  );
}
