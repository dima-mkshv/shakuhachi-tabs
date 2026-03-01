const ROOT_MIDI = {
  'C': 60, 'C#': 61, 'D': 62, 'Eb': 63, 'E': 64, 'F': 65,
  'F#': 66, 'G': 67, 'Ab': 68, 'A': 69, 'Bb': 70, 'B': 71,
};

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function playNote(semitoneOffset, rootKey, duration = 0.8) {
  const ctx = getAudioContext();
  const midi = ROOT_MIDI[rootKey] + semitoneOffset;
  const freq = midiToFrequency(midi);
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.35, now + 0.06);
  master.gain.setValueAtTime(0.35, now + duration - 0.25);
  master.gain.linearRampToValueAtTime(0, now + duration);
  master.connect(ctx.destination);

  const harmonics = [
    { ratio: 1, gain: 1.0 },
    { ratio: 2, gain: 0.25 },
    { ratio: 3, gain: 0.08 },
    { ratio: 4, gain: 0.03 },
  ];

  harmonics.forEach((h) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * h.ratio, now);
    gain.gain.setValueAtTime(h.gain * 0.5, now);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  });

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.015, now + 0.03);
  noiseGain.gain.linearRampToValueAtTime(0.008, now + 0.1);
  noiseGain.gain.setValueAtTime(0.008, now + duration - 0.25);
  noiseGain.gain.linearRampToValueAtTime(0, now + duration);

  const bufferSize = ctx.sampleRate * (duration + 0.1);
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(freq * 2, now);
  bandpass.Q.setValueAtTime(2, now);

  noise.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(master);
  noise.start(now);
  noise.stop(now + duration + 0.05);
}

let droneState = null;

export function toggleDrone(semitoneOffset, rootKey) {
  if (droneState) {
    const wasSameNote = droneState.semitoneOffset === semitoneOffset && droneState.rootKey === rootKey;
    stopDrone();
    if (wasSameNote) return false;
  }

  const ctx = getAudioContext();
  const midi = ROOT_MIDI[rootKey] + semitoneOffset;
  const freq = midiToFrequency(midi);
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.3, now + 0.08);
  master.connect(ctx.destination);

  const harmonics = [
    { ratio: 1, gain: 1.0 },
    { ratio: 2, gain: 0.25 },
    { ratio: 3, gain: 0.08 },
    { ratio: 4, gain: 0.03 },
  ];

  const oscillators = harmonics.map((h) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * h.ratio, now);
    gain.gain.setValueAtTime(h.gain * 0.5, now);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    return osc;
  });

  droneState = { semitoneOffset, rootKey, oscillators, master, ctx };
  return true;
}

export function stopDrone() {
  if (!droneState) return;
  const { oscillators, master, ctx } = droneState;
  const now = ctx.currentTime;
  master.gain.linearRampToValueAtTime(0, now + 0.15);
  oscillators.forEach((osc) => osc.stop(now + 0.2));
  droneState = null;
}

let sequenceState = null;

export function playSequence(notes, rootKey, bpm, onNoteChange) {
  stopSequence();
  const beatDuration = 60 / bpm;
  const state = { cancelled: false };
  sequenceState = state;

  let index = 0;

  function playNext() {
    if (state.cancelled || index >= notes.length) {
      if (onNoteChange) onNoteChange(-1);
      sequenceState = null;
      return;
    }
    const note = notes[index];
    const duration = note.beats * beatDuration;
    if (onNoteChange) onNoteChange(index);

    if (note.rest) {
      index++;
      setTimeout(playNext, duration * 1000);
      return;
    }

    playNote(note.offset, rootKey, duration * 0.9);
    index++;
    setTimeout(playNext, duration * 1000);
  }

  playNext();
}

export function stopSequence() {
  if (sequenceState) {
    sequenceState.cancelled = true;
    sequenceState = null;
  }
}
