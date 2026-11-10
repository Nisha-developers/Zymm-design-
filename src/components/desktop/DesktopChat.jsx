import { useEffect, useRef, useState } from 'react';
import { ShareButton } from './DesktopTopBar';
import { ArrowUpIcon, ChevronDownIcon, CloseIcon, PlusIcon, QuoteIcon } from './icons';

const MODELS = [
  { id: 'light', name: 'Zymm', tier: 'Light' },
  { id: 'pro', name: 'Zymm', tier: 'Pro' },
];

// Thread title on the left, Share on the right (md and up only).
export function DesktopChatHeader({ title }) {
  return (
    <div className="sticky top-0 z-20 hidden h-[76px] items-center justify-between bg-[#EEEEEE]/85 pl-[calc(24px+var(--desktop-toggle-space,0px))] pr-6 backdrop-blur-md dark:bg-black/85 md:flex">
      <h2 className="truncate pr-4 text-[14px] font-medium text-black dark:text-white">{title || 'New chat'}</h2>
      <ShareButton className="!h-8 !rounded-lg !px-3" />
    </div>
  );
}

// "Getting a detailed report..." loader shown while Zymm is answering (md and up only).
export function DesktopThinking() {
  return (
    <div className="mb-3 hidden items-center gap-2 text-[13px] text-black/40 dark:text-white/40 md:flex">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin [animation-duration:2.4s]" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeDasharray="2 3.2" strokeLinecap="round" />
      </svg>
      <span className="desk-shimmer">Getting a detailed report...</span>
    </div>
  );
}

// Floating "Reply" button that appears over text selected inside a Zymm answer.
export function ReplyBubble({ anchor, onReply }) {
  if (!anchor) return null;
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // keep the selection while clicking
      onClick={onReply}
      style={{ left: anchor.x, top: anchor.y }}
      className="fixed z-50 hidden -translate-x-1/2 -translate-y-[calc(100%+8px)] cursor-pointer items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-black shadow-[0_6px_20px_rgba(0,0,0,0.35)] md:flex"
    >
      <QuoteIcon width={12} height={12} />
      Reply
    </button>
  );
}

function ModelPicker() {
  const [model, setModel] = useState(MODELS[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[13px] text-black/80 hover:bg-black/5 dark:text-white/85 dark:hover:bg-white/5"
      >
        {model.name} <span className="text-black/40 dark:text-white/40">{model.tier}</span>
        <ChevronDownIcon width={14} height={14} />
      </button>
      {open && (
        <ul className="absolute bottom-10 right-0 z-30 w-40 overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#161616]">
          {MODELS.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => {
                  setModel(m);
                  setOpen(false);
                }}
                className={`w-full cursor-pointer px-3 py-2 text-left text-[13px] hover:bg-black/5 dark:hover:bg-white/5 ${
                  m.id === model.id ? 'font-semibold text-black dark:text-white' : 'text-black/70 dark:text-white/70'
                }`}
              >
                {m.name} {m.tier}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Desktop chat composer: sticks to the bottom of the thread column (md and up only).
export function DesktopChatInput({ onSend, reply, onClearReply, inputRef, disabled = false }) {
  const [input, setInput] = useState('');

  const submit = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || disabled) return;
    onSend(reply ? `Replying to "${reply}": ${text}` : text);
    setInput('');
    onClearReply?.();
  };

  return (
    <div className="sticky bottom-0 z-10 mt-auto hidden bg-gradient-to-t from-[#EEEEEE] via-[#EEEEEE] to-transparent px-8 pb-6 pt-6 dark:from-black dark:via-black md:block">
      <div className="mx-auto w-full max-w-[640px]">
        {reply && (
          <div className="mb-2 flex items-start gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-[12px] text-black/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70">
            <QuoteIcon width={12} height={12} className="mt-0.5 shrink-0 text-[#E5484D]" />
            <p className="line-clamp-2 flex-1">{reply}</p>
            <button type="button" onClick={onClearReply} aria-label="Cancel reply" className="cursor-pointer opacity-60 hover:opacity-100">
              <CloseIcon width={14} height={14} />
            </button>
          </div>
        )}
        <form
          onSubmit={submit}
          className="flex h-14 items-center gap-2 rounded-[20px] border border-black/10 bg-white px-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-white/[0.08] dark:bg-[#141414] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          <button
            type="button"
            aria-label="Add attachment"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
          >
            <PlusIcon width={16} height={16} />
          </button>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={reply ? 'Reply to the highlighted text...' : 'Reply to Zymm...'}
            aria-label="Message Zymm"
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-black/35 dark:text-white dark:placeholder:text-white/35"
          />
          <ModelPicker />
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim() || disabled}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-desk-accent text-white transition-opacity disabled:cursor-default disabled:opacity-50"
          >
            <ArrowUpIcon width={15} height={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
