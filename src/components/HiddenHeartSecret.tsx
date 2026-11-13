import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, X, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

export const HiddenHeartSecret: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const secret = birthdayConfig.hiddenHeartSecret;

  const handleOpen = () => {
    setIsOpen(true);

    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#bd244b'],
      scalar: 1.1,
    });
  };

  return (
    <>
      {/* Subtle Glowing Hidden Heart Element nestled in a corner */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleOpen}
          aria-label="A subtle glowing keepsake"
          className="group relative p-2.5 rounded-full bg-[#1C040C]/85 hover:bg-[#310816] border border-[#D9B76E]/40 hover:border-[#D9B76E] backdrop-blur-xs transition-all duration-300 shadow-lg cursor-pointer"
          title="A little secret..."
        >
          <span className="absolute -inset-1 rounded-full bg-[#9E1938] opacity-30 blur-xs group-hover:opacity-65 transition-opacity animate-pulse" />
          <Heart className="w-4 h-4 fill-[#D9B76E]/80 text-[#D9B76E] group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Secret Experience Full-Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-6 bg-black/92 backdrop-blur-2xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <VintageLetterCard
                variant="secret"
                showWaxSeal
                waxSealLabel="The Secret Kept For You"
                className="p-6 sm:p-12 text-center space-y-6"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#7A1530]/10 hover:bg-[#7A1530]/20 text-[#4D0E1F] transition-colors cursor-pointer"
                  aria-label="Close secret"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Secret Messages */}
                <div className="space-y-4 pt-1">
                  <div className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase font-bold text-[#7A122E]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Written For Your Eyes Only</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>

                  <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-[#240910] leading-relaxed uppercase">
                    &ldquo;{secret.message1}&rdquo;
                  </h3>

                  <p className="font-cormorant italic text-xl sm:text-2xl text-[#5C1225] pt-1 font-medium">
                    &ldquo;{secret.message2}&rdquo;
                  </p>
                </div>

                {/* Signature */}
                <div className="pt-4 border-t border-[#7A1530]/25 text-right">
                  <p className="font-script text-3xl sm:text-4xl text-[#7A122E]">
                    {secret.signature}
                  </p>
                </div>
              </VintageLetterCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
