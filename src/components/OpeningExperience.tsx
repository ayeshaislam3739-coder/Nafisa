import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface OpeningExperienceProps {
  onEnter: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onEnter }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterWorld = () => {
    setIsTransitioning(true);

    // Burst 1: Champagne gold stars & sparkles
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
      shapes: ['star', 'circle'],
      scalar: 1.1,
      ticks: 160,
    });

    // Trigger parent callback after transition unfolds smoothly
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.div
          key="opening-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-radial from-[#2b0612] via-[#130309] to-[#050103]"
        >
          {/* Subtle glowing halo */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-[#9E1938]/18 blur-2xl pointer-events-none" />
          <div className="absolute w-[260px] h-[260px] rounded-full bg-[#D9B76E]/12 blur-xl pointer-events-none" />

          {/* Floating subtle ambient heart dust */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: '105vh',
                  x: `${(i * 24 + 12) % 90}vw`,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: '-10vh',
                  opacity: [0, 0.6, 0.8, 0],
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: 'linear',
                }}
                className="absolute text-[#9E1938]/35"
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-xl w-full text-center space-y-8 z-10">
            {/* Elegant seal badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D9B76E]/35 bg-[#1b040c]/75 backdrop-blur-md shadow-lg shadow-black/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#D9B76E]/90 font-medium">
                Created with Love by {birthdayConfig.creatorName}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
            </motion.div>

            {/* Central Romantic Invitation */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-script text-3xl sm:text-4xl md:text-5xl text-[#F7C5D0] tracking-wide"
              >
                For my dearest {birthdayConfig.birthdayName}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#FFF4EA] font-semibold tracking-wider uppercase leading-tight"
              >
                A Little World, <br />
                <span className="gold-gradient-text">Made Just For You...</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-sm sm:text-base text-[#FFF4EA]/85 max-w-md mx-auto font-light leading-relaxed"
              >
                I prepared this little surprise just for you, hoping it brings a genuine smile to your face.
              </motion.p>
            </div>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="pt-2"
            >
              <button
                onClick={handleEnterWorld}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] hover:from-[#FFF0D0] hover:to-[#D9B76E] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(217,183,110,0.35)] cursor-pointer"
              >
                <span>Enter Your World</span>
                <Heart className="w-4 h-4 fill-[#6e112c] text-[#6e112c] group-hover:scale-125 transition-transform duration-300" />
                
                {/* Glow ring */}
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D9B76E] to-[#E88CA8] opacity-30 blur-md group-hover:opacity-70 transition-opacity -z-10" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
