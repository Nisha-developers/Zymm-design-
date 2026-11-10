const SIDE =
  'flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/85 backdrop-blur-sm transition-all hover:bg-white/[0.12] active:scale-95 cursor-pointer';

// Orb screen controls: close (left), mic with glow rings (centre), text chat (right).
export default function AssistantInput({ onMicClick, onMessageClick, onClose, isListening = false }) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md shrink-0 items-center justify-between px-8 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 md:pb-10 md:pt-5">
      <button onClick={onClose} aria-label="Close assistant" className={SIDE}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="relative flex h-[104px] w-[104px] items-center justify-center">
        {/* Glow rings around the mic; they pulse outward while Zymm is listening */}
        <span className="absolute inset-0 rounded-full border border-[#75F48C]/15 bg-[#36A49F]/[0.06]" />
        <span className="absolute inset-[12px] rounded-full border border-[#75F48C]/25 bg-[#36A49F]/[0.08]" />
        {isListening && (
          <span className="absolute inset-[12px] animate-ping rounded-full border border-[#75F48C]/50 [animation-duration:1.6s]" />
        )}
        <button
          onClick={onMicClick}
          aria-label={isListening ? 'Stop listening' : 'Talk to Zymm'}
          aria-pressed={isListening}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-input-grad shadow-[0_0_30px_rgba(117,244,140,0.45)] transition-all active:scale-95 cursor-pointer ${
            isListening ? 'scale-105 shadow-[0_0_44px_rgba(117,244,140,0.7)]' : ''
          }`}
        >
          <svg width="26" height="26" viewBox="0 0 174 123" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M36.0742 51.25V61.5C36.0742 71.0146 41.395 80.1396 50.8661 86.8675C60.3372 93.5953 73.1828 97.375 86.577 97.375C99.9711 97.375 112.817 93.5953 122.288 86.8675C131.759 80.1396 137.08 71.0146 137.08 61.5V51.25M86.577 97.375V117.875M57.7182 117.875H115.436M86.577 5.125C80.8366 5.125 75.3314 6.74486 71.2723 9.62823C67.2133 12.5116 64.9329 16.4223 64.9329 20.5V61.5C64.9329 65.5777 67.2133 69.4884 71.2723 72.3718C75.3314 75.2551 80.8366 76.875 86.577 76.875C92.3173 76.875 97.8225 75.2551 101.882 72.3718C105.941 69.4884 108.221 65.5777 108.221 61.5V20.5C108.221 16.4223 105.941 12.5116 101.882 9.62823C97.8225 6.74486 92.3173 5.125 86.577 5.125Z" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
          </svg>
        </button>
      </div>

      <button onClick={onMessageClick} aria-label="Open text chat" className={SIDE}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="9" y1="10" x2="15" y2="10"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      </button>
    </div>
  );
}
