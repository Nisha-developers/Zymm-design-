import { useEffect, useRef } from "react";
import ShrinkOnExit from "./ShrinkOnExit";

const EASE = 0.1; // lower = smoother/slower

const ScrollImage = ({ src, alt = "", offset = 80, second = false }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    let target = -offset;
    let current = -offset;
    let raf = null;

    const apply = () => {
      img.style.transform = `translate3d(0, ${current}px, 0)`;
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.05) current = target;
      apply();
      raf = current !== target ? requestAnimationFrame(tick) : null;
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      const top = section.getBoundingClientRect().top;
      const progress = Math.min(Math.max((vh - top) / (vh * 0.8), 0), 1);
      target = -offset * (1 - progress);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    apply();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [offset]);

  return (
       
    <section
      ref={sectionRef}
      className={`w-full overflow-hidden bg-[#eeeff1] px-1 ${second ? 'pb-3': 'pb-12'} md:px-3 md:${second ? 'pb-3': 'pb-20'}`}
    >
      <ShrinkOnExit>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="block h-auto w-full rounded-[28px] bg-[#d2d4d8] will-change-transform max-md:h-[110vh] max-md:object-cover md:rounded-[36px]"
      />
       </ShrinkOnExit>
    </section>
   
  );
};

export default ScrollImage;