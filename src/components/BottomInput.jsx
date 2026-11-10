import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModelPicker } from './desktop/DesktopChat';
import { PlusIcon } from './desktop/icons';
import { useAutoGrow } from '../lib/use-auto-grow';

// Mobile composer (desktop uses DesktopHomeInput / DesktopChatInput).
// Glowing gradient-border box: text on top, controls underneath. The text grows, then scrolls.
export default function BottomInput({ onSend, voiceChatId = null, className = '' }) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef(null);
  useAutoGrow(textareaRef, input, 132);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isSending) return;

    setIsSending(true);
    onSend(input);
    setInput('');

    // Brief delay before returning to default state
    setTimeout(() => setIsSending(false), 500);
  };

  const actionClass =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-input-grad shadow-[0_0_16px_rgba(117,244,140,0.35)] cursor-pointer transition-all active:scale-95';

  return (
    <form
      onSubmit={handleSubmit}
      className={`mob-composer-fade fixed bottom-0 left-0 right-0 z-10 px-4 pt-6 pb-[max(16px,env(safe-area-inset-bottom))] ${className}`}
    >
      <div className="mob-glow-box relative rounded-[24px] p-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask anything..."
          aria-label="Message Zymm"
          className="thin-scroll block w-full resize-none bg-transparent px-1 pt-0.5 text-[15px] leading-[1.45] text-[#1B1B1B] outline-none [overflow-wrap:anywhere] placeholder:text-black/40 dark:text-white dark:placeholder:text-white/45"
        />

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="Add attachment"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80"
          >
            <PlusIcon width={16} height={16} />
          </button>
          <ModelPicker className="rounded-full border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.06]" />

          <div className="ml-auto">
            {isSending ? (
              <button type="submit" disabled className={actionClass}>
                <div className="h-3.5 w-3.5 animate-pulse rounded-sm bg-white" />
              </button>
            ) : input.trim() ? (
              <button type="submit" aria-label="Send" className={actionClass}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            ) : (
              <Link to="/assistant" state={{ conversationId: voiceChatId }} aria-label="Talk to Zymm" className={actionClass}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 136" fill="none" className="h-[18px] w-[18px]">
                  <g fill="#E9FFB8">
                    <rect x="2" y="51.2" width="8" height="33.6" rx="4" />
                    <rect x="18" y="34.4" width="8" height="67.2" rx="4" />
                    <rect x="34" y="0" width="8" height="136.01" rx="4" />
                    <rect x="50" y="25.6" width="8" height="84.8" rx="4" />
                    <rect x="66" y="34.4" width="8" height="67.2" rx="4" />
                    <rect x="82" y="27.2" width="8" height="81.6" rx="4" />
                    <rect x="98" y="57.6" width="8" height="20.8" rx="4" />
                  </g>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
