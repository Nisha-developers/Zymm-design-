import { useEffect, useRef } from 'react';
import UserBubble from './UserBubble';
export default function ChatHistory({ history, onEdit, onOpenCards }) {
  const chatRef = useRef(null);

  // Zymm's answer is on top, so show it from its first line (scrolling stays inside this region).
  useEffect(() => {
    chatRef.current?.scrollTo?.({ top: 0, behavior: 'smooth' });
  }, [history]);

  // Zymm's answer sits on top and your message sits underneath it, closest to the mic.
  const ordered = [...history].reverse();

  return (
    <div ref={chatRef} className="mx-auto min-h-0 w-full max-w-md md:max-w-2xl flex-1 overflow-y-auto px-6 pt-4 hide-scrollbar flex flex-col gap-3">
      {/* mt-auto keeps a short exchange sitting just above the mic; long answers still scroll */}
      <div className="mt-auto flex flex-col gap-3">
      {ordered.map((msg, idx) => (
        <div 
          key={msg.id ?? idx}
          className={`flex max-w-full flex-col ${msg.sender === 'user' ? 'w-full items-end' : 'self-start items-start'}`}
        >
          {msg.sender === 'user' ? (
            <UserBubble
              variant="orb"
              text={msg.text}
              edited={msg.edited}
              onEdit={onEdit && msg.id ? (text) => onEdit(msg.id, text) : undefined}
            />
          ) : (
            <div className="text-white text-[17px] md:text-[20px] md:text-center font-medium leading-snug whitespace-pre-wrap [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
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
    </div>
  );
}
