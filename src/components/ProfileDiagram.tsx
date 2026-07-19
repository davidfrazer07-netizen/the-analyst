"use client";

// Direct port of Tara-iOS's ProfileDiagram.swift: same level arrays, same
// cycle-band/sweep-line/price-path geometry, redrawn as SVG instead of
// SwiftUI Canvas/Shape.

export type ProfileSide = "bull" | "bear";

export function profileLevels(num: number, side: ProfileSide): number[] {
  const bull = side === "bull";
  switch (num) {
    case 1:
      return bull
        ? [0.6, 0.45, 0.3, 0.4, 0.55, 0.66, 0.78, 0.9, 0.96]
        : [0.4, 0.55, 0.7, 0.6, 0.45, 0.34, 0.22, 0.1, 0.04];
    case 2:
      return bull
        ? [0.55, 0.5, 0.58, 0.5, 0.45, 0.3, 0.44, 0.66, 0.85, 0.96]
        : [0.45, 0.5, 0.42, 0.5, 0.55, 0.7, 0.56, 0.34, 0.15, 0.04];
    default:
      return bull
        ? [0.72, 0.62, 0.5, 0.4, 0.28, 0.2, 0.46, 0.74, 0.96]
        : [0.28, 0.38, 0.5, 0.6, 0.72, 0.8, 0.54, 0.26, 0.04];
  }
}

const W = 300;
const H = 128;
const PAD = 10;
const CW = W - PAD * 2;
const CH = H - PAD * 2;

export default function ProfileDiagram({
  num,
  side,
  windows,
}: {
  num: number;
  side: ProfileSide;
  windows: string[];
}) {
  const edge = side === "bear" ? "var(--bear)" : "var(--bull)";
  const levels = profileLevels(num, side);
  const n = levels.length;

  const sweepIndex =
    side === "bull"
      ? levels.indexOf(Math.min(...levels))
      : levels.indexOf(Math.max(...levels));

  const px = (i: number) => PAD + (i / (n - 1)) * CW;
  const py = (lv: number) => PAD + (1 - lv) * CH;

  const sx = px(sweepIndex);
  const sy = py(levels[sweepIndex]);

  const pathD = levels.map((lv, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(lv)}`).join(" ");

  const bandW = CW / 3;

  return (
    <div className="flex flex-col gap-1.5">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={128} className="block">
        <rect x={0} y={0} width={W} height={H} rx={12} fill="var(--bg2)" fillOpacity={0.7} />
        <rect x={0.5} y={0.5} width={W - 1} height={H - 1} rx={12} fill="none" stroke={edge} strokeOpacity={0.45} />

        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={PAD + i * bandW}
            y={PAD}
            width={bandW}
            height={CH}
            fill={edge}
            fillOpacity={i === 1 ? 0.1 : 0.05}
          />
        ))}

        <line
          x1={PAD + bandW}
          y1={PAD}
          x2={PAD + bandW}
          y2={PAD + CH}
          stroke={edge}
          strokeOpacity={0.22}
          strokeDasharray="3,3"
        />
        <line
          x1={PAD + 2 * bandW}
          y1={PAD}
          x2={PAD + 2 * bandW}
          y2={PAD + CH}
          stroke={edge}
          strokeOpacity={0.22}
          strokeDasharray="3,3"
        />

        <line x1={PAD} y1={sy} x2={PAD + CW} y2={sy} stroke={edge} strokeOpacity={0.6} strokeDasharray="5,4" />

        <path
          d={pathD}
          fill="none"
          stroke="var(--text)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
        />

        <circle cx={sx} cy={sy} r={4.5} fill={edge} style={{ filter: `drop-shadow(0 0 5px ${edge})` }} />
        <text
          x={Math.min(Math.max(sx, 26), W - 26)}
          y={Math.max(sy - 12, 10)}
          textAnchor="middle"
          fontSize={8}
          fontWeight={700}
          fill={edge}
        >
          SWEEP
        </text>
      </svg>

      <div className="flex">
        {windows.slice(0, 3).map((w, i) => (
          <span key={i} className="flex-1 text-center text-[10px] font-semibold text-muted">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
