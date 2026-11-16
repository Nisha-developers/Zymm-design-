import { useId } from "react";

const SIZE = 270;
const C = SIZE / 2;
const STROKE = 24;
const radius = (i) => 118 - i * 26;

const DEFAULT_DATA = [
  { name: "Tech", pct: 38, fill: "solid" },
  { name: "Energy", pct: 24, fill: "gray" },
  { name: "Health", pct: 17, fill: "hatch" },
  { name: "Space", pct: 13, fill: "dots" },
  { name: "Crypto", pct: 8, fill: "hatchFine" },
];

const RadialChart = ({ data }) => {
  const uid = useId().replace(/:/g, "");
  const paint = {
    solid: "#fdfdfb",
    gray: "#8d8e89",
    hatch: `url(#${uid}-hatch)`,
    dots: `url(#${uid}-dots)`,
    hatchFine: `url(#${uid}-hatchFine)`,
  };

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-auto w-full">
      <defs>
        <pattern
          id={`${uid}-hatch`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="5" stroke="#fdfdfb" strokeWidth="1.2" />
        </pattern>
        <pattern
          id={`${uid}-hatchFine`}
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="3" stroke="#fdfdfb" strokeWidth="1" />
        </pattern>
        <pattern
          id={`${uid}-dots`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2.5" cy="2.5" r="0.9" fill="#fdfdfb" />
        </pattern>
      </defs>

      {/* faint guide rings */}
      {data.map((d, i) => (
        <circle
          key={`ring-${d.name}`}
          cx={C}
          cy={C}
          r={radius(i)}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />
      ))}

      {/* arcs */}
      {data.map((d, i) => {
        const r = radius(i);
        const circ = 2 * Math.PI * r;
        const len = circ * ((d.pct * 4) / 360);
        return (
          <circle
            key={`arc-${d.name}`}
            cx={C}
            cy={C}
            r={r}
            fill="none"
            stroke={paint[d.fill]}
            strokeWidth={STROKE}
            strokeDasharray={`${len} ${circ}`}
            transform={`rotate(-90 ${C} ${C})`}
          />
        );
      })}

      {/* labels */}
      {data.map((d, i) => (
        <text
          key={`label-${d.name}`}
          x={C - 8}
          y={C - radius(i)}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize="7.5"
          letterSpacing="0.4"
          fill="#9a9a95"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {`${d.name.toUpperCase()} ${d.pct}%`}
        </text>
      ))}
    </svg>
  );
};

const Card = ({
  chart = false,
  label,
  text,
  statLabel,
  stat,
  button,
  chartData = DEFAULT_DATA,
}) => {
  return (
    <article className="flex h-[560px] w-[80vw] max-w-[400px] shrink-0 flex-col justify-between rounded-[28px] bg-[#050505] p-6 text-white sm:h-[90vh] sm:w-[450px]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a85]">
          {label}
        </p>
        <p className="mt-5 text-[19px] font-normal leading-[1.22] tracking-[-0.02em] sm:text-[22px]">
          {text}
        </p>
      </div>

      {chart ? (
        <div className="mx-auto w-full max-w-[270px] pb-2">
          <RadialChart data={chartData} />
        </div>
      ) : (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-[#8a8a85]">
            {statLabel}
          </p>
          <p className="mt-3 text-[44px] font-normal leading-none tracking-[-0.03em]">
            {stat}
          </p>
          <button
            type="button"
            className="relative mt-6 flex h-[46px] w-full items-center justify-center rounded-full bg-[#fdfdfb] text-[13px] font-medium text-black"
          >
            {button}
            <svg
              viewBox="0 0 16 16"
              className="absolute right-5 h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
};

export default Card;