import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Check, Sparkles, Heart, RotateCcw } from 'lucide-react';

export interface BouquetItem {
  id: string;
  name: string;
  flowers: string;
  description: string;
  image: string;
  defaultFlowerTypes: string[];
  defaultPalette: string;
  defaultWrapping: string;
}

export type CustomizerTab =
  | 'flower-type'
  | 'color-palette'
  | 'bouquet-size'
  | 'wrapping-style'
  | 'extra-details';

interface BouquetCustomizerModalProps {
  isOpen: boolean;
  initialBouquet: BouquetItem | null;
  initialTab?: CustomizerTab;
  initialPreselectedFlower?: string | null;
  onClose: () => void;
}

const FLOWER_OPTIONS = [
  { id: 'Red Roses', label: 'Red Roses', meaning: 'Deep Love & Passion' },
  { id: 'Pink Roses', label: 'Pink Roses', meaning: 'Admiration & Tenderness' },
  { id: 'White Roses', label: 'White Roses', meaning: 'Purity & Grace' },
  { id: "Baby's Breath", label: "Baby's Breath", meaning: 'Everlasting Affection' },
  { id: 'Tulips', label: 'Tulips', meaning: 'Perfect Love' },
  { id: 'Peonies', label: 'Peonies', meaning: 'Happiness & Romance' },
  { id: 'Mixed Flowers', label: 'Mixed Flowers', meaning: 'Harmony of Feelings' },
];

const COLOR_PALETTES = [
  {
    id: 'crimson-ivory',
    label: 'Deep Crimson & Ivory',
    swatches: ['#7D0A24', '#B5173B', '#FFF4EA'],
    note: 'Classic passion balanced with timeless ivory warmth',
  },
  {
    id: 'blush-pearl',
    label: 'Soft Blush & Pearl',
    swatches: ['#E88CA8', '#F7C5D0', '#FFF7F9'],
    note: 'Gentle romance and delicate fairytale softness',
  },
  {
    id: 'champagne-cream',
    label: 'Champagne & Cream',
    swatches: ['#D9B76E', '#F5E7CE', '#FFFFFF'],
    note: 'Pure, serene, and luminous elegance',
  },
  {
    id: 'velvet-burgundy',
    label: 'Velvet Burgundy & Rose Gold',
    swatches: ['#400D24', '#8A1C42', '#D9B76E'],
    note: 'Rich midnight luxury with warm champagne shimmer',
  },
];

const BOUQUET_SIZES = [
  { id: 'petite', label: 'Petite Posy', stems: '12 Hand-Selected Stems', detail: 'Intimate, sweet, and delicate' },
  { id: 'classic', label: 'Classic Romantic', stems: '24 Hand-Tied Stems', detail: 'Lush, balanced, and timeless' },
  { id: 'grand', label: 'Grand Luxury', stems: '36 Full Signature Stems', detail: 'Abundant, breathtaking statement' },
];

const WRAPPING_STYLES = [
  { id: 'ivory-crimson', label: 'Warm Ivory Paper & Crimson Satin', tone: '#F8EFE6', ribbon: '#9B1330' },
  { id: 'plum-rose', label: 'Charcoal Plum Wrap & Blush Silk', tone: '#382230', ribbon: '#D96480' },
  { id: 'champagne-ivory', label: 'Champagne Linen & Ivory Bow', tone: '#E8D9C5', ribbon: '#FFF4EA' },
  { id: 'burgundy-gold', label: 'Velvet Burgundy & Gold Foil', tone: '#400D24', ribbon: '#D9B76E' },
];

const EXTRA_DETAILS = [
  { id: 'note-card', label: 'Handwritten Love Note for Nafisa', desc: 'Tucked gently between the satin ribbon folds' },
  { id: 'dew-mist', label: 'Fresh Rose & Morning Dew Mist', desc: 'Subtle natural botanical fragrance' },
  { id: 'gypsophila-halo', label: "Delicate Baby's Breath Halo", desc: 'Airy cloud of tiny white blooms framing the bouquet' },
  { id: 'gold-bow', label: 'Champagne-Gold Satin Bow', desc: 'Hand-tied finishing flourish' },
];

