import { useAppContext, useTranslation } from '../context/AppContext';
import { OTSU_NOTES, KAN_NOTES, getFingeringForHoles, getTechniqueForHoles } from '../data/notes';
import { getNoteWithOctave } from '../utils/transpose';
import FingeringDiagram from '../components/FingeringDiagram';

const TECHNIQUE_KEYS = {
  normal: 'techniqueNormal',
  meri: 'techniqueMeri',
  cross: 'techniqueCross',
  cross_meri: 'techniqueCrossMeri',
};

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
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => {
            const noteInfo = getNoteWithOctave(note.semitoneOffset, rootKey, 4);
            const fingering = getFingeringForHoles(note, holeCount);
            const technique = getTechniqueForHoles(note, holeCount);
            return (
              <tr key={note.semitoneOffset} className={technique !== 'normal' ? 'chart-row--alt' : ''}>
                <td className="chart-cell--note">{noteInfo.display}</td>
                <td className="chart-cell--jp">
                  <span className="chart-katakana">{note.katakana}</span>
                  <span className="chart-romaji">{note.romaji}</span>
                </td>
                <td className="chart-cell--fingering">
                  <FingeringDiagram fingering={fingering} compact />
                </td>
                <td className="chart-cell--technique">{t(TECHNIQUE_KEYS[technique])}</td>
              </tr>
            );
          })}
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
