import React from 'react';
import { motion } from 'motion/react';
import { KeyRound, Heart, Gift, Sparkles, Quote, Flower2 } from 'lucide-react';
import { InteractiveLoveButtons } from './InteractiveLoveButtons';
import { PieceOfMyHeart } from './PieceOfMyHeart';
import { MessageCapsules } from './MessageCapsules';
import { LoveQuoteGenerator } from './LoveQuoteGenerator';
import { SurpriseGift } from './SurpriseGift';
import { LoveFireworks } from './LoveFireworks';
import { SectionDivider } from './SectionDivider';

interface PersonalizedExperiencesSectionProps {
  onPetalSurge: () => void;
}

export const PersonalizedExperiencesSection: React.FC<PersonalizedExperiencesSectionProps> = ({
  onPetalSurge,
}) => {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const experienceIcons = [
    {
      label: 'Love Keys',
      href: '#discover-heart',
      icon: <KeyRound className="w-5 h-5" />,
    },
    {
      label: 'My Heart',
      href: '#heart-piece',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      label: 'Capsules',
      href: '#capsules',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      label: 'Love Quotes',
      href: '#quotes',
      icon: <Quote className="w-5 h-5" />,
    },
    {
      label: 'Surprise Gift',
      href: '#surprise',
      icon: <Gift className="w-5 h-5" />,
    },
    {
      label: 'Flower Atelier',
      href: '#cake',
      icon: <Flower2 className="w-5 h-5" />,
    },
  ];

  return (
    <div id="experiences" className="relative">
      {/* Storybox-Inspired Overview Row: "A DIGITAL EXPERIENCE THEY WILL NEVER FORGET." */}
      <section className="relative py-10 sm:py-12 px-4 sm:px-6 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-2"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[#D9B76E] font-semibold">
              Personalized Experiences
            </p>
            <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-[#FFF4EA] leading-tight">
              A DIGITAL EXPERIENCE <br className="hidden sm:block" />
              <span className="gold-gradient-text">SHE WILL NEVER FORGET.</span>
            </h2>
          </motion.div>

          {/* Horizontal Clean Icon Index Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto pt-2">
            {experienceIcons.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#16030A]/80 hover:bg-[#290613] border border-[#D9B76E]/25 hover:border-[#D9B76E]/70 transition-all cursor-pointer space-y-2"
              >
                <div className="w-10 h-10 rounded-lg border border-[#D9B76E]/40 bg-[#0D0206] flex items-center justify-center text-[#D9B76E] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-cormorant text-xs sm:text-sm font-semibold tracking-wider text-[#FFF4EA]/90 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider subtle />

      {/* Preserved Interactive Modules Arranged Cleanly */}
      <InteractiveLoveButtons />

      <SectionDivider />

      <PieceOfMyHeart onPetalSurge={onPetalSurge} />

      <SectionDivider />

      <MessageCapsules />

      <SectionDivider />

      <LoveQuoteGenerator />

      <SectionDivider />

      <SurpriseGift />

      <SectionDivider subtle />

      <LoveFireworks onPetalSurge={onPetalSurge} />
    </div>
  );
};
