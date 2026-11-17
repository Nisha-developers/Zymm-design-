import { useEffect, useState } from "react";

const CHAT_URL = "/newchat";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false); // mount the iframe on first open only

  const toggle = () => {
    setLoaded(true);
    setOpen((prev) => !prev);
  };

  // lets the chat inside the iframe close the popup
  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data === "close-chat") setOpen(false);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      {/* Popup panel: taller than it is wide */}
      <div
        aria-hidden={!open}
        className={`fixed bottom-24 right-4 z-50 h-[min(620px,calc(100dvh_-_25rem))] w-[min(380px,calc(100vw_-_6rem))] md:h-[min(620px,calc(100dvh_-_10rem))] origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-6 scale-50 opacity-0"
        }`}
      >
        {loaded && (
          <iframe
            src={CHAT_URL}
            title="Chat"
            className="h-full w-full border-0"
          />
        )}
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {/* chat icon */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute h-6 w-6 transition-all duration-500 ${
            open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
        </svg>

        {/* close icon */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute h-6 w-6 transition-all duration-500 ${
            open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </>
  );
};

export default ChatWidget;