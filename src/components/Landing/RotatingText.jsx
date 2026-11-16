import { useEffect, useState } from "react";

const MESSAGES = [
  "Good morning Serah,\nhow are you today?",
  "I'm Zymm AI,\nyour personal voice assistant.",
  "I've checked your schedule.\nYou have 3 meetings today.",
];

const HOLD = 3000; // ms each message stays before switching

const RotatingText = () => {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrev(index);
      setIndex((index + 1) % MESSAGES.length);
    }, HOLD);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none absolute left-1/2 top-[39%] grid w-[56%] -translate-x-1/2 -translate-y-1/2 place-items-center text-center md:w-[28%]"
    >
      {MESSAGES.map((text, i) => {
        let state = "opacity-0 translate-y-8 duration-500"; // waiting below
        if (i === index) state = "opacity-100 translate-y-0"; // visible
        else if (i === prev) state = "opacity-0 -translate-y-8"; // fading up and out

        return (
          <p
            key={i}
            className={`col-start-1 row-start-1 whitespace-pre-line text-[clamp(11px,5vw,23px)] font-medium leading-snug text-white transition-all duration-700 ease-out md:text-[clamp(11px,5vw,23px)] ${state}`}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
};

export default RotatingText;