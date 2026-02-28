import { useAppContext, useTranslation } from '../context/AppContext';
import { SCALES } from '../data/scales';
import { OTSU_NOTES } from '../data/notes';
import { getNoteName } from '../utils/transpose';
import NoteCard from '../components/NoteCard';

function NoteRow({ intervals, rootKey, label, isAuxiliary }) {
  const coreSet = isAuxiliary ? null : new Set(intervals);

  return (
    <div className="scale-card__row">
      {label && <div className="scale-card__row-label">{label}</div>}
      <div className="scale-card__notes">
        {intervals.map((interval) => {
          const note = OTSU_NOTES.find((n) => n.semitoneOffset === interval);
          if (!note) return null;
          const isPassingTone = isAuxiliary && isAuxiliary.has(interval);
          return (
            <div key={interval} className={isPassingTone ? 'scale-note--auxiliary' : ''}>
              <NoteCard note={note} compact />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScaleCard({ scale, rootKey, lang, t }) {
  const hasAscDesc = scale.ascending && scale.descending;

  const pentatonicDisplay = scale.intervals
    .map((interval) => getNoteName(interval, rootKey))
    .join(' · ');

  const coreSet = new Set(scale.intervals);
  const ascAuxiliary = hasAscDesc ? new Set(scale.ascending.filter((i) => !coreSet.has(i))) : null;
  const descAuxiliary = hasAscDesc ? new Set(scale.descending.filter((i) => !coreSet.has(i))) : null;

  return (
    <div className="scale-card">
      <div className="scale-card__header">
        <h3 className="scale-card__name">
          {scale.nameEn} <span className="scale-card__jp">{scale.nameJp}</span>
          {hasAscDesc && <span className="scale-card__asc-desc-badge">↑↓</span>}
        </h3>
        <div className="scale-card__intervals">{pentatonicDisplay}</div>
      </div>

      <NoteRow
        intervals={scale.intervals}
        rootKey={rootKey}
        label={hasAscDesc ? t('scalesPentatonic') : null}
      />

      {hasAscDesc && (
        <>
          <NoteRow
            intervals={scale.ascending}
            rootKey={rootKey}
            label={t('scalesAscending')}
            isAuxiliary={ascAuxiliary}
          />
          <NoteRow
            intervals={scale.descending}
            rootKey={rootKey}
            label={t('scalesDescending')}
            isAuxiliary={descAuxiliary}
          />
        </>
      )}

      <p className="scale-card__desc">{scale.description[lang]}</p>
    </div>
  );
}

export default function Scales() {
  const { rootKey, lang } = useAppContext();
  const t = useTranslation();

  const hasAnyAscDesc = SCALES.some((s) => s.ascending && s.descending);

  return (
    <div className="page-scales">
      <h2>{t('scalesTitle')}</h2>
      {hasAnyAscDesc && (
        <p className="scales-note">{t('scalesAscDescNote')}</p>
      )}
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
