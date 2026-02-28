import { useTranslation } from '../context/AppContext';

const SECTIONS = [
  { titleKey: 'techNormalTitle', textKey: 'techNormalText' },
  { titleKey: 'techMeriTitle', textKey: 'techMeriText' },
  { titleKey: 'techKariTitle', textKey: 'techKariText' },
  { titleKey: 'techCrossTitle', textKey: 'techCrossText' },
  { titleKey: 'techRegistersTitle', textKey: 'techRegistersText' },
  { titleKey: 'techBreathTitle', textKey: 'techBreathText' },
];

export default function Techniques() {
  const t = useTranslation();

  return (
    <div className="page-techniques">
      <h2>{t('techniquesTitle')}</h2>
      <p className="techniques-intro">{t('techniquesIntro')}</p>

      <div className="techniques-list">
        {SECTIONS.map((section) => (
          <article key={section.titleKey} className="technique-card">
            <h3 className="technique-card__title">{t(section.titleKey)}</h3>
            <p className="technique-card__text">{t(section.textKey)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
