function HoleCircle({ cx, cy, value, r = 6 }) {
  const id = `half-${cx}-${cy}`;

  if (value === 1) {
    return <circle cx={cx} cy={cy} r={r} fill="var(--fg)" stroke="var(--fg)" strokeWidth="1.5" />;
  }

  if (value === 0) {
    return <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg)" strokeWidth="1.5" />;
  }

  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect x={cx - r} y={cy - r} width={r} height={r * 2} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="var(--fg)" clipPath={`url(#${id})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--fg)" strokeWidth="1.5" />
    </>
  );
}

export default function FingeringDiagram({ fingering, compact = false }) {
  const is7 = fingering.length === 7;

  if (compact) {
    const r = 4;
    const gap = is7 ? 12 : 16;
    const count = fingering.length;
    const w = gap * (count - 1) + r * 2;
    const h = r * 2 + 2;
    const cy = h / 2;

    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="fingering-compact">
        <HoleCircle cx={r} cy={cy} value={fingering[0]} r={r} />
        <line x1={r * 2 + 2} y1={0} x2={r * 2 + 2} y2={h} stroke="var(--fg)" strokeWidth="1" opacity="0.35" />
        {fingering.slice(1).map((val, i) => (
          <HoleCircle key={i} cx={gap * (i + 1) + r} cy={cy} value={val} r={r} />
        ))}
      </svg>
    );
  }

  if (is7) {
    const [thumb, h1, h6, h2, h3, h4, h5] = fingering;
    const W = 48;
    const H = 152;
    const cx = W / 2 + 4;
    const tubeW = 16;
    const tubeX = cx - tubeW / 2;
    const thumbX = tubeX - 6;
    const thumbY = 26;
    const frontYs = [24, 40, 56, 74, 92, 108];
    const frontVals = [h1, h6, h2, h3, h4, h5];
    const extraR = 5;

    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="fingering-diagram">
        <rect x={tubeX} y={8} width={tubeW} height={H - 16} rx={4} fill="var(--tube-fill)" stroke="var(--fg)" strokeWidth="1" />
        <rect x={tubeX + 3} y={5} width={tubeW - 6} height={6} rx={2} fill="var(--gray-500)" />
        <rect x={tubeX - 1} y={H - 14} width={tubeW + 2} height={8} rx={3} fill="var(--gray-300)" />
        <HoleCircle cx={thumbX} cy={thumbY} value={thumb} r={5} />
        {frontVals.map((val, i) => (
          <HoleCircle
            key={i}
            cx={cx}
            cy={frontYs[i]}
            value={val}
            r={(i === 1 || i === 5) ? extraR : 6}
          />
        ))}
      </svg>
    );
  }

  const [thumb, h1, h2, h3, h4] = fingering;
  const W = 48;
  const H = 130;
  const cx = W / 2 + 4;
  const tubeW = 16;
  const tubeX = cx - tubeW / 2;
  const thumbX = tubeX - 6;
  const thumbY = 32;
  const holeYs = [30, 50, 70, 90];

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="fingering-diagram">
      <rect x={tubeX} y={8} width={tubeW} height={H - 16} rx={4} fill="var(--tube-fill)" stroke="var(--fg)" strokeWidth="1" />
      <rect x={tubeX + 3} y={5} width={tubeW - 6} height={6} rx={2} fill="var(--gray-500)" />
      <rect x={tubeX - 1} y={H - 14} width={tubeW + 2} height={8} rx={3} fill="var(--gray-300)" />
      <HoleCircle cx={thumbX} cy={thumbY} value={thumb} r={5} />
      <HoleCircle cx={cx} cy={holeYs[0]} value={h1} />
      <HoleCircle cx={cx} cy={holeYs[1]} value={h2} />
      <HoleCircle cx={cx} cy={holeYs[2]} value={h3} />
      <HoleCircle cx={cx} cy={holeYs[3]} value={h4} />
    </svg>
  );
}
