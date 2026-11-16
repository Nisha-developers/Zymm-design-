import { useEffect, useRef,  useState } from "react";
import heroPhone from "../../assets/hero-phone.png";
import RotatingText from "./RotatingText";

const START = 0.9; // card width (fraction of screen) at top of page
const GAP = 3; // px left on each side once fully scrolled
const EASE = 0.1; // lower = smoother/slower

const Hero = () => {
  const cardRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // small delay so the browser paints the initial state first
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

    useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let startScale = START;
    let target = START;
    let current = START;
    let raf = null;

    // card's natural width = wrapper width - GAP on both sides
    const calcStart = () => {
      const w = el.parentElement.clientWidth;
      startScale = (START * w) / (w - GAP * 2);
    };

    const apply = () => {
      el.style.transform = `scale(${current})`;
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply();
      raf = current !== target ? requestAnimationFrame(tick) : null;
    };

    const onScroll = () => {
      const range = window.innerHeight * 0.6;
      const progress = Math.min(Math.max(window.scrollY / range, 0), 1);
      target = startScale + (1 - startScale) * progress;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      calcStart();
      onScroll();
    };

    calcStart();
    current = startScale;
    target = startScale;
    apply();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="w-full">
      {/* Logo */}
      <header className="flex items-center justify-center gap-2 py-8 md:py-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-black md:h-5 md:w-5">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 md:h-3 md:w-3"
            fill="white"
            aria-hidden="true"
          >
            <rect x="3" y="7" width="2" height="6" rx="1" />
            <rect x="7" y="4" width="2" height="9" rx="1" />
            <rect x="11" y="8" width="2" height="5" rx="1" />
          </svg>
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-black md:text-sm">
          Autonomous
        </span>
      </header>

      {/* Hero card */}
        <div
        className={`mx-auto w-[calc(100%-60px)] origin-top pb-10 transition-all duration-1000 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div
          ref={cardRef}
          className="relative aspect-[1/1.9] origin-top overflow-hidden rounded-[32px] bg-[#d2d4d8] will-change-transform md:aspect-auto md:h-[750px] md:rounded-[28px] lg:h-[1020px]"
        >
          <img
            src={heroPhone}
            alt="Autonomous app on a phone held in hand"
            className="h-full w-full object-cover  object-center md:object-cover"
          />
           <RotatingText />
        </div>
      </div>
    </section>
  );
};

export default Hero;