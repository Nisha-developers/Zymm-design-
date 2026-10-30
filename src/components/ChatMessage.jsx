import EditableText from './EditableText';

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
}) {
  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div
          className={`${isOrbChat ? 'text-[#1B1B1B]' : isHomepageChat ? 'bg-[#C8FE97] text-[#2E2E3E]' : 'bg-[#2E2E3E] text-white'} rounded-3xl rounded-tr-sm p-4 min-w-[200px] max-w-[70%] shadow-lg wrap-break-word`}
          style={
            isOrbChat
              ? {
                  background:
                    'linear-gradient(185.75deg, #E3FFDC 10.61%, #D0FFFE 46.09%, #818181 95.42%)',
                }
              : undefined
          }
        >
          {!isHomepageChat && !isOrbChat && (
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
    <div className="flex justify-start mb-6">
      <div className="max-w-[85%] text-[15px] leading-relaxed text-white">
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
