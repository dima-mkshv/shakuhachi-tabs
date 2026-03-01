export const OTSU_NOTES = [
  { semitoneOffset: 0,  romaji: 'Ro',       katakana: 'ロ',       fingering: [1, 1, 1, 1, 1],     technique: 'normal' },
  { semitoneOffset: 1,  romaji: 'Tsu meri', katakana: 'ツ(メリ)',  fingering: [1, 1, 1, 1, 0.5],   technique: 'meri',    fingering7: [1, 1, 1, 1, 1, 1, 0], technique7: 'normal' },
  { semitoneOffset: 2,  romaji: 'Tsu',      katakana: 'ツ',       fingering: [1, 1, 1, 1, 0],     technique: 'normal' },
  { semitoneOffset: 3,  romaji: 'Re meri',  katakana: 'レ(メリ)',  fingering: [1, 1, 1, 0.5, 0],   technique: 'meri' },
  { semitoneOffset: 4,  romaji: 'Re',       katakana: 'レ',       fingering: [1, 1, 1, 0, 0],     technique: 'normal' },
  { semitoneOffset: 5,  romaji: 'Chi',      katakana: 'チ',       fingering: [1, 1, 0, 0, 0],     technique: 'normal' },
  { semitoneOffset: 6,  romaji: 'Chi meri', katakana: 'チ(メリ)',  fingering: [1, 0.5, 0, 0, 0],   technique: 'meri',    fingering7: [1, 1, 0, 0, 0, 0, 0], technique7: 'normal' },
  { semitoneOffset: 7,  romaji: 'Ha',       katakana: 'ハ',       fingering: [1, 0, 0, 0, 0],     technique: 'normal',  altFingerings: [{ fingering: [1, 0, 0, 1, 1], technique: 'normal' }] },
  { semitoneOffset: 8,  romaji: 'Ha meri',  katakana: 'ハ(メリ)',  fingering: [1, 1, 1, 0, 1],     technique: 'cross' },
  { semitoneOffset: 9,  romaji: 'Hi',       katakana: 'ヒ',       fingering: [0, 0, 0, 0, 0],     technique: 'normal' },
  { semitoneOffset: 10, romaji: 'U',        katakana: 'ウ',       fingering: [1, 1, 0, 1, 1],     technique: 'cross_meri' },
  { semitoneOffset: 11, romaji: 'U meri',   katakana: 'ウ(メリ)',  fingering: [1, 0, 1, 1, 1],     technique: 'cross' },
  { semitoneOffset: 12, romaji: 'Ro kan',   katakana: 'ロ(甲)',    fingering: [0, 1, 1, 1, 1],     technique: 'normal' },
];

export const KAN_NOTES = [
  { semitoneOffset: 12, romaji: 'Ro',       katakana: 'ロ',       fingering: [0, 1, 1, 1, 1],     technique: 'normal',  register: 'kan' },
  { semitoneOffset: 13, romaji: 'Tsu meri', katakana: 'ツ(メリ)',  fingering: [1, 1, 1, 1, 0.5],   technique: 'meri',    register: 'kan', fingering7: [1, 1, 1, 1, 1, 1, 0], technique7: 'normal' },
  { semitoneOffset: 14, romaji: 'Tsu',      katakana: 'ツ',       fingering: [1, 1, 1, 1, 0],     technique: 'normal',  register: 'kan' },
  { semitoneOffset: 15, romaji: 'Re meri',  katakana: 'レ(メリ)',  fingering: [1, 1, 1, 0.5, 0],   technique: 'meri',    register: 'kan' },
  { semitoneOffset: 16, romaji: 'Re',       katakana: 'レ',       fingering: [1, 1, 1, 0, 0],     technique: 'normal',  register: 'kan' },
  { semitoneOffset: 17, romaji: 'Chi',      katakana: 'チ',       fingering: [1, 1, 0, 0, 0],     technique: 'normal',  register: 'kan' },
  { semitoneOffset: 18, romaji: 'Chi meri', katakana: 'チ(メリ)',  fingering: [1, 0.5, 0, 0, 0],   technique: 'meri',    register: 'kan', fingering7: [1, 1, 0, 0, 0, 0, 0], technique7: 'normal' },
  { semitoneOffset: 19, romaji: 'Ha',       katakana: 'ハ',       fingering: [1, 0, 0, 0, 0],     technique: 'normal',  register: 'kan', altFingerings: [{ fingering: [1, 0, 0, 1, 1], technique: 'normal' }] },
  { semitoneOffset: 20, romaji: 'Ha meri',  katakana: 'ハ(メリ)',  fingering: [1, 1, 1, 0, 1],     technique: 'cross',   register: 'kan' },
  { semitoneOffset: 21, romaji: 'Hi',       katakana: 'ヒ',       fingering: [0, 0, 0, 0, 0],     technique: 'normal',  register: 'kan' },
  { semitoneOffset: 22, romaji: 'U',        katakana: 'ウ',       fingering: [1, 1, 0, 1, 1],     technique: 'cross_meri', register: 'kan' },
  { semitoneOffset: 23, romaji: 'U meri',   katakana: 'ウ(メリ)',  fingering: [1, 0, 1, 1, 1],     technique: 'cross',   register: 'kan' },
  { semitoneOffset: 24, romaji: 'Ro',       katakana: 'ロ',       fingering: [0, 1, 1, 1, 1],     technique: 'normal',  register: 'kan' },
];

export const BASIC_NOTE_OFFSETS = [0, 2, 4, 5, 7];

function expandFingeringTo7(f) {
  const h6 = f[1] === 0 ? 0 : 1;
  const h5 = f[4] === 1 ? 1 : 0;
  return [f[0], f[1], h6, f[2], f[3], f[4], h5];
}

export function getFingeringForHoles(note, holeCount) {
  if (holeCount === 5) return note.fingering;
  if (note.fingering7) return note.fingering7;
  return expandFingeringTo7(note.fingering);
}

export function getTechniqueForHoles(note, holeCount) {
  if (holeCount === 7 && note.technique7) return note.technique7;
  return note.technique;
}
