const NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export function getNoteName(semitoneOffset, rootKey) {
  const rootIndex = NOTE_NAMES.indexOf(rootKey);
  return NOTE_NAMES[(rootIndex + semitoneOffset) % 12];
}

export function getNoteWithOctave(semitoneOffset, rootKey, baseOctave = 4) {
  const name = getNoteName(semitoneOffset, rootKey);
  const rootIndex = NOTE_NAMES.indexOf(rootKey);
  const absoluteIndex = rootIndex + semitoneOffset;
  const octave = baseOctave + Math.floor(absoluteIndex / 12);
  return { name, octave, display: `${name}${octave}` };
}
