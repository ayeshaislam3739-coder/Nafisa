import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Feather, X, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';
import crimsonRoseImg from '../assets/images/flower_red_rose_1794570558875.jpg';

export const SurpriseGift: React.FC = () => {
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <section id="surprise" className="relative py-12 sm:py-16 px-4 overflow-hidden">
      {/* Deep Burgundy & Warm Golden Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[420px] rounded-full bg-gradient-to-tr from-[#D9B76E]/12 via-[#7A102B]/24 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              Dedicated to you
            </span>
            <Sparkles className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            A Birthday Rose Keepsake
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            Whispered wishes sealed in crimson velvet and gold.
          </p>
        </motion.div>

        {/* Botanical Crimson Rose Keepsake Card (No Old Banner Image or Duplicate Banner) */}
        <div className="relative max-w-xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[#D9B76E]/40 bg-[#0B0105] shadow-[0_24px_65px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={crimsonRoseImg}
                alt="Crimson rose petals in velvet candlelight"
                className="w-full h-full object-cover object-center opacity-80"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(14,2,7,0.35) 0%, rgba(14,2,7,0.55) 55%, rgba(10,1,4,0.94) 94%, #0A0104 100%)',
                }}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-end px-6 pb-6 sm:pb-8 text-center space-y-2">
                <Heart className="w-5 h-5 fill-[#C82348] text-[#D9B76E]" />
                <p className="font-playfair text-xl sm:text-2xl font-bold uppercase tracking-[0.22em] gold-gradient-text">
                  Forever Cherished, {birthdayConfig.birthdayName}
                </p>
                <p className="font-cormorant italic text-base sm:text-lg text-[#FFF4EA]/85 max-w-sm">
                  Some reminders deserve a quiet place of their own.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preserved Personal Keepsake Note Trigger */}
        <div className="pt-1 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setNoteOpen((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-[#FFF4EA] bg-gradient-to-r from-[#7A102B]/70 via-[#9E1938]/55 to-[#7A102B]/70 border border-[#D9B76E]/55 hover:border-[#FFE5A3] transition-all shadow-lg cursor-pointer"
          >
            <Feather className="w-3.5 h-3.5 text-[#D9B76E]" />
            <span>{noteOpen ? 'Hide Birthday Whisper' : 'Read Birthday Whisper'}</span>
          </button>

          <AnimatePresence>
            {noteOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl mx-auto pt-2"
              >
                <VintageLetterCard
                  variant="forever"
                  showWaxSeal
                  waxSealLabel="A Token Wrapped With Care"
                  className="p-6 sm:p-8 space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => setNoteOpen(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-[#7A1530]/10 hover:bg-[#7A1530]/20 text-[#4D0E1F] transition-colors cursor-pointer"
                    aria-label="Close note"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h4 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-[#7A122E] uppercase leading-snug">
                    {birthdayConfig.surpriseMessage1}
                  </h4>
                  <p className="font-cormorant italic text-lg sm:text-xl text-[#260D14] leading-relaxed font-medium">
                    &ldquo;{birthdayConfig.surpriseMessage2}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-[#4D1221] font-medium max-w-sm mx-auto leading-relaxed">
                    I hope you always remember how much warmth and happiness you bring just by being around. Never stop being the remarkable, kind person you are.
                  </p>
                </VintageLetterCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
