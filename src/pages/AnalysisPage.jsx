import React, { useMemo } from "react";

/* ---------- tiny inline icons (no dependencies) ---------- */
const Ico = ({ d, className = "w-4 h-4", fill = "none" }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);
const P = {
  grid: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"],
  mega: ["M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z", "M16 8a5 5 0 010 8"],
  edit: ["M4 20h4L19 9l-4-4L4 16z", "M13 7l4 4"],
  inbox: ["M4 13l2-8h12l2 8", "M4 13v6h16v-6h-5l-1 2h-4l-1-2z"],
  users: ["M9 11a3 3 0 100-6 3 3 0 000 6z", "M3 20a6 6 0 0112 0", "M17 5a3 3 0 010 6", "M18 14a5 5 0 013 6"],
  layers: ["M12 3l9 5-9 5-9-5z", "M3 13l9 5 9-5"],
  rocket: ["M5 19c0-3 1-4 3-5l-2-3 4-1c3-5 7-6 10-6 0 3-1 7-6 10l-1 4-3-2c-1 2-2 3-5 3z"],
  gear: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19 12l2-1-2-4-2 1-2-1-1-2H9L8 7 6 8 4 7l-2 4 2 1v2l-2 1 2 4 2-1 2 1 1 2h4l1-2 2-1 2 1 2-4-2-1z"],
  info: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M12 8h.01M11 12h1v4h1"],
  out: ["M9 4H5v16h4", "M16 8l4 4-4 4", "M20 12H9"],
  search: ["M11 18a7 7 0 100-14 7 7 0 000 14z", "M20 20l-4-4"],
  filter: ["M3 5h18l-7 8v6l-4-2v-4z"],
  bell: ["M6 16V11a6 6 0 0112 0v5l2 2H4z", "M10 20a2 2 0 004 0"],
  arrow: ["M7 17L17 7", "M8 7h9v9"],
  dots: ["M5 12h.01M12 12h.01M19 12h.01"],
  chev: ["M6 9l6 6 6-6"],
  up: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  target: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M12 16a4 4 0 100-8 4 4 0 000 8z", "M12 12h.01"],
  flag: ["M5 21V4", "M5 5h12l-2 4 2 4H5"],
  bulb: ["M9 18h6", "M10 21h4", "M12 3a6 6 0 00-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 00-4-10z"],
  clock: ["M12 21a9 9 0 100-18 9 9 0 000 18z", "M12 7v5l3 2"],
  plus: ["M12 5v14", "M5 12h14"],
  pause: ["M9 6v12", "M15 6v12"],
  refresh: ["M20 11a8 8 0 00-14-4L4 9", "M4 4v5h5", "M4 13a8 8 0 0014 4l2-2", "M20 20v-5h-5"],
  cal: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
  bar: ["M5 20V10", "M12 20V4", "M19 20v-7"],
  chevL: ["M15 6l-6 6 6 6"],
  chevR: ["M9 6l6 6-6 6"],
};

/* ---------- shared bits ---------- */
const Card = ({ className = "", children }) => (
  <div className={`relative rounded-2xl border border-white/[0.07] backdrop-blur-2xl ${className}`}>{children}</div>
);
const IconBtn = ({ d, className = "" }) => (
  <button className={`grid place-items-center w-8 h-8 rounded-full bg-white/[0.06] text-white/70 hover:bg-white/10 transition ${className}`}>
    <Ico d={d} className="w-3.5 h-3.5" />
  </button>
);
const Dots = () => <Ico d={P.dots} className="w-4 h-4 text-white/50" />;

/* ---------- sidebar ---------- */
const nav = [P.grid, P.mega, P.edit, P.inbox, P.users, P.layers, P.rocket];

