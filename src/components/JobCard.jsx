export default function JobCard({ job, index, total }) {
  return (
    <div 
      className="w-[calc(100%-2rem)] sm:w-[80%] max-w-[600px] h-auto rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row shadow-sm relative overflow-hidden shrink-0 mb-10"
      style={{
        background: 'linear-gradient(199.89deg, rgba(250, 139, 255, 0.61) 0%, rgba(250, 134, 255, 0.61) 19.2%, rgba(181, 237, 252, 0.61) 62.1%, rgba(44, 255, 136, 0.61) 100%)'
      }}
    >
      {/* Left Side - Job Info */}
      <div className="flex flex-col w-full md:w-[45%] shrink-0 relative z-10">
        <h2 className="text-white/90 text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">{job.title}</h2>
        
        <div className="flex flex-col gap-1 text-white/80 text-base sm:text-xl md:text-3xl font-medium mb-4 sm:mb-6">
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p className="mt-1">{job.match}</p>
        </div>

        <div className="mt-auto flex justify-between items-end text-white/50 text-[10px] sm:text-xs">
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
      <div className="h-px w-full bg-white/30 my-4 md:my-0 md:mx-3 md:h-auto md:w-px md:self-stretch"></div>

      {/* Right Side - Description */}
      <div className="flex flex-col flex-1 relative z-10">
        <h3 className="text-white/90 text-lg sm:text-2xl md:text-3xl font-semibold mb-2">Description</h3>
        
        <div className="text-white/70 text-xs sm:text-sm leading-relaxed overflow-y-auto max-h-[120px] sm:max-h-[160px] hide-scrollbar mb-4">
          <p className="mb-2">{job.description}</p>
        </div>

        {/* Auto Apply Button */}
        <div className="mt-auto flex justify-end">
          <button className="bg-white/90 text-black px-4 py-1.5 rounded text-[11px] sm:text-xs font-semibold hover:bg-white active:scale-95 transition-all">
            Auto Apply
          </button>
        </div>
      </div>
    </div>
  );
}