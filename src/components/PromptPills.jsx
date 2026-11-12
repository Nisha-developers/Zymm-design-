import { useNavigate } from 'react-router-dom';

export default function PromptPills() {
  const navigate = useNavigate();
  const pills = [
    "Start New Job Hunt Campaign",
    "Email Hiring Managers",
    "Hair Performance Analysis",
    "Generate Analysis",
    "Generate Analysis"
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 mb-8 md:mt-6 md:max-w-[760px] md:gap-3 md:mb-0">
      {pills.map((text, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() =>
            navigate(`/topics/prompt-${idx + 1}`, {
              state: { initialMessage: text },
            })
          }
          className="glass-card rounded-full px-4 py-2 md:px-5 md:py-2.5 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
        >
          <span className="text-[#1B1B1B] dark:text-white/90 text-[11px] md:text-[14px] font-medium leading-none">
            {text}
          </span>
        </button>
      ))}
    </div>
  );
}