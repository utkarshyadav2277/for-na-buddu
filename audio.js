// Sound effects and calming dream music using Web Audio API
class DreamAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.purrGain = null;
    this.purrOsc = null;
    this.purrSource = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft chime / celesta note
  playChime(freq = 523.25, duration = 0.8, type = 'sine', volume = 0.25) {
    if (this.isMuted) return;
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm envelope
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Play sparkle sound effect
  playSparkle() {
    if (this.isMuted) return;
    const notes = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.5, 'triangle', 0.15);
      }, idx * 60);
    });
  }

  // Play bubble pop
  playPop() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Play cute happy meow / squeak
  playMeow() {
    if (this.isMuted) return;
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);
    filter.Q.value = 3;

    // Pitch sweep mimicking cute kitty chirrup
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Play heartwarming victory fanfare
  playVictory() {
    if (this.isMuted) return;
    const chords = [
      [523.25, 659.25, 783.99], // C major
      [587.33, 739.99, 880.00], // D major
      [659.25, 830.61, 987.77], // E major
      [783.99, 987.77, 1174.66, 1318.51] // G major + E
    ];

    chords.forEach((chord, i) => {
      setTimeout(() => {
        chord.forEach(note => {
          this.playChime(note, 1.2, 'sine', 0.18);
        });
      }, i * 220);
    });
  }

  // Play cheerful car honk beep-beep!
  playHonk() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    [0, 0.11].forEach(offset => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now + offset);
      gain.gain.setValueAtTime(0.18, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.08);
    });
  }

  // Play obstacle bump / crash
  playBump() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Play funny sassy defeat trombone for "YEAH, WHAAATEVER"
  playLose() {
    if (this.isMuted) return;
    this.init();
    const notes = [
      { freq: 415.30, dur: 0.22 },
      { freq: 392.00, dur: 0.22 },
      { freq: 369.99, dur: 0.22 },
      { freq: 311.13, dur: 0.65 }
    ];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.freq, now);
        if (idx === notes.length - 1) {
          osc.frequency.linearRampToValueAtTime(n.freq * 0.8, now + n.dur);
        }
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + n.dur);
      }, idx * 240);
    });
  }

  // Play Dog woof
  playWoof() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Play Bunny / Hamster squeak
  playSqueak() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.15);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Play life deducted hurt sound
  playLifeLost() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Realistic soothing Cat Purr generator
  startPurr() {
    if (this.isMuted) return;
    this.init();
    if (this.purrOsc) return;

    // Modulated low rumble
    const now = this.ctx.currentTime;
    this.purrOsc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.purrGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Purr rhythm (around 24-28 Hz breathing rhythm)
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(26, now);

    this.purrOsc.type = 'sawtooth';
    this.purrOsc.frequency.setValueAtTime(75, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    lfoGain.gain.setValueAtTime(30, now);
    lfo.connect(this.purrOsc.frequency);

    this.purrGain.gain.setValueAtTime(0.01, now);
    this.purrGain.gain.linearRampToValueAtTime(0.3, now + 0.3);

    this.purrOsc.connect(filter);
    filter.connect(this.purrGain);
    this.purrGain.connect(this.ctx.destination);

    lfo.start(now);
    this.purrOsc.start(now);
    this.lfo = lfo;
  }

  stopPurr() {
    if (!this.purrOsc) return;
    const now = this.ctx.currentTime;
    try {
      this.purrGain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      setTimeout(() => {
        if (this.purrOsc) {
          this.purrOsc.stop();
          this.purrOsc.disconnect();
          this.purrOsc = null;
        }
        if (this.lfo) {
          this.lfo.stop();
          this.lfo.disconnect();
          this.lfo = null;
        }
      }, 350);
    } catch (e) {
      this.purrOsc = null;
    }
  }

  // Soothing lullaby music box loop
  startBgm() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    // Gentle cozy lullaby melody notes (C, E, G, A, G, F, E, D, C, G)
    const melody = [
      { note: 523.25, dur: 0.8 }, // C5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 783.99, dur: 1.2 }, // G5
      { note: 880.00, dur: 0.8 }, // A5
      { note: 783.99, dur: 1.4 }, // G5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 587.33, dur: 0.8 }, // D5
      { note: 523.25, dur: 1.6 }, // C5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 880.00, dur: 1.0 }, // A5
      { note: 1046.50, dur: 1.6 } // C6
    ];

    let noteIdx = 0;
    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying || this.isMuted) return;
      const current = melody[noteIdx];
      this.playChime(current.note, current.dur, 'triangle', 0.12);
      // Add a subtle soft bass root note occasionally
      if (noteIdx % 4 === 0) {
        this.playChime(current.note / 2, current.dur * 1.5, 'sine', 0.08);
      }
      noteIdx = (noteIdx + 1) % melody.length;
    }, 900);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopPurr();
    }
    return this.isMuted;
  }
}

window.dreamAudio = new DreamAudio();
