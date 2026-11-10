export default function PhoneMockup({ children }) {
  return (
        <div className="relative flex min-h-screen min-w-0 flex-1 flex-col overflow-x-clip bg-mobile-shell dark:bg-mobile-shell-dark md:bg-page-gradient md:px-[var(--desktop-content-padding)] md:dark:bg-none md:dark:bg-black">
      {children}
    </div>
  );
}
