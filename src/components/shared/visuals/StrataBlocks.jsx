// components/shared/visuals/StrataBlocks.jsx
import React from 'react';

export function StrataBlocks({
  strata = [
    { label: 'Sec 1', size: 300, alloc: 30, color: '#f472b6' },
    { label: 'Sec 2', size: 280, alloc: 28, color: '#fb923c' },
    { label: 'Sec 3', size: 260, alloc: 26, color: '#fbbf24' },
    { label: 'Sec 4', size: 160, alloc: 16, color: '#4ade80' }
  ],
  totalSample = 100
}) {
  const totalPop = strata.reduce((s, x) => s + x.size, 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none">
      <div className="flex items-center justify-between w-full max-w-md mb-2 text-xs font-bold text-slate-300">
        <span>Population (N = {totalPop})</span>
        <span className="text-amber-400">Target Sample (n = {totalSample})</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg">
        {strata.map((s, idx) => {
          const pct = Math.round((s.size / totalPop) * 100);
          return (
            <div
              key={idx}
              style={{ borderColor: s.color }}
              className="bg-[#180a35] border-2 rounded-xl p-2.5 flex flex-col items-center justify-between shadow-md"
            >
              <div className="font-display font-extrabold text-sm text-white">
                {s.label}
              </div>
              <div className="text-xs text-slate-400 my-1 font-mono">
                {s.size} students ({pct}%)
              </div>
              <div
                style={{ backgroundColor: `${s.color}33`, color: s.color }}
                className="w-full text-center py-1 rounded-lg text-xs font-black font-display border border-white/10"
              >
                Sample: {s.alloc}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-400 mt-2">
        Formula: Stratum Sample = (Stratum Size ÷ Population N) × Sample n
      </div>
    </div>
  );
}
