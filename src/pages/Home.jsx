import { useAppContext, useTranslation } from '../context/AppContext';
import { OTSU_NOTES, BASIC_NOTE_OFFSETS } from '../data/notes';
import NoteCard from '../components/NoteCard';

function LegendCircle({ type }) {
  const size = 20;
  const r = 7;
  const cx = size / 2;
  const cy = size / 2;

  if (type === 'closed') {
    return (
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="#000" stroke="#000" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'open') {
    return (
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeWidth="1.5" />
      </svg>
    );
  }

  const clipId = 'legend-half';
  return (
    <svg width={size} height={size}>
      <defs>
        <clipPath id={clipId}>
          <rect x={cx - r} y={cy - r} width={r} height={r * 2} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="#000" clipPath={`url(#${clipId})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();

  const basicNotes = OTSU_NOTES.filter(
    (n) => BASIC_NOTE_OFFSETS.includes(n.semitoneOffset)
  );

  return (
    <div className="page-home">
      <section className="home-intro">
        <p className="home-intro__text">{t(holeCount === 7 ? 'homeIntro7' : 'homeIntro5')}</p>
        <p className="home-intro__key">
          {t('keyLabel')}: <strong>{rootKey}</strong>
        </p>
      </section>

      <div className="divider" />

      <section className="home-legend">
        <h2>{t('homeLegend')}</h2>
        <div className="legend-items">
          <div className="legend-item">
            <LegendCircle type="closed" />
            <span>{t('legendClosed')}</span>
          </div>
          <div className="legend-item">
            <LegendCircle type="half" />
            <span>{t('legendHalf')}</span>
          </div>
          <div className="legend-item">
            <LegendCircle type="open" />
            <span>{t('legendOpen')}</span>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="home-basic">
        <h2>{t('homeBasicNotes')}</h2>
        <div className="notes-grid notes-grid--basic">
          {basicNotes.map((note) => (
            <NoteCard key={note.semitoneOffset} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
