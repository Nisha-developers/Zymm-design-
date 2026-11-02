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
    <div ref={chatRef} className="mx-auto min-h-0 w-full max-w-md flex-1 overflow-y-auto px-6 pt-4 hide-scrollbar flex flex-col gap-3">
      {history.map((msg, idx) => (
        <div 
          key={msg.id ?? idx}
          className={`flex max-w-full flex-col ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
        >
          {msg.sender === 'user' ? (
            <div className="rounded-xl bg-[#1A1A1A] px-4 py-3 text-[15px] leading-snug text-white shadow-md">
              <EditableText
                text={msg.text}
                edited={msg.edited}
                onSave={onEdit && msg.id ? (text) => onEdit(msg.id, text) : undefined}
              />
            </div>
          ) : (
            <div className="text-white text-[17px] font-medium leading-snug whitespace-pre-wrap [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
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