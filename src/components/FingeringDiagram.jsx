function HoleCircle({ cx, cy, value, r = 6 }) {
  const id = `half-${cx}-${cy}`;

  if (value === 1) {
    return <circle cx={cx} cy={cy} r={r} fill="#000" stroke="#000" strokeWidth="1.5" />;
  }

  if (value === 0) {
    return <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeWidth="1.5" />;
  }

  return (
    <>
      <defs>
        <clipPath id={id}>
          <rect x={cx - r} y={cy - r} width={r} height={r * 2} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="#000" clipPath={`url(#${id})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeWidth="1.5" />
    </>
  );
}

export default function FingeringDiagram({ fingering, compact = false }) {
  const [thumb, h1, h2, h3, h4] = fingering;

  if (compact) {
    const size = 14;
    const gap = 16;
    const r = 5;
    const w = gap * 4 + size;
    const h = size;
    const cy = h / 2;

    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="fingering-compact">
        <HoleCircle cx={r} cy={cy} value={thumb} r={r - 1} />
        <line x1={r * 2 + 2} y1={0} x2={r * 2 + 2} y2={h} stroke="#ccc" strokeWidth="1" />
        <HoleCircle cx={gap + r} cy={cy} value={h1} r={r - 1} />
        <HoleCircle cx={gap * 2 + r} cy={cy} value={h2} r={r - 1} />
        <HoleCircle cx={gap * 3 + r} cy={cy} value={h3} r={r - 1} />
        <HoleCircle cx={gap * 4 + r} cy={cy} value={h4} r={r - 1} />
      </svg>
    );
  }

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
      <rect x={tubeX} y={8} width={tubeW} height={H - 16} rx={4} fill="#eee" stroke="#000" strokeWidth="1" />
      <rect x={tubeX + 3} y={5} width={tubeW - 6} height={6} rx={2} fill="#999" />
      <rect x={tubeX - 1} y={H - 14} width={tubeW + 2} height={8} rx={3} fill="#ccc" />
      <HoleCircle cx={thumbX} cy={thumbY} value={thumb} r={5} />
      <HoleCircle cx={cx} cy={holeYs[0]} value={h1} />
      <HoleCircle cx={cx} cy={holeYs[1]} value={h2} />
      <HoleCircle cx={cx} cy={holeYs[2]} value={h3} />
      <HoleCircle cx={cx} cy={holeYs[3]} value={h4} />
    </svg>
  );
}
