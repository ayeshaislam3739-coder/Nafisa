/**
 * Universal Mind-Relaxing Audio Engine
 * Supports:
 * 1. Studio-grade Web Audio API polyphonic Ambient Piano & Warm Cinematic Pad serenade
 * 2. Optional local/external MP3 file (/audio/romantic-ambient.mp3) with seamless looping
 * 3. Smooth volume fading, Master Gain, and Real-time frequency AnalyserNode for audio visualization
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private volume = 0.75;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customSource: MediaElementAudioSourceNode | null = null;
  private synthTimer: number | null = null;
  private padOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private step = 0;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private volumeListeners: Set<(volume: number) => void> = new Set();

  // Romantic, peaceful, mind-relaxing chord progressions (Eb Major / C minor serenade)
  // Peaceful, slow, heartfelt piano chords with gentle high register reflections
  private chords = [
    // Ebmaj9 (Peaceful, warm morning light)
    {
      padFreqs: [155.56, 233.08, 311.13, 392.00], // Eb3, Bb3, Eb4, G4
      pianoMelody: [392.00, 466.16, 587.33, 622.25, 587.33, 466.16], // G4, Bb4, D5, Eb5, D5, Bb4
      duration: 5.5,
    },
    // Gm7 (Reflective, gentle emotional depth)
    {
      padFreqs: [146.83, 220.00, 293.66, 349.23], // D3, A3, D4, F4
      pianoMelody: [349.23, 440.00, 523.25, 587.33, 523.25, 440.00], // F4, A4, C5, D5, C5, A4
      duration: 5.5,
    },
    // Abmaj7 (Warm, heartfelt affection)
    {
      padFreqs: [130.81, 207.65, 261.63, 329.63], // C3, Ab3, C4, E4
      pianoMelody: [329.63, 415.30, 523.25, 659.25, 523.25, 415.30], // E4, Ab4, C5, E5, C5, Ab4
      duration: 5.5,
    },
    // Bb7sus4 -> Bb (Soft resolution)
    {
      padFreqs: [116.54, 174.61, 233.08, 349.23], // Bb2, F3, Bb3, F4
      pianoMelody: [349.23, 466.16, 523.25, 587.33, 466.16, 392.00], // F4, Bb4, C5, D5, Bb4, G4
      duration: 5.5,
    },
    // Cm9 (Tender, poetic connection)
    {
      padFreqs: [130.81, 196.00, 261.63, 311.13], // C3, G3, C4, Eb4
      pianoMelody: [311.13, 392.00, 466.16, 523.25, 466.16, 392.00], // Eb4, G4, Bb4, C5, Bb4, G4
      duration: 5.5,
    },
    // Fm9 -> Bb (Gentle cadence)
    {
      padFreqs: [174.61, 261.63, 349.23, 415.30], // F3, C4, F4, Ab4
      pianoMelody: [415.30, 523.25, 622.25, 698.46, 622.25, 523.25], // Ab4, C5, Eb5, F5, Eb5, C5
      duration: 6.0,
    },
  ];

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public subscribeVolume(cb: (vol: number) => void) {
    this.volumeListeners.add(cb);
    return () => {
      this.volumeListeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  private notifyVolume() {
    this.volumeListeners.forEach((cb) => cb(this.volume));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
    this.notifyVolume();
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.src = '';
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
      if (this.ctx && this.masterGain) {
        try {
          this.customSource = this.ctx.createMediaElementSource(this.customAudio);
          this.customSource.connect(this.masterGain);
        } catch {
          // Cross-origin fallback
        }
      }
    } else {
      this.customAudio = null;
    }
  }

  public async togglePlay(customUrl?: string): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play(customUrl);
      return true;
    }
  }

  public async play(customUrl?: string) {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (customUrl) {
      if (!this.customAudio || this.customAudio.src !== customUrl) {
        this.setCustomAudioUrl(customUrl);
      }
    }

    if (this.customAudio) {
      try {
        await this.customAudio.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch {
        // Fallback to internal ambient piano synth if media blocked or missing
      }
    }

    // Smooth fade-in
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 1.8);
    }

    this.isPlaying = true;
    this.notify();
    this.step = 0;
    this.playNextAmbientChord();
  }

  private playNextAmbientChord = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const chord = this.chords[this.step % this.chords.length];
    this.triggerAmbientChord(chord);
    this.step++;

    const delay = chord.duration * 1000;
    this.synthTimer = window.setTimeout(this.playNextAmbientChord, delay);
  };

  private triggerAmbientChord(chord: { padFreqs: number[]; pianoMelody: number[]; duration: number }) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const dur = chord.duration;

    // 1. Ambient Warm Pad Drone (Cinematic Strings / Analog Warmth)
    const padFilter = this.ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(750, now);
    padFilter.frequency.exponentialRampToValueAtTime(1100, now + dur * 0.5);
    padFilter.frequency.exponentialRampToValueAtTime(700, now + dur);

    const padGain = this.ctx.createGain();
    padGain.gain.setValueAtTime(0.001, now);
    padGain.gain.linearRampToValueAtTime(0.08, now + 1.2);
    padGain.gain.linearRampToValueAtTime(0.001, now + dur + 0.8);

    padFilter.connect(padGain);
    padGain.connect(this.masterGain);

    chord.padFreqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for rich ensemble chorusing
      osc.detune.setValueAtTime((idx - 1.5) * 4, now);

      osc.connect(padFilter);
      osc.start(now);
      osc.stop(now + dur + 1.0);
    });

    // 2. Delicate Felt Piano Arpeggio Notes
    chord.pianoMelody.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const noteTime = now + 0.6 + idx * 0.75;
      if (noteTime > now + dur) return;

      const pOsc1 = this.ctx.createOscillator();
      const pOsc2 = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();
      const pFilter = this.ctx.createBiquadFilter();

      pOsc1.type = 'sine';
      pOsc1.frequency.setValueAtTime(freq, noteTime);

      pOsc2.type = 'triangle';
      pOsc2.frequency.setValueAtTime(freq * 2, noteTime); // Harmonic overtone

      pFilter.type = 'lowpass';
      pFilter.frequency.setValueAtTime(1800, noteTime);

      pGain.gain.setValueAtTime(0.0001, noteTime);
      pGain.gain.linearRampToValueAtTime(0.09, noteTime + 0.04);
      pGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.2);

      pOsc1.connect(pGain);
      pOsc2.connect(pGain);
      pGain.connect(pFilter);
      pFilter.connect(this.masterGain);

      pOsc1.start(noteTime);
      pOsc2.start(noteTime);
      pOsc1.stop(noteTime + 2.3);
      pOsc2.stop(noteTime + 2.3);
    });
  }

  public pause() {
    if (!this.isPlaying) return;

    // Smooth fade-out before stopping
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      setTimeout(() => {
        if (this.synthTimer) {
          window.clearTimeout(this.synthTimer);
          this.synthTimer = null;
        }
        if (this.customAudio) {
          this.customAudio.pause();
        }
        this.isPlaying = false;
        this.notify();
      }, 850);
    } else {
      this.isPlaying = false;
      this.notify();
    }
  }

  // Interactive Sound Effects
  public playPop() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // AudioContext unavailable
    }
  }

  public playSparkle() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const notes = [1046.5, 1318.5, 1567.98, 2093.0];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime + idx * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.45);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  public playBlow() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;

      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.8);

      setTimeout(() => {
        this.playSparkle();
      }, 700);
    } catch {
      // AudioContext unavailable
    }
  }

  public playChimeChord() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 1.25);
      });
    } catch {
      // AudioContext unavailable
    }
  }
}

export const audioEngine = new AudioEngine();
