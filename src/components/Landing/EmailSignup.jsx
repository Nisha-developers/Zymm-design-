import { useEffect, useRef, useState } from "react";

const EmailSignup = () => {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      // once it is 15% inside the screen, trigger the animation
      if (top < window.innerHeight * 0.85) setVisible(true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `email` to your backend
    console.log(email);
  };

  return (
    <section
      ref={wrapRef}
      className="flex w-full justify-center  bg-[#eeeff1] px-3 py-10 md:pb-20"
    >
      <form
        onSubmit={handleSubmit}
        className={`flex items-center rounded-full border h-[70px] border-white/10 bg-[#4d4e4f] py-1.5 pl-6 pr-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-out ${
          visible ? "w-[80%]  md:w-[40%] opacity-100" : "w-[10%] opacity-0"
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          aria-label="Submit email"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#4d4e4f] md:h-12 md:w-12"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </form>
    </section>
  );
};

export default EmailSignup;