const Sidebar = () => (
  <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[72px] flex-col items-center py-6 z-20">
    <Logo />
    <div className="mt-8 flex flex-col gap-3 items-center">
      {nav.map((d, i) => (
        <button
          key={i}
          className={`grid place-items-center w-10 h-10 rounded-xl transition ${
            i === 0 ? "bg-gradient-to-br from-brand-fuchsia via-brand-700 to-accent-orange text-white shadow-lg shadow-brand-700/30" : "text-white/50 hover:text-white hover:bg-white/5"
          }`}
        >
          <Ico d={d} className="w-[18px] h-[18px]" />
        </button>
      ))}
    </div>
    <div className="mt-auto flex flex-col gap-4 text-white/40">
      {[P.gear, P.info, P.out].map((d, i) => (
        <button key={i} className="hover:text-white"><Ico d={d} className="w-[18px] h-[18px]" /></button>
      ))}
    </div>
  </aside>
);

const Logo = () => (
  <svg viewBox="0 0 40 32" className="w-9 h-8">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--color-brand-fuchsia)" /><stop offset="1" stopColor="var(--color-brand-600)" />
      </linearGradient>
    </defs>
    <path d="M2 30L12 2h6L9 30z" fill="url(#lg)" />
    <path d="M16 30L26 2h6l-10 28z" fill="url(#lg)" opacity=".85" />
    <path d="M28 30l4-12 6 12z" fill="url(#lg)" opacity=".7" />
  </svg>
);

const MobileNav = () => (
  <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 flex justify-around items-center px-3 py-2 bg-surface-2/95 backdrop-blur border-t border-white/10">
    {nav.slice(0, 5).map((d, i) => (
      <button key={i} className={`grid place-items-center w-11 h-11 rounded-xl ${i === 0 ? "bg-gradient-to-br from-brand-fuchsia to-accent-orange text-white" : "text-white/50"}`}>
        <Ico d={d} className="w-5 h-5" />
      </button>
    ))}
  </nav>
);

