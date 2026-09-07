import React from 'react';
import { Flame, Sparkles, Shield, Zap, Bell } from 'lucide-react';

export function HeadlineTicker() {
  const notices = [
    'ফ্রি ফায়ার প্লেয়ার ইন্টেল পোর্টালে স্বাগতম!',
    'যেকোনো ফ্রি ফায়ার প্লেয়ারের UID দিয়ে তাৎক্ষণিক রিয়েল-টাইম তথ্য অনুসন্ধান করুন।',
    'বাংলাদেশ (BD), ভারত (IND), সিঙ্গাপুর (SG) ও গ্লোবাল সার্ভার সম্পূর্ণ সক্রিয়।',
    '১০০% নিরাপদ ও সুরক্ষিত — কোনো পাসওয়ার্ডের প্রয়োজন নেই।',
    'নতুন ফিচার: সম্পূর্ণ প্লেয়ার প্রোফাইল রিপোর্ট এখন এক ক্লিকে অফিশিয়াল PDF ডাউনলোড করুন।',
    'ব্যাটল রয়্যাল ও সিএস র‍্যাংক, গিল্ড মেম্বারশিপ, পেট এবং ইকুইপড স্কিল ডেটা লাইভ পর্যবেক্ষণ করুন।',
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2.5 sm:px-4 md:px-6 mt-3 sm:mt-4">
      <div className="w-full bg-gradient-to-r from-[#0c0e18] via-[#141624] to-[#0c0e18] border border-amber-500/30 rounded-2xl py-2 sm:py-2.5 overflow-hidden relative select-none font-['Hind_Siliguri',sans-serif] shadow-lg shadow-black/40">
        {/* Left side fixed Tag Badge */}
        <div className="absolute left-0 top-0 bottom-0 z-20 bg-gradient-to-r from-[#0c0e18] via-[#0e101c] to-transparent pl-3 pr-4 flex items-center gap-1.5 pointer-events-none">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[11px] font-black uppercase font-['Rajdhani',sans-serif] tracking-wider shadow-sm shadow-amber-500/30">
            <Flame className="w-3 h-3 fill-black text-black" />
            লাইভ নোটিশ
          </span>
        </div>

        {/* Right side gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 z-20 bg-gradient-to-l from-[#0c0e18] to-transparent pointer-events-none" />

        {/* Scrolling headline track: Right to Left (dan theke bame) */}
        <div className="flex overflow-hidden w-full pl-28 sm:pl-32">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm text-gray-200">
            {notices.map((text, idx) => (
              <div key={`n1-${idx}`} className="flex items-center gap-2">
                <span className="text-amber-400 font-semibold">•</span>
                <span className="hover:text-amber-300 transition-colors cursor-default">
                  {text}
                </span>
              </div>
            ))}
            {/* Duplicated for seamless loop */}
            {notices.map((text, idx) => (
              <div key={`n2-${idx}`} className="flex items-center gap-2">
                <span className="text-amber-400 font-semibold">•</span>
                <span className="hover:text-amber-300 transition-colors cursor-default">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
