import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatBoxProps {
  title: string;
  icon?: React.ReactNode;
  data: Record<string, string | number | undefined | null | boolean>;
  className?: string;
  accentColor?: string;
}

export function StatBox({ title, icon, data, className }: StatBoxProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filter out undefined and null values
  const entries = Object.entries(data).filter(
    ([_, value]) => value !== undefined && value !== null && value !== ''
  );

  const handleCopy = (key: string, val: any) => {
    navigator.clipboard.writeText(String(val));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div
      className={cn(
        'bg-[#181a20] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl shadow-black/50 transition-all hover:border-white/15',
        className
      )}
    >
      {/* Box Header */}
      <div className="px-5 py-3.5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-xs sm:text-sm font-black tracking-wider text-gray-200 uppercase">
            {title}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
          {entries.length} fields
        </span>
      </div>

      {/* Box Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col divide-y divide-white/5">
        {entries.map(([key, value]) => {
          const displayVal = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);

          return (
            <div
              key={key}
              className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center text-xs sm:text-sm group"
            >
              <span className="text-gray-400 capitalize whitespace-nowrap mr-3 font-medium">
                {key}
              </span>
              <div className="flex items-center gap-1.5 text-right overflow-hidden">
                <span className="text-gray-100 font-semibold truncate font-mono select-all">
                  {displayVal}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(key, displayVal)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-amber-400 transition-opacity p-0.5"
                  title="Copy value"
                >
                  {copiedKey === key ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="text-gray-500 italic text-xs text-center py-6">
            No information available in this section
          </div>
        )}
      </div>
    </div>
  );
}
