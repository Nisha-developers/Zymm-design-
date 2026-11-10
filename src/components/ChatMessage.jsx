import UserBubble from './UserBubble';
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
    const showTopicIcon = isFirstMessage && !isHomepageChat && !isOrbChat;
    return (
      <div className="mb-3 flex justify-end">
        <UserBubble
          text={message}
          onEdit={onEdit}
          edited={edited}
          leading={
            showTopicIcon && (
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current/30 opacity-70 md:hidden">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                </svg>
              </span>
            )
          }
        />
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
