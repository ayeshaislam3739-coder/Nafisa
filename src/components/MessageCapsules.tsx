import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Stars, Smile, Gift, Lock, CheckCircle2 } from 'lucide-react';
import { birthdayConfig, CapsuleData } from '../config/birthdayConfig';

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
    <section id="capsules" className="relative py-28 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-[#400D24]/25 via-[#D9B76E]/12 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-12 z-10 text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              Tokens of affection
            </span>
            <Gift className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Open These Little Pieces of Love
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            Five sealed capsules waiting for Nafisa to unfold their secrets.
          </p>

          <div className="pt-2">
            <button
              onClick={openAll}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-[#D9B76E] border border-[#D9B76E]/40 hover:bg-[#D9B76E]/15 transition-colors cursor-pointer"
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
                  className={`relative min-h-[220px] rounded-3xl p-6 sm:p-7 border-2 transition-all duration-500 cursor-pointer shadow-xl flex flex-col justify-between ${
                    isOpen
                      ? 'bg-gradient-to-b from-[#2e1024] via-[#240e1d] to-[#150612] border-[#D9B76E] shadow-[0_0_30px_rgba(217,183,110,0.3)]'
                      : 'bg-[#2b1022]/60 hover:bg-[#34132b]/80 border-[#D9B76E]/30 hover:border-[#D9B76E]/70'
                  }`}
                >
                  {/* Top Bar with Number & Status */}
                  <div className="flex justify-between items-center border-b border-[#D9B76E]/20 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-playfair text-xl font-bold gold-gradient-text tracking-widest">
                        {cap.num}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9B76E]" />
                      <span className="font-cormorant text-xs tracking-[0.2em] uppercase text-[#FFF4EA]/80 font-semibold">
                        {cap.subtitle}
                      </span>
                    </div>

                    <div className="text-[#D9B76E]">
                      {isOpen ? (
                        <CheckCircle2 className="w-4 h-4 text-[#D9B76E]" />
                      ) : (
                        <Lock className="w-4 h-4 opacity-70" />
                      )}
                    </div>
                  </div>

                  {/* Capsule Center Content */}
                  <div className="py-4 my-auto">
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-3 text-left"
                        >
                          <div className="flex items-center gap-2">
                            {getIcon(cap.iconName)}
                            <span className="font-script text-xl text-[#F7C5D0]">
                              For Nafisa
                            </span>
                          </div>
                          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA] leading-relaxed">
                            &ldquo;{cap.message}&rdquo;
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="closed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center space-y-3 py-4"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#3d1228] border border-[#D9B76E]/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            {getIcon(cap.iconName)}
                          </div>
                          <p className="text-xs uppercase tracking-[0.25em] text-[#D9B76E] font-medium">
                            Tap to Open Capsule
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="pt-2 text-right">
                    <span className="text-[11px] text-[#FFF4EA]/50 italic">
                      {isOpen ? 'Click to re-seal' : 'Sealed with care'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
