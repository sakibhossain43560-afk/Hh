import React, { useState } from 'react';
import {
  Crown,
  Trophy,
  Heart,
  Flame,
  Shield,
  Tag,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  Zap,
} from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';

interface HologramPlayerCardProps {
  onSelectUid: (uid: string) => void;
}

interface DemoProfile {
  uid: string;
  name: string;
  server: string;
  level: number;
  likes: number;
  exp: number;
  rank: string;
  guild: string;
  guildRole: string;
  estimatedPrice: string;
  accountAge: string;
  tier: string;
}

export function HologramPlayerCard({ onSelectUid }: HologramPlayerCardProps) {
  const profiles: DemoProfile[] = [
    {
      uid: '188106053',
      name: 'LᴅʀㅤᴏFㅤBᴄᴡ',
      server: 'BD (Bangladesh)',
      level: 75,
      likes: 40987,
      exp: 4815963,
      rank: 'Grandmaster / Heroic',
      guild: 'BD-CIVIL-WAR',
      guildRole: 'Leader (BCW)',
      estimatedPrice: '৳38,500 TK',
      accountAge: '6 Years, 4 Months',
      tier: 'ELITE VETERAN',
    },
    {
      uid: '4817924301',
      name: 'BCW〆AKASH,',
      server: 'BD (Bangladesh)',
      level: 78,
      likes: 52430,
      exp: 5640200,
      rank: 'Heroic Tier',
      guild: 'BD-CIVIL-WAR',
      guildRole: 'Guild Master',
      estimatedPrice: '৳45,200 TK',
      accountAge: '5 Years, 8 Months',
      tier: 'LEGENDARY GUILD LEADER',
    },
    {
      uid: '234567890',
      name: 'RAJAㅤGAMER',
      server: 'IND (India Server)',
      level: 71,
      likes: 31200,
      exp: 3950000,
      rank: 'Master Tier',
      guild: 'RAJA-ESPORTS',
      guildRole: 'Captain',
      estimatedPrice: '৳29,800 TK',
      accountAge: '4 Years, 11 Months',
      tier: 'TOURNAMENT PRO',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const current = profiles[activeIndex];

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-[#141724] via-[#0f111a] to-[#0a0c13] border-2 border-amber-500/30 p-5 sm:p-7 shadow-[0_15px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Background Hologram Hex Pattern & Fire Flare */}
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-gradient-to-tr from-red-600/15 via-orange-500/10 to-transparent rounded-full blur-[70px] pointer-events-none" />

      {/* Cyber HUD Corner Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-500/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-500/60 pointer-events-none" />

      {/* Hologram Header & Profile Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs font-black tracking-wider uppercase text-amber-400 font-['Rajdhani',sans-serif]">
            INTERACTIVE PLAYER INTEL HOLOGRAM
          </span>
        </div>

        {/* Profile Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#090b10] p-1 rounded-xl border border-white/10 w-full sm:w-auto overflow-x-auto">
          {profiles.map((p, idx) => (
            <button
              key={p.uid}
              type="button"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setActiveIndex(idx);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap font-mono ${
                activeIndex === idx
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-orange-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.name.split(' ')[0]} (Lv.{p.level})
            </button>
          ))}
        </div>
      </div>

      {/* Main Holographic Player Showcase Card */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Side: Avatar Banner & Level Meter */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative bg-gradient-to-br from-[#1a1d2d] to-[#0c0d14] rounded-2xl p-4 border border-amber-500/30 shadow-inner group">
            {/* Glowing rank backdrop */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                {current.tier}
              </span>
              <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {current.server}
              </span>
            </div>

            {/* Avatar & Player Name */}
            <div className="flex items-center gap-3.5 mt-3.5">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 p-0.5 shadow-lg shadow-orange-500/30">
                  <div className="w-full h-full rounded-[10px] bg-[#0d0f17] flex items-center justify-center text-xl font-black text-amber-400 font-mono">
                    {current.name.charAt(0)}
                  </div>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs font-mono">
                  Lv.{current.level}
                </div>
              </div>

              <div className="overflow-hidden">
                <h3 className="text-lg font-black text-white truncate tracking-tight font-['Rajdhani',sans-serif]">
                  {current.name}
                </h3>
                <p className="text-xs font-mono text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span>UID:</span>
                  <span className="bg-white/5 px-1.5 py-0.5 rounded text-gray-200">{current.uid}</span>
                </p>
              </div>
            </div>

            {/* Level Experience Progress Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-gray-400">EXP Progress</span>
                <span className="text-amber-400">{current.exp.toLocaleString()} EXP</span>
              </div>
              <div className="w-full h-2 bg-[#090a10] rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (current.level / 100) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tactical Stats Grid */}
        <div className="lg:col-span-7 space-y-3 font-['Hind_Siliguri',sans-serif]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            {/* Likes */}
            <div className="bg-[#090b10] p-3 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-1 text-rose-400 text-[11px]">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                <span className="font-semibold">মোট লাইকস</span>
              </div>
              <p className="text-white font-mono font-bold text-sm sm:text-base">
                {current.likes.toLocaleString()}
              </p>
            </div>

            {/* Rank */}
            <div className="bg-[#090b10] p-3 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-1 text-yellow-400 text-[11px]">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                <span className="font-semibold">র্যাংক টিয়ার</span>
              </div>
              <p className="text-amber-300 font-bold text-xs sm:text-sm truncate">
                {current.rank}
              </p>
            </div>

            {/* Market Price */}
            <div className="bg-[#090b10] p-3 rounded-xl border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">মার্কেট প্রাইস</span>
              </div>
              <p className="text-emerald-400 font-mono font-black text-sm sm:text-base">
                {current.estimatedPrice}
              </p>
            </div>

            {/* Guild */}
            <div className="bg-[#090b10] p-3 rounded-xl border border-white/5 space-y-1 sm:col-span-2">
              <div className="flex items-center gap-1 text-indigo-400 text-[11px]">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold">গিল্ড / ক্ল্যান ইনফো</span>
              </div>
              <p className="text-gray-200 font-bold text-xs truncate">
                {current.guild} <span className="text-gray-500 font-normal">({current.guildRole})</span>
              </p>
            </div>

            {/* Account Age */}
            <div className="bg-[#090b10] p-3 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-1 text-amber-400 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">অ্যাকাউন্টের বয়স</span>
              </div>
              <p className="text-gray-300 font-bold text-xs">
                {current.accountAge}
              </p>
            </div>
          </div>

          {/* Quick CTA to inspect this profile */}
          <button
            type="button"
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              onSelectUid(current.uid);
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-orange-500 text-black font-black uppercase text-sm rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer font-['Bebas_Neue',sans-serif] tracking-wider active:scale-[0.98]"
          >
            <span>সম্পূর্ণ প্রোফাইল ও রিপোর্ট দেখুন (INSPECT {current.name.split(' ')[0]})</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
