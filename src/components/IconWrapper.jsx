export default function IconWrapper({
  children,
  onClick,
  type = 'button',
  variant = 'gradient',
  'aria-label': ariaLabel,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full transition-all cursor-pointer ${
        variant === 'gradient'
          ? 'bg-input-grad text-white shadow-sm'
          : 'bg-white/90 text-gray-700 hover:bg-white'
      }`}
    >
      {/* Wrapper to keep icons perfectly centered */}
      <span className="flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}