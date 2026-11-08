import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BottomInput({ onSend, voiceChatId = null, className = '' }) { {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    setIsSending(true);
    onSend(input); // Trigger the send to the chat interface
    
    setInput(''); // Clear input
    
    // Brief delay before returning to default state
    setTimeout(() => setIsSending(false), 500); 
  };

  return (
    // Changed div to form to handle Enter key automatically
    <form 
      onSubmit={handleSubmit} 
            className={`fixed bottom-0 left-1/2 z-10 flex w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 px-6 pb-6 pt-2 md:left-[calc(50%+var(--sidebar-center-offset))] md:w-[var(--desktop-input-width)] md:px-0 ${className}`}
    >
      {/* Input Field - Your exact styles preserved */}
      <div className="flex-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-[52px] rounded-full px-5 text-gray-900 bg-white  placeholder-white/60 outline-none border-[#303030] shadow-inner"
          placeholder=""
        />
      </div>

      {/* Circular Gradient Button - Your exact styles preserved + dynamic icons */}
      {/* Processing / Send Button */}
{isSending ? (
  <button
    type="submit"
    disabled
    className="w-[52px] h-[52px] shrink-0 rounded-full bg-input-grad flex items-center justify-center shadow-lg"
  >
    <div className="w-4 h-4 bg-white rounded-sm animate-pulse" />
  </button>
) : input.trim() ? (
  <button
    type="submit"
    className="w-[52px] h-[52px] shrink-0 rounded-full bg-input-grad flex items-center justify-center shadow-lg cursor-pointer transition-all"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  </button>
) : (
  <Link
    to="/assistant"
    state={{ conversationId: voiceChatId }}
    className="w-[52px] h-[52px] shrink-0 rounded-full bg-input-grad flex items-center justify-center shadow-lg cursor-pointer transition-all"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 112 136"
      fill="none"
      className="w-5 h-5"
    >
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
    </form>
  );
}
