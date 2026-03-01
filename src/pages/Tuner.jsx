import { useState, useEffect } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';
import { OTSU_NOTES, KAN_NOTES } from '../data/notes';
import { getNoteWithOctave } from '../utils/transpose';
import { toggleDrone, stopDrone } from '../utils/audio';
import FingeringDiagram from '../components/FingeringDiagram';
import { getFingeringForHoles } from '../data/notes';

function DroneButton({ note, rootKey, holeCount, activeDrone, setActiveDrone }) {
  const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
  const fingering = getFingeringForHoles(note, holeCount);
  const isActive = activeDrone === note.semitoneOffset;

  const handleClick = () => {
    const isNowDroning = toggleDrone(note.semitoneOffset, rootKey);
    setActiveDrone(isNowDroning ? note.semitoneOffset : null);
  };

  return (
    <button
      className={`tuner-note ${isActive ? 'tuner-note--active' : ''}`}
      onClick={handleClick}
    >
      <span className="tuner-note__western">{noteInfo.display}</span>
      <FingeringDiagram fingering={fingering} compact />
      <span className="tuner-note__katakana">{note.katakana}</span>
      <span className="tuner-note__romaji">{note.romaji}</span>
    </button>
  );
}

export default function Tuner() {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();
  const [activeDrone, setActiveDrone] = useState(null);

  useEffect(() => { return () => stopDrone(); }, []);

  const basicOtsu = OTSU_NOTES.filter((n) => [0, 2, 4, 5, 7, 9].includes(n.semitoneOffset));
  const basicKan = KAN_NOTES.filter((n) => [12, 14, 16, 17, 19, 21].includes(n.semitoneOffset));

  return (
    <div className="page-tuner">
      <h2>{t('tunerTitle')}</h2>
      <p className="tuner-intro">{t('tunerIntro')}</p>

      <h3 className="tuner-section-title">{t('registerOtsu')}</h3>
      <div className="tuner-grid">
        {basicOtsu.map((note) => (
          <DroneButton key={note.semitoneOffset} note={note} rootKey={rootKey} holeCount={holeCount} activeDrone={activeDrone} setActiveDrone={setActiveDrone} />
        ))}
      </div>

      <h3 className="tuner-section-title">{t('registerKan')}</h3>
      <div className="tuner-grid">
        {basicKan.map((note) => (
          <DroneButton key={note.semitoneOffset} note={note} rootKey={rootKey} holeCount={holeCount} activeDrone={activeDrone} setActiveDrone={setActiveDrone} />
        ))}
      </div>
    </div>
  );
}