/* ---------- top bar ---------- */
const TopBar = () => (
  <header className="flex items-center gap-3">
    <div className="lg:hidden"><Logo /></div>
    <div className="flex items-center gap-2 flex-1 max-w-[280px] h-10 rounded-xl bg-white/[0.05] border border-white/[0.06] px-3 text-white/40 text-xs">
      <Ico d={P.search} className="w-4 h-4 shrink-0" />
      <span className="truncate">search email or domain</span>
      <span className="ml-auto hidden sm:inline text-white/50">⌘ /</span>
    </div>
    <button className="hidden sm:flex items-center gap-2 h-10 px-3 rounded-xl bg-white/[0.05] border border-white/[0.06] text-xs text-white/60">
      <Ico d={P.filter} className="w-3.5 h-3.5" /> Filter
    </button>
    <div className="ml-auto flex items-center gap-2 sm:gap-3">
      <button className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full bg-white/[0.06] text-xs text-white/70">
        🇺🇸 Eng <Ico d={P.chev} className="w-3 h-3" />
      </button>
      <IconBtn d={P.bell} className="rounded-xl w-9 h-9" />
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[repeating-linear-gradient(0deg,#e5e7eb_0_2px,#6b7280_2px_4px)] ring-2 ring-white/20" />
        <div className="hidden md:block leading-tight">
          <p className="text-xs font-semibold text-white">Opedia Studio</p>
          <p className="text-[10px] text-white/40">ID: 583894</p>
        </div>
      </div>
    </div>
  </header>
);

/* ---------- stat cards ---------- */
const Stat = ({ icon, label, value, delta, note, tags, gradient }) => (
  <Card className={`p-4 ${gradient? 'bg-dashboard-gradient': ''} `}>
    <div className="flex items-center gap-2 text-[11px]  text-white/70">
      <Ico d={icon} className="w-3.5 h-3.5" />
      <span>{label}</span>
      <span className="ml-auto"><Dots /></span>
    </div>
    <div className="mt-3 flex items-baseline gap-2 flex-wrap">
      <span className="text-3xl font-semibold tracking-tight text-white">{value}</span>
      <span className={`text-[10px] ${delta.startsWith("-") ? "text-negative" : "text-positive"}`}>
        {delta.startsWith("-") ? "↘" : "↗"} {delta} <span className="text-white/40">{note}</span>
      </span>
    </div>
    <div className="mt-4 flex gap-3 text-[10px] text-white/40">
      {tags.map((t) => <span key={t}>{t}</span>)}
    </div>
  </Card>
);

/* ---------- ROI trend ---------- */
const RoiTrend = () => (
  <Card className="p-5 bg-dashboard-gradient from-roi-a/70 via-roi-b to-surface overflow-hidden">
    <div className="flex items-start justify-between flex-wrap gap-2">
      <h3 className="text-sm font-medium text-white">Return on Investment Trend</h3>
      <div className="flex gap-5 text-[10px] text-white/50">
        <span>● Invest (Remaining $0.5K) <b className="text-white text-xs ml-1">$3K</b> <span className="text-negative">↘ -5%</span></span>
        <span>● Return <b className="text-white text-xs ml-1">$15K</b> <span className="text-positive">↗ +97%</span></span>
      </div>
    </div>
    <div className="mt-4 flex flex-col sm:flex-row gap-4">
      <div className="sm:w-28 shrink-0 flex sm:flex-col gap-4 sm:gap-8 sm:justify-between">
        <div>
          <p className="text-[11px] text-white/50">Revenue</p>
          <p className="text-xl font-semibold text-white">$12,000</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-white">+156%</p>
          <p className="text-[9px] text-white/40 leading-tight max-w-[110px]">Your campaigns generated 156% return on investment</p>
        </div>
      </div>
      <div className="flex-1 relative min-h-[170px]">
        <svg viewBox="0 0 420 180" className="w-full h-full">
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-brand-400)" strokeWidth="2" opacity=".6" />
            </pattern>
          </defs>
          {["$20K", "$15K", "$10K", "$5K", "$1K"].map((l, i) => (
            <g key={l}>
              <text x="410" y={20 + i * 35} fontSize="8" fill="#ffffff55" textAnchor="end">{l}</text>
              <line x1="0" x2="385" y1={16 + i * 35} y2={16 + i * 35} stroke="#ffffff0d" />
            </g>
          ))}
          <path d="M10 110 L70 100 L140 92 L210 78 L280 86 L340 98 L385 104 L385 140 L340 130 L280 124 L210 134 L140 130 L70 125 L10 128 Z" fill="url(#hatch)" />
          <path d="M10 110 L70 100 L140 92 L210 78 L280 86 L340 98 L385 104 M10 128 L70 125 L140 130 L210 134 L280 124 L340 130 L385 140" stroke="var(--color-brand-300)" strokeWidth="1" fill="none" />
          {[[70,100],[140,92],[210,78],[280,86],[340,98]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#fff" />)}
          <line x1="210" y1="78" x2="210" y2="165" stroke="#ffffff40" />
          <rect x="182" y="96" width="56" height="22" rx="7" fill="var(--color-brand-700)" />
          <rect x="182" y="96" width="56" height="22" rx="7" fill="var(--color-accent-orange)" opacity=".35" />
          <text x="210" y="111" fontSize="10" fontWeight="600" fill="#fff" textAnchor="middle">$11,500</text>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
            <text key={m} x={20 + i * 70} y="176" fontSize="8" fill={m === "Apr" ? "var(--color-brand-300)" : "#ffffff66"} textAnchor="middle">{m}</text>
          ))}
        </svg>
      </div>
    </div>
  </Card>
);

/* ---------- geographic reach ---------- */
const pins = [
  { f: "🇬🇧", c: "UK", n: "87,009", x: 25, y: 12 },
  { f: "🇺🇸", c: "USA", n: "91,103", x: 75, y: 25 },
  { f: "🇵🇱", c: "Poland", n: "52,103", x: 8, y: 35 },
  { f: "🇩🇪", c: "Germany", n: "71,302", x: 47, y: 42 },
  { f: "🇮🇹", c: "Italy", n: "63,104", x: 22, y: 70 },
  { f: "🇫🇷", c: "France", n: "47,133", x: 58, y: 72 },
  { f: "🇨🇦", c: "Canada", n: "39", x: 92, y: 66 },
];

