import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, ChartIcon, MailIcon } from './desktop/icons';

const PILLS = [
  { icon: BriefcaseIcon, text: 'Start New Job Hunt Campaign' },
  { icon: MailIcon, text: 'Email Hiring Managers' },
  { icon: ChartIcon, text: 'Generate Analysis' },
];

export default function PromptPills() {
  const navigate = useNavigate();

  return (
    <div className="mb-2 flex flex-wrap justify-center gap-2 px-0 md:mt-6 md:mb-0 md:max-w-[760px] md:gap-3">
      {PILLS.map(({ icon: Icon, text }, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() =>
            navigate(`/topics/prompt-${idx + 1}`, {
              state: { initialMessage: text },
            })
          }
          className="glass-card flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full px-3 transition-transform active:scale-95 md:h-11 md:px-5"
        >
          <Icon width={15} height={15} className="shrink-0 text-[#1B1B1B]/75 dark:text-white/80" />
          <span className="text-[12px] font-medium leading-none text-[#1B1B1B] dark:text-white/90 md:text-[14px]">{text}</span>
        </button>
      ))}
    </div>
  );
}