const TABS: { id: CustomizerTab; label: string }[] = [
  { id: 'flower-type', label: 'Flower Type' },
  { id: 'color-palette', label: 'Color Palette' },
  { id: 'bouquet-size', label: 'Bouquet Size' },
  { id: 'wrapping-style', label: 'Wrapping Style' },
  { id: 'extra-details', label: 'Extra Details' },
];

export const BouquetCustomizerModal: React.FC<BouquetCustomizerModalProps> = ({
  isOpen,
  initialBouquet,
  initialTab = 'flower-type',
  initialPreselectedFlower = null,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<CustomizerTab>(initialTab);
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>(['Red Roses', "Baby's Breath"]);
  const [selectedPalette, setSelectedPalette] = useState<string>('crimson-ivory');
  const [selectedSize, setSelectedSize] = useState<string>('classic');
  const [selectedWrapping, setSelectedWrapping] = useState<string>('ivory-crimson');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['note-card', 'gold-bow']);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsSaved(false);

      if (initialPreselectedFlower) {
        setSelectedFlowers([initialPreselectedFlower, "Baby's Breath"]);
      } else if (initialBouquet) {
        setSelectedFlowers(initialBouquet.defaultFlowerTypes);
        setSelectedPalette(initialBouquet.defaultPalette);
        setSelectedWrapping(initialBouquet.defaultWrapping);
      }
    }
  }, [isOpen, initialBouquet, initialTab, initialPreselectedFlower]);

  const toggleFlower = (id: string) => {
    setIsSaved(false);
    setSelectedFlowers((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      return [...prev, id];
    });
  };

  const toggleExtra = (id: string) => {
    setIsSaved(false);
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmArrangement = () => {
    setIsSaved(true);
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8', '#9B1330'],
    });
  };

  const handleReset = () => {
    setIsSaved(false);
    if (initialBouquet) {
      setSelectedFlowers(initialBouquet.defaultFlowerTypes);
      setSelectedPalette(initialBouquet.defaultPalette);
      setSelectedWrapping(initialBouquet.defaultWrapping);
    } else {
      setSelectedFlowers(['Red Roses', "Baby's Breath"]);
      setSelectedPalette('crimson-ivory');
      setSelectedWrapping('ivory-crimson');
    }
    setSelectedSize('classic');
    setSelectedExtras(['note-card', 'gold-bow']);
  };

  const currentPaletteObj = COLOR_PALETTES.find((p) => p.id === selectedPalette) || COLOR_PALETTES[0];
  const currentSizeObj = BOUQUET_SIZES.find((s) => s.id === selectedSize) || BOUQUET_SIZES[1];
  const currentWrappingObj = WRAPPING_STYLES.find((w) => w.id === selectedWrapping) || WRAPPING_STYLES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl my-auto rounded-2xl bg-gradient-to-b from-[#3B0613] via-[#2C040E] to-[#1D030A] border border-[#D9B76E]/35 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#D9B76E]/20">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#D9B76E] font-semibold">
                  Floral Atelier · Handcrafted For Nafisa
                </p>
                <h3 className="font-script text-3xl sm:text-4xl text-[#FFF4EA] mt-0.5">
                  {initialBouquet ? initialBouquet.name : 'Custom Romantic Bouquet'}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-[#FFF4EA] transition-colors cursor-pointer"
                aria-label="Close bouquet customizer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Preview Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#24030B]/70 border-b lg:border-b-0 lg:border-r border-[#D9B76E]/15 flex flex-col justify-between space-y-6">
                <div className="relative flex flex-col items-center text-center space-y-4">
                  {initialBouquet && (
                    <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-xl overflow-hidden bg-[#350614]">
                      <img
                        src={initialBouquet.image}
                        alt={initialBouquet.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, transparent 58%, #24030B 100%)',
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-2 w-full text-left bg-[#1A0208]/75 p-4 rounded-xl border border-[#D9B76E]/20">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#D9B76E] font-semibold">
                      Your Arrangement Summary
                    </p>
                    <div className="space-y-1.5 text-xs sm:text-sm text-[#FFF4EA]/85">
                      <p>
                        <span className="text-[#F7C5D0]">Blooms:</span>{' '}
                        {selectedFlowers.join(', ')}
                      </p>
                      <p>
                        <span className="text-[#F7C5D0]">Palette:</span>{' '}
                        {currentPaletteObj.label}
                      </p>
                      <p>
                        <span className="text-[#F7C5D0]">Size:</span>{' '}
                        {currentSizeObj.label} ({currentSizeObj.stems})
                      </p>
                      <p>
                        <span className="text-[#F7C5D0]">Wrapping:</span>{' '}
                        {currentWrappingObj.label}
                      </p>
                      {selectedExtras.length > 0 && (
                        <p>
                          <span className="text-[#F7C5D0]">Finishing Touches:</span>{' '}
                          {selectedExtras
                            .map((id) => EXTRA_DETAILS.find((e) => e.id === id)?.label)
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Palette Swatch Display */}
                <div className="flex items-center justify-between text-xs text-[#FFF4EA]/70 pt-2 border-t border-[#D9B76E]/15">
                  <span>Selected Palette Harmony</span>
                  <div className="flex items-center gap-1.5">
                    {currentPaletteObj.swatches.map((hex) => (
                      <span
                        key={hex}
                        className="w-4 h-4 rounded-full border border-white/25"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Customization Controls Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                {/* 5-Tab Bar */}
                <div className="flex items-center gap-4 sm:gap-5 border-b border-[#D9B76E]/20 overflow-x-auto pb-3">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative pb-1 text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isActive
                            ? 'text-[#D9B76E] font-semibold'
                            : 'text-[#FFF4EA]/60 hover:text-[#FFF4EA]'
                        }`}
                      >
                        {tab.label}
                        {isActive && (
                          <span className="absolute -bottom-[13px] inset-x-0 h-[2px] bg-[#D9B76E]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Tab Content */}
                <div className="min-h-[260px]">
                  {activeTab === 'flower-type' && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-[#FFF4EA]/75 font-light">
                        Select one or more blooms to compose your bouquet:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FLOWER_OPTIONS.map((item) => {
                          const active = selectedFlowers.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleFlower(item.id)}
                              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#5A0E24]/80 border-[#D9B76E] text-[#FFF4EA]'
                                  : 'bg-[#22040D]/60 border-[#D9B76E]/20 text-[#FFF4EA]/80 hover:border-[#D9B76E]/55'
                              }`}
                            >
                              <div>
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="text-xs text-[#F7C5D0]/80">{item.meaning}</p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  active
                                    ? 'bg-[#D9B76E] border-[#D9B76E] text-[#1a0815]'
                                    : 'border-[#D9B76E]/40'
                                }`}
                              >
                                {active && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'color-palette' && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-[#FFF4EA]/75 font-light">
                        Choose a romantic tonal harmony for your petals:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {COLOR_PALETTES.map((palette) => {
                          const active = selectedPalette === palette.id;
                          return (
                            <button
                              key={palette.id}
                              onClick={() => {
                                setSelectedPalette(palette.id);
                                setIsSaved(false);
                              }}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#5A0E24]/80 border-[#D9B76E] text-[#FFF4EA]'
                                  : 'bg-[#22040D]/60 border-[#D9B76E]/20 text-[#FFF4EA]/80 hover:border-[#D9B76E]/55'
                              }`}
                            >
                              <div>
                                <p className="text-sm font-semibold">{palette.label}</p>
                                <p className="text-xs text-[#F7C5D0]/80 mt-0.5">{palette.note}</p>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                                {palette.swatches.map((hex) => (
                                  <span
                                    key={hex}
                                    className="w-5 h-5 rounded-full border border-white/25"
                                    style={{ backgroundColor: hex }}
                                  />
                                ))}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'bouquet-size' && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-[#FFF4EA]/75 font-light">
                        Choose the fullness and stem count of your arrangement:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {BOUQUET_SIZES.map((size) => {
                          const active = selectedSize === size.id;
                          return (
                            <button
                              key={size.id}
                              onClick={() => {
                                setSelectedSize(size.id);
                                setIsSaved(false);
                              }}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#5A0E24]/80 border-[#D9B76E] text-[#FFF4EA]'
                                  : 'bg-[#22040D]/60 border-[#D9B76E]/20 text-[#FFF4EA]/80 hover:border-[#D9B76E]/55'
                              }`}
                            >
                              <div>
                                <p className="text-sm font-semibold">{size.label}</p>
                                <p className="text-xs text-[#F7C5D0]/85 mt-0.5">
                                  {size.stems} · {size.detail}
                                </p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  active
                                    ? 'bg-[#D9B76E] border-[#D9B76E] text-[#1a0815]'
                                    : 'border-[#D9B76E]/40'
                                }`}
                              >
                                {active && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'wrapping-style' && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-[#FFF4EA]/75 font-light">
                        Select artisanal paper and silk ribbon pairing:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {WRAPPING_STYLES.map((wrap) => {
                          const active = selectedWrapping === wrap.id;
                          return (
                            <button
                              key={wrap.id}
                              onClick={() => {
                                setSelectedWrapping(wrap.id);
                                setIsSaved(false);
                              }}
                              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#5A0E24]/80 border-[#D9B76E] text-[#FFF4EA]'
                                  : 'bg-[#22040D]/60 border-[#D9B76E]/20 text-[#FFF4EA]/80 hover:border-[#D9B76E]/55'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className="w-7 h-7 rounded-lg border border-white/25 shrink-0"
                                  style={{
                                    background: `linear-gradient(135deg, ${wrap.tone} 55%, ${wrap.ribbon} 55%)`,
                                  }}
                                />
                                <span className="text-sm font-medium">{wrap.label}</span>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  active
                                    ? 'bg-[#D9B76E] border-[#D9B76E] text-[#1a0815]'
                                    : 'border-[#D9B76E]/40'
                                }`}
                              >
                                {active && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'extra-details' && (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-[#FFF4EA]/75 font-light">
                        Add final personal touches from Abdul Ahad:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {EXTRA_DETAILS.map((extra) => {
                          const active = selectedExtras.includes(extra.id);
                          return (
                            <button
                              key={extra.id}
                              onClick={() => toggleExtra(extra.id)}
                              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#5A0E24]/80 border-[#D9B76E] text-[#FFF4EA]'
                                  : 'bg-[#22040D]/60 border-[#D9B76E]/20 text-[#FFF4EA]/80 hover:border-[#D9B76E]/55'
                              }`}
                            >
                              <div>
                                <p className="text-sm font-medium">{extra.label}</p>
                                <p className="text-xs text-[#F7C5D0]/80">{extra.desc}</p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  active
                                    ? 'bg-[#D9B76E] border-[#D9B76E] text-[#1a0815]'
                                    : 'border-[#D9B76E]/40'
                                }`}
                              >
                                {active && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirmation / Footer Actions */}
                <div className="pt-4 border-t border-[#D9B76E]/20 space-y-3">
                  {isSaved ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-[#4D0B1E] border border-[#D9B76E]/50 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 fill-[#E88CA8] text-[#E88CA8] shrink-0" />
                        <p className="text-xs sm:text-sm text-[#FFF4EA]">
                          This custom bouquet has been crafted with love especially for you, Nafisa.
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-xs text-[#D9B76E] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Edit
                      </button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#FFF4EA]/60 hover:text-[#D9B76E] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Choices</span>
                      </button>

                      <button
                        onClick={handleConfirmArrangement}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#FFF4EA] text-[#350614] hover:bg-[#D9B76E] hover:text-[#1a0815] text-xs font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer shadow-lg"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Craft This Bouquet</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
