import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings, X, Upload, Sliders } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { birthdayConfig } from '../config/birthdayConfig';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(audioEngine.getVolume());
  const [showSettings, setShowSettings] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState(birthdayConfig.music.audioUrl || '');
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>([4, 8, 14, 6, 12]);

  useEffect(() => {
    const unsubPlay = audioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });

    const unsubVol = audioEngine.subscribeVolume((vol) => {
      setVolume(vol);
    });

    return () => {
      unsubPlay();
      unsubVol();
    };
  }, []);

  // Real frequency or smooth atmospheric waveform animation
  useEffect(() => {
    let animId: number;

    const tick = () => {
      if (isPlaying) {
        const freqData = audioEngine.getFrequencyData();
        if (freqData.length >= 5 && freqData[0] > 0) {
          const heights = [
            Math.max(4, (freqData[0] / 255) * 18),
            Math.max(4, (freqData[2] / 255) * 22),
            Math.max(4, (freqData[4] / 255) * 24),
            Math.max(4, (freqData[6] / 255) * 19),
            Math.max(4, (freqData[8] / 255) * 16),
          ];
          setVisualizerHeights(heights);
        } else {
          // Relaxing slow pulse simulation
          const t = Date.now() * 0.003;
          setVisualizerHeights([
            6 + Math.sin(t) * 5,
            10 + Math.cos(t * 1.2) * 8,
            14 + Math.sin(t * 0.8) * 7,
            9 + Math.cos(t * 1.5) * 6,
            6 + Math.sin(t * 1.1) * 5,
          ]);
        }
      } else {
        setVisualizerHeights([3, 3, 3, 3, 3]);
      }
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  const toggleMusic = async () => {
    await audioEngine.togglePlay(customAudioUrl);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      audioEngine.setCustomAudioUrl(url);
      if (isPlaying) {
        audioEngine.play(url);
      }
    }
  };

  const handleApplyAudioUrl = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.setCustomAudioUrl(customAudioUrl);
    if (isPlaying) {
      audioEngine.play(customAudioUrl);
    }
    setShowSettings(false);
  };

  return (
    <>
      {/* Floating Music Control Bar (Bottom-right, raised slightly on mobile to avoid overlapping) */}
      <aside
        aria-label="Relaxing ambient music controls"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#200a1b]/95 border border-[#D9B76E]/40 backdrop-blur-md shadow-2xl text-[#FFF4EA] transition-all hover:border-[#D9B76E]">
          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 text-xs font-medium cursor-pointer group"
            title={isPlaying ? 'Pause relaxing serenade' : 'Play relaxing serenade'}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            <div
              className={`p-1.5 rounded-full transition-colors ${
                isPlaying ? 'bg-[#D9B76E] text-[#1a0815]' : 'bg-white/10 text-[#FFF4EA] group-hover:bg-[#D9B76E]/20'
              }`}
            >
              {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </div>

            <span className="hidden sm:inline-block tracking-wider uppercase text-[10px] font-semibold text-[#D9B76E]">
              {isPlaying ? 'Relaxing Music' : 'Tap to Play Music'}
            </span>
          </button>

          {/* Animated Waveform Visualizer */}
          <div className="flex items-end gap-1 h-5 px-1" aria-hidden="true">
            {visualizerHeights.map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-[#D9B76E] to-[#E88CA8] transition-all duration-75"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          {/* Inline Volume Slider on Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 pl-1 border-l border-[#D9B76E]/20">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-[#4a142e] rounded-lg appearance-none cursor-pointer accent-[#D9B76E]"
              title={`Volume: ${Math.round(volume * 100)}%`}
              aria-label="Volume slider"
            />
          </div>

          {/* Settings Trigger */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-1 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
            title="Music Settings & Custom Track"
            aria-label="Open music settings"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Music Settings & Volume Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-md w-full rounded-3xl bg-[#280e21] border border-[#D9B76E]/50 p-6 sm:p-8 shadow-2xl text-left space-y-5">
            <div className="flex justify-between items-center border-b border-[#D9B76E]/30 pb-3">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#D9B76E]" />
                <h3 className="font-playfair text-xl text-[#FFF4EA] font-bold">
                  Mind-Relaxing Serenade
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#FFF4EA]/85">
              <div>
                <p className="font-semibold text-[#D9B76E]">{birthdayConfig.music.title}</p>
                <p className="text-[11px] text-[#FFF4EA]/60 pt-0.5">
                  Universal mind-relaxing piano melodies with gentle ambient pads, creating a peaceful and dreamy atmosphere.
                </p>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-[#D9B76E] font-semibold">
                  <span>Volume Level</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-[#400D24] rounded-lg appearance-none cursor-pointer accent-[#D9B76E]"
                />
              </div>

              <form onSubmit={handleApplyAudioUrl} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[#D9B76E] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                    Upload Custom Audio Track
                  </label>
                  <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-[#D9B76E]/40 bg-[#1d0718] hover:bg-[#2b0c24] cursor-pointer text-white/80 transition-colors">
                    <Upload className="w-4 h-4 text-[#D9B76E]" />
                    <span>Select audio file (MP3/WAV)</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[#D9B76E] mb-1 font-semibold uppercase tracking-wider text-[10px]">
                    Or Audio File URL
                  </label>
                  <input
                    type="url"
                    value={customAudioUrl}
                    onChange={(e) => setCustomAudioUrl(e.target.value)}
                    placeholder="/audio/romantic-ambient.mp3 or https://..."
                    className="w-full px-3 py-2 rounded-xl bg-[#1d0718] border border-[#D9B76E]/30 text-white focus:outline-none focus:border-[#D9B76E]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomAudioUrl('');
                      audioEngine.setCustomAudioUrl('');
                      setShowSettings(false);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white"
                  >
                    Reset to Peaceful Piano
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg font-semibold bg-[#D9B76E] text-[#1a0815] hover:bg-[#FFF0D0]"
                  >
                    Save & Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
