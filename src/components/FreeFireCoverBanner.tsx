import React from 'react';
import { Flame, Zap, Shield, Sparkles } from 'lucide-react';

interface FreeFireCoverBannerProps {
  onQuickSearch?: (uid: string) => void;
}

export function FreeFireCoverBanner({ onQuickSearch }: FreeFireCoverBannerProps) {
  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/70 shadow-[0_0_35px_rgba(245,158,11,0.3)] bg-[#0c0a12] select-none">
      {/* 1. HD BACKGROUND IMAGE (Clear, brightly lit on right, high contrast & vivid) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/free_fire_cover_wide.jpg"
          alt="Free Fire Hero Cover"
          className="w-full h-full object-cover object-right sm:object-center filter brightness-105 contrast-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== '/free_fire_cover.jpg') {
              img.src = '/free_fire_cover.jpg';
            }
          }}
        />

        {/* Soft shadow ONLY on the left for text readability; Right side stays 100% bright & HD */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      </div>

      {/* 2. GLOWING FIRE BORDERS & ACCENTS */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-90 pointer-events-none" />

      {/* 3. COMPACT, CLEAN & ELEGANT TEXT CONTENT (Leaves the artwork open & visible) */}
      <div className="relative z-10 p-3 sm:p-5 md:p-6 min-h-[160px] sm:min-h-[190px] md:min-h-[220px] flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-amber-500/50">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="font-['Bebas_Neue',sans-serif] text-sm sm:text-base tracking-widest text-white uppercase">
              FREE FIRE
            </span>
          </div>

          <span className="text-[10px] sm:text-xs text-amber-300 font-mono font-bold px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm border border-white/10">
            BD & GLOBAL SERVER
          </span>
        </div>

        {/* Headline - Compact & Aesthetic so artwork shines */}
        <div className="my-auto max-w-sm sm:max-w-md py-1">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none font-['Bebas_Neue','Rajdhani',sans-serif]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.9)] italic">
              SEARCH
            </span>{' '}
            <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] italic">
              PLAYER INTEL
            </span>
          </h1>

          {/* Bengali Subtitle - Short, crisp and readable */}
          <p className="text-xs sm:text-sm text-gray-200 font-medium font-['Hind_Siliguri',sans-serif] mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2">
            যেকোনো ফ্রি ফায়ার প্লেয়ারের UID দিয়ে লাইভ প্রোফাইল, একাউন্ট লেভেল, রাংক ও গিল্ডের তথ্য জানুন।
          </p>
        </div>

        {/* Bottom Floating Tag */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-['Hind_Siliguri',sans-serif]">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ১০০% ফ্রি
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              ইনস্ট্যান্ট লাইভ রেজাল্ট
            </span>
          </div>

          {/* Right Corner "Play Smart Get Info" subtle badge */}
          <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/90 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-yellow-300/40 text-right transform -rotate-1 shadow-lg">
            <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-yellow-200 font-['Rajdhani',sans-serif] leading-none">
              Play Smart
            </span>
            <span className="block text-xs sm:text-sm font-black uppercase tracking-wider text-white font-['Bebas_Neue',sans-serif] leading-none">
              Get Info
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