const DotMap = () => {
  const dots = useMemo(() => {
    let s = 7;
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const blobs = [[22, 25, 14, 12], [52, 38, 14, 14], [80, 30, 18, 14], [18, 62, 10, 10], [60, 70, 14, 10], [90, 62, 8, 12]];
    const out = [];
    blobs.forEach(([cx, cy, rx, ry]) => {
      for (let i = 0; i < 90; i++) {
        const a = r() * 6.28, d = Math.sqrt(r());
        out.push([cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d]);
      }
    });
    return out;
  }, []);
  return (
    <div className="relative h-[190px] sm:h-[210px] mt-3">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".45" fill="var(--color-muted)" opacity=".55" />)}
      </svg>
      {pins.map((p) => (
        <div key={p.c} style={{ left: `${p.x}%`, top: `${p.y}%` }} className="absolute -translate-x-1/2 flex items-center gap-1 rounded-lg bg-pin-bg/95 px-1.5 py-1 shadow-lg">
          <span className="text-sm leading-none">{p.f}</span>
          <span className="leading-none"><span className="block text-[7px] text-white/50">{p.c}</span><span className="block text-[9px] font-semibold text-white">{p.n}</span></span>
        </div>
      ))}
    </div>
  );
};

const Geo = () => (
  <Card className="p-5 flex flex-col">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-white">Geographic Reach Insights</h3>
      <IconBtn d={P.arrow} />
    </div>
    <DotMap />
    <div className="mt-auto grid grid-cols-4 gap-2 pt-3 text-[10px] text-white/50">
      <div><p>Campaign Reach</p><p className="text-white text-xs font-semibold">7 Country</p></div>
      <div><p>User Reached</p><p className="text-white text-xs font-semibold">531K</p></div>
      <div><p>Period</p><p className="text-white text-xs font-semibold">1 month</p></div>
      <button className="flex items-center justify-center gap-1 rounded-lg bg-white/[0.05] text-accent-sky text-[10px]"><Ico d={P.refresh} className="w-3 h-3" />Refresh</button>
    </div>
  </Card>
);

/* ---------- ROAS ---------- */
const Roas = () => (
  <Card className="p-5 bg-gradient-to-b from-surface-3 to-surface">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-white">Return On Ad Spend</h3>
        <p className="mt-2 text-[10px] text-white/40">ROAS = Revenue / AD Spend</p>
      </div>
      <IconBtn d={P.arrow} />
    </div>
    <div className="mt-1 flex items-end gap-2"><span className="text-4xl font-semibold text-white">4X</span><span className="mb-1 text-[10px] text-positive">↗ +17 <span className="text-white/40">Since the last month</span></span></div>
    <svg viewBox="0 0 240 80" className="mt-2 w-full h-20">
      <defs><linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--color-brand-600)" stopOpacity=".5" /><stop offset="1" stopColor="var(--color-brand-600)" stopOpacity="0" /></linearGradient></defs>
      <path d="M0 58 L25 54 L40 20 L55 52 L80 44 L100 56 L125 40 L150 50 L175 22 L190 48 L205 12 L228 6 L228 80 L0 80Z" fill="url(#rf)" />
      <path d="M0 58 L25 54 L40 20 L55 52 L80 44 L100 56 L125 40 L150 50 L175 22 L190 48 L205 12 L228 6" fill="none" stroke="var(--color-brand-600)" strokeWidth="1.5" />
      <circle cx="228" cy="6" r="3" fill="#fff" />
      <text x="238" y="10" fontSize="7" fill="#ffffff80" textAnchor="end">$12K</text>
      <text x="2" y="74" fontSize="7" fill="#ffffff66">$3K</text>
    </svg>
  </Card>
);

/* ---------- actionable insights ---------- */
const Insight = ({ icon, tag, text, action, tone = "bg-white/[0.04]" }) => (
  <div className={`rounded-xl ${tone} p-3`}>
    <div className="flex items-start justify-between">
      <span className="grid place-items-center w-7 h-7 rounded-lg bg-white/[0.06] text-white/70"><Ico d={icon} className="w-3.5 h-3.5" /></span>
      <Dots />
    </div>
    <p className="mt-2 text-[10px] font-bold tracking-wide text-white">{tag}</p>
    <p className="mt-1 text-[10px] leading-snug text-white/50">{text}</p>
    {action && (
      <button className="mt-3 flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1 text-[9px] text-accent-sky">
        {action} <Ico d={action === "Add Budget" ? P.plus : P.arrow} className="w-2.5 h-2.5" />
      </button>
    )}
  </div>
);

