import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import BottomInput from './BottomInput';
import { DesktopChatHeader, DesktopChatInput, DesktopThinking, ReplyBubble } from './desktop/DesktopChat';
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
  // Desktop: select text in a Zymm answer -> "Reply" -> the quote rides along with your next message.
  const [replyAnchor, setReplyAnchor] = useState(null);
  const [reply, setReply] = useState(null);
  const desktopInputRef = useRef(null);

  useEffect(() => {
    if (!replyAnchor) return undefined;
    const hide = () => setReplyAnchor(null);
    window.addEventListener('scroll', hide, { passive: true });
    window.addEventListener('resize', hide);
    return () => {
      window.removeEventListener('scroll', hide);
      window.removeEventListener('resize', hide);
    };
  }, [replyAnchor]);

  const handleSelection = () => {
    if (!window.matchMedia?.('(min-width: 768px)').matches) return;
    const selection = window.getSelection();
    // Answers render one <span> per word, so join the selected pieces with spaces ourselves.
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
    const pieces = range ? Array.from(range.cloneContents().childNodes, (n) => n.textContent) : [];
    const text = pieces.join(' ').replace(/\s+/g, ' ').trim();
    const node = selection?.anchorNode;
    const element = node?.nodeType === 1 ? node : node?.parentElement;
    if (!text || !element?.closest('[data-bot-message]')) {
      setReplyAnchor(null);
      return;
    }
    const rect = range.getBoundingClientRect();
    setReplyAnchor({ text, x: rect.left + rect.width / 2, y: rect.top });
  };

  const startReply = () => {
    setReply(replyAnchor.text);
    setReplyAnchor(null);
    window.getSelection()?.removeAllRanges();
    desktopInputRef.current?.focus();
  };

  useEffect(() => {
    // Home screen: stay at the top until a chat starts
    if (messages.length === 0) return;
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

  const isHomeEmpty = isHomepageChat && messages.length === 0;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {!isHomeEmpty && <DesktopChatHeader title={conv?.title} />}
      <div className={`px-4 ${isHomeEmpty ? 'pb-[150px] md:p-0' : 'pt-20 pb-40 md:px-8 md:pt-6 md:pb-4'}`}>
                {messages.length === 0 && (typeof emptyState === 'function' ? emptyState({ onSend: handleSend }) : emptyState)}
        <div className="md:mx-auto md:w-full md:max-w-[640px]" onMouseUp={handleSelection}>
                {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg.role === 'bot' ? msg.text.split(/\s+/) : msg.text}
            isUser={msg.role === 'user'}
            isAnimating={animatingMessageId === msg.id}
            isHomepageChat={isHomepageChat}
            isOrbChat={isOrbChat}
            isFirstMessage={i === 0}
            onEdit={msg.role === 'user' && !isProcessing ? (text) => handleEdit(msg.id, text) : undefined}
            edited={msg.edited}
            cards={msg.cards}
            onOpenCards={() => openCards(msg)}
          />
        ))}

        {isProcessing && (
          <>
            <div className="flex justify-start mb-6 md:hidden">
              <TypingIndicator />
            </div>
            <DesktopThinking />
          </>
        )}
        </div>
        <div ref={scrollRef} />
      </div>
            <BottomInput
        onSend={handleSend}
        voiceChatId={convId}
        className="md:hidden"
      />
      {!isHomeEmpty && (
        <DesktopChatInput
          onSend={handleSend}
          reply={reply}
          onClearReply={() => setReply(null)}
          inputRef={desktopInputRef}
          disabled={isProcessing}
        />
      )}
      <ReplyBubble anchor={replyAnchor} onReply={startReply} />
    </div>
  );
}
