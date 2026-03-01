import { useState, useEffect } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';
import { OTSU_NOTES, KAN_NOTES, getFingeringForHoles, getTechniqueForHoles } from '../data/notes';
import { getNoteWithOctave } from '../utils/transpose';
import { playNote, toggleLoop, stopLoop } from '../utils/audio';
import FingeringDiagram from '../components/FingeringDiagram';

const TECHNIQUE_KEYS = {
  normal: 'techniqueNormal',
  meri: 'techniqueMeri',
  cross: 'techniqueCross',
  cross_meri: 'techniqueCrossMeri',
};

function ChartRow({ note, rootKey, holeCount, t }) {
  const [looping, setLooping] = useState(false);
  useEffect(() => { return () => { if (looping) stopLoop(); }; }, [looping]);

  const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
  const fingering = getFingeringForHoles(note, holeCount);
  const technique = getTechniqueForHoles(note, holeCount);
  const showAlts = holeCount === 5 && note.altFingerings && note.altFingerings.length > 0;

  const handleLoop = () => {
    const isNowLooping = toggleLoop(note.semitoneOffset, rootKey);
    setLooping(isNowLooping);
  };

  return (
    <>
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
          <button className="play-btn" onClick={() => { if (looping) { stopLoop(); setLooping(false); } playNote(note.semitoneOffset, rootKey); }} aria-label="Play">▶</button>
          <button className={`play-btn ${looping ? 'play-btn--active' : ''}`} onClick={handleLoop} aria-label="Loop">
            {looping ? '■' : '⟳'}
          </button>
        </td>
      </tr>
      {showAlts && note.altFingerings.map((alt, i) => (
        <tr key={`alt-${i}`} className="chart-row--variant">
          <td className="chart-cell--note"></td>
          <td className="chart-cell--jp"><span className="chart-alt-label">alt</span></td>
          <td className="chart-cell--fingering">
            <FingeringDiagram fingering={alt.fingering} compact />
          </td>
          <td className="chart-cell--technique">{t(TECHNIQUE_KEYS[alt.technique])}</td>
          <td className="chart-cell--play"></td>
        </tr>
      ))}
    </>
  );
}

function ChartTable({ notes, registerLabel, rootKey, holeCount, t }) {
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
            <ChartRow key={note.semitoneOffset} note={note} rootKey={rootKey} holeCount={holeCount} t={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Chart() {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();

  return (
    <div className="page-chart">
      <h2>{t('chartTitle')}</h2>
      <ChartTable notes={OTSU_NOTES} registerLabel={t('registerOtsu')} rootKey={rootKey} holeCount={holeCount} t={t} />
      <ChartTable notes={KAN_NOTES} registerLabel={t('registerKan')} rootKey={rootKey} holeCount={holeCount} t={t} />
    </div>
  );
}
