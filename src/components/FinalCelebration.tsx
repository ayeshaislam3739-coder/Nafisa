import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, ArrowUp, Compass } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

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

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="finale" className="relative flex flex-col justify-between py-12 sm:py-16 px-4 overflow-hidden">
      {/* Cinematic Glowing Background Aura */}
      <div className="absolute inset-0 bg-radial from-[#2C0612] via-[#120308] to-[#050103] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[460px] rounded-full bg-gradient-to-tr from-[#D9B76E]/15 via-[#8E1534]/22 to-transparent blur-[120px] pointer-events-none" />

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

      <div className="relative max-w-3xl mx-auto text-center space-y-7 my-auto z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <p className="font-script text-3xl sm:text-5xl text-[#F7C5D0]">
            An Eternal Birthday Tribute
          </p>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold tracking-wider gold-gradient-text uppercase leading-tight">
            MADE WITH ENDLESS LOVE ❤️
          </h2>

          <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA]/85 max-w-xl mx-auto font-light leading-relaxed">
            &ldquo;Every little detail, every hidden message, and every beautiful moment was created to make you feel special.&rdquo;
          </p>
        </motion.div>

        {/* TEMPLATE D — THE FOREVER LETTER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-left"
        >
          <VintageLetterCard
            variant="forever"
            showWaxSeal
            waxSealLabel="The Forever Letter"
            className="p-6 sm:p-11 space-y-5"
          >
            <p className="font-script text-3xl sm:text-4xl text-[#7A122E] pt-1">
              {finalLetter.salutation}
            </p>

            <div className="space-y-4 font-cormorant text-lg sm:text-2xl text-[#260D14] leading-relaxed font-medium">
              {finalLetter.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === finalLetter.paragraphs.length - 1
                      ? 'font-bold text-[#7A122E]'
                      : ''
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-5 border-t border-[#7A1530]/20 space-y-1 text-right">
              <p className="font-cormorant italic text-base text-[#5C1225]">
                {finalLetter.closingLine}
              </p>
              <p className="font-script text-3xl sm:text-4xl text-[#7A122E]">
                {finalLetter.signOff}
              </p>
            </div>
          </VintageLetterCard>
        </motion.div>

        {/* Highlight Banner: THIS WORLD IS A LITTLE MORE BEAUTIFUL WITH YOU IN IT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="py-2"
        >
          <div className="inline-block px-7 py-3 rounded-full border border-[#D9B76E]/50 bg-[#1B040D]/80 backdrop-blur-md shadow-xl">
            <p className="font-playfair text-base sm:text-xl font-bold tracking-widest gold-gradient-text uppercase">
              {finalLetter.highlightBanner}
            </p>
          </div>
        </motion.div>

        {/* Glowing Calls to Action: EXPLORE OUR STORY + Celebrate One More Time */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToStory}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_0_32px_rgba(217,183,110,0.45)] cursor-pointer whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-[#6e112c]" />
            <span>EXPLORE OUR STORY</span>
          </button>

          <button
            onClick={handleCelebrateAgain}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#FFF4EA] bg-[#1E050E]/90 border border-[#D9B76E]/55 hover:border-[#D9B76E] hover:scale-[1.03] transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
          >
            <PartyPopper className="w-4 h-4 text-[#D9B76E]" />
            <span>Celebrate One More Time</span>
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

      {/* Footer Closing Bar */}
      <div className="relative max-w-6xl mx-auto w-full pt-8 mt-8 space-y-4 border-t border-[#D9B76E]/20 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF4EA]/65">
          <p className="font-light">
            Crafted with devotion by{' '}
            <span className="text-[#D9B76E] font-medium">{birthdayConfig.creatorName}</span> for{' '}
            <span className="text-[#E88CA8] font-medium">{birthdayConfig.birthdayName}</span>.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:border-[#D9B76E]/50 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to beginning</span>
          </button>
        </div>

        <div className="pt-2 border-t border-[#D9B76E]/10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#D9B76E]/75">
          <Heart className="w-3 h-3 text-[#9E1938] fill-current" />
          <span>Birthdays · Cherished Memories · Love Letters · Project {birthdayConfig.birthdayName}</span>
          <Heart className="w-3 h-3 text-[#9E1938] fill-current" />
        </div>
      </div>
    </footer>
  );
};
