import { useState } from 'react';
import { isApplied, startApplication } from '../lib/applyTask';

export default function JobCard({ job, index, total }) {
  // idle -> confirm (ask first, never apply by accident) -> applied
  const [step, setStep] = useState(() => (isApplied(job) ? 'applied' : 'idle'));

  const confirmApply = () => {
    startApplication(job);
    setStep('applied');
  };

  return (
    <div 
      className="w-[calc(100%-2rem)] sm:w-[80%] max-w-[600px] h-[260px] sm:h-auto rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row relative overflow-hidden shrink-0 mb-10 backdrop-blur-xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]"
      style={{
        background:
          'radial-gradient(120% 90% at 0% 0%, rgba(250,139,255,0.28), transparent 55%), radial-gradient(120% 90% at 100% 100%, rgba(44,255,136,0.22), transparent 55%), rgba(24,24,32,0.55)',
      }}
    >
      {/* Animated top bar */}
      <div className="card-bar pointer-events-none absolute inset-x-0 top-0 z-20 h-1" aria-hidden="true" />

      {/* Left Side - Job Info */}
      <div className="flex flex-col w-full md:w-[45%] shrink-0 relative z-10 min-h-0">
        <h2 className="text-white text-xl sm:text-2xl md:text-[26px] font-semibold tracking-tight leading-tight mb-3 sm:mb-4 shrink-0">{job.title}</h2>
        
        <div className="flex flex-col gap-1.5 mb-3 sm:mb-6 overflow-y-auto md:overflow-visible hide-scrollbar min-h-0 md:min-h-fit">
          <p className="text-base sm:text-lg font-semibold text-white/90">{job.company}</p>
          <p className="text-sm sm:text-base text-white/70">{job.location}</p>
          <p className="text-sm sm:text-base text-white/70">{job.salary}</p>
          <p className="mt-1 text-sm sm:text-base font-semibold text-emerald-300">{job.match}</p>
        </div>

        <div className="mt-auto shrink-0 flex justify-between items-end text-white/60 text-[10px] sm:text-xs tracking-wide">
          <p>Listing {index + 1} of {total}</p>
          <div className="flex items-center gap-1 font-mono tracking-widest opacity-80">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h3V5.73A2 2 0 0 1 12 2zm-3 10v2a1 1 0 1 0 0-2zm6 0v2a1 1 0 1 0 0-2z"/>
            </svg>
            ZYMM
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px w-full bg-white/20 my-3 md:my-0 md:mx-3 md:h-auto md:w-px md:self-stretch shrink-0"></div>

      {/* Right Side - Description */}
      <div className="flex flex-col flex-1 relative z-10 min-h-0">
        <h3 className="text-white text-base sm:text-lg font-semibold tracking-tight mb-2 shrink-0">Description</h3>
        
        <div className="text-white/75 text-[13px] sm:text-sm leading-relaxed overflow-y-auto md:overflow-visible hide-scrollbar mb-3 md:mb-4 flex-1 md:flex-initial min-h-0 max-h-[120px] sm:max-h-[160px] md:max-h-none">
          <p className="mb-2">{job.description}</p>
        </div>

        {/* Auto Apply Button */}
        <div className="mt-auto shrink-0 flex items-center justify-end gap-2">
          {step === 'confirm' ? (
            <>
              <span className="text-white/80 text-[11px] sm:text-xs">Send application?</span>
              <button onClick={confirmApply} className="bg-white text-[#1B1B1B] px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide hover:bg-white active:scale-95 transition-all">
                Yes
              </button>
              <button onClick={() => setStep('idle')} className="bg-white/30 text-white px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide hover:bg-white/40 active:scale-95 transition-all">
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => step === 'idle' && setStep('confirm')}
              disabled={step === 'applied'}
              className="bg-white text-[#1B1B1B] px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide hover:bg-white active:scale-95 transition-all disabled:opacity-60 disabled:active:scale-100"
            >
              {step === 'applied' ? 'Applied ✓' : 'Auto Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
      }
