import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BottomInput({ onSend, voiceChatId = null }) {
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
      className="fixed bottom-0 left-1/2 z-10 flex w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 px-6 pb-6 pt-2 md:left-[calc(50%+var(--sidebar-center-offset))] md:w-[var(--desktop-input-width)] md:px-0"
    >
      {/* Input Field - Your exact styles preserved */}
      <div className="flex-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-[52px] rounded-full px-5 text-gray-900 bg-white placeholder-white/60 outline-none border-[#303030] shadow-inner"
          placeholder=""
        />
      </div>

      {/* Circular Gradient Button - Your exact styles preserved + dynamic icons */}
      <button 
        type="submit"
        className="w-[52px] h-[52px] shrink-0 rounded-full bg-input-grad flex items-center justify-center shadow-lg cursor-pointer transition-all"
      >
        {/* Dynamic Icon Logic based on user request */}
        {isSending ? (
          // Processing Square
          <div className="w-4 h-4 bg-white rounded-sm animate-pulse" /> 
        ) : input.trim() ? (
          // Send Arrow (when typing)
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg> 
        ) : (
          // Default Mic (when empty)
        <Link to='/assistant' state={{ conversationId: voiceChatId }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg> 
           </Link>
        )}
       
      </button>
    </form>
  );
}