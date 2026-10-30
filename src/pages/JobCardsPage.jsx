import { useLocation, useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';

export default function JobCardsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cards = state?.cards ?? [];
  const conversationId = state?.conversationId ?? null;
  const lastUserMessage = state?.lastUserMessage;

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-page-gradient relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col items-center pt-10 pb-6 shrink-0 relative z-30">
        <h1 className="text-[17px] font-medium text-gray-900">Personal Assistant</h1>
        <p className="text-[15px] text-green-500/80 mt-1">Zymm is reporting..</p>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-6 top-10 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </div>

      {/* 
        Scrollable Cards Area. 
        Added padding-bottom so the last card can scroll up past the grey overlay.
      */}
      <div className=" overflow-y-auto px-4 pb-[220px] flex flex-col items-center gap-4 hide-scrollbar relative z-10">
        {cards.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} total={cards.length} />
        ))}
      </div>

      {/* 
        Bottom Overlay Section.
        Solid gray background with a gradient fade at the top to blend with the cards.
      */}
      <div className="absolute bottom-0 left-0 w-full h-[220px] bg-[#888888] z-20 flex flex-col items-center justify-end pb-10 px-6">
        
        {/* Gradient fade to blend the solid gray with the cards above */}
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-[#888888] -translate-y-full pointer-events-none" />

        {/* The Message you sent */}
        <p className="text-white/90 text-center text-[15px] leading-relaxed mb-6 max-w-sm drop-shadow-sm">
          {lastUserMessage || 'Tap the mic to keep talking with Zymm.'}
        </p>

        {/* Microphone */}
        <button
          aria-label="Keep talking with Zymm"
          onClick={() => navigate('/assistant', { state: { conversationId } })}
          className="w-[64px] h-[64px] rounded-full bg-green-grad flex items-center justify-center opacity-90 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:opacity-100 active:scale-95 transition-all cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
        </button>
      </div>
      
    </div>
  );
}