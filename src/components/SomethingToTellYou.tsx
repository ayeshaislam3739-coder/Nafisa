import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MailOpen, RotateCcw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

export const SomethingToTellYou: React.FC = () => {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const { somethingToTellYou } = birthdayConfig;

  const handleUnseal = () => {
    setIsUnsealed(true);
    confetti({
      particleCount: 28,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#D9B76E', '#9E1938', '#FFF4EA'],
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="tell-you" className="relative py-12 sm:py-16 px-4 overflow-hidden text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[420px] rounded-full bg-gradient-to-tr from-[#7A102B]/24 via-[#D9B76E]/12 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-7 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9E1938]/20 border border-[#D9B76E]/35 text-[#F7C5D0] text-xs uppercase tracking-[0.25em] font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#D9B76E] text-[#D9B76E]" />
            <span>A MESSAGE FROM MY HEART</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            {somethingToTellYou.heading}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-lg mx-auto font-light">
            Click below to reveal something I wanted you to know.
          </p>
        </motion.div>

        {/* Interactive Sealed Parchment / Template B Vintage Romance Letter */}
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isUnsealed ? (
              <motion.div
                key="romance-sealed"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                onClick={handleUnseal}
                className="relative group cursor-pointer rounded-2xl bg-gradient-to-b from-[#290612] via-[#17030A] to-[#0B0105] border border-[#D9B76E]/50 p-7 sm:p-10 shadow-2xl flex flex-col items-center space-y-5 hover:border-[#D9B76E] transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9E1938] via-[#680920] to-[#2F030E] border-2 border-[#D9B76E] shadow-[0_0_24px_rgba(217,183,110,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 fill-[#D9B76E]/90 text-[#D9B76E]" />
                </div>

                <div className="space-y-1">
                  <p className="font-cormorant text-xs tracking-[0.3em] uppercase text-[#D9B76E] font-bold">
                    Vintage Keepsake · For Nafisa
                  </p>
                  <p className="font-playfair text-xl sm:text-2xl text-[#FFF4EA] font-semibold">
                    A Few Quiet Words From My Heart
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#D9B76E] shadow-lg cursor-pointer"
                >
                  <MailOpen className="w-4 h-4 text-[#1a0815]" />
                  <span>Unseal Note</span>
                </button>
              </motion.div>
            ) : (
              /* TEMPLATE B — THE VINTAGE ROMANCE LETTER */
              <motion.div
                key="romance-opened"
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-left"
              >
                <VintageLetterCard
                  variant="romance"
                  showWaxSeal
                  waxSealLabel="Dedicated to Nafisa"
                  className="p-6 sm:p-11 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-[#7A1530]/20 pb-3">
                    <div className="flex items-center gap-2 text-[#7A122E]">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold">
                        Vintage Romance Letter
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsUnsealed(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6E122B] hover:text-[#3A0714] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-seal</span>
                    </button>
                  </div>

                  <div className="space-y-4 font-cormorant text-lg sm:text-2xl text-[#260D14] leading-relaxed font-medium">
                    {somethingToTellYou.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? 'text-[#7A122E] font-bold text-xl sm:text-2xl'
                            : ''
                        }
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="pt-5 border-t border-[#7A1530]/20 space-y-1 text-right">
                    <p className="font-cormorant italic text-base text-[#5C1225]">
                      {somethingToTellYou.closing}
                    </p>
                    <p className="font-script text-3xl sm:text-4xl text-[#7A122E]">
                      {somethingToTellYou.signOff}
                    </p>
                  </div>
                </VintageLetterCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
