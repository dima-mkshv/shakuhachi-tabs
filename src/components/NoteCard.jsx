import { useState, useEffect } from 'react';
import FingeringDiagram from './FingeringDiagram';
import { useAppContext, useTranslation } from '../context/AppContext';
import { getNoteWithOctave } from '../utils/transpose';
import { getFingeringForHoles, getTechniqueForHoles } from '../data/notes';
import { playNote, toggleLoop, stopLoop } from '../utils/audio';

const TECHNIQUE_KEYS = {
  normal: 'techniqueNormal',
  meri: 'techniqueMeri',
  cross: 'techniqueCross',
  cross_meri: 'techniqueCrossMeri',
};

export default function NoteCard({ note, compact = false }) {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    return () => { if (looping) stopLoop(); };
  }, [looping]);

  const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
  const westernName = noteInfo.display;
  const fingering = getFingeringForHoles(note, holeCount);
  const technique = getTechniqueForHoles(note, holeCount);
  const techniqueLabel = t(TECHNIQUE_KEYS[technique]);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (looping) { stopLoop(); setLooping(false); }
    playNote(note.semitoneOffset, rootKey);
  };

  const handleLoop = (e) => {
    e.stopPropagation();
    const isNowLooping = toggleLoop(note.semitoneOffset, rootKey);
    setLooping(isNowLooping);
  };

  const showAltFingerings = holeCount === 5 && note.altFingerings && note.altFingerings.length > 0;

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
      {showAltFingerings && (
        <div className="note-card__alts">
          {note.altFingerings.map((alt, i) => (
            <div key={i} className="note-card__alt">
              <span className="note-card__alt-label">alt</span>
              <FingeringDiagram fingering={alt.fingering} compact />
            </div>
          ))}
        </div>
      )}
      <div className="note-card__katakana">{note.katakana}</div>
      <div className="note-card__romaji">{note.romaji}</div>
      <div className="note-card__technique">{techniqueLabel}</div>
      <div className="note-card__buttons">
        <button className="note-card__play" onClick={handlePlay} aria-label="Play note">▶</button>
        <button className={`note-card__play ${looping ? 'note-card__play--active' : ''}`} onClick={handleLoop} aria-label="Loop note">
          {looping ? '■' : '⟳'}
        </button>
      </div>
    </div>
  );
}
