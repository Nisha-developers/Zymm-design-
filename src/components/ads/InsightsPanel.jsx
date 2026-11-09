import AudienceDefinitionCard from './AudienceDefinitionCard';
import EstimatedResultsCard from './EstimatedResultsCard';

export default function InsightsPanel() {
  return (
    <aside className="flex flex-col gap-[9px] rounded-b-[28px] bg-[#f0f2f5] p-3 pt-[10px] md:w-[311px] md:shrink-0 md:rounded-b-none md:rounded-br-[32px] md:px-[13px]">
      <AudienceDefinitionCard />
      <EstimatedResultsCard />
    </aside>
  );
}