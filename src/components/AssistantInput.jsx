export default function AssistantInput({ onMicClick, onMessageClick }) {
  return (
    <div className="flex items-center justify-center w-full px-6 pb-10 pt-2 shrink-0 relative z-10 gap-6">
      <button 
        onClick={onMessageClick}
        className="w-[64px] h-[64px] rounded-full border border-white/50 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer shadow-sm"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="9" y1="10" x2="15" y2="10"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      </button>

      <button 
        onClick={onMicClick}
        className="w-[64px] h-[64px] rounded-full bg-input-grad flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95 transition-all cursor-pointer"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
        </svg>
      </button>
    </div>
  );
}