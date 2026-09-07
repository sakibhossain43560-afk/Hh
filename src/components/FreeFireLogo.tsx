import React from 'react';
import { Flame, Zap } from 'lucide-react';

interface FreeFireLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function FreeFireLogo({ size = 'md', showSubtitle = true }: FreeFireLogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const containerSize = isSm ? 'w-9 h-9' : isLg ? 'w-12 h-12' : 'w-10 h-10';
  const iconSize = isSm ? 'w-5 h-5' : isLg ? 'w-7 h-7' : 'w-6 h-6';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none group">
      {/* FreeFire Glowing Combat Shield Emblem */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${containerSize}`}>
        {/* Animated Fiery Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        
        {/* Crest Outer Rim */}
        <div className="relative w-full h-full bg-gradient-to-b from-[#241e2b] via-[#141522] to-[#0a0c14] border border-amber-400/60 group-hover:border-amber-300 rounded-2xl flex items-center justify-center shadow-lg shadow-black/80 transition-all duration-300 overflow-hidden">
          {/* Subtle Cyber Grid Accent */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:6px_6px]" />
          
          {/* Glowing Flame & Core Energy Icon from Lucide */}
          <div className="relative flex items-center justify-center">
            <Flame
              className={`${iconSize} text-amber-400 fill-amber-400 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.9)] transition-transform duration-300`}
            />
            {/* Tiny Core Energy Spark */}
            <Zap
              className="absolute -bottom-1 -right-1 w-2.5 h-2.5 text-orange-400 fill-yellow-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.9)]"
            />
          </div>
        </div>
      </div>

      {/* FreeFire Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center tracking-tighter italic font-black uppercase font-['Bebas_Neue','Rajdhani',sans-serif]">
          <span
            className={`${
              isSm ? 'text-xl' : isLg ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            } text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f3f4f6] to-[#9ca3af] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wider`}
          >
            FREE
          </span>
          <span
            className={`${
              isSm ? 'text-xl' : isLg ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            } ml-1.5 text-transparent bg-clip-text bg-gradient-to-b from-[#fbbf24] via-[#f97316] to-[#dc2626] drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] tracking-wider`}
          >
            FIRE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[9px] tracking-[0.25em] text-amber-400 font-bold uppercase font-['Rajdhani',sans-serif]">
              PLAYER INTEL
            </span>
            <span className="w-1 h-1 rounded-full bg-orange-500"></span>
            <span className="text-[9px] tracking-[0.2em] text-gray-400 font-bold uppercase font-['Rajdhani',sans-serif]">
              BD & GLOBAL
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
