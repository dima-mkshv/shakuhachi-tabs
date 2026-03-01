import { useState, useEffect } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';
import { OTSU_NOTES, KAN_NOTES, getFingeringForHoles, getTechniqueForHoles } from '../data/notes';
import { getNoteWithOctave } from '../utils/transpose';
import { playNote, toggleDrone, stopDrone } from '../utils/audio';
import FingeringDiagram from '../components/FingeringDiagram';

const TECHNIQUE_KEYS = {
  normal: 'techniqueNormal',
  meri: 'techniqueMeri',
  cross: 'techniqueCross',
  cross_meri: 'techniqueCrossMeri',
};

function ChartRow({ note, rootKey, holeCount, t, activeDrone, setActiveDrone }) {
  const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
  const fingering = getFingeringForHoles(note, holeCount);
  const technique = getTechniqueForHoles(note, holeCount);
  const isDroning = activeDrone === note.semitoneOffset;

  const handleDrone = () => {
    const isNowDroning = toggleDrone(note.semitoneOffset, rootKey);
    setActiveDrone(isNowDroning ? note.semitoneOffset : null);
  };

  return (
    <tr className={technique !== 'normal' ? 'chart-row--alt' : ''}>
      <td className="chart-cell--note">{noteInfo.display}</td>
      <td className="chart-cell--jp">
        <span className="chart-katakana">{note.katakana}</span>
        <span className="chart-romaji">{note.romaji}</span>
      </td>
      <td className="chart-cell--fingering">
        <FingeringDiagram fingering={fingering} compact />
      </td>
      <td className="chart-cell--technique">{t(TECHNIQUE_KEYS[technique])}</td>
      <td className="chart-cell--play">
        <button className="play-btn" onClick={() => playNote(note.semitoneOffset, rootKey)} aria-label="Play">▶</button>
        <button className={`play-btn ${isDroning ? 'play-btn--active' : ''}`} onClick={handleDrone} aria-label="Drone">
          {isDroning ? '■' : '▶▶'}
        </button>
      </td>
    </tr>
  );
}

function ChartTable({ notes, registerLabel, rootKey, holeCount, t, activeDrone, setActiveDrone }) {
  return (
    <div className="chart-section">
      <h3>{registerLabel}</h3>
      <table className="chart-table">
        <thead>
          <tr>
            <th>{t('noteColumn')}</th>
            <th>{t('japaneseColumn')}</th>
            <th>{t('fingeringColumn')}</th>
            <th>{t('techniqueColumn')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <ChartRow key={note.semitoneOffset} note={note} rootKey={rootKey} holeCount={holeCount} t={t} activeDrone={activeDrone} setActiveDrone={setActiveDrone} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Chart() {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();
  const [activeDrone, setActiveDrone] = useState(null);

  useEffect(() => { return () => stopDrone(); }, []);

  return (
    <div className="page-chart">
      <h2>{t('chartTitle')}</h2>
      <p className="chart-intro">{t('chartIntro')}</p>
      <ChartTable notes={OTSU_NOTES} registerLabel={t('registerOtsu')} rootKey={rootKey} holeCount={holeCount} t={t} activeDrone={activeDrone} setActiveDrone={setActiveDrone} />
      <ChartTable notes={KAN_NOTES} registerLabel={t('registerKan')} rootKey={rootKey} holeCount={holeCount} t={t} activeDrone={activeDrone} setActiveDrone={setActiveDrone} />
    </div>
  );
}
