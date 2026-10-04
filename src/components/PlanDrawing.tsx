// A floor plan that draws itself as `progress` (0–100) rises. Each stroke is
// a dash-offset line (pathLength=1), grouped so walls go up first, then
// partitions, doors/windows, furniture and finally dimension lines.

type Group = { from: number; to: number; paths: string[] };

const GROUPS: Group[] = [
  {
    // outer walls, drawn as a double line for wall thickness
    from: 0,
    to: 30,
    paths: ["M40 40 H760 V440 H40 Z", "M52 52 H748 V428 H52 Z"],
  },
  {
    // interior partitions (gaps are the door openings)
    from: 22,
    to: 52,
    paths: [
      "M300 52 V240",
      "M300 310 V428",
      "M52 250 H170",
      "M230 250 H300",
      "M520 52 V190",
      "M520 250 V428",
      "M520 190 H600",
      "M660 190 H748",
    ],
  },
  {
    // door swings + windows
    from: 46,
    to: 72,
    paths: [
      "M170 250 V190 M170 190 A60 60 0 0 1 230 250",
      "M300 310 H370 M370 310 A70 70 0 0 0 300 240",
      "M520 250 H460 M460 250 A60 60 0 0 1 520 190",
      "M600 190 V250 M600 250 A60 60 0 0 0 660 190",
      "M360 40 H460 V52 H360 Z M360 46 H460",
      "M748 280 V380 H760 V280 Z M754 280 V380",
      "M120 428 H220 V440 H120 Z M120 434 H220",
      "M40 90 V170 H52 V90 Z M46 90 V170",
    ],
  },
  {
    // furniture
    from: 58,
    to: 90,
    paths: [
      "M80 80 H200 V210 H80 Z M90 90 H130 V120 H90 Z M150 90 H190 V120 H150 Z M210 80 H240 V110 H210 Z",
      "M320 70 H500 V100 H320 Z M390 76 H430 V94 H390 Z M340 150 H480 V190 H340 Z",
      "M560 70 H700 V170 H560 Z M560 82.5 H700 M560 95 H700 M560 107.5 H700 M560 120 H700 M560 132.5 H700 M560 145 H700 M560 157.5 H700",
      "M70 380 H190 V420 H70 Z M240 370 H260 V400 H240 Z M105 282 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0",
      "M350 320 H470 V380 H350 Z M365 300 H385 V314 H365 Z M435 300 H455 V314 H435 Z M365 386 H385 V400 H365 Z M435 386 H455 V400 H435 Z",
      "M560 380 H720 V420 H560 Z M610 330 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0",
    ],
  },
  {
    // dimension lines
    from: 78,
    to: 96,
    paths: [
      "M40 462 H760 M40 454 V470 M300 454 V470 M520 454 V470 M760 454 V470",
      "M16 40 V440 M8 40 H24 M8 440 H24",
    ],
  },
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function PlanDrawing({
  progress,
  className = "",
}: {
  progress: number;
  className?: string;
}) {
  const done = progress >= 100;

  return (
    <svg
      viewBox="0 0 800 480"
      aria-hidden
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-colors duration-700 ${done ? "text-accent" : "text-paper/40"} ${className}`}
    >
      {/* room tint that floods in once the plan is complete */}
      <path
        d="M40 40 H760 V440 H40 Z"
        stroke="none"
        className={`transition-[fill] duration-700 ${done ? "fill-accent/15" : "fill-transparent"}`}
      />
      {GROUPS.map((g, gi) =>
        g.paths.map((d, i) => {
          const n = g.paths.length;
          const span = g.to - g.from;
          const start = g.from + (i / n) * span * 0.6;
          const t = clamp01((progress - start) / (span * 0.4));
          return (
            <path
              key={`${gi}-${i}`}
              d={d}
              pathLength={1}
              stroke="currentColor"
              strokeWidth={gi === 0 ? 2.6 : 1.8}
              strokeDasharray="1"
              strokeDashoffset={1 - t}
              style={{ opacity: t > 0 ? 1 : 0 }}
            />
          );
        })
      )}
    </svg>
  );
}
