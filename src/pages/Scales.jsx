import { useAppContext, useTranslation } from '../context/AppContext';
import { SCALES } from '../data/scales';
import { OTSU_NOTES } from '../data/notes';
import { getNoteName } from '../utils/transpose';
import NoteCard from '../components/NoteCard';

function ScaleCard({ scale, rootKey, lang, t }) {
  const scaleNotes = scale.intervals.map((interval) =>
    OTSU_NOTES.find((n) => n.semitoneOffset === interval)
  );

  const intervalDisplay = scale.intervals
    .map((interval) => getNoteName(interval, rootKey))
    .join(' · ');

  return (
    <div className="scale-card">
      <div className="scale-card__header">
        <h3 className="scale-card__name">
          {scale.nameEn} <span className="scale-card__jp">{scale.nameJp}</span>
        </h3>
        <div className="scale-card__intervals">{intervalDisplay}</div>
      </div>

      <div className="scale-card__notes">
        {scaleNotes.map((note) =>
          note ? (
            <NoteCard key={note.semitoneOffset} note={note} compact />
          ) : null
        )}
      </div>

      <p className="scale-card__desc">{scale.description[lang]}</p>
    </div>
  );
}

export default function Scales() {
  const { rootKey, lang } = useAppContext();
  const t = useTranslation();

  return (
    <div className="page-scales">
      <h2>{t('scalesTitle')}</h2>
      <div className="scales-grid">
        {SCALES.map((scale) => (
          <ScaleCard
            key={scale.id}
            scale={scale}
            rootKey={rootKey}
            lang={lang}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
