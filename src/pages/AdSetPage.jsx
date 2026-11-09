import { useState } from 'react';
import AudienceForm from '../components/ads/AudienceForm';
import CampaignTree from '../components/ads/CampaignTree';
import InsightsPanel from '../components/ads/InsightsPanel';
import TopBar from '../components/ads/TopBar';

export default function AdSetPage() {
  const [treeOpen, setTreeOpen] = useState(() => window.matchMedia?.('(min-width: 768px)').matches ?? true);
  const [isDraft, setIsDraft] = useState(true);
  const [tab, setTab] = useState('edit');

  return (
    <div className="min-h-screen bg-white font-[Helvetica,Arial,sans-serif] text-[#1c1e21]">
      <div className="flex  flex-col md:flex-row">
        {treeOpen && (
          <div className="shrink-0 border-b border-[#dddfe2] pb-4 md:w-[316px] md:border-b-0 md:border-r md:pb-0">
            <CampaignTree />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            onToggleTree={() => setTreeOpen((v) => !v)}
            isDraft={isDraft}
            onToggleDraft={() => setIsDraft((v) => !v)}
            tab={tab}
            onTab={setTab}
          />

          {tab === 'edit' ? (
            <div className="flex flex-1 flex-col md:flex-row">
              <div className="min-w-0 flex-1">
                <AudienceForm />
              </div>
              <InsightsPanel />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center p-10 text-[13px] text-[#606770]">
              Review your ad set before publishing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}