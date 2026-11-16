import { useEffect, useRef } from "react";
import Card from "./Card";
import InfoCard from "./InfoCard";
import ScrollImage from "./ScrollImage";
import MyImage from '../../assets/autonomous-ui-3.jpg'
const EASE = 0.1; // lower = smoother/slower

const CARDS = [
  // ---- left (stat design) ----
  {
    chart: false,
    label: "Wire now · 2 hrs ago",
    text: "The Prometheus SPV closes Friday. John sent wire instructions this morning for your $150,000 commitment. The details match your subscription agreement.",
    statLabel: "Discussed stake",
    stat: "$150K",
    button: "Review wire",
  },
  {
    chart: false,
    label: "Insurance · Yesterday",
    text: "Your umbrella policy renews next month. I compared three quotes and found the same coverage for less.",
    statLabel: "Annual savings",
    stat: "$1.2K",
    button: "Review quotes",
  },
  {
    chart: false,
    label: "Estate · 3 days ago",
    text: "Your trust documents were last updated in 2021. I flagged two beneficiaries that no longer match your wishes.",
    statLabel: "Trust assets",
    stat: "$4.8M",
    button: "Review trust",
  },
  {
    chart: false,
    label: "Real estate · This week",
    text: "Your Austin rental is due for a rent review. Comparable units nearby now lease for more than you charge.",
    statLabel: "Monthly upside",
    stat: "$420",
    button: "Review lease",
  },

  // ---- middle (chart design) ----
  {
    chart: true,
    label: "Rebalance · 2 hrs ago",
    text: "I've rebalanced your Autonomous Index. Tech ran ahead of your target weight, so I trimmed it back and harvested $21,200 in offsetting losses on the way.",
  },
  {
    chart: true,
    label: "Allocation · This week",
    text: "Your private holdings now sit above your target. I mapped where new capital should go next to bring things back in line.",
    chartData: [
      { name: "Private", pct: 34, fill: "solid" },
      { name: "Equity", pct: 28, fill: "gray" },
      { name: "Bonds", pct: 18, fill: "hatch" },
      { name: "Cash", pct: 12, fill: "dots" },
      { name: "Gold", pct: 8, fill: "hatchFine" },
    ],
  },
  {
    chart: true,
    label: "Risk · Today",
    text: "Your exposure to a single sector rose after last week's rally. Here is how your portfolio is spread right now.",
    chartData: [
      { name: "AI", pct: 36, fill: "solid" },
      { name: "Banks", pct: 22, fill: "gray" },
      { name: "Retail", pct: 19, fill: "hatch" },
      { name: "Energy", pct: 14, fill: "dots" },
      { name: "Other", pct: 9, fill: "hatchFine" },
    ],
  },

  // ---- right (stat design) ----
  {
    chart: false,
    label: "Q2 tax estimate · Today",
    text: "Your taxes are due in 30 days. I've drafted an email to your accountant with a summary of our last tax conversation and the relevant trades attached.",
    statLabel: "Estimated 2026 taxes",
    stat: "$264K",
    button: "Review email",
  },
  {
    chart: false,
    label: "Cash · This morning",
    text: "You're holding more cash than you need. I moved the excess into your Treasury ladder.",
    statLabel: "Moved",
    stat: "$85K",
    button: "Review transfer",
  },
  {
    chart: false,
    label: "Capital call · In 5 days",
    text: "A capital call of 12% is due on your Series B fund. The funds are ready in your reserve account.",
    statLabel: "Due",
    stat: "$36K",
    button: "Review call",
  },
  {
    chart: false,
    label: "College fund · Today",
    text: "Your 529 is on track for Maya's first year. I suggest raising monthly contributions slightly.",
    statLabel: "On track",
    stat: "92%",
    button: "Review plan",
  },
  {
    chart: false,
    label: "Stock options · Next month",
    text: "Your options vest on the 15th. Exercising now keeps you under the AMT threshold.",
    statLabel: "Vesting",
    stat: "$58K",
    button: "Review options",
  },
];
  const SECORDCard = [
  "The foundation is a secure financial vault that monitors your assets.",
  "Autonomous builds an understanding of you, your family and goals.",
];

const SectionFour = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let target = 0;
    let current = 0;
    let raf = null;

    const apply = () => {
      track.style.transform = `translate3d(${current}px, 0, 0)`;
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.1) current = target;
      apply();
      raf = current !== target ? requestAnimationFrame(tick) : null;
    };

    const onScroll = () => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      // 0 when the section enters at the bottom, 1 when it leaves at the top
      const progress = Math.min(
        Math.max((vh - rect.top) / (vh + rect.height), 0),
        1
      );
      const maxShift = Math.max(track.scrollWidth - section.clientWidth, 0);
      // scroll down -> cards move left, scroll up -> cards move right
      target = -progress * maxShift;
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
      className="w-full overflow-hidden bg-[#eeeff1] pb-2 md:pb-4 pt-34"
    >
      <div ref={trackRef} className="flex w-max gap-3.5 px-3 will-change-transform">
        {CARDS.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>
       <div className="mt-20 grid grid-cols-1 gap-4 md-gap-1 px-1 md:grid-cols-2 sm:gap-2 md:mt-35 md:px-3 mb-4">
        {SECORDCard.map((text) => (
          <InfoCard key={text} text={text} />
        ))}
      </div>
       <ScrollImage
      src={MyImage}
      second
      alt="Future net worth projection shown on the Autonomous app"
    />
    </section>
  );
};

export default SectionFour;