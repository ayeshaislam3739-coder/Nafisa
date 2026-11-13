import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass } from 'lucide-react';

export const DiscoveryGuide: React.FC = () => {
  return (
    <section className="relative py-4 sm:py-6 px-4 z-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#1A040C]/85 via-[#120208]/90 to-[#1A040C]/85 border border-[#D9B76E]/35 shadow-[0_12px_35px_rgba(0,0,0,0.55)] backdrop-blur-md text-center space-y-2.5"
        >
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D9B76E]/15 border border-[#D9B76E]/30 text-xs text-[#D9B76E] tracking-widest uppercase font-semibold">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>A Little Surprise Is Waiting For You...</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <p className="font-cormorant italic text-lg sm:text-2xl text-[#FFF4EA] leading-relaxed font-light max-w-xl mx-auto">
            &ldquo;Take your time, Nafisa. There are little surprises hidden throughout this world. Just follow the hints, tap the glowing elements, and discover everything I made for you.&rdquo;
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F7C5D0] font-medium">
            <Heart className="w-3.5 h-3.5 fill-[#E88CA8] text-[#E88CA8]" />
            <span>Tap, explore, and unlock every little surprise ♥</span>
            <Heart className="w-3.5 h-3.5 fill-[#E88CA8] text-[#E88CA8]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
