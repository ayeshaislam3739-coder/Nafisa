import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, Stars, Gift, ShieldCheck, LockOpen } from 'lucide-react';
import { birthdayConfig, LoveButtonData } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

export const InteractiveLoveButtons: React.FC = () => {
  const [activeButton, setActiveButton] = useState<LoveButtonData | null>(null);
  const [fullScreenActive, setFullScreenActive] = useState<LoveButtonData | null>(null);
  const buttons = birthdayConfig.loveButtons;

  const handleButtonClick = (btn: LoveButtonData) => {
    if (btn.isFullScreen) {
      setFullScreenActive(btn);
      setActiveButton(null);

      confetti({
        particleCount: 45,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
      });
    } else {
      setActiveButton(activeButton?.id === btn.id ? null : btn);
      setFullScreenActive(null);
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'special':
        return <Stars className="w-4 h-4" />;
      case 'secret':
        return <LockOpen className="w-4 h-4" />;
      case 'wish':
        return <Gift className="w-4 h-4" />;
      case 'promise':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4 fill-current" />;
    }
  };

  return (
    <section id="discover-heart" className="relative py-12 sm:py-16 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[420px] rounded-full bg-gradient-to-tr from-[#7A102B]/24 via-[#D9B76E]/12 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-7 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9E1938]/20 border border-[#D9B76E]/35 text-[#F7C5D0] text-xs uppercase tracking-[0.25em] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#D9B76E] text-[#D9B76E]" />
            <span>UNLOCK LITTLE PIECES OF MY HEART</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Discover My Heart
          </h2>

          <p className="text-sm sm:text-base text-[#FFF4EA]/85 max-w-lg mx-auto font-light leading-relaxed">
            Tap each glowing key one by one to discover the little messages waiting for you.
          </p>
        </motion.div>

        {/* Floating Interactive Buttons Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 max-w-4xl mx-auto">
          {buttons.map((btn, idx) => {
            const isSelected = activeButton?.id === btn.id;

            return (
              <motion.button
                key={btn.id}
                onClick={() => handleButtonClick(btn)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] text-[#1a0815] shadow-[0_0_28px_rgba(217,183,110,0.48)]'
                    : 'bg-[#1D040D]/90 text-[#FFF4EA] border border-[#D9B76E]/40 hover:border-[#D9B76E] shadow-lg'
                }`}
              >
                <span className={isSelected ? 'text-[#6e112c]' : 'text-[#D9B76E] group-hover:scale-125 transition-transform'}>
                  {getIcon(btn.id)}
                </span>
                <span>{btn.label}</span>
                {isSelected && <Sparkles className="w-3.5 h-3.5 text-[#6e112c]" />}
              </motion.button>
            );
          })}
        </div>

        {/* Inline Antique Parchment Reveal Card (for Buttons 1-4) */}
        <div className="flex items-center justify-center pt-1">
          <AnimatePresence mode="wait">
            {activeButton && !activeButton.isFullScreen && (
              <motion.div
                key={activeButton.id}
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.94 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-xl w-full"
              >
                <VintageLetterCard variant="secret" className="p-6 sm:p-8 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#7A1530]/20 pb-3">
                    <div className="flex items-center gap-2 text-[#7A1530]">
                      {getIcon(activeButton.id)}
                      <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold">
                        {activeButton.title}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveButton(null)}
                      className="p-1.5 rounded-full text-[#5C1225]/70 hover:text-[#2A0B14] hover:bg-[#7A1530]/10 transition-colors cursor-pointer"
                      aria-label="Close secret note"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-cormorant italic text-xl sm:text-2xl text-[#260B12] leading-relaxed font-medium">
                    &ldquo;{activeButton.message}&rdquo;
                  </p>

                  <p className="text-right font-script text-2xl text-[#7A1530]">
                    From Abdul Ahad to Nafisa
                  </p>
                </VintageLetterCard>
              </motion.div>
            )}
          </AnimatePresence>

          {!activeButton && (
            <p className="text-xs text-[#FFF4EA]/55 italic py-2">
              Tap any heart button above to reveal what lies within.
            </p>
          )}
        </div>
      </div>

      {/* FULL-SCREEN ROMANTIC MODAL (Button 5: OPEN MY HEART) */}
      <AnimatePresence>
        {fullScreenActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setFullScreenActive(null)}
          >
            {/* Background pulsating aura */}
            <div className="absolute w-[480px] h-[480px] rounded-full bg-[#9E1938]/22 blur-[130px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.86, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.86, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <VintageLetterCard
                variant="secret"
                showWaxSeal
                waxSealLabel="Unsealed For Nafisa"
                className="p-6 sm:p-12 text-center space-y-6"
              >
                {/* Close Button */}
                <button
                  onClick={() => setFullScreenActive(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#7A1530]/10 hover:bg-[#7A1530]/20 text-[#4D0E1F] transition-colors cursor-pointer"
                  aria-label="Close heart note"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-3 pt-1">
                  <p className="font-cormorant text-xs tracking-[0.32em] uppercase text-[#7A1530] font-bold">
                    A Message from the Heart · For Nafisa
                  </p>

                  <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-[#240910] leading-tight">
                    &ldquo;{fullScreenActive.message}&rdquo;
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#7A1530]/25 space-y-1">
                  <p className="font-cormorant italic text-base text-[#5C1225]">
                    With all my respect, care, and love,
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-[#7A1530]">
                    Abdul Ahad
                  </p>
                </div>
              </VintageLetterCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
