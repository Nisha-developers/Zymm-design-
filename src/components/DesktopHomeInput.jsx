import { useState } from 'react';
import { Link } from 'react-router-dom';

// Desktop-only hero input for the homepage empty state (hidden below md).
export default function DesktopHomeInput({ onSend, placeholder = 'Ask me anything...' }) {
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
      className="hidden md:flex w-full max-w-[760px] flex-col rounded-3xl border border-black/10 bg-white p-4 text-gray-900 shadow-lg dark:border-white/10 dark:bg-[#2A2A33] dark:text-white"
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={3}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent px-2 pt-1 text-[16px] outline-none placeholder:text-gray-400 dark:placeholder:text-white/50"
      />
      <div className="mt-3 flex items-center justify-end gap-3">
        <Link
          to="/assistant"
          state={{ conversationId: null }}
          aria-label="Talk to Zymm"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </Link>
        <button
          type="submit"
          aria-label="Send"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-input-grad shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  );
}