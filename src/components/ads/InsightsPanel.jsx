import marvin from '../../assets/marvin.png';
import annia from '../../assets/annia.png';

/* ---------- helpers ---------- */
const pt = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
const arc = (cx, cy, r, from, to) => {
  const [x1, y1] = pt(cx, cy, r, from);
  const [x2, y2] = pt(cx, cy, r, to);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

const PURPLE = '#7B2BE0';
const RED = '#D9285B';
const BAR_HEIGHTS = [48, 78, 78, 90, 54, 72, 48, 84, 66, 97, 48, 97];

const RINGS = [
  { r: 84, color: '#5B14B8', start: 60, len: 180 },
  { r: 72, color: '#C2309C', start: 90, len: 180 },
  { r: 60, color: '#4535C9', start: 30, len: 200 },
  { r: 48, color: '#35A9B8', start: 250, len: 240 },
  { r: 36, color: '#1D4FE0', start: 270, len: 250 },
];

const PROGRESS = [
  { label: 'Estimated Reach (Weekly)', value: 43 },
  { label: 'Response Rate', value: 43 },
  { label: 'Application Response Rate', value: 43 },
];

/* ---------- small pieces ---------- */
function SectionTitle({ children }) {
  return <h3 className="px-1 text-[16px] font-medium leading-tight text-[#b3b7bd]">{children}</h3>;
}

function Bars({ className = '' }) {
  return (
    <svg viewBox="0 0 450 110" className={className} aria-hidden="true">
      {BAR_HEIGHTS.map((h, i) => (
        <rect key={i} x={10 + i * 36} y={104 - h} width="26" height={h} rx="13" fill={i % 2 === 0 ? PURPLE : RED} />
      ))}
    </svg>
  );
}

function Gauge() {
  const [nx, ny] = pt(50, 50, 29, 72);
  return (
    <svg viewBox="0 0 100 56" className="mx-auto block w-[96px]" aria-hidden="true">
      <path d={arc(50, 50, 38, 180, 128)} fill="none" stroke="#E5453B" strokeWidth="5" strokeLinecap="round" />
      <path d={arc(50, 50, 38, 122, 58)} fill="none" stroke="#4FB06D" strokeWidth="5" strokeLinecap="round" />
      <path d={arc(50, 50, 38, 52, 0)} fill="none" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" />
      <path d={`M50 50 L${nx.toFixed(2)} ${ny.toFixed(2)}`} stroke="#3a3f47" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="2" fill="#3a3f47" />
    </svg>
  );
}

function RingChart() {
  return (
    <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[200px]" role="img" aria-label="98% Browser">
      <circle cx="100" cy="100" r="95" fill="none" stroke="#ececec" strokeWidth="8" />
      {RINGS.map(({ r, color, start, len }) => {
        const c = 2 * Math.PI * r;
        return (
          <g key={r}>
            <circle cx="100" cy="100" r={r} fill="none" stroke="#ececec" strokeWidth="7" />
            <circle
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${(len / 360) * c} ${c}`}
              transform={`rotate(${start - 90} 100 100)`}
            />
          </g>
        );
      })}
      <text x="100" y="101" textAnchor="middle" fontSize="23" fontWeight="600" fill="#111">98%</text>
      <text x="100" y="121" textAnchor="middle" fontSize="14" fill="#333">Browser</text>
    </svg>
  );
}

const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="#111" />
  </svg>
);

const card = 'rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]';

/* ---------- panel ---------- */
export default function InsightsPanel() {
  return (
    <aside className="flex flex-col gap-4 bg-[#f4f4f4] p-3 font-[Roboto,Helvetica,Arial,sans-serif] md:w-[330px] md:shrink-0 md:rounded-t-[10px]">
      {/* 1. Search quality / potential reach */}
      <SectionTitle>Estimated Campaign Results</SectionTitle>
      <div className={`${card} overflow-hidden`}>
        <div className="flex">
          <div className="flex-1 px-3 pb-3 pt-4 text-center">
            <p className="text-[13px] font-semibold text-[#111]">Search Quality</p>
            <div className="mt-3">
              <Gauge />
              <div className="mt-1 flex justify-between text-[10px] text-[#777]">
                <span>Specific</span>
                <span>Broad</span>
              </div>
            </div>
          </div>
          <div className="my-3 w-px bg-[#d9d9d9]" />
          <div className="flex-1 px-3 pb-3 pt-4 text-center">
            <p className="text-[13px] font-semibold text-[#111]">Potential Reach</p>
            <p className="mt-3 bg-gradient-to-r from-[#5B7CF5] via-[#A06BF0] to-[#F0A5FF] bg-clip-text font-mono text-[32px] font-bold leading-none tracking-[0.04em] text-transparent">
              76,000
            </p>
            <p className="mt-2 text-left text-[11px] text-[#222]">Listings</p>
          </div>
        </div>
        <div className="border-t border-[#e3e3e3] px-3 py-[10px] text-[11px] text-[#111]">
          Potential reach: 35,000 Job Listings
        </div>
      </div>

      {/* 2. Bars + progress */}
      <SectionTitle>Estimated Campaign Results</SectionTitle>
      <div className="rounded-[4px] bg-white px-3 py-3">
        <Bars className="mx-auto block w-full max-w-[250px]" />
      </div>
      <div className="flex flex-col gap-3 px-1">
        {PROGRESS.map(({ label, value }) => (
          <div key={label}>
            <p className="mb-[5px] text-[11px] text-[#aeb2b8]">{label}</p>
            <div className="h-[22px] w-full rounded-full bg-[#141a22]" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-gradient-to-r from-[#00F58D] to-[#00D6F5]" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Ring chart card */}
      <SectionTitle>Estimated Campaign Results</SectionTitle>
      <div className={`${card} p-4`}>
        <div className="flex items-center gap-3">
          <img src={annia} alt="" className="h-[44px] w-[44px] shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[17px] font-medium leading-tight text-[#111]">Annia</p>
            <p className="text-[12px] leading-tight text-[#9aa0a6]">Marketing Coordinator</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] leading-none text-[#1c6b7a]">34.56</p>
            <svg width="52" height="18" viewBox="0 0 52 18" fill="none" aria-hidden="true">
              <path d="M1 14 C5 9 7 16 11 11 S17 12 21 8 S29 11 33 6 S41 9 51 3" stroke="#1c6b7a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <p className="mt-5 text-[12px] text-[#444]">January, 2018</p>
        <div className="mt-1 flex items-center gap-2">
          <TargetIcon />
          <h4 className="text-[19px] font-semibold leading-tight text-[#111]">Browser market shares</h4>
        </div>

        <div className="mt-5">
          <RingChart />
        </div>

        <button
          type="button"
          className="mt-6 h-[34px] w-full cursor-pointer rounded-[3px] bg-[#5B12B8] text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#4c0fa0]"
        >
          Another action
        </button>
      </div>

      {/* 4. Personal diagnostics card */}
      <div className={`${card} px-4 pb-6 pt-5`}>
        <div className="flex items-center justify-between">
          <h4 className="text-[18px] font-bold text-[#111]">Personal Diagnostics</h4>
          <button type="button" aria-label="Settings" className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full bg-[#f0f0f0]">
            <GearIcon />
          </button>
        </div>

        <img src={marvin} alt="Marvin McKinney" className="mx-auto mt-7 block h-[112px] w-[112px]" />
        <p className="mt-3 text-center text-[17px] font-semibold text-[#111]">Marvin McKinney</p>
        <p className="mt-1 text-center text-[13px] tracking-[0.03em] text-[#8a9099]">Scrum Master</p>

        <p className="mt-7 text-center text-[56px] font-black leading-none text-[#111]">8K</p>
        <p className="mx-auto mt-3 max-w-[170px] text-center text-[14px] leading-[20px] text-[#111]">263 contributions in the last year</p>

        <Bars className="mx-auto mt-5 block w-full max-w-[250px]" />
      </div>
    </aside>
  );
}
