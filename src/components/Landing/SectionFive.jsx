const SectionFive = () => {
  return (
    <section className="w-full bg-[#eeeff1] px-3 pb-3 md:pb-5">
      <div className="grid grid-cols-1 gap-y-8 rounded-[28px] bg-[#fdfdfd] p-6 md:grid-cols-2 md:gap-x-10 md:gap-y-32 md:rounded-[36px] md:p-10">
        {/* Label: top-left */}
        <p className="text-[20px] font-bold text-[#0a0a0a] md:col-start-1 md:row-start-1 md:text-[25px]">
          Why
        </p>

        {/* Paragraph one: top-right on desktop */}
        <p className="text-[clamp(1.75rem,8vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#0a0a0a] md:col-start-2 md:row-start-1 md:text-[clamp(1.5rem,5vw,4rem)]">
          Autonomous is science-backed financial intelligence, built on three
          commitments: to understand markets, to understand you, and to
          communicate what it knows in the form each moment demands.
        </p>

        {/* Paragraph two: bottom-left on desktop */}
        <p className="text-[clamp(1.75rem,8vw,2.5rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#0a0a0a] md:col-start-1 md:row-start-2 md:text-[clamp(1.5rem,5vw,4rem)]">
          It reads the forces moving markets, holds your complete picture
          against your goals, and optimizes as your life changes. The aim is
          autonomy: to handle the complexity so completely that engaging with
          it becomes a choice, made in full confidence that Autonomous is
          always at work on your behalf.
        </p>
      </div>
    </section>
  );
};

export default SectionFive;