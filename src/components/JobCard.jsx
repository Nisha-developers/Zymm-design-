import { useState } from 'react';
import { isApplied, startApplication } from '../lib/applyTask';

export default function JobCard({ job, index, total }) {
  const [step, setStep] = useState(() => (isApplied(job) ? 'applied' : 'idle'));

  const confirmApply = () => {
    startApplication(job);
    setStep('applied');
  };

  return (
    // 1. Outer wrapper to handle the layout
    <div className="relative w-[calc(100%-2rem)] sm:w-[80%] max-w-[600px] shrink-0 mb-10">
      
      {/* 
        2. THE GLASS BACKGROUND (The Secret Sauce)
        This sits behind the card to provide the exact pastel gradient from your image. 
        The backdrop-blur on the card will blur these vivid colors.
      */}
      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,#8dfeb0_0%,#a5f3fc_45%,#fbcfe8_100%)] opacity-90" />

      {/* 3. THE GLASS CARD */}
      <div 
        className="relative h-auto rounded-2xl flex flex-col md:flex-row overflow-hidden border border-white/50 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
        style={{
          // Very low opacity white overlay so the gradient shows through, creating the frosted look
          background: 'rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Glass Highlight (Top edge glare) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.3)_0%,transparent_40%)]" aria-hidden="true" />

        {/* --- LEFT SIDE: Job Info (Scrollable on mobile) --- */}
        <div className="flex flex-col w-full md:w-[45%] shrink-0 relative z-10 p-5 sm:p-6 max-h-[220px] md:max-h-none overflow-y-auto hide-scrollbar">
          <h2 className="text-gray-900 text-xl sm:text-2xl font-semibold tracking-tight leading-tight mb-4">
            {job.title}
          </h2>
          
          <div className="flex flex-col gap-1.5 mb-4">
            <p className="text-base font-semibold text-gray-800">{job.company}</p>
            <p className="text-sm text-gray-700">{job.location}</p>
            <p className="text-sm text-gray-700">{job.salary}</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{job.match}</p>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-end text-gray-600 text-[10px] tracking-wide">
            <p>Listing {index + 1} of {total}</p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px w-full bg-gray-900/10 my-0 md:my-6 md:mx-0 md:h-auto md:w-px md:self-stretch"></div>

        {/* --- RIGHT SIDE: Description (Scrollable on mobile) --- */}
        <div className="flex flex-col flex-1 relative z-10 p-5 sm:p-6">
          <h3 className="text-gray-900 text-base sm:text-lg font-semibold tracking-tight mb-2">Description</h3>
          
          <div className="text-gray-800 text-[13px] sm:text-sm leading-relaxed overflow-y-auto max-h-[120px] sm:max-h-[140px] hide-scrollbar mb-4">
            <p className="mb-2">{job.description}</p>
          </div>

          {/* Auto Apply Button */}
          <div className="mt-auto flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
            {step === 'confirm' ? (
              <>
                <span className="text-gray-800 text-[11px] sm:text-xs font-medium mr-auto sm:mr-0">Send application?</span>
                <div className="flex gap-2">
                  <button onClick={confirmApply} className="bg-white/80 text-gray-900 px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide hover:bg-white active:scale-95 transition-all shadow-sm">
                    Yes
                  </button>
                  <button onClick={() => setStep('idle')} className="bg-white/30 text-gray-800 px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide hover:bg-white/50 active:scale-95 transition-all">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center mt-2 sm:mt-0">
                {/* ZYMM Logo moved here for mobile to save vertical space */}
                <div className="flex md:hidden items-center gap-1 font-mono tracking-widest text-[10px] text-gray-600 opacity-80">
                  ZYMM
                </div>
                
                <button
                  onClick={() => step === 'idle' && setStep('confirm')}
                  disabled={step === 'applied'}
                  className="bg-white text-gray-900 px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100 shadow-sm"
                >
                  {step === 'applied' ? 'Applied ✓' : 'Auto Apply'}
                </button>
              </div>
            )}
          </div>
          
          {/* ZYMM Logo for Desktop */}
          <div className="hidden md:flex absolute bottom-5 right-6 items-center gap-1 font-mono tracking-widest text-[10px] text-gray-600 opacity-80">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h3V5.73A2 2 0 0 1 12 2zm-3 10v2a1 1 0 1 0 0-2zm6 0v2a1 1 0 1 0 0-2z"/>
            </svg>
            ZYMM
          </div>
        </div>
      </div>
    </div>
  );
}
