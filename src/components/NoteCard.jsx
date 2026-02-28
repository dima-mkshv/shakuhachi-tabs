import FingeringDiagram from './FingeringDiagram';
import { useAppContext, useTranslation } from '../context/AppContext';
import { getNoteWithOctave } from '../utils/transpose';
import { getFingeringForHoles, getTechniqueForHoles } from '../data/notes';
import { playNote } from '../utils/audio';

const TECHNIQUE_KEYS = {
  normal: 'techniqueNormal',
  meri: 'techniqueMeri',
  cross: 'techniqueCross',
  cross_meri: 'techniqueCrossMeri',
};

export default function NoteCard({ note, compact = false }) {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();

  const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
  const westernName = noteInfo.display;
  const fingering = getFingeringForHoles(note, holeCount);
  const technique = getTechniqueForHoles(note, holeCount);
  const techniqueLabel = t(TECHNIQUE_KEYS[technique]);

  const handlePlay = (e) => {
    e.stopPropagation();
    playNote(note.semitoneOffset, rootKey);
  };

  if (compact) {
    return (
      <div className="note-card note-card--compact" onClick={handlePlay} title={t('playNote')}>
        <span className="note-card__western">{westernName}</span>
        <FingeringDiagram fingering={fingering} compact />
        <span className="note-card__katakana">{note.katakana}</span>
        <span className="note-card__romaji-compact">{note.romaji}</span>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div className="note-card__western">{westernName}</div>
      <FingeringDiagram fingering={fingering} />
      <div className="note-card__katakana">{note.katakana}</div>
      <div className="note-card__romaji">{note.romaji}</div>
      <div className="note-card__technique">{techniqueLabel}</div>
      <button className="note-card__play" onClick={handlePlay} aria-label="Play note">
        ▶
      </button>
    </div>
  );
}
