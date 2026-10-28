export default function AssistantHeader({ title, subtitle, onBack, onMenuClick }) {
  return (
    <div className="flex flex-col items-center w-full px-4 pt-6">
      {/* Top Nav Bar (Back, Title, Menu) */}
      <div className="flex w-full max-w-md items-center justify-between gap-3">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-input-grad shadow-sm cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Title */}
        <h2 className="whitespace-nowrap text-black text-[17px] font-medium tracking-wide">
            {title}
        </h2>

        <button 
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-input-grad shadow-sm cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Subtitle (Listening...) */}
      {subtitle && (
        <p className="text-gray-400 text-[15px] mt-3 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}