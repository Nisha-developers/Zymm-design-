import { InfoIcon } from './icons';

export default function AudienceDefinitionCard() {
  return (
    <div className="rounded-lg bg-white px-3 pt-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
      <h3 className="text-[12px] font-bold text-[#1c1e21]">Audience Definition</h3>

      <div className="mt-[9px] flex items-start justify-between">
        <div className="w-[92px] shrink-0">
          <svg viewBox="0 0 80 44" className="mx-auto block w-[76px]" aria-hidden="true">
            <defs>
              <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#d6453d" />
                <stop offset="0.5" stopColor="#4d9d6b" />
                <stop offset="1" stopColor="#f2a33a" />
              </linearGradient>
            </defs>
            <path d="M5 41a35 35 0 0 1 70 0" fill="none" stroke="url(#gaugeGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M40 41 58 23" stroke="#3a3f47" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="40" cy="41" r="2.2" fill="#3a3f47" />
          </svg>
          <div className="mt-[2px] flex justify-between text-[7.5px] text-[#8d949e]">
            <span>Specific</span>
            <span>Broad</span>
          </div>
        </div>
        <p className="w-[96px] pt-[2px] text-[10.5px] leading-[13px] text-[#4b4f56]">Your audience selection is fairly broad.</p>
      </div>

      <div className="mt-[12px] border-t border-[#dddfe2]" />
      <p className="flex items-center gap-[5px] pb-[11px] pt-[8px] text-[11px] text-[#1c1e21]">
        Potential Reach: 110,000,000 people <InfoIcon className="text-[#4b4f56]" />
      </p>
    </div>
  );
}