import { InfoIcon } from './icons';

function Metric({ label, value, fill }) {
  return (
    <div className="mt-[13px]">
      <p className="flex items-center gap-[5px] text-[11px] text-[#1c1e21]">
        {label} <InfoIcon className="text-[#4b4f56]" />
      </p>
      <p className="mt-[3px] text-[15px] font-bold text-[#1c1e21]">{value}</p>
      <div className="mt-[6px] h-[8px] rounded-[1px] bg-[#e4e6eb]">
        <div className="h-full bg-[#7cc4ea]" style={{ width: fill }} />
      </div>
    </div>
  );
}

export default function EstimatedResultsCard() {
  return (
    <div className="rounded-lg bg-white px-3 pb-3 pt-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
      <h3 className="text-[12px] font-bold text-[#1c1e21]">Estimated Daily Results</h3>
      <Metric label="Reach" value="1.4K - 4.2K" fill="4%" />
      <Metric label="Link Clicks" value="28 - 90" fill="4%" />

      <div className="mt-[13px] border-t border-[#dddfe2]" />
      <p className="mt-[9px] text-[10px] leading-[13px] text-[#606770]">
        The accuracy of estimates is based on factors like past campaign data, the budget you entered and market data.
        Numbers are provided to give you an idea of performance for your budget, but are only estimates and don&apos;t
        guarantee results.
      </p>
      <button type="button" className="mt-[10px] cursor-pointer text-[10px] text-[#365899]">Were these estimates helpful?</button>
    </div>
  );
}