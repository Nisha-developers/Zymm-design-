import UserBubble from './UserBubble';
import ring from '../assets/bbed32f2f3119cfca2c86478d38b659a704bf6e4.png';

export default function ChatMessage({
  message,
  isUser,
  isAnimating,
  onEdit,
  edited = false,
  cards,
  onOpenCards,
}) {
  if (isUser) {
    // The topic icon belongs to the menu card only; once the chat starts the bubble is just text.
    return (
      <div className="mb-3 flex justify-end">
        <UserBubble text={message} onEdit={onEdit} edited={edited} />
      </div>
    );
  }

  return (
        <div className="flex items-start justify-start gap-3 mb-6">
      <div className="flex shrink-0 items-center justify-center rounded-md bg-transparent md:mt-[-2px]">
        <img src={ring} alt="" className="h-8 w-8 object-contain" />
      </div>
      <div data-bot-message className="min-w-0 max-w-[85%] [overflow-wrap:anywhere] text-[15px] leading-relaxed text-[#1B1B1B] dark:text-white md:max-w-none md:flex-1 md:text-[14px] md:leading-[1.7] md:dark:text-white/85 md:selection:bg-[#E5484D]/25 md:selection:text-[#D93A40] md:dark:selection:text-[#FF6B6B]">
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
