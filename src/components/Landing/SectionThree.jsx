import { useEffect, useRef } from "react";
import sectionThreeImg from "../../assets/section-three.jpg";
import Heading from "./Heading";

const OFFSET = 80; // px the image starts raised, then comes down into place
const EASE = 0.1; // lower = smoother/slower

const SectionThree = () => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    let target = -OFFSET;
    let current = -OFFSET;
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
      // 0 when the section enters at the bottom of the screen,
      // 1 when it has travelled 80% of the way up
      const progress = Math.min(Math.max((vh - top) / (vh * 0.8), 0), 1);
      target = -OFFSET * (1 - progress);
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#eeeff1] px-1 md:px-3 pb-12 md:pb-20"
    >
      <img
        ref={imgRef}
        src={sectionThreeImg}
        alt="Future net worth projection shown on the Autonomous app"
        className="block h-auto w-full rounded-[28px] bg-[#d2d4d8] will-change-transform md:rounded-[36px]"
      />
      <Heading lines={'Autonomous surfaces what needs your attention and proactively takes the next step.'} className="mt-30"/>
    </section>
  );
};

export default SectionThree;