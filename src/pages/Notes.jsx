import { useState } from 'react';
import { useTranslation } from '../context/AppContext';
import { OTSU_NOTES, KAN_NOTES } from '../data/notes';
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const t = useTranslation();
  const [register, setRegister] = useState('otsu');

  const notes = register === 'otsu' ? OTSU_NOTES : KAN_NOTES;

  return (
    <div className="page-notes">
      <h2>{t('notesTitle')}</h2>

      <div className="register-tabs">
        <button
          className={`tab-btn ${register === 'otsu' ? 'tab-btn--active' : ''}`}
          onClick={() => setRegister('otsu')}
        >
          {t('registerOtsu')}
        </button>
        <button
          className={`tab-btn ${register === 'kan' ? 'tab-btn--active' : ''}`}
          onClick={() => setRegister('kan')}
        >
          {t('registerKan')}
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard key={`${register}-${note.semitoneOffset}`} note={note} />
        ))}
      </div>
    </div>
  );
}
