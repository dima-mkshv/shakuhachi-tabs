import { useAppContext, useTranslation } from '../context/AppContext';
import { EXERCISES } from '../data/exercises';
import SequencePlayer from '../components/SequencePlayer';

export default function Exercises() {
  const { lang } = useAppContext();
  const t = useTranslation();

  return (
    <div className="page-exercises">
      <h2>{t('exercisesTitle')}</h2>
      <p className="exercises-intro">{t('exercisesIntro')}</p>

      <div className="exercises-list">
        {EXERCISES.map((ex) => (
          <article key={ex.id} className="exercise-card">
            <h3 className="exercise-card__title">
              {ex.nameEn} <span className="exercise-card__jp">{ex.nameJp}</span>
            </h3>
            <p className="exercise-card__desc">{ex.description[lang]}</p>
            <SequencePlayer notes={ex.notes} tempo={ex.tempo} viewMode="cards" />
          </article>
        ))}
      </div>
    </div>
  );
}
