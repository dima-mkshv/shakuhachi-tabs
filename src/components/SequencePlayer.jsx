import { useState, useEffect } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';
import { OTSU_NOTES, KAN_NOTES, getFingeringForHoles } from '../data/notes';
import { getNoteWithOctave } from '../utils/transpose';
import { playSequence, stopSequence, playNote } from '../utils/audio';
import FingeringDiagram from './FingeringDiagram';

const ALL_NOTES = [...OTSU_NOTES, ...KAN_NOTES];

function findNote(offset) {
  return ALL_NOTES.find((n) => n.semitoneOffset === offset) || ALL_NOTES[0];
}

function durationSymbol(beats) {
  if (beats >= 4) return '====';
  if (beats >= 3) return '===';
  if (beats >= 2) return '==';
  if (beats >= 1) return '=';
  return '';
}

export default function SequencePlayer({ notes, tempo, viewMode = 'cards' }) {
  const { rootKey, holeCount } = useAppContext();
  const t = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => { return () => stopSequence(); }, []);

  const handlePlay = () => {
    if (playing) {
      stopSequence();
      setPlaying(false);
      setCurrentIndex(-1);
      return;
    }
    setPlaying(true);
    playSequence(notes, rootKey, tempo, (idx) => {
      setCurrentIndex(idx);
      if (idx === -1) setPlaying(false);
    });
  };

  if (viewMode === 'cards') {
    return (
      <div className="seq-player">
        <button className={`seq-play-btn ${playing ? 'seq-play-btn--active' : ''}`} onClick={handlePlay}>
          {playing ? '■' : '▶'}
        </button>
        <div className="seq-cards">
          {notes.map((n, i) => {
            if (n.rest) {
              return <div key={i} className={`seq-rest ${i === currentIndex ? 'seq-rest--active' : ''}`}>𝄾</div>;
            }
            const note = findNote(n.offset);
            const fingering = getFingeringForHoles(note, holeCount);
            const noteInfo = getNoteWithOctave(n.offset, rootKey, 4);
            return (
              <div
                key={i}
                className={`note-card note-card--compact ${i === currentIndex ? 'note-card--highlight' : ''}`}
                onClick={() => playNote(n.offset, rootKey)}
              >
                <span className="note-card__western">{noteInfo.display}</span>
                <FingeringDiagram fingering={fingering} compact />
                <span className="note-card__katakana">{note.katakana}</span>
                <span className="note-card__romaji-compact">{note.romaji}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (viewMode === 'tab') {
    return (
      <div className="seq-player">
        <button className={`seq-play-btn ${playing ? 'seq-play-btn--active' : ''}`} onClick={handlePlay}>
          {playing ? '■' : '▶'}
        </button>
        <div className="seq-tab">
          {notes.map((n, i) => {
            if (n.rest) {
              return <span key={i} className={`seq-tab__rest ${i === currentIndex ? 'seq-tab--active' : ''}`}>{'·'.repeat(Math.max(1, Math.round(n.beats)))}</span>;
            }
            const note = findNote(n.offset);
            const dur = durationSymbol(n.beats);
            return (
              <span
                key={i}
                className={`seq-tab__note ${i === currentIndex ? 'seq-tab--active' : ''}`}
                onClick={() => playNote(n.offset, rootKey)}
              >
                {note.romaji}{dur ? ` ${dur}` : ''}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="seq-player">
      <button className={`seq-play-btn ${playing ? 'seq-play-btn--active' : ''}`} onClick={handlePlay}>
        {playing ? '■' : '▶'}
      </button>
      <div className="seq-hybrid">
        {notes.map((n, i) => {
          if (n.rest) {
            return <div key={i} className={`seq-hybrid__rest ${i === currentIndex ? 'seq-hybrid--active' : ''}`} style={{ flex: n.beats }} />;
          }
          const note = findNote(n.offset);
          const fingering = getFingeringForHoles(note, holeCount);
          const noteInfo = getNoteWithOctave(n.offset, rootKey, 4);
          return (
            <div
              key={i}
              className={`seq-hybrid__note ${i === currentIndex ? 'seq-hybrid--active' : ''}`}
              style={{ flex: n.beats }}
              onClick={() => playNote(n.offset, rootKey)}
            >
              <span className="seq-hybrid__western">{noteInfo.display}</span>
              <FingeringDiagram fingering={fingering} compact />
              <span className="seq-hybrid__katakana">{note.katakana}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
