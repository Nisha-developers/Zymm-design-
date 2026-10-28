export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 p-2 px-3 bg-white/40 border border-white/50 rounded-2xl w-fit">
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
}