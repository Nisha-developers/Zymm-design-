export default function Header() {
  return (
    <div className="text-center px-6 lg:mt-8 mt-[min(64px,7dvh)] mb-[min(28px,4dvh)] md:mt-0 md:mb-10">
      <h1 className="text-[24px] md:text-[44px] font-bold text-black dark:text-white leading-tight md:leading-[1.1] md:tracking-tight">
        Hi, Matian!<br />
        How can I help you today?
      </h1>
      <p className="mt-2 text-[13px] text-black/50 dark:text-white/50">Your smart assistant is ready</p>
    </div>
  );
}
