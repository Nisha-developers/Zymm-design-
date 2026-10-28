import IconWrapper from './IconWrapper';

export default function Sidebar({
  isOpen,
  onClose,
  onToggle,
  showToggle = true,
}) {
  return (
    <>
      {/* Mobile Overlay Background */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed z-50 flex flex-col bg-white/60 backdrop-blur-xl 
          border-r border-white/40 shadow-2xl
          transition-transform duration-300 ease-in-out
          
          /* Mobile Styles */
          top-0 left-0 h-full w-[280px]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          
          /* Desktop Styles */
          md:sticky md:top-0 md:left-auto md:h-screen md:self-start md:shadow-none md:bg-white/30
          ${isOpen ? 'md:w-[320px] md:translate-x-0' : 'md:w-0 md:-translate-x-full md:overflow-hidden'}
        `}
      >
        {/* Header Area (Icons) */}
        <div className="flex w-[280px] items-center justify-end gap-2 p-6 md:w-[320px]">
          {showToggle && (
            <IconWrapper
              onClick={onToggle}
              aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {isOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </IconWrapper>
          )}
          {/* Inactive Icon (Search) */}
          <IconWrapper variant="default" aria-label="Search">
            <div className="h-8 w-8 bg-gray-600/50 flex items-center justify-center rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            </div>
          </IconWrapper>
        </div>

        {/* Scrollable Lists Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 text-[#2E2E3E]">
          
          {/* Section 1 */}
          <div className="mb-8">
            <h3 className="text-[13px] font-bold mb-3">Actionable Requests</h3>
            <ul className="flex flex-col gap-2 text-[13px] font-medium">
              <li className="cursor-pointer hover:opacity-70">Restructure entire resume</li>
              <li className="cursor-pointer hover:opacity-70">Email hiring manager</li>
              <li className="cursor-pointer hover:opacity-70">Start New Campaign</li>
              <li className="cursor-pointer hover:opacity-70">Email hiring manager</li>
              <li className="cursor-pointer hover:opacity-70">Metric Weekly Reporting</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h3 className="text-[13px] font-bold mb-3">Recent Chats</h3>
            <ul className="flex flex-col gap-2 text-[13px] font-medium">
              <li className="cursor-pointer hover:opacity-70">Restructure entire resume</li>
              <li className="cursor-pointer hover:opacity-70">Email hiring manager</li>
              <li className="cursor-pointer hover:opacity-70">Start New Campaign</li>
              <li className="cursor-pointer hover:opacity-70">Email hiring manager</li>
              <li className="cursor-pointer hover:opacity-70">Metric Weekly Reporting</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-[13px] font-bold mb-3">Recent Task Requests</h3>
            <ul className="flex flex-col gap-2 text-[13px] font-medium">
              <li className="cursor-pointer hover:opacity-70">Restructure entire resume</li>
              <li className="cursor-pointer hover:opacity-70">Email hiring manager</li>
              <li className="cursor-pointer hover:opacity-70">Start New Campaign</li>
              <li className="cursor-pointer hover:opacity-70">Email hiring manager</li>
              <li className="cursor-pointer hover:opacity-70">Weekly Performance Reporting</li>
            </ul>
            {/* Faded See all text at bottom */}
            <p className="mt-4 text-[13px] font-medium text-black/30 cursor-pointer">
              See all...
            </p>
          </div>

        </div>
      </aside>
    </>
  );
}