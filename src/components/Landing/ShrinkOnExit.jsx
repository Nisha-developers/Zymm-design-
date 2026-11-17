import { useEffect, useRef } from "react";

const EASE = 0.12; // lower = smoother/slower

// Wrap exactly ONE rounded element. The clip copies that element's own radius.
const ShrinkOnExit = ({ children, amount = 30, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let target = 0;
    let current = 0;
    let raf = null;
    let radius = 0;

    const readRadius = () => {
      const child = el.firstElementChild;
      radius = child
        ? parseFloat(getComputedStyle(child).borderTopLeftRadius) || 0
        : 0;
    };

    const apply = () => {
      el.style.clipPath = `inset(0 0 ${current * amount}% 0 round ${radius}px)`;
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.001) current = target;
      apply();
      raf = current !== target ? requestAnimationFrame(tick) : null;
    };

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      target = rect.height
        ? Math.min(Math.max(-rect.top / rect.height, 0), 1)
        : 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      readRadius();
      onScroll();
    };

    readRadius();
    apply();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={ref} className={`will-change-[clip-path] ${className}`}>
      {children}
    </div>
  );
};

export default ShrinkOnExit;