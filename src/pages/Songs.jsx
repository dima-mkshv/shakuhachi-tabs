import { useState } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';
import { SONGS } from '../data/songs';
import SequencePlayer from '../components/SequencePlayer';

const VIEW_MODES = ['cards', 'tab', 'hybrid'];

export default function Songs() {
  const { lang } = useAppContext();
  const t = useTranslation();
  const [viewMode, setViewMode] = useState('hybrid');

  return (
    <div className="page-songs">
      <h2>{t('songsTitle')}</h2>
      <p className="songs-intro">{t('songsIntro')}</p>

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

      <div className="songs-list">
        {SONGS.map((song) => {
          const allNotes = song.phrases.flat();
          return (
            <article key={song.id} className="song-card">
              <h3 className="song-card__title">
                {song.nameEn} <span className="song-card__jp">{song.nameJp}</span>
              </h3>
              <p className="song-card__desc">{song.description[lang]}</p>

              {viewMode === 'cards' || viewMode === 'tab' ? (
                <div className="song-phrases">
                  {song.phrases.map((phrase, pi) => (
                    <div key={pi} className="song-phrase">
                      <SequencePlayer notes={phrase} tempo={song.tempo} viewMode={viewMode} />
                    </div>
                  ))}
                </div>
              ) : (
                <SequencePlayer notes={allNotes} tempo={song.tempo} viewMode="hybrid" />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
