import { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { getRandomBotResponse } from '../data/botResponses';
import BottomInput from './BottomInput';

export default function ChatInterface({
  initialMessage,
  initialMessageKey,
  initialMessages,
  isOrbChat = false,
  isHomepageChat = false,
  emptyState,
}) {
  const [messages, setMessages] = useState(() =>
    initialMessages?.map((message, index) => ({
      id: `${initialMessageKey ?? 'initial'}-${index}`,
      text: message.sender === 'bot' ? message.text.split(/\s+/) : message.text,
      isUser: message.sender === 'user',
    })) ?? [],
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [animatingMessageId, setAnimatingMessageId] = useState(null);
  const scrollRef = useRef(null);
  const lastInitialMessageKey = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSend = useCallback((text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, isUser: true },
    ]);
    setIsProcessing(true);

    setTimeout(() => {
      const botResponseArray = getRandomBotResponse();
      const botMsgId = Date.now() + 1;

      setMessages((prev) => [
        ...prev,
        { id: botMsgId, text: botResponseArray, isUser: false },
      ]);
      setIsProcessing(false);
      setAnimatingMessageId(botMsgId);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!initialMessage || initialMessageKey === lastInitialMessageKey.current) {
      return;
    }

    lastInitialMessageKey.current = initialMessageKey;
    handleSend(initialMessage);
  }, [handleSend, initialMessage, initialMessageKey]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className={`px-4 ${isHomepageChat && messages.length === 0 ? '' : 'pt-20'} pb-28`}>
        {messages.length === 0 && emptyState}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            isUser={msg.isUser}
            isAnimating={animatingMessageId === msg.id}
            isHomepageChat={isHomepageChat}
            isOrbChat={isOrbChat}
          />
        ))}

        {isProcessing && (
          <div className="flex justify-start mb-6">
            <TypingIndicator />
          </div>
        )}
        <div ref={scrollRef} />
      </div>
      <BottomInput onSend={handleSend} />
    </div>
  );
}