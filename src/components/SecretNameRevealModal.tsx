import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface SecretNameRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretNameRevealModal: React.FC<SecretNameRevealModalProps> = ({
  isOpen,
  onClose,
}) => {
  const letters = ['N', 'A', 'F', 'I', 'S', 'A'];
  const [revealedCount, setRevealedCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setRevealedCount(0);
      setShowMessage(false);
      setShowHeart(false);
      return;
    }

    setRevealedCount(0);
    setShowMessage(false);
    setShowHeart(false);

    // Letter-by-letter reveal timer sequence (~3.5 seconds total)
    const timers: NodeJS.Timeout[] = [];

    letters.forEach((_, idx) => {
      const t = setTimeout(() => {
        setRevealedCount(idx + 1);
      }, 400 + idx * 420);
      timers.push(t);
    });

    // Glowing heart appears after all letters appear (~2.9s)
    const heartTimer = setTimeout(() => {
      setShowHeart(true);
      confetti({
        particleCount: 35,
        spread: 80,
        origin: { y: 0.45 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
        scalar: 1.1,
      });
    }, 400 + letters.length * 420 + 200);
    timers.push(heartTimer);

    // Secret emotional message reveals shortly after (~3.4s)
    const msgTimer = setTimeout(() => {
      setShowMessage(true);
    }, 400 + letters.length * 420 + 600);
    timers.push(msgTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, animationKey]);

  const handleReplay = () => {
    setAnimationKey((k) => k + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/88 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Ambient Soft Romantic Halo */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#400D24]/40 via-[#D9B76E]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#2e1024]/95 via-[#200c1c]/95 to-[#120510]/98 border-2 border-[#D9B76E]/60 shadow-[0_0_60px_rgba(217,183,110,0.3)] text-center space-y-7"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF4EA] transition-colors cursor-pointer"
              aria-label="Close surprise"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Secret Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D9B76E]/40 bg-[#2b1022]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
              <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold text-[#D9B76E]">
                The Secret Inside Your Name
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
            </div>

            {/* Character-by-Character Name Reveal: N → A → F → I → S → A */}
            <div className="py-4">
              <div className="flex justify-center items-center gap-2 sm:gap-3.5">
                {letters.map((char, index) => {
                  const isVisible = index < revealedCount;
                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      animate={
                        isVisible
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0.15, y: 15, scale: 0.85 }
                      }
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="relative flex flex-col items-center"
                    >
                      <span
                        className={`font-playfair text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider transition-all duration-300 ${
                          isVisible
                            ? 'gold-gradient-text drop-shadow-[0_0_20px_rgba(217,183,110,0.7)]'
                            : 'text-[#FFF4EA]/15'
                        }`}
                      >
                        {char}
                      </span>

                      {/* Sparkle burst marker as letter appears */}
                      {isVisible && (
                        <motion.div
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: [0, 1.3, 0], opacity: [1, 0.8, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute -top-2 text-[#D9B76E]"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Glowing Heart beneath revealed name */}
              <div className="h-10 mt-3 flex justify-center items-center">
                <AnimatePresence>
                  {showHeart && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.25, 1], opacity: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="text-[#E88CA8] drop-shadow-[0_0_15px_rgba(232,140,168,0.8)]"
                    >
                      <Heart className="w-7 h-7 fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Secret Message Revealed Gradually */}
            <div className="min-h-[140px] flex flex-col justify-center">
              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                  >
                    <p className="font-playfair text-xl sm:text-2xl font-bold gold-gradient-text uppercase tracking-widest">
                      &ldquo;NAFISA...&rdquo;
                    </p>

                    <p className="font-cormorant italic text-lg sm:text-2xl text-[#FFF4EA] leading-relaxed font-light">
                      &ldquo;Even the most beautiful words in the world could never fully describe how special you are to me.&rdquo;
                    </p>

                    <p className="font-cormorant text-base sm:text-xl text-[#F7C5D0] leading-relaxed">
                      You will always have a beautiful place in my heart. ❤️
                    </p>

                    <div className="pt-3 border-t border-[#D9B76E]/30 text-right">
                      <p className="font-script text-2xl sm:text-4xl text-[#D9B76E]">
                        — With Love, {birthdayConfig.creatorName}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Replay and Close Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-[#D9B76E]/20 text-xs">
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-[#D9B76E] border border-[#D9B76E]/30 hover:bg-[#D9B76E]/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Secret</span>
              </button>

              <button
                onClick={onClose}
                className="text-[#FFF4EA]/70 hover:text-white transition-colors cursor-pointer font-cormorant uppercase tracking-wider text-xs"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
