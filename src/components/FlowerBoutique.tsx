import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BouquetCustomizerModal,
  BouquetItem,
  CustomizerTab,
} from './BouquetCustomizerModal';

import heroRosesImg from '../assets/images/boutique_hero_roses_1794570557263.jpg';
import signatureRoseImg from '../assets/images/boutique_signature_rose_1794570558264.jpg';
import blushAffairImg from '../assets/images/boutique_blush_affair_1794570558632.jpg';
import ivoryWhisperImg from '../assets/images/boutique_ivory_whisper_1794570559212.jpg';
import satinBowImg from '../assets/images/boutique_satin_bow_1794570559101.jpg';

const BOUQUETS: BouquetItem[] = [
  {
    id: 'signature-rose',
    name: 'The Signature Rose',
    flowers: 'Deep red roses with delicate white flowers.',
    description:
      'Classic, passionate, and timeless. Red roses will always be my favourite way to express deep love and affection.',
    image: signatureRoseImg,
    defaultFlowerTypes: ['Red Roses', "Baby's Breath"],
    defaultPalette: 'crimson-ivory',
    defaultWrapping: 'ivory-crimson',
  },
  {
    id: 'blush-affair',
    name: 'Blush Affair',
    flowers: 'Soft pink roses and delicate pink-and-white blooms.',
    description:
      'Soft colours, gentle beauty, and a little romance. This bouquet reminds me that the most beautiful feelings are often the simplest.',
    image: blushAffairImg,
    defaultFlowerTypes: ['Pink Roses', "Baby's Breath"],
    defaultPalette: 'blush-pearl',
    defaultWrapping: 'plum-rose',
  },
  {
    id: 'ivory-whisper',
    name: 'Ivory Whisper',
    flowers: 'Elegant white roses and creamy white flowers.',
    description:
      'Pure, graceful, and peaceful. A beautiful reminder that love can be expressed through the smallest and most delicate things.',
    image: ivoryWhisperImg,
    defaultFlowerTypes: ['White Roses', 'Peonies'],
    defaultPalette: 'champagne-cream',
    defaultWrapping: 'champagne-ivory',
  },
];

const CUSTOMIZER_STEPS: { id: CustomizerTab; label: string }[] = [
  { id: 'flower-type', label: 'Flower Type' },
  { id: 'color-palette', label: 'Color Palette' },
  { id: 'bouquet-size', label: 'Bouquet Size' },
  { id: 'wrapping-style', label: 'Wrapping Style' },
  { id: 'extra-details', label: 'Extra Details' },
];

const FLOATING_PETALS = [
  { left: '8%', delay: '0s', duration: '11s', size: 12, rotate: '25deg' },
  { left: '22%', delay: '3s', duration: '13s', size: 10, rotate: '-40deg' },
  { left: '48%', delay: '1.5s', duration: '12s', size: 14, rotate: '60deg' },
  { left: '74%', delay: '4.5s', duration: '14s', size: 11, rotate: '-20deg' },
  { left: '89%', delay: '2s', duration: '10.5s', size: 13, rotate: '45deg' },
];

