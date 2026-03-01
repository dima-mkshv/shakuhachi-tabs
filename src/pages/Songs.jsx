import { useState } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';
import { SONGS } from '../data/songs';
import SequencePlayer from '../components/SequencePlayer';

const VIEW_MODES = ['cards', 'tab', 'hybrid'];

function SongDetail({ song, lang, t }) {
  const [viewMode, setViewMode] = useState('hybrid');
  const allNotes = song.phrases.flat();

  return (
    <div className="song-detail">
      <p className="song-card__desc">{song.description[lang]}</p>

      <div className="view-toggle">
        {VIEW_MODES.map((mode) => (
          <button
            key={mode}
            className={`tab-btn ${viewMode === mode ? 'tab-btn--active' : ''}`}
            onClick={() => setViewMode(mode)}
          >
            {t(`viewMode_${mode}`)}
          </button>
        ))}
      </div>

      {viewMode === 'cards' || viewMode === 'tab' ? (
        <div className="song-phrases">
          {song.phrases.map((phrase, pi) => (
            <div key={pi} className="song-phrase">
              <SequencePlayer notes={phrase} tempo={song.tempo} viewMode={viewMode} />
            </div>
          ))}
        </div>
      ) : (
        <div className="song-phrases">
          {song.phrases.map((phrase, pi) => (
            <div key={pi} className="song-phrase">
              <SequencePlayer notes={phrase} tempo={song.tempo} viewMode="hybrid" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Songs() {
  const { lang } = useAppContext();
  const t = useTranslation();
  const [openSongId, setOpenSongId] = useState(null);

  return (
    <div className="page-songs">
      <h2>{t('songsTitle')}</h2>
      <p className="songs-intro">{t('songsIntro')}</p>

      <div className="songs-grid">
        {SONGS.map((song) => {
          const isOpen = openSongId === song.id;
          return (
            <article key={song.id} className={`song-card ${isOpen ? 'song-card--open' : ''}`}>
              <div className="song-card__header" onClick={() => setOpenSongId(isOpen ? null : song.id)}>
                <h3 className="song-card__title">
                  {song.nameEn} <span className="song-card__jp">{song.nameJp}</span>
                </h3>
                <span className="song-card__toggle">{isOpen ? '▾' : '▸'}</span>
              </div>
              {isOpen && <SongDetail song={song} lang={lang} t={t} />}
            </article>
          );
        })}
      </div>
    </div>
  );
}
