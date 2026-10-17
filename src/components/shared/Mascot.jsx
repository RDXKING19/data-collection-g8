// src/components/shared/Mascot.jsx
import React from 'react';

export function Mascot({ size = 'md', speech = '', expression = 'default', character = 'Tally' }) {
  const sizeMap = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-13 h-13 text-2xl sm:w-14 sm:h-14 sm:text-3xl',
    lg: 'w-16 h-16 text-3xl sm:w-20 sm:h-20 sm:text-4xl'
  };

  const getEmoji = () => {
    if (character === 'Priya') return '👧';
    if (character === 'Jun Hao') return '👦';
    return '🦉';
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-2xl bg-amber-400/20 border-2 border-amber-400/70 text-amber-300 flex items-center justify-center shadow-[0_0_18px_rgba(250,204,21,0.4)] shrink-0`}
        title={character || 'Tally the Owl'}
      >
        <span>{getEmoji()}</span>
      </div>
      {speech && (
        <div className="bg-[#14082c]/95 border-2 border-amber-400/40 rounded-2xl px-4 py-2 text-slate-100 font-display font-bold text-xs sm:text-sm shadow-xl flex-1 text-left leading-snug">
          {speech}
        </div>
      )}
    </div>
  );
}
