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
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
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