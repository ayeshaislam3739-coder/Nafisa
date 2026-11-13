import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

// Target: November 16, 2026 — 12:00 AM Bangladesh Standard Time (Asia/Dhaka, UTC+06:00)
const BIRTHDAY_TARGET_MS = new Date('2026-11-16T00:00:00+06:00').getTime();

function getTimeRemaining(nowMs: number) {
  const diff = BIRTHDAY_TARGET_MS - nowMs;
  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', isCompleted: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: String(Math.floor(totalSeconds / 86400)).padStart(2, '0'),
    hours: String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'),
    seconds: String(totalSeconds % 60).padStart(2, '0'),
    isCompleted: false,
  };
}

export const CelebrationClock: React.FC = () => {
  const [countdown, setCountdown] = useState(() => getTimeRemaining(Date.now()));

  useEffect(() => {
    if (countdown.isCompleted) return;
    const timer = setInterval(() => {
      const next = getTimeRemaining(Date.now());
      setCountdown(next);
      if (next.isCompleted) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown.isCompleted]);

  const units = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  return (
    <section id="moments" className="relative py-12 sm:py-16 px-4 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[420px] rounded-full bg-gradient-to-tr from-[#D9B76E]/14 via-[#7A102B]/22 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
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

        {/* Animated Countdown or Completed Birthday Celebration */}
        <div className="relative max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#1E050E]/92 via-[#130309]/95 to-[#0A0105] border border-[#D9B76E]/45 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.26em] text-[#D9B76E] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {countdown.isCompleted
                ? `November 16, 2026 · ${birthdayConfig.birthdayName}'s Birthday`
                : 'Countdown to 16 November 2026 · Bangladesh Time'}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {!countdown.isCompleted ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-[#0F0207]/90 border border-[#D9B76E]/30 shadow-inner"
                >
                  <span className="font-playfair text-4xl sm:text-5xl font-bold gold-gradient-text tabular-nums">
                    {u.value}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#F7C5D0]/80 mt-2 font-medium">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 py-4">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-[#C82348] text-[#D9B76E] animate-pulse" />
                <Sparkles className="w-5 h-5 text-[#FFE29A]" />
              </div>
              <h3 className="font-playfair text-3xl sm:text-4xl font-bold uppercase tracking-wider gold-gradient-text">
                HAPPY BIRTHDAY, NAFISA!
              </h3>
              <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA]/90 max-w-xl mx-auto">
                Today is all about you. May your day be filled with happiness, beautiful memories, and endless love.
              </p>
            </div>
          )}

          <div className="space-y-2 border-t border-[#D9B76E]/20 pt-5">
            <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4EA]">
              &ldquo;No clock can count the countless ways you bring light into the lives around you.&rdquo;
            </p>
            <p className="font-script text-2xl text-[#E88CA8]">
              Happy Birthday, {birthdayConfig.birthdayName} · Forever Cherished
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
