export const ORNAMENTS = [
  {
    id: 'yuri',
    nameEn: 'Yuri (Vibrato)',
    nameJp: 'ユリ',
    tempo: 80,
    description: {
      en: 'Vibrato created by gently nodding the head up and down while sustaining a note. The pitch oscillates between normal and slightly meri. Start slow, then gradually increase speed. Practice on each basic note.',
      ru: 'Вибрато, создаваемое мягкими кивками головы вверх-вниз при удержании ноты. Высота колеблется между обычной и слегка мэри. Начинайте медленно, постепенно ускоряясь. Практикуйте на каждой базовой ноте.',
    },
    pattern: [
      { offset: 4, beats: 1 }, { offset: 3, beats: 0.5 }, { offset: 4, beats: 1 },
      { offset: 3, beats: 0.5 }, { offset: 4, beats: 1 }, { offset: 3, beats: 0.5 },
      { offset: 4, beats: 2 },
    ],
  },
  {
    id: 'korokoro',
    nameEn: 'Korokoro (Trill)',
    nameJp: 'コロコロ',
    tempo: 100,
    description: {
      en: 'Rapid alternation between two adjacent fingerings, creating a rolling, bubbling trill. Most commonly performed on Re by rapidly tapping hole 3. The sound should be even and continuous.',
      ru: 'Быстрое чередование двух соседних аппликатур, создающее перекатывающуюся трель. Чаще всего на Рэ — быстрым нажатием 3-го отверстия. Звук должен быть ровным и непрерывным.',
    },
    pattern: [
      { offset: 4, beats: 0.5 }, { offset: 5, beats: 0.5 },
      { offset: 4, beats: 0.5 }, { offset: 5, beats: 0.5 },
      { offset: 4, beats: 0.5 }, { offset: 5, beats: 0.5 },
      { offset: 4, beats: 0.5 }, { offset: 5, beats: 0.5 },
      { offset: 4, beats: 2 },
    ],
  },
  {
    id: 'atari',
    nameEn: 'Atari (Hammer-on)',
    nameJp: 'アタリ',
    tempo: 72,
    description: {
      en: 'A grace note from below — a quick, accented finger strike onto a hole. The finger "hammers" onto the hole from above, producing a brief lower pitch before the main note. Used for rhythmic articulation.',
      ru: 'Форшлаг снизу — быстрый, акцентированный удар пальцем по отверстию. Палец «ударяет» по отверстию сверху, создавая краткую более низкую ноту перед основной. Используется для ритмической артикуляции.',
    },
    pattern: [
      { offset: 2, beats: 0.25 }, { offset: 4, beats: 1.75 },
      { rest: true, beats: 0.5 },
      { offset: 4, beats: 0.25 }, { offset: 5, beats: 1.75 },
      { rest: true, beats: 0.5 },
      { offset: 5, beats: 0.25 }, { offset: 7, beats: 1.75 },
    ],
  },
  {
    id: 'osae',
    nameEn: 'Osae (Pull-off)',
    nameJp: 'オサエ',
    tempo: 72,
    description: {
      en: 'The opposite of atari — a grace note from above. A finger quickly lifts off a hole, briefly sounding the higher pitch before settling on the main note. Creates a downward ornamental motion.',
      ru: 'Противоположность атари — форшлаг сверху. Палец быстро отрывается от отверстия, кратко звуча на более высокой ноте перед переходом к основной. Создаёт нисходящее орнаментальное движение.',
    },
    pattern: [
      { offset: 5, beats: 0.25 }, { offset: 4, beats: 1.75 },
      { rest: true, beats: 0.5 },
      { offset: 7, beats: 0.25 }, { offset: 5, beats: 1.75 },
      { rest: true, beats: 0.5 },
      { offset: 9, beats: 0.25 }, { offset: 7, beats: 1.75 },
    ],
  },
  {
    id: 'suri',
    nameEn: 'Suri (Slide)',
    nameJp: 'スリ',
    tempo: 50,
    description: {
      en: 'A smooth slide (portamento) between two notes, achieved by gradually moving the chin (meri/kari) and sometimes half-holing. The pitch should glide seamlessly without discrete steps.',
      ru: 'Плавное скольжение (портаменто) между двумя нотами путём постепенного движения подбородка (мэри/кари) и иногда полуприкрытия отверстий. Высота должна плавно перетекать без дискретных шагов.',
    },
    pattern: [
      { offset: 0, beats: 2 },
      { offset: 1, beats: 1 },
      { offset: 2, beats: 2 },
      { rest: true, beats: 1 },
      { offset: 4, beats: 2 },
      { offset: 3, beats: 1 },
      { offset: 2, beats: 2 },
    ],
  },
];
