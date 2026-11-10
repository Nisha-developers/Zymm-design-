export default function AssistantHeader({ title, subtitle, onBack, onMenuClick }) {
  return (
    <div className="flex flex-col items-center w-full px-6 md:px-10 pt-[clamp(12px,4dvh,40px)] md:justify-center">
      {/* Top Nav Bar (Back, Title, Menu) */}
      <div className="flex w-full  max-w-md md:max-w-none items-center justify-between  gap-3">
        {/* Back Button */}
        <button 
          onClick={onBack}
          aria-label="Go back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/[0.12]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Title */}
        <h2 className="whitespace-nowrap text-white text-[17px] md:text-[20px] font-medium tracking-wide">
            {title}
        </h2>

        <button 
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 backdrop-blur-sm cursor-pointer transition-colors hover:bg-white/[0.12]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Subtitle (Listening...) */}
      {subtitle && (
        <p className="text-[#3FE0A5] text-[15px] md:text-[16px] mt-1 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
