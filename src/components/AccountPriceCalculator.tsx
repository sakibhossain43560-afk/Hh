import React, { useState } from 'react';
import { Calculator, Tag, Sparkles, Flame, Shield, HelpCircle } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/sound';

interface AccountPriceCalculatorProps {
  onCheckDirectUid: () => void;
}

export function AccountPriceCalculator({ onCheckDirectUid }: AccountPriceCalculatorProps) {
  const [level, setLevel] = useState<number>(72);
  const [likes, setLikes] = useState<number>(25000);
  const [evoGuns, setEvoGuns] = useState<number>(3);
  const [booyahPasses, setBooyahPasses] = useState<number>(8);
  const [hasOldItems, setHasOldItems] = useState<boolean>(true);

  // Dynamic Valuation Algorithm in Bangladeshi Taka (TK)
  const calculatePrice = () => {
    const basePrice = 800;
    const levelFactor = Math.pow(level, 2) * 5.2;
    const likesFactor = (likes / 1000) * 110;
    const evoGunFactor = evoGuns * 2800; // Each evo gun adds high valuation
    const bpFactor = booyahPasses * 350;
    const oldSeasonBonus = hasOldItems ? 3500 : 0;

    const total = Math.round(basePrice + levelFactor + likesFactor + evoGunFactor + bpFactor + oldSeasonBonus);
    return total;
  };

  const currentTotal = calculatePrice();

  const getTier = (total: number) => {
    if (total >= 40000) return { name: 'MYTHIC WHALE ACCOUNT', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' };
    if (total >= 25000) return { name: 'PRO VETERAN ELITE', color: 'text-orange-400 border-orange-500/40 bg-orange-500/10' };
    if (total >= 12000) return { name: 'HEROIC MASTER ID', color: 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10' };
    return { name: 'ACTIVE SURVIVOR ID', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' };
  };

  const tier = getTier(currentTotal);

  return (
    <div className="bg-[#12141c] border-2 border-amber-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden font-['Hind_Siliguri',sans-serif]">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight font-['Rajdhani',sans-serif]">
              FF ACCOUNT PRICE ESTIMATOR
            </h3>
            <span className="text-[11px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              ইন্টারেক্টিভ ক্যালকুলেটর
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            আপনার ফ্রি ফায়ার অ্যাকাউন্টের আনুমানিক বাজার মূল্য (Market Value) হিসাব করুন
          </p>
        </div>

        {/* Dynamic Estimated Price Display */}
        <div className="bg-[#090b10] border border-emerald-500/30 px-4 py-2 rounded-xl text-right w-full sm:w-auto">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">আনুমানিক মূল্য (Estimated)</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            ৳ {currentTotal.toLocaleString()} TK
          </p>
        </div>
      </div>

      {/* Calculator Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Left: Sliders */}
        <div className="space-y-4">
          {/* Level Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-bold">অ্যাকাউন্ট লেভেল (Level):</span>
              <span className="font-mono text-amber-400 font-bold text-sm">Lv. {level}</span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              value={level}
              onChange={(e) => {
                setLevel(Number(e.target.value));
                playClickSound();
              }}
              className="w-full h-2 bg-[#090b10] rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>Lv.10</span>
              <span>Lv.50</span>
              <span>Lv.95</span>
            </div>
          </div>

          {/* Likes Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-bold">মোট লাইকস (Likes):</span>
              <span className="font-mono text-rose-400 font-bold text-sm">{likes.toLocaleString()} ❤️</span>
            </div>
            <input
              type="range"
              min={1000}
              max={60000}
              step={1000}
              value={likes}
              onChange={(e) => {
                setLikes(Number(e.target.value));
                playClickSound();
              }}
              className="w-full h-2 bg-[#090b10] rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1k</span>
              <span>30k</span>
              <span>60k+</span>
            </div>
          </div>

          {/* Evo Guns Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-bold">ম্যাক্স ইভো গান (Evo Guns Max):</span>
              <span className="font-mono text-cyan-400 font-bold text-sm">{evoGuns} Guns</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              value={evoGuns}
              onChange={(e) => {
                setEvoGuns(Number(e.target.value));
                playClickSound();
              }}
              className="w-full h-2 bg-[#090b10] rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>

        {/* Right: Passes & Tier Badge */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Booyah Pass Count */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-bold">বুয়াহ পাস সংখ্যা (Booyah Passes):</span>
                <span className="font-mono text-yellow-400 font-bold text-sm">{booyahPasses} Season</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={booyahPasses}
                onChange={(e) => {
                  setBooyahPasses(Number(e.target.value));
                  playClickSound();
                }}
                className="w-full h-2 bg-[#090b10] rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
            </div>

            {/* Old Season / Rare Item Toggle */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#090b10] border border-white/5 cursor-pointer hover:border-amber-500/30 transition-colors">
              <span className="text-xs text-gray-300 font-medium">
                পুরোনো সিজন ব্যাজ / রেয়ার বান্ডেল আছে কি? (Season 1-10)
              </span>
              <input
                type="checkbox"
                checked={hasOldItems}
                onChange={(e) => {
                  setHasOldItems(e.target.checked);
                  playClickSound();
                }}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-[#12141c] border-white/10"
              />
            </label>
          </div>

          {/* Account Tier Result Box */}
          <div className={`p-4 rounded-xl border ${tier.color} flex items-center justify-between`}>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">এস্টিমেটেড টিয়ার রেটিং</p>
              <h4 className="text-base font-black tracking-tight font-['Rajdhani',sans-serif]">
                {tier.name}
              </h4>
            </div>
            <button
              type="button"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                onCheckDirectUid();
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black rounded-lg shadow-md transition-all cursor-pointer font-['Hind_Siliguri',sans-serif] whitespace-nowrap"
            >
              আসল UID সার্চ করুন ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
