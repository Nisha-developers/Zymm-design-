import { useEffect, useRef } from 'react';
import EditableText from './EditableText';

export default function ChatHistory({ history, onEdit, onOpenCards }) {
  const chatRef = useRef(null);

  // Keep auto-scroll inside the chat region rather than moving the document.
  useEffect(() => {
    chatRef.current?.scrollTo?.({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [history]);

  return (
    <div ref={chatRef} className="mx-auto h-[30vh] min-h-[140px] max-h-[320px] w-full max-w-md overflow-y-auto px-4 pb-6 hide-scrollbar flex flex-col gap-6">
      {history.map((msg, idx) => (
        <div 
          key={msg.id ?? idx}
          className={`flex max-w-[85%] flex-col ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
        >
          {msg.sender === 'user' ? (
            <div className="mr-0 rounded-xl bg-[#1A1A1A] p-4 text-[15px] leading-relaxed text-white shadow-md lg:mr-10">
              <EditableText
                text={msg.text}
                edited={msg.edited}
                onSave={onEdit && msg.id ? (text) => onEdit(msg.id, text) : undefined}
              />
            </div>
          ) : (
            <div className="text-white/90 text-[16px] leading-relaxed whitespace-pre-wrap lg:px-10 lg:py-6">
              {msg.text}
              {msg.cards?.length > 0 && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onOpenCards?.(msg)}
                    className="bg-green-grad rounded-full px-4 py-1.5 text-[12px] font-medium text-white cursor-pointer"
                  >
                    View {msg.cards.length} job cards
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}