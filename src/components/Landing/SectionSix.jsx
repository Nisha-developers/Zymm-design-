import { useEffect, useRef, useState } from "react";
import EmailSignup from "./EmailSignup";

const TABS = [
  {
    id: "real-estate",
    label: "Real estate",
    question: "I want to buy in SF. What can I actually afford before this liquidity event?",
    answer:
      "Most of your wealth is still locked-up stock, so I sized the purchase against the cash you can reach today and the after-tax number coming later, cash versus a loan against your position.",
  },
  {
    id: "tax",
    label: "Tax",
    question: "I just got my bonus. How much should I set aside for taxes?",
    answer:
      "About $38,000 covers the federal and state bill on it. I moved that amount into your tax reserve and flagged two deductions you can still use before year end.",
  },
  {
    id: "concentration",
    label: "Concentration",
    question: "My whole net worth is one stock that's about to go public. What now?",
    answer:
      "Let's plan your deconcentration strategy. I'd stage sales sized against your tax picture, and in the meantime we can borrow against the position for liquidity now, so your portfolio becomes diversified at a pace you control.",
  },
];

const QuoteIcon = () => (
  <span className="mt-[0.55em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white md:mt-[0.6em]">
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="#0a0a14" aria-hidden="true">
      <path d="M3 9.5C3 7 4.4 5.3 6.6 4.8l.4.9C5.8 6.2 5.3 7 5.3 7.8H7V11H3V9.5zm6 0C9 7 10.4 5.3 12.6 4.8l.4.9c-1.2.5-1.7 1.3-1.7 2.1H13V11H9V9.5z" />
    </svg>
  </span>
);

const WaveIcon = () => (
  <span className="mt-[0.55em] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white md:mt-[0.6em]">
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="#0a0a14" aria-hidden="true">
      <rect x="2" y="6" width="1.4" height="4" rx="0.7" />
      <rect x="5" y="4" width="1.4" height="8" rx="0.7" />
      <rect x="8" y="2.5" width="1.4" height="11" rx="0.7" />
      <rect x="11" y="5" width="1.4" height="6" rx="0.7" />
    </svg>
  </span>
);

const SectionSix = () => {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.min(Math.max(-rect.top / range, 0), 1);
      const next = Math.min(Math.floor(progress * TABS.length), TABS.length - 1);
      setIndex(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // clicking a tab scrolls the page to that tab's position
  const goTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / TABS.length) * range,
      behavior: "smooth",
    });
  };

  return (
    <div>
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-[#eeeff1]">
      <div className="sticky top-0 max-md:top-[50%] max-md:-translate-[50%] md:h-screen h-[90vh] p-1.5 md:p-3">
        <div
          className="relative h-full overflow-hidden rounded-[32px] md:rounded-[40px]"
          style={{
            background:
              "radial-gradient(120% 55% at 50% 100%, #d4d6d8 0%, rgba(212,214,216,0) 65%), linear-gradient(180deg, #03030a 0%, #03030a 40%, #0d3a42 75%, #0d3a42 100%)",
          }}
        >
          <div className="px-5 pt-6 md:px-16 md:pt-14">
            {/* Tabs */}
            <div className="mx-auto flex w-full max-w-[510px] rounded-full border border-white/10 bg-[#1b1b25] p-1.5">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`flex-1 rounded-full px-2 py-3 text-[14px] transition-colors duration-500 md:py-3.5 md:text-[15px] ${
                    index === i ? "bg-white text-black" : "text-white/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="mt-10 text-[14px] text-white md:mt-12 md:text-[13px]">
              Get immediate answers and explore trade-offs
            </p>

            {/* Panels: all stacked, only the active one is visible */}
            <div className="mt-8 grid max-w-[58rem] md:mt-9">
              {TABS.map((tab, i) => {
                let state = "pointer-events-none translate-y-6 opacity-0";
                if (i === index) state = "translate-y-0 opacity-100";
                else if (i < index) state = "pointer-events-none -translate-y-6 opacity-0";

                return (
                  <div
                    key={tab.id}
                    className={`col-start-1 row-start-1 flex flex-col gap-6 transition-all duration-700 ease-out md:gap-7 ${state}`}
                  >
                    <div className="flex items-start gap-4">
                      <QuoteIcon />
                      <p className="text-[clamp(1.6rem,6.8vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-white md:text-[clamp(1.6rem,2.9vw,2.6rem)]">
                        {tab.question}
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <WaveIcon />
                      <p className="text-[clamp(1.6rem,6.8vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-white md:text-[clamp(1.6rem,2.9vw,2.6rem)]">
                        {tab.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  <EmailSignup />
    </div>
  );
};

export default SectionSix;