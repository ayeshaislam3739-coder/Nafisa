import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Stars, Smile, Gift, Lock, CheckCircle2 } from 'lucide-react';
import { birthdayConfig, CapsuleData } from '../config/birthdayConfig';
import { VintageLetterCard } from './VintageLetterCard';

export const MessageCapsules: React.FC = () => {
  const [openedCapsules, setOpenedCapsules] = useState<Record<string, boolean>>({});
  const capsules = birthdayConfig.capsules;

  const toggleCapsule = (id: string) => {
    setOpenedCapsules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openAll = () => {
    const all: Record<string, boolean> = {};
    capsules.forEach((c) => (all[c.id] = true));
    setOpenedCapsules(all);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#D9B76E]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 fill-[#E88CA8] text-[#E88CA8]" />;
      case 'Stars':
        return <Stars className="w-5 h-5 text-[#D9B76E]" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-[#F7C5D0]" />;
      default:
        return <Gift className="w-5 h-5 text-[#D9B76E]" />;
    }
  };

  return (
    <section id="capsules" className="relative py-12 sm:py-16 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[440px] rounded-full bg-gradient-to-tr from-[#6D0A22]/25 via-[#D9B76E]/12 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-7 z-10 text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9E1938]/20 border border-[#D9B76E]/35 text-[#F7C5D0] text-xs uppercase tracking-[0.25em] font-semibold">
            <Gift className="w-3.5 h-3.5 text-[#D9B76E]" />
            <span>OPEN THESE LITTLE SURPRISES</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Open These Little Pieces of Love
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-lg mx-auto font-light">
            Tap each little capsule to discover a special message.
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#1B040D] border border-[#D9B76E]/30 text-xs font-medium text-[#F7C5D0]">
              Opened {Object.values(openedCapsules).filter(Boolean).length} of {capsules.length}
            </span>
            <button
              onClick={openAll}
              className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#D9B76E] border border-[#D9B76E]/40 hover:bg-[#D9B76E]/15 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unseal All Capsules</span>
            </button>
          </div>
        </motion.div>

        {/* 5 Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {capsules.map((cap, idx) => {
            const isOpen = !!openedCapsules[cap.id];

            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="perspective-[1000px]"
              >
                <div
                  onClick={() => toggleCapsule(cap.id)}
                  className="cursor-pointer h-full"
                >
                  {isOpen ? (
                    <VintageLetterCard
                      variant="forever"
                      className="min-h-[210px] h-full p-5 sm:p-6 flex flex-col justify-between transition-all duration-500"
                    >
                      <div className="flex justify-between items-center border-b border-[#7A1530]/20 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-playfair text-lg font-bold text-[#7A122E] tracking-widest">
                            {cap.num}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E23]" />
                          <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-[#5C1225] font-bold">
                            {cap.subtitle}
                          </span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-[#7A122E]" />
                      </div>

                      <motion.div
                        key="open"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="py-3 my-auto space-y-2 text-left"
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(cap.iconName)}
                          <span className="font-script text-2xl text-[#7A122E]">
                            For Nafisa
                          </span>
                        </div>
                        <p className="font-cormorant italic text-lg sm:text-xl text-[#260D14] leading-relaxed font-medium">
                          &ldquo;{cap.message}&rdquo;
                        </p>
                      </motion.div>

                      <div className="pt-2 text-right">
                        <span className="text-[11px] text-[#5C1225]/80 italic">
                          Click to re-seal
                        </span>
                      </div>
                    </VintageLetterCard>
                  ) : (
                    <div className="min-h-[210px] h-full rounded-2xl p-5 sm:p-6 border border-[#D9B76E]/35 bg-gradient-to-b from-[#1E050E]/90 via-[#130309]/95 to-[#0A0105] hover:border-[#D9B76E]/75 transition-all duration-300 shadow-xl flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-[#D9B76E]/20 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-playfair text-lg font-bold gold-gradient-text tracking-widest">
                            {cap.num}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9B76E]" />
                          <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-[#FFF4EA]/85 font-semibold">
                            {cap.subtitle}
                          </span>
                        </div>
                        <Lock className="w-4 h-4 text-[#D9B76E]/75" />
                      </div>

                      <div className="py-4 my-auto flex flex-col items-center justify-center space-y-3">
                        <div className="w-13 h-13 rounded-full bg-[#2E0714] border border-[#D9B76E]/50 flex items-center justify-center shadow-inner">
                          {getIcon(cap.iconName)}
                        </div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[#D9B76E] font-medium">
                          Tap to Open Capsule
                        </p>
                      </div>

                      <div className="pt-2 text-right">
                        <span className="text-[11px] text-[#FFF4EA]/55 italic">
                          Sealed with care
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
