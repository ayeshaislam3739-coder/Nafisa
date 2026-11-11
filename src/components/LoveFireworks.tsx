import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioEngine } from '../services/audioEngine';

interface LoveFireworksProps {
  onPetalSurge: () => void;
}

export const LoveFireworks: React.FC<LoveFireworksProps> = ({ onPetalSurge }) => {
  const [wishRevealed, setWishRevealed] = useState(false);
  const [isFiring, setIsFiring] = useState(false);

  const handleLightUp = () => {
    setIsFiring(true);
    setWishRevealed(true);
    onPetalSurge();
    audioEngine.playSparkle();

    // Heart-shaped fireworks burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#E88CA8', '#F7C5D0', '#D9B76E', '#FFF4EA', '#bd244b'];

    const interval: NodeJS.Timeout = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        setIsFiring(false);
        return;
      }

      confetti({
        particleCount: 12,
        spread: 360,
        startVelocity: 30,
        origin: {
          x: 0.2 + Math.random() * 0.6,
          y: 0.3 + Math.random() * 0.3,
        },
        colors,
        shapes: ['circle', 'star'],
        scalar: 1.2,
      });
    }, 200);

    setTimeout(() => {
      audioEngine.playChimeChord();
    }, 800);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden text-center">
      <div className="relative max-w-4xl mx-auto space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              Celestial Radiance
            </span>
            <Flame className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Light Up Your Happiness
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            Ignite a cascade of golden stars, heart fireworks, and falling rose petals.
          </p>
        </motion.div>

        <div>
          <button
            onClick={handleLightUp}
            disabled={isFiring}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_35px_rgba(217,183,110,0.4)] cursor-pointer disabled:opacity-75"
          >
            <Sparkles className="w-4 h-4 text-[#6e112c]" />
            <span>{isFiring ? 'Lighting the Sky...' : 'Light Up Your Happiness'}</span>
            <Heart className="w-4 h-4 fill-[#6e112c] text-[#6e112c] group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Revealed Birthday Wish */}
        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence>
            {wishRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl p-6 rounded-3xl bg-[#2e1024]/70 border border-[#D9B76E]/40 backdrop-blur-md shadow-2xl space-y-2"
              >
                <div className="inline-flex items-center gap-2 text-[#D9B76E]">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold text-[#D9B76E]">
                    A Sky Full of Wishes for Nafisa
                  </span>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <p className="font-playfair text-xl sm:text-2xl font-bold gold-gradient-text uppercase">
                  May your year shine with unfading brilliance and endless reasons to smile.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
