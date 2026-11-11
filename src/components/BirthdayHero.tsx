import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ChevronDown, Compass } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface BirthdayHeroProps {
  onDiscover: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onDiscover }) => {
  const letters = birthdayConfig.birthdayName.split('');

  return (
    <section className="relative min-h-[96vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-20 overflow-hidden">
      {/* Soft romantic light halo behind her name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#E88CA8]/20 via-[#D9B76E]/15 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-7 sm:space-y-9 z-10">
        {/* Subtle romantic script kicker with golden filigree dividers */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D9B76E]/60 to-[#D9B76E]" />
          <span className="font-script text-2xl sm:text-3xl text-[#F7C5D0] tracking-wide">
            Dedicated with endless love
          </span>
          <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#D9B76E]/60 to-[#D9B76E]" />
        </motion.div>

        {/* Main Title: HAPPY BIRTHDAY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="space-y-2"
        >
          <p className="font-cormorant text-lg sm:text-2xl md:text-3xl tracking-[0.35em] uppercase text-[#D9B76E] font-medium drop-shadow-sm">
            Happy Birthday
          </p>

          {/* Majestic Hero Name: NAFISA */}
          <div className="relative py-2 sm:py-4">
            <h1 className="font-playfair text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-wider uppercase select-none flex justify-center items-center gap-1 sm:gap-2">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.15, y: -8, color: '#FFF4EA' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block gold-gradient-text drop-shadow-[0_12px_30px_rgba(217,183,110,0.35)] cursor-default transition-colors duration-200"
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Floating delicate heart accents around name */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [-6, 6, -6] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 left-4 sm:left-14 text-[#E88CA8]/70"
            >
              <Heart className="w-5 h-5 sm:w-7 sm:h-7 fill-current" />
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5], rotate: [6, -6, 6] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 right-4 sm:right-14 text-[#D9B76E]/70"
            >
              <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.div>
          </div>
        </motion.div>

        {/* Subtitle & Sender */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="space-y-2.5"
        >
          <p className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-[#FFF4EA]/90 max-w-2xl mx-auto font-light leading-relaxed">
            &ldquo;{birthdayConfig.heroSubheading}&rdquo;
          </p>
          <p className="font-script text-3xl sm:text-4xl text-[#E88CA8] tracking-wider pt-1">
            With love, {birthdayConfig.creatorName}
          </p>
        </motion.div>

        {/* Heartfelt message card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-xl mx-auto px-6 py-5 rounded-3xl bg-[#2e1024]/50 border border-[#D9B76E]/30 backdrop-blur-md shadow-xl"
        >
          <p className="text-sm sm:text-base text-[#FFF4EA]/90 font-light leading-relaxed">
            {birthdayConfig.heroMessage}
          </p>
        </motion.div>

        {/* Discover Surprise CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="pt-2 flex flex-col items-center gap-3"
        >
          <button
            onClick={onDiscover}
            className="group inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#1a0815] bg-gradient-to-r from-[#D9B76E] via-[#FFF0D0] to-[#E88CA8] hover:from-[#FFF0D0] hover:to-[#D9B76E] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(217,183,110,0.35)] cursor-pointer"
          >
            <span>Discover Your Surprise</span>
            <ChevronDown className="w-4 h-4 text-[#1a0815] group-hover:translate-y-1 transition-transform duration-300" />
          </button>

          <span className="text-[11px] text-[#FFF4EA]/50 tracking-wider flex items-center gap-1.5 pt-1">
            <Compass className="w-3 h-3 text-[#D9B76E]" />
            Scroll down or use the navigation above to explore every corner
          </span>
        </motion.div>
      </div>
    </section>
  );
};
