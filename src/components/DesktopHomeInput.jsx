import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SendIcon, SparkleIcon, WaveIcon } from './desktop/icons';

// Desktop-only hero input for the homepage empty state (the mobile home uses BottomInput).
export default function DesktopHomeInput({ onSend, placeholder = 'Ask Zymm a question or make a request...' }) {
  const [input, setInput] = useState('');

  const submit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="desk-glass relative flex h-[clamp(130px,25vh,240px)] w-full flex-col rounded-[26px] p-4"
    >
      <div className="flex flex-1 items-start gap-2 px-1 pt-1">
        <SparkleIcon width={18} height={18} className="mt-[3px] shrink-0 text-black/70 dark:text-white/80" />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          aria-label="Message Zymm"
          className="thin-scroll h-full w-full resize-none bg-transparent text-[15px] text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Add attachment"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/80 hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
        >
          <PlusIcon />
        </button>

        <div className="flex items-center gap-2">
          <Link
            to="/assistant"
            state={{ conversationId: null }}
            aria-label="Talk to Zymm"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/80 hover:bg-black/[0.06] dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
          >
            <WaveIcon width={16} height={16} />
          </Link>
          <button
            type="submit"
            aria-label="Send"
            disabled={!input.trim()}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-desk-accent text-white shadow-[0_4px_18px_rgba(117,244,140,0.3)] transition-opacity disabled:cursor-default disabled:opacity-80"
          >
            <SendIcon width={15} height={15} />
          </button>
        </div>
      </div>
    </form>
  );
}
