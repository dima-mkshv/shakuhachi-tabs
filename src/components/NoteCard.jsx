import FingeringDiagram from './FingeringDiagram';
import { useAppContext, useTranslation } from '../context/AppContext';
import { getNoteWithOctave } from '../utils/transpose';

const TECHNIQUE_KEYS = {
  normal: 'techniqueNormal',
  meri: 'techniqueMeri',
  cross: 'techniqueCross',
  cross_meri: 'techniqueCrossMeri',
};

export default function NoteCard({ note, compact = false }) {
  const { rootKey } = useAppContext();
  const t = useTranslation();

  const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
  const westernName = noteInfo.display;

  const techniqueLabel = t(TECHNIQUE_KEYS[note.technique]);

  if (compact) {
    return (
      <div className="note-card note-card--compact">
        <span className="note-card__western">{westernName}</span>
        <FingeringDiagram fingering={note.fingering} compact />
        <span className="note-card__katakana">{note.katakana}</span>
      </div>
    );
  }

  return (
    <div className="note-card">
      <div className="note-card__western">{westernName}</div>
      <FingeringDiagram fingering={note.fingering} />
      <div className="note-card__katakana">{note.katakana}</div>
      <div className="note-card__romaji">{note.romaji}</div>
      <div className="note-card__technique">{techniqueLabel}</div>
    </div>
  );
}
