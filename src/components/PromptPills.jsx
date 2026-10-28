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
    <div className="flex flex-wrap justify-center gap-2 px-4 mb-8">
      {pills.map((text, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() =>
            navigate(`/topics/prompt-${idx + 1}`, {
              state: { initialMessage: text },
            })
          }
          className="relative bg-green-grad rounded-full px-4 py-1.5 opacity-50 flex items-center justify-center cursor-pointer"
        >
          {/* Text is wrapped to bypass the parent's opacity */}
          <span className="relative z-10 text-white text-[11px] font-medium leading-none">
            {text}
          </span>
        </button>
      ))}
    </div>
  );
}