export const FlowerBoutique: React.FC = () => {
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [selectedBouquet, setSelectedBouquet] = useState<BouquetItem | null>(BOUQUETS[0]);
  const [selectedTab, setSelectedTab] = useState<CustomizerTab>('flower-type');
  const [preselectedFlower, setPreselectedFlower] = useState<string | null>(null);

  const handleOpenBouquet = (bouquet: BouquetItem, tab: CustomizerTab = 'flower-type') => {
    setPreselectedFlower(null);
    setSelectedBouquet(bouquet);
    setSelectedTab(tab);
    setCustomizerOpen(true);
  };

  const handleOpenFromStep = (tab: CustomizerTab) => {
    setPreselectedFlower(null);
    setSelectedBouquet(BOUQUETS[0]);
    setSelectedTab(tab);
    setCustomizerOpen(true);
  };

  const scrollToBouquets = () => {
    const el = document.getElementById('build-your-bouquet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cake"
      className="relative overflow-hidden bg-gradient-to-b from-[#25040C] via-[#350614] to-[#23040B] border-y border-[#D9B76E]/20"
    >
      {/* Keyframes for lightweight boutique hero petals */}
      <style>{`
        @keyframes boutiquePetalDrift {
          0% {
            transform: translate3d(0, -10%, 0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.55;
          }
          85% {
            opacity: 0.45;
          }
          100% {
            transform: translate3d(24px, 110vh, 0) rotate(160deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* ================================================================= */}
      {/* 2. FLOWER BOUTIQUE HERO SECTION                                   */}
      {/* ================================================================= */}
      <div className="relative min-h-[430px] sm:min-h-[480px] flex items-center justify-center px-4 py-14 sm:py-20 overflow-hidden">
        {/* Dark Red Rose-Patterned Floral Background */}
        <div className="absolute inset-0">
          <img
            src={heroRosesImg}
            alt="Deep crimson and dark red roses background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-60 scale-105"
          />
          {/* Deep Burgundy Luxury Scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(28,3,10,0.82) 0%, rgba(45,6,17,0.62) 45%, rgba(53,6,20,0.94) 92%, #350614 100%)',
            }}
          />
        </div>

        {/* Subtle Floating Rose Petals (Lightweight CSS Compositor Animation) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {FLOATING_PETALS.map((petal, idx) => (
            <span
              key={idx}
              className="absolute top-0 rounded-tl-full rounded-br-full bg-gradient-to-br from-[#C82342]/80 to-[#590717]/90 shadow-sm"
              style={{
                left: petal.left,
                width: `${petal.size}px`,
                height: `${petal.size * 1.35}px`,
                animation: `boutiquePetalDrift ${petal.duration} linear ${petal.delay} infinite`,
                transform: `rotate(${petal.rotate})`,
              }}
            />
          ))}
        </div>

        {/* Delicate Golden Corner Filigree Accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#D9B76E]/35 pointer-events-none hidden sm:block" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#D9B76E]/35 pointer-events-none hidden sm:block" />

        {/* Hero Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-3xl mx-auto text-center space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#D9B76E] font-medium">
            Nafisa&apos;s Private Floral Atelier · Curated by Abdul Ahad
          </p>

          <h2 className="font-script text-5xl sm:text-7xl md:text-[82px] text-[#FFF4EA] leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
            Flowers Speak What Words Cannot
          </h2>

          <p className="font-cormorant text-lg sm:text-2xl text-[#FFF4EA]/90 max-w-2xl mx-auto leading-relaxed font-light">
            Every petal carries a feeling, every bloom tells a story, and every bouquet holds a
            little piece of love. I believe flowers make ordinary moments unforgettable.
          </p>

          <div className="pt-3">
            <button
              onClick={scrollToBouquets}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-sm bg-[#FFF4EA] text-[#350614] hover:bg-[#D9B76E] hover:text-[#1a0815] text-xs font-bold tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.5)] cursor-pointer whitespace-nowrap"
            >
              <span>EXPLORE MY FLOWER WORLD</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================================================================= */}
      {/* 3. BUILD YOUR BOUQUET SECTION                                     */}
      {/* ================================================================= */}
      <div id="build-your-bouquet" className="relative py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <h3 className="font-script text-5xl sm:text-6xl text-[#FFF4EA]">
            Build Your Bouquet
          </h3>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7C5D0]/90 font-light">
            Every flower has a story. Choose the blooms that speak to your heart.
          </p>

          {/* Clean Typographic Customization Category Tabs (Inspired by Reference Image) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-[#D9B76E]/20 pb-3">
            {CUSTOMIZER_STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleOpenFromStep(step.id)}
                className={`text-xs sm:text-sm tracking-wider transition-colors cursor-pointer whitespace-nowrap pb-1 ${
                  index === 0
                    ? 'text-[#FFF4EA] border-b border-[#D9B76E] font-medium'
                    : 'text-[#FFF4EA]/65 hover:text-[#D9B76E]'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Three-Column Bouquet Cards */}
        <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
          {BOUQUETS.map((bouquet, idx) => (
            <motion.article
              key={bouquet.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Bouquet Studio Photograph Blending Into Deep Burgundy */}
              <div
                onClick={() => handleOpenBouquet(bouquet)}
                className="relative w-full aspect-square max-w-[320px] mx-auto overflow-hidden rounded-xl cursor-pointer bg-[#350614]"
              >
                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Soft Edge Feathering into #350614 Background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 50%, transparent 56%, rgba(53,6,20,0.88) 96%, #350614 100%)',
                  }}
                />
              </div>

              {/* Card Text Hierarchy */}
              <div className="mt-5 space-y-2.5 px-2 flex-1 flex flex-col justify-between items-center">
                <div className="space-y-2">
                  <h4 className="font-playfair text-xl sm:text-2xl font-semibold text-[#FFF4EA] tracking-wide">
                    {bouquet.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#D9B76E] tracking-wide font-medium">
                    {bouquet.flowers}
                  </p>

                  <p className="text-sm text-[#FFF4EA]/80 leading-relaxed font-light max-w-xs mx-auto pt-1">
                    &ldquo;{bouquet.description}&rdquo;
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleOpenBouquet(bouquet)}
                    className="px-7 py-2.5 border border-[#D9B76E]/55 text-[#FFF4EA] hover:bg-[#FFF4EA] hover:text-[#350614] hover:border-[#FFF4EA] text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap"
                  >
                    EXPLORE BOUQUET
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 5. OUR STORY — A PERSONAL FLOWER LOVER'S MESSAGE                  */}
      {/* ================================================================= */}
      <div className="relative pt-10 pb-6 px-4 sm:px-8 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-7"
        >
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D9B76E] font-medium">
              Our Story · Words From My Heart
            </span>
            <h3 className="font-script text-5xl sm:text-6xl text-[#FFF4EA]">
              A Little About My Love for Flowers
            </h3>
          </div>

          <div className="space-y-5 font-cormorant text-lg sm:text-2xl text-[#FFF4EA]/90 leading-relaxed font-light">
            <p>
              I have always believed that flowers have a special kind of magic. They make ordinary
              days feel beautiful, bring warmth to quiet moments, and express feelings that
              sometimes remain unspoken.
            </p>
            <p>
              I love the way every flower has its own character. The deep beauty of red roses, the
              softness of pink petals, and the peaceful elegance of white flowers — each one tells a
              different story.
            </p>
            <p>
              For me, a bouquet is never just a collection of flowers. It is a little piece of
              emotion, carefully brought together. If I could fill the world with anything, I would
              choose flowers, because I believe a little more beauty and love can make every day
              special.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================================================================= */}
      {/* 6. BEAUTIFUL FLOWER RIBBON TRANSITION (Full-Width Satin & Bow)    */}
      {/* ================================================================= */}
      <div className="relative py-8 sm:py-12 w-full overflow-hidden select-none pointer-events-none">
        {/* Continuous Edge-to-Edge Satin Ribbon Band */}
        <div
          className="absolute left-0 right-0 top-[44%] -translate-y-1/2 h-10 sm:h-14"
          style={{
            background:
              'linear-gradient(180deg, #56091E 0%, #8E1636 28%, #B22449 48%, #6D0B25 75%, #410514 100%)',
            boxShadow:
              '0 14px 30px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,215,225,0.35), inset 0 -1px 0 rgba(255,215,225,0.2)',
          }}
        />

        {/* Centered Realistic Luxury Satin Bow Image Seamlessly Blended */}
        <div className="relative max-w-4xl mx-auto flex justify-center items-center">
          <div className="relative w-full max-w-[640px]">
            <img
              src={satinBowImg}
              alt="Luxurious deep burgundy satin ribbon bow"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain"
              style={{
                mixBlendMode: 'lighten',
                WebkitMaskImage:
                  'radial-gradient(ellipse 72% 78% at 50% 48%, black 52%, transparent 98%)',
                maskImage:
                  'radial-gradient(ellipse 72% 78% at 50% 48%, black 52%, transparent 98%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 4. BOUQUET CUSTOMIZATION EXPERIENCE MODAL                         */}
      {/* ================================================================= */}
      <BouquetCustomizerModal
        isOpen={customizerOpen}
        initialBouquet={selectedBouquet}
        initialTab={selectedTab}
        initialPreselectedFlower={preselectedFlower}
        onClose={() => setCustomizerOpen(false)}
      />
    </section>
  );
};
