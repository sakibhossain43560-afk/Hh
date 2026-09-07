import React, { useState, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Zap,
  Shield,
  Trophy,
  Users,
  Flame,
  X,
  Clipboard,
  FileDown,
  History,
  Fingerprint,
  Gamepad2,
  Dog,
  Lock,
  Cpu,
  HelpCircle,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { FreeFireCoverBanner } from './FreeFireCoverBanner';
import {
  playClickSound,
  playHoverSound,
  playSuccessSound,
} from '../utils/sound';

interface HomeHeroProps {
  onSearch: (uid: string) => void;
  loading: boolean;
  recentSearches: string[];
}

export function HomeHero({ onSearch, loading, recentSearches }: HomeHeroProps) {
  const [inputUid, setInputUid] = useState('');
  const [selectedServer, setSelectedServer] = useState<'auto' | 'bd' | 'ind' | 'sg' | 'br'>('auto');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputUid.trim();
    if (!clean) return;
    playSuccessSound();
    onSearch(clean);
  };

  const handleQuickSearch = (uid: string) => {
    playClickSound();
    setInputUid(uid);
    onSearch(uid);
  };

  const handlePaste = async () => {
    try {
      playClickSound();
      const text = await navigator.clipboard.readText();
      const digitsOnly = text.replace(/\D/g, '');
      if (digitsOnly) {
        setInputUid(digitsOnly);
      } else if (text.trim()) {
        setInputUid(text.trim());
      }
    } catch {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const handleClear = () => {
    playClickSound();
    setInputUid('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const cleanDigits = inputUid.replace(/\D/g, '');
  const isValidLength = cleanDigits.length >= 7 && cleanDigits.length <= 12;

  // Dynamic feature cards directly under the search container
  const dynamicFeatureCards = [
    {
      icon: <Fingerprint className="w-5 h-5 text-amber-400" />,
      tag: 'IDENTITY',
      title: 'প্লেয়ার আইডেন্টিটি ও প্রোফাইল',
      desc: 'আসল ইন-গেম নাম (IGN), লেভেল ৮৮+, মোট লাইকস, ভি-ব্যাজ ও অনার স্কোর।',
      gradient: 'from-amber-500/20 to-transparent',
      borderColor: 'group-hover:border-amber-500/50',
    },
    {
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      tag: 'RANK TIER',
      title: 'BR ও CS র‍্যাংক সিস্টেম',
      desc: 'ব্যাটল রয়্যাল ও ক্লাস স্কোয়াড র‍্যাংক পয়েন্ট, হিরোইক/মাস্টার স্টারস ও সিজন রেকর্ড।',
      gradient: 'from-yellow-500/20 to-transparent',
      borderColor: 'group-hover:border-yellow-500/50',
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      tag: 'CLAN SQUAD',
      title: 'গিল্ড ও টিমমেট ইন্টেল',
      desc: 'গিল্ডের আসল নাম, ইউনিক গিল্ড আইডি, গিল্ড লিডার ও মেম্বার ক্যাপাসিটি তথ্য।',
      gradient: 'from-cyan-500/20 to-transparent',
      borderColor: 'group-hover:border-cyan-500/50',
    },
    {
      icon: <Dog className="w-5 h-5 text-emerald-400" />,
      tag: 'COMPANION',
      title: 'পেট ও স্পেশাল স্কিল',
      desc: 'প্লেয়ারের বর্তমানে সজ্জিত অ্যাক্টিভ পেট, পেট লেভেল, মোট XP ও স্কিল ডেসক্রিপশন।',
      gradient: 'from-emerald-500/20 to-transparent',
      borderColor: 'group-hover:border-emerald-500/50',
    },
    {
      icon: <Cpu className="w-5 h-5 text-orange-400" />,
      tag: 'FAST ENGINE',
      title: 'মাল্টি-সার্ভার রিয়েল-টাইম',
      desc: 'বাংলাদেশ (BD), ভারত, সিঙ্গাপুর ও গ্লোবাল সার্ভার সরাসরি কোনো ল্যাগ ছাড়া লাইভ কানেক্ট।',
      gradient: 'from-orange-500/20 to-transparent',
      borderColor: 'group-hover:border-orange-500/50',
    },
    {
      icon: <FileDown className="w-5 h-5 text-purple-400" />,
      tag: 'EXPORT',
      title: 'অফিসিয়াল PDF রিপোর্ট',
      desc: 'সম্পূর্ণ প্লেয়ার প্রোফাইল এক ক্লিকে এইচডি ভেরিফাইড সার্টিফিকেট ও PDF আকারে ডাউনলোড।',
      gradient: 'from-purple-500/20 to-transparent',
      borderColor: 'group-hover:border-purple-500/50',
    },
  ];

  // 3-Step Interactive Process
  const steps = [
    {
      step: '০১',
      title: 'গেম ওপেন করে UID কপি করুন',
      desc: 'ফ্রি ফায়ার গেম ওপেন করে উপরে বামে প্রোফাইল ব্যানারে ট্যাপ করুন। এরপর আপনার গেম নামের নিচে ৮-১১ ডিজিটের আইডি কপি করুন।',
      badge: 'লবি প্রোফাইল',
    },
    {
      step: '০২',
      title: 'সার্চ বক্সে পেস্ট করুন',
      desc: 'উপরের ইনপুট বক্সে "পেস্ট" বাটনে চাপ দিন বা টাইপ করে আপনার প্লেয়ার UID লিখুন। কোনো পাসওয়ার্ডের প্রয়োজন নেই।',
      badge: 'এক ক্লিকে ইনপুট',
    },
    {
      step: '০৩',
      title: 'লাইভ ইন্টেল স্ক্যান দেখুন',
      desc: '"স্ক্যান করুন" বাটনে চাপ দিলেই সেকেন্ডের মধ্যে প্লেয়ারের আসল নাম, লেভেল, র‍্যাংক, গিল্ড ও সমস্ত তথ্য হাজির হবে।',
      badge: 'ইনস্ট্যান্ট রেজাল্ট',
    },
  ];

  // Detailed Intel Breakdown Data
  const intelDetails = [
    {
      title: 'আইডেন্টিটি ও বেসিক ডাটা',
      points: [
        'ইন-গেম সঠিক ইউজারনেম ও ফন্ট স্টাইল',
        'সার্ভার রিজিয়ন (বাংলাদেশ / গ্লোবাল)',
        'ভি-ব্যাজ ও পার্সোনাল সিগনেচার',
        'অ্যাকাউন্ট তৈরির সময়কাল ও হিস্ট্রি',
      ],
      color: 'border-amber-500/40 bg-amber-500/5',
    },
    {
      title: 'র‍্যাংক ও কম্পিটিটিভ স্ট্যাটাস',
      points: [
        'বর্তমান Battle Royale (BR) র‍্যাংক টিয়ার',
        'Clash Squad (CS) র‍্যাংক ও স্টার কাউন্ট',
        'সিজন র‍্যাংক স্কোর ও হিরোইক পয়েন্ট',
        'মোট লাইক সংখ্যা ও অনার স্কোর',
      ],
      color: 'border-yellow-500/40 bg-yellow-500/5',
    },
    {
      title: 'গিল্ড ও ক্ল্যান নেটওয়ার্ক',
      points: [
        'প্লেয়ারের বর্তমান গিল্ড ও ক্ল্যান নেম',
        'অফিসিয়াল ইউনিক গিল্ড আইডি',
        'গিল্ড লেভেল ও মেম্বার ক্যাপাসিটি',
        'গিল্ড লিডারের নাম ও তথ্য',
      ],
      color: 'border-cyan-500/40 bg-cyan-500/5',
    },
    {
      title: 'পেট ও কম্প্যানিয়ন সিস্টেম',
      points: [
        'সজ্জিত অ্যাক্টিভ পেট ও নাম',
        'পেট লেভেল ও এক্সপিরিয়েন্স পয়েন্ট',
        'পেটের স্পেশাল ব্যাটল স্কিল',
        'ফুল ভেরিফাইড PDF এক্সপোর্ট সুবিধা',
      ],
      color: 'border-emerald-500/40 bg-emerald-500/5',
    },
  ];

  return (
    <div className="w-full space-y-6 select-none font-['Hind_Siliguri',sans-serif]">
      {/* 1. TOP HD COVER BANNER (Directly under Header, clean text, vivid artwork on right) */}
      <FreeFireCoverBanner onQuickSearch={handleQuickSearch} />

      {/* 2. STREAMLINED TACTICAL SEARCH BOX (NO TEST UID UNDERNEATH) */}
      <div className="w-full bg-[#0d0f1a] border border-amber-500/35 hover:border-amber-500/50 rounded-2xl p-3 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all space-y-3">
        {/* Server Switcher Bar */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs font-['Rajdhani',sans-serif]">
          <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-wider flex-shrink-0 text-[11px] sm:text-xs">
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <span>SERVER REGION:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'auto', label: '🌍 Auto Detect' },
              { id: 'bd', label: '🇧🇩 Bangladesh' },
              { id: 'ind', label: '🇮🇳 India' },
              { id: 'sg', label: '🇸🇬 Singapore' },
              { id: 'br', label: '🇧🇷 Brazil' },
            ].map((srv) => (
              <button
                key={srv.id}
                type="button"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setSelectedServer(srv.id as any);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  selectedServer === srv.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {srv.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input Bar (Numeric Mode, Clear, Paste & Submit) */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Input Field */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${inputUid ? 'text-amber-400' : 'text-gray-500'}`} />
              </div>

              <input
                ref={searchInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputUid}
                onChange={(e) => setInputUid(e.target.value)}
                placeholder="Enter Free Fire UID (যেমন: 188106053)..."
                className="w-full pl-11 pr-24 py-3 sm:py-3.5 bg-[#141726] border-2 border-white/10 rounded-xl text-white placeholder-gray-500 text-base sm:text-lg focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 transition-all font-mono tracking-wider shadow-inner"
                autoFocus
              />

              {/* In-field Clear & Paste Buttons */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {inputUid && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePaste}
                  className="text-xs font-bold text-gray-200 hover:text-amber-300 bg-white/10 hover:bg-amber-500/25 px-2.5 py-1.5 rounded-lg border border-white/15 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  title="Paste UID"
                >
                  <Clipboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>পেস্ট</span>
                </button>
              </div>
            </div>

            {/* Big Search Action Button */}
            <button
              type="submit"
              disabled={loading || !inputUid.trim()}
              className="w-full sm:w-auto min-h-[46px] sm:min-h-[50px] px-7 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-orange-500 text-black font-black uppercase text-base sm:text-lg rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap active:scale-[0.98] font-['Bebas_Neue',sans-serif] tracking-wider"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>SCANNING...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-black fill-black" />
                  <span>স্ক্যান করুন (SEARCH)</span>
                  <ArrowRight className="w-4 h-4 text-black hidden sm:inline" />
                </>
              )}
            </button>
          </div>

          {/* Validation info ONLY when typing (No Test UID button as instructed) */}
          {cleanDigits.length > 0 && (
            <div className="flex items-center justify-between text-xs px-1 font-mono pt-1">
              <span className="text-gray-400 font-sans">ইনপুট দৈর্ঘ্য: {cleanDigits.length} ডিজিট</span>
              {isValidLength ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  সঠিক UID ফরম্যাট
                </span>
              ) : (
                <span className="text-amber-400 font-semibold">
                  ফ্রি ফায়ার UID সাধারণত ৮-১১ ডিজিটের হয়
                </span>
              )}
            </div>
          )}
        </form>

        {/* Recent Searches (Compact single row) */}
        {recentSearches && recentSearches.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-white/5 text-xs">
            <span className="text-gray-400 whitespace-nowrap flex-shrink-0 flex items-center gap-1 font-medium">
              <History className="w-3 h-3 text-amber-400" />
              রিসেন্ট সার্চ:
            </span>
            {recentSearches.slice(0, 5).map((uid) => (
              <button
                key={uid}
                type="button"
                onMouseEnter={playHoverSound}
                onClick={() => handleQuickSearch(uid)}
                className="bg-[#141726] hover:bg-[#1f233a] text-gray-300 hover:text-amber-300 px-2.5 py-0.5 rounded-md border border-white/10 font-mono cursor-pointer transition-colors whitespace-nowrap flex-shrink-0 text-xs active:scale-95"
              >
                {uid}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. DYNAMIC FEATURE CARDS (Directly under the Search Box with modern UI/UX design) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-['Rajdhani',sans-serif]">
              লাইভ ইনটেল ফিচারসমূহ • LIVE INTEL CAPABILITIES
            </h2>
          </div>
          <span className="text-[11px] text-amber-400/80 font-mono hidden sm:inline-block">
            REAL-TIME DATA SYNC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dynamicFeatureCards.map((card, i) => (
            <div
              key={i}
              onMouseEnter={playHoverSound}
              className={`group relative rounded-2xl bg-gradient-to-br from-[#10121f] to-[#0c0e18] border border-white/10 ${card.borderColor} p-4 transition-all duration-300 hover:shadow-lg hover:shadow-black/60 hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden cursor-default`}
            >
              {/* Subtle top gradient accent */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 tracking-wider">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                  {card.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 group-hover:text-amber-400/90 transition-colors">
                <span>রিয়েল-টাইম ডাটাবেস</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. STRUCTURED INFORMATIONAL GUIDES ("Ager Likha Gula" in sleek, non-cluttered dynamic UI/UX) */}
      <div className="space-y-4 pt-2">
        {/* Step-by-Step Guide: How to search UID */}
        <div className="rounded-2xl bg-[#0e101c] border border-white/10 p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                ?
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                সহজ ৩ ধাপে কীভাবে UID দিয়ে সার্চ করবেন?
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ১০০% নিরাপদ ও পাসওয়ার্ডহীন
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative rounded-xl bg-[#141727] border border-white/5 hover:border-amber-500/30 p-3.5 sm:p-4 space-y-2 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['Bebas_Neue',sans-serif] text-2xl sm:text-3xl text-amber-400 font-black tracking-wider leading-none">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {s.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {s.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Intel Breakdown: What information is revealed */}
        <div className="rounded-2xl bg-[#0e101c] border border-white/10 p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              একটি UID দিয়ে কী কী বিস্তারিত তথ্য জানা যায়?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {intelDetails.map((block, i) => (
              <div
                key={i}
                className={`rounded-xl border p-3.5 space-y-2 transition-all ${block.color}`}
              >
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {block.title}
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {block.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-400/80 text-[10px] leading-tight">▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Safety Assurance Bar */}
        <div className="rounded-xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 border border-white/10 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                নিরাপদ ও অফিশিয়াল গ্যারেনা পাবলিক সার্ভিস
              </h4>
              <p className="text-gray-400 text-[11px]">
                এই পোর্টালটি শুধুমাত্র পাবলিক গেম ডেটা প্রদর্শন করে। আইডি ব্যান বা হ্যাক হওয়ার কোনো ঝুঁকি নেই।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              নো লগইন
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              ইনস্ট্যান্ট স্ক্যান
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
