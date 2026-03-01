import { useAppContext, useTranslation } from '../context/AppContext';
import { GLOSSARY, GLOSSARY_CATEGORIES } from '../data/glossary';

const CATEGORY_ORDER = ['instrument', 'technique', 'notation', 'music', 'school'];

export default function Glossary() {
  const { lang } = useAppContext();
  const t = useTranslation();

  return (
    <div className="page-glossary">
      <h2>{t('glossaryTitle')}</h2>
      <p className="glossary-intro">{t('glossaryIntro')}</p>

      <nav className="glossary-toc">
        {CATEGORY_ORDER.map((catId) => {
          const terms = GLOSSARY.filter((g) => g.category === catId);
          if (terms.length === 0) return null;
          return (
            <a key={catId} href={`#glossary-${catId}`} className="glossary-toc__link">
              {GLOSSARY_CATEGORIES[catId][lang]}
            </a>
          );
        })}
      </nav>

      {CATEGORY_ORDER.map((catId) => {
        const terms = GLOSSARY.filter((g) => g.category === catId);
        if (terms.length === 0) return null;
        return (
          <section key={catId} id={`glossary-${catId}`} className="glossary-section">
            <h3 className="glossary-section__title">{GLOSSARY_CATEGORIES[catId][lang]}</h3>
            <dl className="glossary-list">
              {terms.map((entry) => (
                <div key={entry.romaji} className="glossary-entry">
                  <dt className="glossary-entry__term">
                    <span className="glossary-entry__jp">{entry.term}</span>
                    <span className="glossary-entry__romaji">{entry.romaji}</span>
                    {entry.literal && (
                      <span className="glossary-entry__literal">{entry.literal[lang]}</span>
                    )}
                  </dt>
                  <dd className="glossary-entry__def">{entry[lang]}</dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
