import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioEngine } from '../services/audioEngine';

export const SurpriseGift: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isUnwrapping, setIsUnwrapping] = useState(false);

  const handleUnwrap = () => {
    if (isOpened || isUnwrapping) return;
    setIsUnwrapping(true);
    audioEngine.playSparkle();

    setTimeout(() => {
      setIsOpened(true);
      setIsUnwrapping(false);
      audioEngine.playChimeChord();

      // Golden light explosion & heart particle burst
      confetti({
        particleCount: 85,
        spread: 110,
        origin: { y: 0.65 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#bd244b'],
        scalar: 1.25,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 140,
          origin: { y: 0.6 },
          colors: ['#E88CA8', '#F7C5D0'],
          shapes: ['circle'],
        });
      }, 250);
    }, 850);
  };

  const handleWrapAgain = () => {
    audioEngine.playPop();
    setIsOpened(false);
  };

  return (
    <section id="surprise" className="relative py-28 px-4 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[550px] rounded-full bg-gradient-to-tr from-[#D9B76E]/12 via-[#E88CA8]/15 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-12 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              Prepared especially for you
            </span>
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            One More Little Surprise...
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            A token wrapped with care and whispered affection.
          </p>
        </motion.div>

        {/* 3D Gift Box Assembly */}
        <div className="relative max-w-md mx-auto py-8 select-none perspective-[1000px]">
          {/* Subtle pedestal shadow */}
          <div className="w-60 h-10 rounded-[50%] bg-[#400D24]/80 blur-xl mx-auto -mb-4" />

          <div className="relative flex flex-col items-center justify-center">
            {/* The Gift Box */}
            <div className="relative">
              {/* Box Lid with 3D Satin Ribbon Bow */}
              <motion.div
                animate={
                  isOpened
                    ? { y: -80, rotate: -18, opacity: 0.15 }
                    : isUnwrapping
                    ? { y: -18, rotate: -4 }
                    : { y: 0, rotate: 0 }
                }
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 flex flex-col items-center"
              >
                {/* 3D Satin Ribbon Bow */}
                <div className="relative flex items-center justify-center -mb-2 z-30">
                  <div className="w-9 h-9 rounded-[50%_50%_0%_50%] bg-gradient-to-br from-[#fad0db] via-[#f49bb1] to-[#E88CA8] rotate-[-45deg] border border-[#FFF4EA]/60 shadow-lg" />
                  <div className="w-4.5 h-4.5 rounded-full bg-[#D9B76E] border-2 border-white/70 shadow-sm z-10" />
                  <div className="w-9 h-9 rounded-[50%_50%_50%_0%] bg-gradient-to-bl from-[#fad0db] via-[#f49bb1] to-[#E88CA8] rotate-[45deg] border border-[#FFF4EA]/60 shadow-lg" />
                </div>

                {/* Box Lid Geometry */}
                <div className="w-52 sm:w-60 h-13 rounded-t-xl bg-gradient-to-r from-[#dba34c] via-[#D9B76E] to-[#ad8433] border-t-2 border-white/50 shadow-xl relative overflow-hidden flex items-center justify-center">
                  {/* Vertical Satin Ribbon */}
                  <div className="w-9 h-full bg-gradient-to-r from-[#F7C5D0] to-[#E88CA8] shadow-inner" />
                  {/* Satin sheen highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Box Body */}
              <div className="relative z-10 w-48 sm:w-56 h-40 rounded-b-2xl bg-gradient-to-b from-[#bd923f] via-[#D9B76E] to-[#7d5c1a] shadow-2xl overflow-hidden flex items-center justify-center border-b-2 border-black/40">
                {/* Vertical Satin Ribbon */}
                <div className="w-9 h-full bg-gradient-to-r from-[#F7C5D0] to-[#E88CA8] shadow-md flex items-center justify-center">
                  {/* Glowing heart seal */}
                  <div className="w-7 h-7 rounded-full bg-[#400D24] border-2 border-[#D9B76E] flex items-center justify-center shadow-md">
                    <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
                  </div>
                </div>

                {/* Horizontal Satin Ribbon */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 bg-gradient-to-b from-[#F7C5D0] to-[#E88CA8] shadow-md pointer-events-none" />

                {/* Golden light beam from inside when open */}
                {isOpened && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-radial from-[#FFF4EA] via-[#D9B76E] to-transparent blur-md"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Surprise Action & Reveal Card */}
        <div className="space-y-6 max-w-lg mx-auto">
          {!isOpened ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <button
                onClick={handleUnwrap}
                disabled={isUnwrapping}
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_0_35px_rgba(217,183,110,0.4)] cursor-pointer disabled:opacity-75"
              >
                <Gift className="w-4 h-4 text-[#6e112c]" />
                <span>{isUnwrapping ? 'Untying ribbons...' : 'Unwrap Your Surprise'}</span>
                <Sparkles className="w-4 h-4 text-[#6e112c] group-hover:rotate-12 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#2e1024] via-[#240e1d] to-[#150612] border-2 border-[#D9B76E]/50 shadow-2xl space-y-6"
            >
              <div className="flex justify-center text-[#D9B76E]">
                <Heart className="w-10 h-10 fill-[#E88CA8] text-[#E88CA8] animate-bounce" />
              </div>

              <div className="space-y-2.5">
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wider gold-gradient-text uppercase leading-snug">
                  {birthdayConfig.surpriseMessage1}
                </h3>
                <p className="font-cormorant italic text-xl sm:text-2xl text-[#F7C5D0] leading-relaxed pt-1 font-light">
                  &ldquo;{birthdayConfig.surpriseMessage2}&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#FFF4EA]/90 font-light max-w-sm mx-auto leading-relaxed pt-2">
                I hope you always remember how much warmth and happiness you bring just by being around. Never stop being the remarkable, kind person you are.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleWrapAgain}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider text-[#FFF4EA]/70 hover:text-[#FFF4EA] border border-white/20 hover:border-[#D9B76E]/50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Wrap box again</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
