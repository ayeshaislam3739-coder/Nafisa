import React from 'react';
import { motion } from 'motion/react';
import { Heart, Feather, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const SomethingToTellYou: React.FC = () => {
  const { somethingToTellYou } = birthdayConfig;

  return (
    <section id="tell-you" className="relative py-28 px-4 overflow-hidden text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-gradient-to-tr from-[#E88CA8]/15 via-[#D9B76E]/12 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-10 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              From me to you
            </span>
            <Feather className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            {somethingToTellYou.heading}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/80 max-w-md mx-auto font-light">
            A genuine thought straight from Abdul Ahad.
          </p>
        </motion.div>

        {/* Heartfelt Note Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-2xl mx-auto p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#2e1024]/90 via-[#240e1d]/95 to-[#150612] border-2 border-[#D9B76E]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-7 text-left"
        >
          {/* Subtle Corner Filigree */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D9B76E]/50 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D9B76E]/50 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D9B76E]/50 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D9B76E]/50 rounded-br-lg" />

          <div className="flex items-center gap-2 text-[#D9B76E] border-b border-[#D9B76E]/20 pb-3">
            <Heart className="w-4 h-4 fill-current text-[#E88CA8]" />
            <span className="font-cormorant text-xs tracking-[0.25em] uppercase font-bold text-[#D9B76E]">
              Dedicated to Nafisa
            </span>
          </div>

          <div className="space-y-4 font-cormorant text-lg sm:text-2xl text-[#FFF4EA] leading-relaxed font-light">
            {somethingToTellYou.paragraphs.map((p, idx) => (
              <p key={idx} className={idx === 0 ? 'text-[#F7C5D0] font-normal text-xl sm:text-2xl' : ''}>
                {p}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-[#D9B76E]/30 space-y-1 text-right">
            <p className="font-cormorant italic text-base text-[#F7C5D0]">
              {somethingToTellYou.closing}
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#D9B76E]">
              {somethingToTellYou.signOff}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
