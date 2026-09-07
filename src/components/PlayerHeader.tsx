import React, { useState } from 'react';
import { Copy, Check, Heart, Trophy, Globe, UserCheck, Shield, Sparkles } from 'lucide-react';
import type { FreeFireAccountData } from '../types';

interface PlayerHeaderProps {
  data: FreeFireAccountData;
}

export function PlayerHeader({ data }: PlayerHeaderProps) {
  const [copiedId, setCopiedId] = useState(false);
  const basic = (data?.basicInfo || {}) as NonNullable<FreeFireAccountData['basicInfo']>;
  const social = (data?.socialInfo || {}) as NonNullable<FreeFireAccountData['socialInfo']>;

  const handleCopyUid = () => {
    if (basic.accountId) {
      navigator.clipboard.writeText(basic.accountId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Avatar URL resolution:
  // Often Free Fire avatar heads can be represented with standard stylish gaming badges
  // We can use an avatar display with headPic id indicator
  const level = basic.level || 1;

  return (
    <div className="bg-[#181a20] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl shadow-black/60 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
        {/* Avatar Frame with Level */}
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <div className="w-full h-full rounded-xl bg-[#121318] overflow-hidden relative flex items-center justify-center">
              {/* Character / Avatar Visual */}
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${basic.accountId || 'freefire'}&backgroundColor=121318`}
                alt={basic.nickname || 'Player Avatar'}
                crossOrigin="anonymous"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay ID tag */}
              <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-center font-mono py-0.5 text-amber-300 backdrop-blur-xs">
                HEAD:{basic.headPic || 'DEF'}
              </div>
            </div>
          </div>

          {/* Level Badge anchored */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-2.5 py-0.5 rounded-full font-black text-[11px] shadow-md border border-white/20 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-black" />
            <span>Lv.{level}</span>
          </div>
        </div>

        {/* Player Names & Meta */}
        <div className="flex-1 text-center sm:text-left space-y-2.5">
          {/* Nickname and Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md select-all">
              {basic.nickname || 'Unknown Player'}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <UserCheck className="w-3 h-3" />
              <span>Verified Account</span>
            </span>
            {basic.region && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>{basic.region}</span>
              </span>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300 pt-1">
            {/* Account ID / UID */}
            <div className="flex items-center gap-1.5 bg-[#121318] px-3 py-1.5 rounded-xl border border-white/5">
              <span className="text-gray-500 font-semibold">UID:</span>
              <span className="font-mono font-bold text-white tracking-wide">{basic.accountId}</span>
              <button
                type="button"
                onClick={handleCopyUid}
                className="ml-1 text-gray-400 hover:text-amber-400 transition-colors p-0.5"
                title="Copy UID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-1.5 bg-[#121318] px-3 py-1.5 rounded-xl border border-white/5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
              <span className="text-gray-500 font-semibold">Likes:</span>
              <span className="font-bold text-white">{(basic.liked ?? 0).toLocaleString()}</span>
            </div>

            {/* Season */}
            {basic.seasonId && (
              <div className="flex items-center gap-1.5 bg-[#121318] px-3 py-1.5 rounded-xl border border-white/5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-gray-500 font-semibold">Season:</span>
                <span className="font-bold text-white">{basic.seasonId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
