import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Heart, Sparkles, Hourglass } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const CelebrationClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        setTime(new Date());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  // Decorative Celebration Units
  const units = [
    { label: 'Hours of Joy', value: hours },
    { label: 'Minutes of Grace', value: minutes },
    { label: 'Seconds of Wonder', value: seconds },
  ];

  return (
    <section id="moments" className="relative py-28 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] rounded-full bg-gradient-to-tr from-[#D9B76E]/15 via-[#E88CA8]/12 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-12 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D9B76E]" />
            <span className="font-script text-3xl sm:text-4xl text-[#F7C5D0]">
              Timeless affection
            </span>
            <Clock className="w-4 h-4 text-[#D9B76E]" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider text-[#FFF4EA]">
            Every Second Is a Reason to Celebrate You
          </h2>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4EA]/85 max-w-md mx-auto font-light">
            Time moves forward, but the beauty of your presence remains forever special.
          </p>
        </motion.div>

        {/* Animated Celebration Chronometer Display */}
        <div className="relative max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#2e1024]/85 via-[#240e1d]/90 to-[#180713]/95 border-2 border-[#D9B76E]/40 shadow-2xl backdrop-blur-md space-y-8">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D9B76E] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebration Chronometer · Living in This Moment</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Time digits grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {units.map((u, i) => (
              <div
                key={u.label}
                className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-[#1b0817]/80 border border-[#D9B76E]/30 shadow-inner"
              >
                <span className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold gold-gradient-text tabular-nums">
                  {u.value}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#F7C5D0]/80 mt-2 font-medium">
                  {u.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-[#D9B76E]/20 pt-6">
            <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA]">
              &ldquo;No clock can count the countless ways you bring light into the lives around you.&rdquo;
            </p>
            <p className="font-script text-2xl text-[#E88CA8]">
              Happy Birthday, Nafisa · Forever Cherished
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
