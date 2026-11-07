export default function AssistantInput({ onMicClick, onMessageClick, onClose, isListening = false }) {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-between px-8 pb-6 pt-3 shrink-0 relative z-10"> 
      <button
        onClick={onClose}
        aria-label="Close assistant"
        className="w-12 h-12  flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <button 
        onClick={onMicClick}
        aria-label={isListening ? 'Stop listening' : 'Talk to Zymm'}
        aria-pressed={isListening}
        className={`w-[84px] h-[34px] rounded-4xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95 transition-all cursor-pointer ${isListening ? 'ring-4 ring-green-400/60' : ''}`}
      >
        <svg width="174" height="123" viewBox="0 0 174 123" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.0742 51.25V61.5C36.0742 71.0146 41.395 80.1396 50.8661 86.8675C60.3372 93.5953 73.1828 97.375 86.577 97.375C99.9711 97.375 112.817 93.5953 122.288 86.8675C131.759 80.1396 137.08 71.0146 137.08 61.5V51.25M86.577 97.375V117.875M57.7182 117.875H115.436M86.577 5.125C80.8366 5.125 75.3314 6.74486 71.2723 9.62823C67.2133 12.5116 64.9329 16.4223 64.9329 20.5V61.5C64.9329 65.5777 67.2133 69.4884 71.2723 72.3718C75.3314 75.2551 80.8366 76.875 86.577 76.875C92.3173 76.875 97.8225 75.2551 101.882 72.3718C105.941 69.4884 108.221 65.5777 108.221 61.5V20.5C108.221 16.4223 105.941 12.5116 101.882 9.62823C97.8225 6.74486 92.3173 5.125 86.577 5.125Z" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke="black"/>
</svg>
        
      </button>
 <button 
        onClick={onMessageClick}
        aria-label="Open text chat"
        className="w-12 h-12 rounded-full  flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="9" y1="10" x2="15" y2="10"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      </button>
    </div>
  );
}
