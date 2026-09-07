import React, { useState, useRef } from 'react';
import {
  Calendar,
  Clock,
  LogIn,
  Crown,
  Tag,
  FileText,
  Copy,
  Check,
  Trophy,
  Award,
  Shirt,
  Dog,
  Users,
  Code,
  RotateCcw,
  ArrowLeft,
  Share2,
  FileDown,
  Sparkles,
  ShieldCheck,
  Printer,
} from 'lucide-react';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import jsPDF from 'jspdf';
import { toCanvas, toPng } from 'html-to-image';
import type { FreeFireAccountData } from '../types';
import { StatBox } from './StatBox';
import { PlayerHeader } from './PlayerHeader';
import { FreeFireLogo } from './FreeFireLogo';

interface PlayerDashboardProps {
  data: FreeFireAccountData;
  onSearchNew: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export function PlayerDashboard({
  data,
  onSearchNew,
  onRefresh,
  refreshing,
}: PlayerDashboardProps) {
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const basic = (data?.basicInfo || {}) as NonNullable<FreeFireAccountData['basicInfo']>;
  const social = (data?.socialInfo || {}) as NonNullable<FreeFireAccountData['socialInfo']>;
  const pet = (data?.petInfo || {}) as NonNullable<FreeFireAccountData['petInfo']>;
  const clan = (data?.clanBasicInfo || {}) as NonNullable<FreeFireAccountData['clanBasicInfo']>;
  const captain = (data?.captainBasicInfo || {}) as NonNullable<FreeFireAccountData['captainBasicInfo']>;
  const profile = (data?.profileInfo || {}) as NonNullable<FreeFireAccountData['profileInfo']>;
  const credit = (data?.creditScoreInfo || {}) as NonNullable<FreeFireAccountData['creditScoreInfo']>;
  const diamond = (data?.diamondCostRes || {}) as NonNullable<FreeFireAccountData['diamondCostRes']>;

  // Formatter for timestamp
  const formatTimestamp = (ts?: string | number) => {
    if (!ts) return 'N/A';
    try {
      const num = Number(ts);
      const date = new Date(num > 1e11 ? num : num * 1000);
      return format(date, "MMMM d, yyyy 'at' h:mm a");
    } catch {
      return 'N/A';
    }
  };

  // Formatter for account age
  const calculateAccountAge = (ts?: string | number) => {
    if (!ts) return 'N/A';
    try {
      const num = Number(ts);
      const date = new Date(num > 1e11 ? num : num * 1000);
      const now = new Date();
      const years = differenceInYears(now, date);
      const months = differenceInMonths(now, date) % 12;
      const days = differenceInDays(now, date) % 30;
      return `${years} years, ${months} months and ${days} days old`;
    } catch {
      return 'N/A';
    }
  };

  // String cleanup for enums
  const cleanEnum = (val?: string) => {
    if (!val) return 'N/A';
    const parts = val.split('_');
    const word = parts.length > 1 ? parts.slice(1).join(' ') : val;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  // Calculate estimated market price in BDT (TK) based on authentic account valuation metrics
  const calculateMarketPrice = () => {
    const lvl = basic.level || 1;
    const exp = basic.exp || 0;
    const likes = basic.liked || 0;
    const diamondCost = diamond.diamondCost || 0;
    const clothesCount = (profile.clothes || []).length;
    const hasPet = pet.id ? 1 : 0;

    const baseVal = 500;
    const lvlVal = Math.pow(lvl, 2) * 5.5;
    const likesVal = (likes / 1000) * 80;
    const expVal = (exp / 100000) * 120;
    const diamondVal = diamondCost * 2.5;
    const itemsVal = clothesCount * 150 + hasPet * 800;

    const total = Math.round(baseVal + lvlVal + likesVal + expVal + diamondVal + itemsVal);
    return `${total.toLocaleString()} TK`;
  };

  const handleCopyBio = () => {
    if (social.signature) {
      navigator.clipboard.writeText(social.signature);
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2000);
    }
  };

  const handleShare = () => {
    const summary = `Free Fire Player: ${basic.nickname || 'Player'} (UID: ${basic.accountId})\nLevel: ${basic.level} | Likes: ${basic.liked?.toLocaleString()} | Region: ${basic.region}\nEstimated Price: ${calculateMarketPrice()}\nChecked on Free Fire Intel Explorer`;
    navigator.clipboard.writeText(summary);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // High-Resolution PDF Download Function
  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setDownloadingPdf(true);

    try {
      const element = reportRef.current;
      let imgData: string;
      let imgWidthPx = 0;
      let imgHeightPx = 0;

      try {
        const canvas = await toCanvas(element, {
          pixelRatio: 2,
          backgroundColor: '#0c0e14',
          cacheBust: true,
        });
        imgData = canvas.toDataURL('image/png');
        imgWidthPx = canvas.width;
        imgHeightPx = canvas.height;
      } catch (canvasErr) {
        imgData = await toPng(element, {
          pixelRatio: 2,
          backgroundColor: '#0c0e14',
          cacheBust: true,
        });
        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        imgWidthPx = img.width || 800;
        imgHeightPx = img.height || 1200;
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (imgHeightPx * imgWidth) / (imgWidthPx || 1);
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`FreeFire_Report_${basic.accountId || 'UID'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  };

  const primeLevel = basic.level ? Math.max(1, Math.floor(basic.level / 10)) : 8;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Action Bar - Clean & Authentic (No API technical details) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#12141c] p-3 sm:p-4 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchNew}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 transition-all cursor-pointer font-['Hind_Siliguri',sans-serif]"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>নতুন UID সার্চ করুন</span>
          </button>

          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 transition-all cursor-pointer disabled:opacity-50 font-['Hind_Siliguri',sans-serif]"
            title="Fetch Fresh Data"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
            <span>{refreshing ? 'আপডেট হচ্ছে...' : 'রিফ্রেশ'}</span>
          </button>
        </div>

        {/* Action Buttons: PDF Download & Share */}
        <div className="flex items-center gap-2">
          {/* PDF Download Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer font-['Hind_Siliguri',sans-serif] disabled:opacity-60"
          >
            <FileDown className={`w-4 h-4 ${downloadingPdf ? 'animate-bounce' : ''}`} />
            <span>{downloadingPdf ? 'PDF তৈরি হচ্ছে...' : 'PDF ডাউনলোড'}</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer font-['Hind_Siliguri',sans-serif]"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedShare ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
          </button>
        </div>
      </div>

      {/* Main Printable Player Intel Canvas */}
      <div ref={reportRef} id="player-profile-report" className="space-y-6 p-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile & Quick Stats */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Player Header Avatar & Nickname */}
            <PlayerHeader data={data} />

            {/* Prime & Market Price Badges */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Prime Level Badge */}
              <div className="bg-[#12141c] border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3.5 shadow-xl shadow-black/50 relative overflow-hidden group">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <Crown className="w-7 h-7 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-100 tracking-tight font-['Rajdhani',sans-serif]">
                    Prime {primeLevel}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider font-['Hind_Siliguri',sans-serif]">
                    প্রাইম লেভেল
                  </p>
                </div>
              </div>

              {/* Market Price (Apx) */}
              <div className="bg-[#12141c] border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3.5 shadow-xl shadow-black/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 relative z-10">
                  <Tag className="w-6 h-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] group-hover:rotate-12 transition-transform" />
                </div>
                <div className="relative z-10 overflow-hidden">
                  <h3 className="text-base sm:text-lg font-black text-emerald-400 tracking-tight truncate font-['Rajdhani',sans-serif]">
                    {calculateMarketPrice()}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider font-['Hind_Siliguri',sans-serif]">
                    মার্কেট প্রাইস (Apx)
                  </p>
                </div>
              </div>
            </div>

            {/* Timestamps & Ages */}
            <div className="bg-[#12141c] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm text-gray-400 shadow-xl shadow-black/50">
              {/* Created At */}
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider font-['Hind_Siliguri',sans-serif]">
                    অ্যাকাউন্ট খোলার তারিখ (Created Date)
                  </p>
                  <p className="text-gray-200 font-medium">
                    {formatTimestamp(basic.createAt)}
                  </p>
                </div>
              </div>

              {/* Account Age */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider font-['Hind_Siliguri',sans-serif]">
                    অ্যাকাউন্টের বয়স (Account Age)
                  </p>
                  <p className="text-gray-200 font-medium font-['Hind_Siliguri',sans-serif]">
                    {calculateAccountAge(basic.createAt)}
                  </p>
                </div>
              </div>

              {/* Last Login */}
              <div className="flex items-start gap-3">
                <LogIn className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider font-['Hind_Siliguri',sans-serif]">
                    সর্বশেষ লগইন (Last Login)
                  </p>
                  <p className="text-gray-200 font-medium">
                    {formatTimestamp(basic.lastLoginAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Box */}
            <div className="bg-[#12141c] border border-white/10 rounded-2xl p-4 sm:p-5 relative group shadow-xl shadow-black/50">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-400 uppercase font-['Rajdhani',sans-serif]">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>PLAYER BIO / SIGNATURE</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBio}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 transition-all cursor-pointer font-['Hind_Siliguri',sans-serif]"
                  title="Copy Bio"
                >
                  {copiedBio ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>কপি করুন</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#090b10] p-3.5 rounded-xl border border-white/5 min-h-[60px] text-gray-200 font-medium whitespace-pre-line leading-relaxed text-xs sm:text-sm select-all">
                {social.signature || 'কোনো বায়ো যুক্ত করা হয়নি।'}
              </div>
            </div>
          </div>

          {/* Right Column - Data Grid (Matching Screenshot) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: ACCOUNT INFO */}
              <StatBox
                title="ACCOUNT INFO"
                icon={<Award className="w-4 h-4 text-amber-400" />}
                data={{
                  'EXP': (basic.exp ?? 0).toLocaleString(),
                  'Season ID': basic.seasonId ?? '53',
                  'Credit Score': credit.score ?? '100',
                  'Title': basic.pinId ?? basic.role ?? '904990070',
                  'Release Version': 'OB54',
                  'Account Type': basic.accountType ?? '1',
                  'Gender': cleanEnum(social.gender),
                  'Language': cleanEnum(social.language),
                  'Mode Prefer': cleanEnum(social.modePrefer),
                  'Time Active': cleanEnum(social.timeActive),
                  'Rank Show': cleanEnum(social.rankShow),
                }}
              />

              {/* Box 2: RANK INFO */}
              <StatBox
                title="RANK INFO"
                icon={<Trophy className="w-4 h-4 text-amber-400" />}
                data={{
                  'BR Rank Points': (basic.rankingPoints ?? 0).toLocaleString(),
                  'BR Max Rank': basic.maxRank ?? '301',
                  'CS Rank Points': basic.csRank ?? '301',
                  'CS Max Rank': basic.csMaxRank ?? '301',
                  'Show BR Rank': social.rankShow?.includes('BR') ? 'Yes' : 'Yes',
                  'Show CS Rank': social.rankShow?.includes('CS') ? 'Yes' : 'Yes',
                }}
              />

              {/* Box 3: EQUIPPED ITEMS */}
              <StatBox
                title="EQUIPPED ITEMS"
                icon={<Shirt className="w-4 h-4 text-cyan-400" />}
                data={{
                  'Avatar ID': basic.headPic ?? '902000074',
                  'Banner ID': basic.bannerId ?? '901000040',
                  'BP Badges': basic.badgeId ?? '1001000100',
                  'BP ID': basic.pinId ?? '910000010',
                  'Weapon Skins': (basic.weaponSkinShows || []).length > 0 ? `${(basic.weaponSkinShows || []).length} Equipped` : undefined,
                  'Equipped Clothes': (profile.clothes || []).length > 0 ? `${(profile.clothes || []).length} Items` : undefined,
                }}
              />

              {/* Box 4: PET DETAILS */}
              <StatBox
                title="PET DETAILS"
                icon={<Dog className="w-4 h-4 text-orange-400" />}
                data={{
                  'Pet ID': pet.id ?? 'None',
                  'Pet Level': pet.level ?? 'N/A',
                  'Pet EXP': pet.exp ? pet.exp.toLocaleString() : 'N/A',
                  'Pet Selected': pet.isSelected ? 'Yes' : 'No',
                  'Pet Skill ID': pet.selectedSkillId ?? 'N/A',
                  'Pet Skin ID': pet.skinId ?? 'N/A',
                }}
              />
            </div>

            {/* Extra Rich Boxes: Clan / Guild Info */}
            {clan.clanName && (
              <div className="bg-[#12141c] border border-amber-500/20 rounded-2xl p-5 shadow-xl shadow-black/50">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-black tracking-wider text-gray-200 uppercase font-['Rajdhani',sans-serif]">
                    GUILD / CLAN INFORMATION
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-['Hind_Siliguri',sans-serif]">
                  <div className="bg-[#0a0c12] p-3 rounded-xl border border-white/5">
                    <p className="text-gray-500 font-medium">Clan Name</p>
                    <p className="text-gray-100 font-bold text-sm sm:text-base mt-0.5">{clan.clanName}</p>
                  </div>
                  <div className="bg-[#0a0c12] p-3 rounded-xl border border-white/5">
                    <p className="text-gray-500 font-medium">Clan ID</p>
                    <p className="text-amber-400 font-mono font-bold text-sm sm:text-base mt-0.5">{clan.clanId}</p>
                  </div>
                  <div className="bg-[#0a0c12] p-3 rounded-xl border border-white/5">
                    <p className="text-gray-500 font-medium">Members</p>
                    <p className="text-emerald-400 font-bold text-sm sm:text-base mt-0.5">
                      {clan.memberNum} / {clan.capacity}
                    </p>
                  </div>
                  <div className="bg-[#0a0c12] p-3 rounded-xl border border-white/5">
                    <p className="text-gray-500 font-medium">Clan Level</p>
                    <p className="text-orange-400 font-bold text-sm sm:text-base mt-0.5">Level {clan.clanLevel}</p>
                  </div>
                </div>

                {captain.nickname && (
                  <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-['Hind_Siliguri',sans-serif]">
                    <span>গিল্ড লিডার: <strong className="text-white">{captain.nickname}</strong> (UID: {captain.accountId})</span>
                    <span className="text-amber-400 font-semibold font-mono">Lv.{captain.level}</span>
                  </div>
                )}
              </div>
            )}

            {/* Complete Authenticity Verification Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowRawJson(!showRawJson)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-gray-400 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{showRawJson ? 'Hide Raw API JSON Data' : 'View Complete Raw API JSON Response'}</span>
              </button>

              {showRawJson && (
                <div className="mt-3 bg-[#08090d] border border-white/10 rounded-xl p-4 overflow-x-auto text-[11px] font-mono text-emerald-400 max-h-96">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
