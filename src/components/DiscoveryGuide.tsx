import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass } from 'lucide-react';

export const DiscoveryGuide: React.FC = () => {
  return (
    <section className="relative py-8 px-4 z-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#2e1024]/80 via-[#220d1c]/85 to-[#2e1024]/80 border border-[#D9B76E]/40 shadow-[0_10px_35px_rgba(64,13,36,0.35)] backdrop-blur-md text-center space-y-3"
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