const Insights = () => (
  <Card className="p-4">
    <div className="flex items-center gap-2 text-white"><Ico d={P.target} className="w-5 h-5 text-white/80" /><h3 className="text-sm font-medium">Actionable Insights</h3></div>
    <div className="mt-3 space-y-2.5">
      <Insight icon={P.flag} tag="HIGH PRIORITY" text="Facebook: Ad spend reached 95% of budget — campaigns will pause soon." action="Add Budget" />
      <Insight icon={P.bulb} tag="OPPORTUNITY" text="LinkedIn: Conversion rate is 35% above target — test new audience lookalikes." action="View Campaign" />
      <Insight icon={P.clock} tag="REMINDER" text="Q3 Campaign Planning starts next week —" />
    </div>
  </Card>
);

/* ---------- top performing campaign ---------- */
const Camp = ({ net, title, badge, rank, left, total, active }) => (
  <div className="min-w-[220px] flex-1 rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
    <div className="flex items-center justify-between text-[10px] text-white/60">
      <span className="flex items-center gap-1.5"><span className="grid place-items-center w-4 h-4 rounded bg-sky-600 text-[8px] text-white">{net}</span>{badge}</span>
      {active && <span className="text-positive">• Active</span>}
    </div>
    <div className="mt-1 flex items-start justify-between">
      <p className="text-xs font-medium text-white leading-tight max-w-[110px]">{title}</p>
      <span className="text-[9px] text-accent-orange">🔥 #{rank}</span>
    </div>
    <div className="mt-2 flex gap-4 text-[9px] text-white/40"><span>10K Leads</span><span>61% Conversion</span><span>154% ROI</span></div>
    <p className="mt-2 text-[9px] text-white/40">Remaining Budget ${left} of ${total}</p>
    <div className="mt-1 h-1 rounded-full bg-white/10"><div className="h-1 rounded-full bg-dashboard-gradient" style={{ width: `${(left / total) * 100 * 3}%`, maxWidth: "100%" }} /></div>
    <div className="mt-3 flex gap-2">
      <button className="flex items-center gap-1 rounded-md bg-white/[0.06] px-2.5 py-1 text-[9px] text-white/70"><Ico d={P.pause} className="w-2.5 h-2.5" />Pause</button>
      <button className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-[9px] text-white">Add Budget <Ico d={P.plus} className="w-2.5 h-2.5" /></button>
    </div>
  </div>
);

const TopCampaign = () => (
  <Card className="p-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-white">Top Performing Campaign <span className="text-[9px] text-white/40">⑤</span></h3>
      <div className="flex gap-1.5"><IconBtn d={P.chevL} className="w-6 h-6" /><IconBtn d={P.chevR} className="w-6 h-6" /></div>
    </div>
    <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
      <Camp net="in" badge="LinkedIn" title="Brand Visibility - Winter 2024" rank="01" left={300} total={1000} active />
      <Camp net="X" badge="Twitter" title="Black Friday Offer" rank="02" left={300} total={1000} />
    </div>
  </Card>
);

