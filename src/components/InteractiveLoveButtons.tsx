import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, X, Stars, Gift, ShieldCheck, LockOpen } from 'lucide-react';
import { birthdayConfig, LoveButtonData } from '../config/birthdayConfig';

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
    <section id="discover-heart" className="relative py-28 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] rounded-full bg-gradient-to-tr from-[#E88CA8]/15 via-[#D9B76E]/12 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-12 z-10">
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
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              Interactive Love Keys
            </span>
            <Heart className="w-4 h-4 fill-[#E88CA8] text-[#E88CA8]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Discover My Heart
          </h2>

          <p className="text-sm sm:text-base text-[#FFF4EA]/75 max-w-md mx-auto font-light leading-relaxed">
            Click each key to unlock a hidden secret, promise, and personal feeling.
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
                className={`group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] text-[#1a0815] shadow-[0_0_30px_rgba(217,183,110,0.5)]'
                    : 'bg-[#2b1022]/80 text-[#FFF4EA] border border-[#D9B76E]/40 hover:border-[#D9B76E] shadow-lg'
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

        {/* Inline Message Reveal Card (for Buttons 1-4) */}
        <div className="min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeButton && !activeButton.isFullScreen && (
              <motion.div
                key={activeButton.id}
                initial={{ opacity: 0, y: 25, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.94 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-xl w-full p-8 rounded-3xl bg-gradient-to-b from-[#2e1024] via-[#240e1d] to-[#150612] border-2 border-[#D9B76E]/50 shadow-2xl space-y-4"
              >
                <div className="flex justify-between items-center border-b border-[#D9B76E]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#D9B76E]">
                    {getIcon(activeButton.id)}
                    <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold">
                      {activeButton.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveButton(null)}
                    className="p-1 rounded-full text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA] leading-relaxed">
                  &ldquo;{activeButton.message}&rdquo;
                </p>

                <p className="text-right font-script text-xl text-[#E88CA8]">
                  From Abdul Ahad to Nafisa
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!activeButton && (
            <p className="text-xs text-[#FFF4EA]/50 italic">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-radial from-[#3d0e28]/95 via-[#1a081a]/98 to-[#0b030b] backdrop-blur-xl"
            onClick={() => setFullScreenActive(null)}
          >
            {/* Background pulsating aura */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-[#E88CA8]/20 blur-[140px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full text-center p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#2e1024] to-[#150612] border-2 border-[#D9B76E]/60 shadow-[0_0_60px_rgba(217,183,110,0.3)] space-y-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setFullScreenActive(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF4EA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Heart Emblem */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8c1839] via-[#610a22] to-[#30030e] border-2 border-[#D9B76E] shadow-[0_0_30px_rgba(232,140,168,0.5)] flex items-center justify-center"
                >
                  <Heart className="w-10 h-10 fill-[#E88CA8] text-[#E88CA8]" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <p className="font-cormorant text-xs tracking-[0.35em] uppercase text-[#D9B76E] font-bold">
                  A Message from the Heart · For Nafisa
                </p>

                <h3 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-[#FFF4EA] leading-tight">
                  &ldquo;{fullScreenActive.message}&rdquo;
                </h3>
              </div>

              <div className="pt-4 border-t border-[#D9B76E]/30 space-y-1">
                <p className="font-cormorant italic text-base text-[#F7C5D0]">
                  With all my respect, care, and love,
                </p>
                <p className="font-script text-3xl sm:text-4xl text-[#D9B76E]">
                  Abdul Ahad
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
