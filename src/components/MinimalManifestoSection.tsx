import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const MinimalManifestoSection: React.FC = () => {
  const words = ['PERSONALIZED.', 'EMOTIONAL.', 'UNFORGETTABLE.'];

  return (
    <section className="relative py-12 sm:py-16 px-4 overflow-hidden text-center">
      {/* Soft Subtle Crimson Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[280px] rounded-full opacity-25 blur-[110px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(158, 25, 56, 0.45), rgba(217, 183, 110, 0.14), transparent 72%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto space-y-3 sm:space-y-4 z-10">
        {words.map((word, idx) => (
          <motion.p
            key={word}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: idx * 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.22em] uppercase gold-gradient-text"
          >
            {word}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="pt-3 flex justify-center"
        >
          <Heart className="w-6 h-6 text-[#D9B76E]" />
        </motion.div>
      </div>
    </section>
  );
};
