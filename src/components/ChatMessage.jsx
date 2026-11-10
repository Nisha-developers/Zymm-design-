import EditableText from './EditableText';
import ring from '../assets/bbed32f2f3119cfca2c86478d38b659a704bf6e4.png';

export default function ChatMessage({
  message,
  isUser,
  isAnimating,
  isHomepageChat = false,
  isOrbChat = false,
  onEdit,
  edited = false,
  cards,
  onOpenCards,
  isFirstMessage = false,
}) {
  if (isUser) {
    return (
      <div className="flex justify-end mb-6 md:pl-10">
                <div className="bg-black dark:bg-white dark:text-black text-white rounded-lg p-4 min-w-[200px] max-w-[70%] shadow-lg wrap-break-word md:w-full md:max-w-none md:rounded-xl md:px-4 md:py-3.5 md:shadow-none md:bg-black/[0.05] md:text-[#1B1B1B] md:dark:bg-white/[0.06] md:dark:text-white/85">
                                        {isFirstMessage && !isHomepageChat && !isOrbChat && (
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center mb-3 text-white mix-blend-difference md:hidden">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              </svg>
            </div>
          )}
          <EditableText text={message} onSave={onEdit} edited={edited} textClassName="text-[15px] leading-relaxed md:text-[14px]" />
        </div>
      </div>
    );
  }

  return (
        <div className="flex items-start justify-start gap-3 mb-6">
      <div className="flex shrink-0 items-center justify-center rounded-md bg-transparent md:hidden">
        <img src={ring} alt="" className="h-8 w-8 object-contain" />
      </div>
      <div data-bot-message className="max-w-[85%] text-[15px] leading-relaxed text-[#1B1B1B] dark:text-white md:max-w-none md:text-[14px] md:leading-[1.7] md:dark:text-white/85 md:selection:bg-[#E5484D]/25 md:selection:text-[#D93A40] md:dark:selection:text-[#FF6B6B]">
        {message.map((word, index) => (
          <span
            key={index}
            className={isAnimating ? "opacity-0 animate-fade-in inline-block mr-1" : "inline-block mr-1"}
            style={isAnimating ? { animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' } : {}}
          >
            {word}{' '}
          </span>
        ))}
        {cards?.length > 0 && (
          <div className="mt-3">
            <button
              type="button"
              onClick={onOpenCards}
              className="bg-green-grad rounded-full px-4 py-1.5 text-[12px] font-medium text-white cursor-pointer"
            >
              View {cards.length} job cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
