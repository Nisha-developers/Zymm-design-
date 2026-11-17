import { useState } from "react";

const FAQS = [
  {
    q: "How do I get access?",
    a: (
      <>
        <p>By invitation.</p>
        <p className="mt-5">
          You can{" "}
          <a href="#" className="underline underline-offset-2">
            request an invitation
          </a>{" "}
          or be referred by an existing member. We open Autonomous to a small
          group at a time and review every request individually.
        </p>
      </>
    ),
  },
  {
    q: "Who is Autonomous for?",
    a: (
      <p>
        Autonomous is for people with complex financial lives who want one
        intelligent system to understand and manage everything on their behalf.
      </p>
    ),
  },
  {
    q: "What happens after I join?",
    a: (
      <p>
        You connect your accounts, and Autonomous builds a complete picture of
        your assets, goals and family. From there it starts monitoring and
        advising right away.
      </p>
    ),
  },
  {
    q: "How are my assets protected?",
    a: (
      <p>
        Your assets stay with your existing custodians. Autonomous uses
        bank-grade encryption and read-level access unless you approve an
        action.
      </p>
    ),
  },
  {
    q: "Who is behind Autonomous?",
    a: (
      <p>
        Autonomous is built by a team of engineers, researchers and financial
        professionals focused on bringing superintelligence to personal finance.
      </p>
    ),
  },
];

const SectionSeven = () => {
  const [open, setOpen] = useState(null); // first item open by default

  return (
    <section className="w-full bg-[#eeeff1] px-5  px-1p b-16 md:px-3 md:pb-28">
      <h2 className="mb-3 text-[clamp(2rem,6vw,5rem)] font-normal tracking-[-0.01em] text-[#0a0a0a] md:text-[clamp(3rem,4vw,5rem)]">
        FAQ
      </h2>

      <div className="border-b border-[#0a0a0a]/25">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-t border-[#0a0a0a]/25">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-3 text-left text-[clamp(2rem,6vw,5rem)] tracking-[-0.01em] text-[#0a0a0a] md:text-[clamp(3rem,4vw,5rem)]"
              >
                <span>{item.q}</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3.5 w-3.5 shrink-0 text-[#0a0a0a]/35 transition-transform duration-500 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </button>

              {/* smooth open/close without fixed heights */}
              <div
                className={`grid transition-all duration-500 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-[44rem] pb-5 pt-1 text-[clamp(2rem,6vw,5rem)] leading-[1.3] tracking-[-0.01em] text-[#0a0a0a]/45 md:text-[clamp(4rem,4vw,5rem)]">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionSeven;