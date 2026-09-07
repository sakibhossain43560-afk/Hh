import React from 'react';
import {
  Flame,
  Shield,
  Zap,
  Globe2,
  CheckCircle2,
  Trophy,
  Users,
  FileDown,
  ExternalLink,
  Sparkles,
  Heart,
  Send,
} from 'lucide-react';
import { FreeFireLogo } from './FreeFireLogo';
import { playClickSound, playHoverSound } from '../utils/sound';

interface FooterProps {
  onQuickSearch?: (uid: string) => void;
}

export function Footer({ onQuickSearch }: FooterProps) {
  return (
    <footer className="mt-12 border-t border-amber-500/20 bg-gradient-to-b from-[#0a0b12] to-[#05060a] text-gray-400 font-['Hind_Siliguri',sans-serif] select-none relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Status Strip */}
      <div className="border-b border-white/5 bg-[#0e101b]/80 backdrop-blur-sm py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              সার্ভার স্ট্যাটাস: সচল (ONLINE)
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-300 font-mono text-[11px]">
              PING: ~120ms (FAST ENGINE)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-amber-400 flex items-center gap-1 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              OB54 LIVE SUPPORT
            </span>
            <span className="hidden sm:inline-block text-gray-500">•</span>
            <span className="hidden sm:flex items-center gap-1 text-gray-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              ১০০% ফ্রি ও নিরাপদ
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <FreeFireLogo size="md" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              বাংলাদেশ ও গ্লোবাল সার্ভারের যেকোনো ফ্রি ফায়ার প্লেয়ারের রিয়েল-টাইম বিস্তারিত তথ্য অনুসন্ধানের জন্য তৈরি সবচেয়ে দ্রুতগতির অনলাইন পোর্টাল।
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold font-mono">
                FREE FIRE INTEL
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
                ভেরিফাইড
              </span>
            </div>

            {/* Admin Telegram Contact Card */}
            <div className="pt-2">
              <a
                href="https://t.me/H4X0R9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-transparent border border-sky-500/30 hover:border-sky-400 text-sky-300 hover:text-white transition-all group shadow-md shadow-sky-500/5 hover:shadow-sky-500/15"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">ADMIN CONTACT</div>
                  <div className="text-xs font-bold text-sky-400 group-hover:text-sky-300 font-mono flex items-center gap-1">
                    Telegram
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Supported Servers */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5 font-['Rajdhani',sans-serif]">
              <Globe2 className="w-4 h-4 text-amber-400" />
              সাপোর্টেড সার্ভারসমূহ
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">🇧🇩 বাংলাদেশ সার্ভার (BD)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">একটিভ</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">🇮🇳 ইন্ডিয়া সার্ভার (IND)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">একটিভ</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">🇸🇬 সিঙ্গাপুর সার্ভার (SG)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">একটিভ</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-gray-300">🇧🇷 ব্রাজিল সার্ভার (BR)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">একটিভ</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-gray-300">🌐 গ্লোবাল সার্ভার (GLOBAL)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">একটিভ</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5 font-['Rajdhani',sans-serif]">
              <Trophy className="w-4 h-4 text-yellow-400" />
              মূল ফিচারসমূহ
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-gray-300 hover:text-amber-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>প্লেয়ার লেভেল ও মোট লাইকস ট্র্যাকিং</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-amber-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>BR ও CS র‍্যাংক এবং হিরোইক স্টারস</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-amber-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>গিল্ড আইডি, নাম ও মেম্বার ক্যাপাসিটি</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-amber-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>অ্যাক্টিভ পেট ও স্পেশাল স্কিল তথ্য</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-amber-300 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>অফিসিয়াল ফুল PDF রিপোর্ট ডাউনলোড</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Security & Legal Disclaimer */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5 font-['Rajdhani',sans-serif]">
              <Shield className="w-4 h-4 text-emerald-400" />
              নিরাপত্তা ও ডিসক্লেইমার
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              এই সার্ভিসটি সম্পূর্ণ নিরাপদ। এখানে কোনো প্রকার পাসওয়ার্ড বা আইডি লগইন প্রয়োজন হয় না।
            </p>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-400 leading-normal">
              Garena Free Fire™ এর ট্রেডমার্ক, লোগো এবং কন্টেন্ট Garena International এর নিজস্ব কপিরাইট। এটি প্লেয়ারদের সুবিধার জন্য তৈরি একটি স্বাধীন ফ্যান পোর্টাল।
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Free Fire Player Intel.</span>
            <span className="text-gray-600">•</span>
            <a
              href="https://t.me/H4X0R9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-bold inline-flex items-center gap-1 bg-sky-500/10 hover:bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/20 hover:border-sky-400 transition-colors"
            >
              <Send className="w-3 h-3" />
              Telegram
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-amber-400/80 hover:text-amber-300 font-medium cursor-pointer">
              প্রাইভেসি পলিসি
            </span>
            <span>•</span>
            <span className="text-amber-400/80 hover:text-amber-300 font-medium cursor-pointer">
              ব্যবহারের শর্তাবলী
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Safe & Free
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
