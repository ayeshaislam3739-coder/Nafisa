import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, ArrowUp } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface FinalCelebrationProps {
  onPetalSurge: () => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({ onPetalSurge }) => {
  const [celebrationActive, setCelebrationActive] = useState(false);
  const { finalLetter } = birthdayConfig;

  const handleCelebrateAgain = () => {
    setCelebrationActive(true);
    onPetalSurge();

    // Cinematic fireworks volley across the screen
    const duration = 2.2 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#bd244b'],
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#bd244b'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Center grand bursts
    setTimeout(() => {
      confetti({
        particleCount: 110,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
        shapes: ['star', 'circle'],
        scalar: 1.3,
      });
    }, 600);

    setTimeout(() => {
      setCelebrationActive(false);
    }, 5500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="finale" className="relative min-h-[95vh] flex flex-col justify-between py-28 px-4 overflow-hidden">
      {/* Cinematic Glowing Background Aura */}
      <div className="absolute inset-0 bg-radial from-[#380e22] via-[#1d0b1a] to-[#0c030d] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-[#D9B76E]/18 via-[#E88CA8]/18 to-transparent blur-[120px] pointer-events-none" />

      {/* Floating Sparkles & Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 0.7, 0] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2.5,
              ease: 'linear',
            }}
            className="absolute text-[#D9B76E]/30"
            style={{ left: `${(i * 30 + 15) % 85}%` }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto text-center space-y-12 my-auto z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
            <span className="font-script text-3xl sm:text-5xl text-[#F7C5D0]">
              An eternal wish
            </span>
            <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider gold-gradient-text uppercase leading-tight">
            {birthdayConfig.finaleHeading}
          </h2>
        </motion.div>

        {/* Final Emotional Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#2e1024]/90 via-[#240e1d]/95 to-[#150612] border-2 border-[#D9B76E]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 text-left"
        >
          <p className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
            {finalLetter.salutation}
          </p>

          <div className="space-y-4 font-cormorant text-lg sm:text-2xl text-[#FFF4EA] leading-relaxed font-light">
            {finalLetter.paragraphs.map((p, idx) => (
              <p key={idx} className={idx === finalLetter.paragraphs.length - 1 ? 'font-semibold text-[#D9B76E]' : ''}>
                {p}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-[#D9B76E]/30 space-y-1 text-right">
            <p className="font-cormorant italic text-base text-[#F7C5D0]">
              {finalLetter.closingLine}
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#D9B76E]">
              {finalLetter.signOff}
            </p>
          </div>
        </motion.div>

        {/* Highlight Banner: THIS WORLD IS A LITTLE MORE BEAUTIFUL WITH YOU IN IT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-4"
        >
          <div className="inline-block px-8 py-3.5 rounded-full border border-[#D9B76E]/50 bg-[#2b1022]/70 backdrop-blur-md shadow-xl">
            <p className="font-playfair text-lg sm:text-2xl font-bold tracking-widest gold-gradient-text uppercase">
              {finalLetter.highlightBanner}
            </p>
          </div>
        </motion.div>

        {/* Celebrate One More Time Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-2"
        >
          <button
            onClick={handleCelebrateAgain}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_35px_rgba(217,183,110,0.4)] cursor-pointer"
          >
            <PartyPopper className="w-4 h-4 text-[#6e112c]" />
            <span>Celebrate One More Time</span>
            <Sparkles className="w-4 h-4 text-[#6e112c] group-hover:rotate-45 transition-transform" />
          </button>
        </motion.div>

        {/* Replay Banner Message if active */}
        <AnimatePresence>
          {celebrationActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="py-2"
            >
              <p className="font-playfair text-2xl sm:text-4xl font-bold tracking-widest gold-gradient-text uppercase animate-pulse">
                Happy Birthday, {birthdayConfig.birthdayName}!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Bar */}
      <div className="relative max-w-6xl mx-auto w-full pt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF4EA]/60 border-t border-[#D9B76E]/20 z-10">
        <p className="font-light">
          Crafted with devotion by <span className="text-[#D9B76E] font-medium">{birthdayConfig.creatorName}</span> for <span className="text-[#E88CA8] font-medium">{birthdayConfig.birthdayName}</span>.
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:border-[#D9B76E]/50 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to beginning</span>
        </button>
      </div>
    </footer>
  );
};
