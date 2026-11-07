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
      <div className="flex justify-end mb-6">
                <div className="bg-black dark:bg-white dark:text-black text-white rounded-lg p-4 min-w-[200px] max-w-[70%] shadow-lg wrap-break-word">
                    {isFirstMessage && !isHomepageChat && !isOrbChat && (
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              </svg>
            </div>
          )}
          <EditableText text={message} onSave={onEdit} edited={edited} textClassName="text-[15px] leading-relaxed" />
        </div>
      </div>
    );
  }

  return (
        <div className="flex items-start justify-start gap-3 mb-6">
      <div className="flex shrink-0 items-center justify-center rounded-md bg-transparent">
        <img src={ring} alt="" className="h-8 w-8 object-contain" />
      </div>
      <div className="max-w-[85%] text-[15px] leading-relaxed text-[#1B1B1B] dark:text-white">
        {message.map((word, index) => (
          <span
            key={index}
            className={isAnimating ? "opacity-0 animate-fade-in inline-block mr-1" : "inline-block mr-1"}
            style={isAnimating ? { animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' } : {}}
          >
            {word}
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
