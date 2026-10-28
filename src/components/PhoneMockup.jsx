export default function PhoneMockup({ children }) {
  return (
    <div className="relative flex min-h-screen min-w-0 flex-1 flex-col overflow-x-clip bg-page-gradient md:px-[var(--desktop-content-padding)]">
      {children}
    </div>
  );
}