/* ---------- audience exposure ---------- */
const Audience = () => (
  <Card className="p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-white">Audience Exposure</h3>
      <IconBtn d={P.arrow} />
    </div>
    <div className="mt-3 flex items-center justify-between gap-3">
      <div>
        <p className="text-3xl font-semibold text-white">531K <span className="text-xs font-normal text-white/50">(Total)</span></p>
        <p className="mt-1 text-[10px] text-positive">↗ 11.3% <span className="text-white/40">Since the last week</span></p>
        <ul className="mt-4 space-y-1 text-[10px] text-white/50">
          <li><span className="text-accent-sky">•</span> 35% (LinkedIn)</li>
          <li><span className="text-accent-pink">•</span> 25% (Instagram)</li>
          <li><span className="text-accent-orange">•</span> 27% (Twitter)</li>
        </ul>
      </div>
      <div className="relative w-24 h-24 shrink-0">
        <svg viewBox="0 0 100 100" className="-rotate-90 w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff12" strokeWidth="8" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-brand-500)" strokeWidth="8" strokeLinecap="round" strokeDasharray="95 251" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-accent-orange)" strokeWidth="8" strokeLinecap="round" strokeDasharray="60 251" strokeDashoffset="-170" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-accent-sky)" strokeWidth="8" strokeLinecap="round" strokeDasharray="40 251" strokeDashoffset="-110" />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div><p className="text-sm font-semibold text-white leading-none">13%</p><p className="text-[8px] text-white/50">New Audience</p></div>
        </div>
      </div>
    </div>
  </Card>
);

/* ---------- conversion funnel ---------- */
const Funnel = () => (
  <Card className="p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-white">Conversion Funnel</h3>
      <IconBtn d={P.arrow} />
    </div>
    <div className="mt-3 grid place-items-center">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-600/10 to-transparent border border-white/5" />
        <div className="absolute inset-x-6 bottom-0 top-8 rounded-full bg-gradient-to-b from-brand-600/20 to-brand-600/5 border border-white/10" />
        <div className="absolute inset-x-12 bottom-0 top-[72px] rounded-full bg-gradient-to-b from-brand-700/40 to-brand-600/20 border border-white/10" />
        <div className="absolute inset-x-[58px] bottom-0 top-[104px] rounded-full bg-gradient-to-b from-brand-400/60 to-brand-600/40 border border-white/20" />
        <span className="absolute top-3 inset-x-0 text-center text-[8px] text-white/60">Reach 50K</span>
        <span className="absolute top-[44px] inset-x-0 text-center text-[8px] text-white/70">Click 68%</span>
        <span className="absolute top-[82px] inset-x-0 text-center text-[8px] text-white/80">Leads 31%</span>
        <span className="absolute bottom-3 inset-x-0 text-center text-[8px] text-white leading-tight">Convert<br />68%</span>
      </div>
    </div>
  </Card>
);

/* ---------- page ---------- */
export default function AnalysisPage(){
  return (
    <div className="min-h-screen bg-void text-white font-sans antialiased relative overflow-x-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-700/20 blur-[120px]" />
      <Sidebar />
      <MobileNav />

      <main className="relative lg:pl-[88px] px-4 sm:px-6 lg:pr-6 pt-5 pb-24 lg:pb-8 w-full mx-auto">
        <TopBar />

        {/* welcome + actions */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
              Welcome back, Opedia Studio.
            </h1>
            <p className="text-xs text-white/50 mt-1">Here's how your campaigns are performing today!</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white/[0.06] text-xs text-white/70">Monthly <Ico d={P.chev} className="w-3 h-3" /></button>
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white/[0.06] text-xs text-white/70">Export <Ico d={P.arrow} className="w-3 h-3" /></button>
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white shadow-lg shadow-blue-600/30 transition">
              Create New Campaign <Ico d={P.plus} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* main grid */}
        <div className="mt-5 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
          <div className="space-y-4 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat gradient icon={P.mega} label="Total Campaigns" value="17" delta="-3" note="vs last month" tags={["LinkedIn", "Twitter", "Instagram"]} />
              <Stat icon={P.users} label="Total Leads" value="167K" delta="+7%" note="vs last month" tags={["LinkedIn", "Twitter", "Instagram"]} />
              <Stat icon={P.target} label="Conversions Rate" value="6.8%" delta="+2.5%" note="vs last month" tags={["LinkedIn", "Twitter", "Instagram"]} />
              <Stat icon={P.bar} label="Average ROI" value="56%" delta="+9.7%" note="vs last month" tags={["LinkedIn", "Twitter", "Instagram"]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4">
              <RoiTrend />
              <Geo />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-4">
              <TopCampaign />
              <Audience />
              <Funnel />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:grid-rows-[auto_1fr] gap-4 content-start">
            <Roas />
            <Insights />
          </div>
        </div>
      </main>
    </div>
  );
}