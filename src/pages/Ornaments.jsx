import { useAppContext, useTranslation } from '../context/AppContext';
import { ORNAMENTS } from '../data/ornaments';
import SequencePlayer from '../components/SequencePlayer';

export default function Ornaments() {
  const { lang } = useAppContext();
  const t = useTranslation();

  return (
    <div className="page-ornaments">
      <h2>{t('ornamentsTitle')}</h2>
      <p className="ornaments-intro">{t('ornamentsIntro')}</p>

      <div className="ornaments-list">
        {ORNAMENTS.map((orn) => (
          <article key={orn.id} className="ornament-card">
            <h3 className="ornament-card__title">
              {orn.nameEn} <span className="ornament-card__jp">{orn.nameJp}</span>
            </h3>
            <p className="ornament-card__desc">{orn.description[lang]}</p>
            <SequencePlayer notes={orn.pattern} tempo={orn.tempo} viewMode="cards" />
          </article>
        ))}
      </div>
    </div>
  );
}
