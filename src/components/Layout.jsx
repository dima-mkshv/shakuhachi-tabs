import { Outlet, NavLink } from 'react-router-dom';
import { useAppContext, useTranslation } from '../context/AppContext';
import { SHAKUHACHI_SIZES } from '../data/sizes';

function NavItem({ to, label, end }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
      {label}
    </NavLink>
  );
}

export default function Layout() {
  const { lang, setLang, selectedLength, setSelectedLength, holeCount, setHoleCount, theme, toggleTheme } = useAppContext();
  const t = useTranslation();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-top">
          <div className="header-title">
            <span className="header-kanji">尺八</span>
            <h1>{t('siteTitle')}</h1>
          </div>

          <div className="header-controls">
            <div className="key-selector">
              <label htmlFor="key-select">{t('keyLabel')}:</label>
              <select
                id="key-select"
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="key-select"
              >
                {SHAKUHACHI_SIZES.map((s) => (
                  <option key={s.length} value={s.length}>
                    {s.length} {t('lengthLabel')} ({s.key})
                  </option>
                ))}
              </select>
            </div>

            <div className="hole-selector">
              <label htmlFor="hole-select">{t('holesLabel')}:</label>
              <select
                id="hole-select"
                value={holeCount}
                onChange={(e) => setHoleCount(Number(e.target.value))}
                className="key-select"
              >
                <option value={5}>5</option>
                <option value={7}>7</option>
              </select>
            </div>

            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'en' ? 'lang-btn--active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lang-btn ${lang === 'ru' ? 'lang-btn--active' : ''}`} onClick={() => setLang('ru')}>RU</button>
            </div>

            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '☽' : '☀'}
            </button>
          </div>
        </div>

        <nav className="nav">
          <NavItem to="/" label={t('navHome')} end />
          <NavItem to="/notes" label={t('navNotes')} />
          <NavItem to="/chart" label={t('navChart')} />
          <NavItem to="/scales" label={t('navScales')} />
          <NavItem to="/exercises" label={t('navExercises')} />
          <NavItem to="/ornaments" label={t('navOrnaments')} />
          <NavItem to="/songs" label={t('navSongs')} />
          <NavItem to="/tuner" label={t('navTuner')} />
          <NavItem to="/techniques" label={t('navTechniques')} />
          <NavItem to="/glossary" label={t('navGlossary')} />
        </nav>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        尺八 · {t('siteTitle')}
      </footer>
    </div>
  );
}
