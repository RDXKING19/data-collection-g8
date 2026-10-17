// src/components/gamification/BadgesModal.jsx
import React from 'react';
import { BADGES } from '../../utils/badgeEngine.js';

export function BadgesModal({ unlockedBadges = [], onClose }) {
  const unlockedSet = new Set(unlockedBadges);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md fade-in-up">
      <div className="w-full max-w-2xl bg-[#160b38]/95 border-2 border-purple-400/50 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎖️</span>
            <div>
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-white">Insight Badges</h2>
              <p className="text-xs text-slate-300 font-bold">
                {unlockedSet.size} of {BADGES.length} Badges Unlocked
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto flex-1 p-1">
          {BADGES.map((b) => {
            const isUnlocked = unlockedSet.has(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all duration-300 ${
                  isUnlocked
                    ? 'border-amber-400/60 bg-[#25154c]/90 text-white shadow-md'
                    : 'border-white/10 bg-[#100726]/50 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    isUnlocked ? 'bg-amber-400/20 border border-amber-400/40' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {isUnlocked ? b.icon : '🔒'}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h4 className="font-display font-extrabold text-xs sm:text-sm leading-tight truncate">
                    {b.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
