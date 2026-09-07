import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, ShieldCheck, Flame, RefreshCw, Send } from 'lucide-react';
import { HomeHero } from './components/HomeHero';
import { PlayerDashboard } from './components/PlayerDashboard';
import { FreeFireLogo } from './components/FreeFireLogo';
import { HeadlineTicker } from './components/HeadlineTicker';
import { Footer } from './components/Footer';
import type { FreeFireAccountData } from './types';
import { searchPlayerAccount } from './utils/playerApi';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'player'>('home');
  const [activeUid, setActiveUid] = useState<string>('');
  const [playerData, setPlayerData] = useState<FreeFireAccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [navUidInput, setNavUidInput] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ff_recent_uids');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveRecentSearch = (uid: string) => {
    try {
      const updated = [uid, ...recentSearches.filter((u) => u !== uid)].slice(0, 8);
      setRecentSearches(updated);
      localStorage.setItem('ff_recent_uids', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSearch = async (uid: string, isRefresh: boolean = false) => {
    const cleanUid = uid.trim().replace(/\s+/g, '');
    if (!cleanUid) return;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await searchPlayerAccount(cleanUid, isRefresh);
      setPlayerData(data);
      setActiveUid(cleanUid);
      setCurrentView('player');
      saveRecentSearch(cleanUid);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching player information.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navUidInput.trim()) {
      handleSearch(navUidInput);
      setNavUidInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 selection:bg-amber-500/30 selection:text-amber-200 flex flex-col font-['Rajdhani','Hind_Siliguri',sans-serif]">
      {/* Top Navigation Bar with Authentic Free Fire Branding */}
      <header className="sticky top-0 z-50 bg-[#0d0f17]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/60">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Authentic Free Fire Logo */}
          <button
            type="button"
            onClick={() => {
              setCurrentView('home');
              setError(null);
            }}
            className="cursor-pointer text-left focus:outline-none transition-transform active:scale-95 flex-shrink-0"
            title="Go to Home"
          >
            <FreeFireLogo size="md" showSubtitle={true} />
          </button>

          {/* Nav Quick Search (available in player view) */}
          {currentView === 'player' && (
            <form onSubmit={handleNavSearch} className="hidden sm:flex items-center relative max-w-xs w-full">
              <input
                type="text"
                value={navUidInput}
                onChange={(e) => setNavUidInput(e.target.value)}
                placeholder="নতুন UID দিন..."
                className="w-full bg-[#141622] border border-amber-500/30 rounded-xl py-1.5 pl-9 pr-14 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 font-mono shadow-inner font-['Hind_Siliguri',sans-serif]"
              />
              <Search className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2.5 text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg transition-colors cursor-pointer font-['Hind_Siliguri',sans-serif]"
              >
                খুঁজুন
              </button>
            </form>
          )}

          {/* Right Status / Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Telegram Badge */}
            <a
              href="https://t.me/H4X0R9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-400 text-sky-400 hover:text-sky-300 text-xs shadow-inner transition-all group"
              title="Telegram"
            >
              <Send className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="font-bold text-xs font-['Rajdhani',sans-serif] tracking-wider text-sky-300 group-hover:text-white uppercase">
                Telegram
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Beautiful Animated Bengali Headline Ticker (Dan theke bame chole) */}
      <HeadlineTicker />

      {/* Main Content Area - Fluid, Edge-to-edge Mobile Friendly */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2.5 sm:px-4 md:px-6 py-3 sm:py-5">
        {/* Error Notification */}
        {error && (
          <div className="mb-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-4 flex items-start gap-3 text-red-300 animate-in fade-in duration-200 font-['Hind_Siliguri',sans-serif]">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
            <div className="flex-1 text-xs sm:text-sm">
              <p className="font-bold text-white mb-0.5">UID সার্চে সমস্যা হয়েছে</p>
              <p>{error}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSearch('188106053')}
                  className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-mono text-xs font-semibold cursor-pointer border border-red-500/30 transition-colors"
                >
                  ডেমো UID টেস্ট করুন: 188106053
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-gray-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Home View */}
        {currentView === 'home' && (
          <HomeHero
            onSearch={handleSearch}
            loading={loading}
            recentSearches={recentSearches}
          />
        )}

        {/* Player Profile View */}
        {currentView === 'player' && playerData && (
          <PlayerDashboard
            data={playerData}
            onSearchNew={() => {
              setCurrentView('home');
              setError(null);
            }}
            onRefresh={() => handleSearch(activeUid, true)}
            refreshing={refreshing}
          />
        )}
      </main>

      {/* Dynamic & Beautiful UI/UX Footer */}
      <Footer onQuickSearch={handleSearch} />
    </div>
  );
}
