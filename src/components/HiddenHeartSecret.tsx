import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, X, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioEngine } from '../services/audioEngine';

export const HiddenHeartSecret: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const secret = birthdayConfig.hiddenHeartSecret;

  const handleOpen = () => {
    audioEngine.playChimeChord();
    setIsOpen(true);

    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#bd244b'],
      scalar: 1.2,
    });
  };

  return (
    <>
      {/* Subtle Glowing Hidden Heart Element nestled in a corner */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleOpen}
          aria-label="A subtle glowing keepsake"
          className="group relative p-2.5 rounded-full bg-[#240e1d]/70 hover:bg-[#34122b] border border-[#D9B76E]/30 hover:border-[#D9B76E] backdrop-blur-xs transition-all duration-300 shadow-md cursor-pointer"
          title="A little secret..."
        >
          <span className="absolute -inset-1 rounded-full bg-[#E88CA8] opacity-25 blur-xs group-hover:opacity-60 transition-opacity animate-pulse" />
          <Heart className="w-4 h-4 fill-[#E88CA8]/70 text-[#E88CA8] group-hover:fill-[#E88CA8] group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Secret Experience Full-Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/92 backdrop-blur-2xl"
            onClick={() => setIsOpen(false)}
          >
            {/* Cinematic Large Radiant 3D Heart in Center */}
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full text-center p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#330f28] via-[#200a1b] to-[#0d030c] border-2 border-[#D9B76E]/60 shadow-[0_0_80px_rgba(232,140,168,0.3)] space-y-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF4EA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Heart Icon */}
              <div className="flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1, 1.15, 1],
                    filter: [
                      'drop-shadow(0 0 15px rgba(232,140,168,0.6))',
                      'drop-shadow(0 0 35px rgba(217,183,110,0.9))',
                      'drop-shadow(0 0 15px rgba(232,140,168,0.6))',
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8c1839] via-[#610a22] to-[#30030e] border-2 border-[#D9B76E] shadow-2xl flex items-center justify-center"
                >
                  <Heart className="w-12 h-12 fill-[#E88CA8] text-[#E88CA8]" />
                </motion.div>
              </div>

              {/* Secret Messages */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-bold text-[#D9B76E]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Secret Kept for You</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF4EA] leading-relaxed uppercase gold-gradient-text">
                  &ldquo;{secret.message1}&rdquo;
                </h3>

                <p className="font-cormorant italic text-xl sm:text-2xl text-[#F7C5D0] pt-2">
                  &ldquo;{secret.message2}&rdquo;
                </p>
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-[#D9B76E]/30 text-right">
                <p className="font-script text-3xl sm:text-4xl text-[#D9B76E]">
                  {secret.signature}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
