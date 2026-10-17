// src/components/gamification/KingdomMap.jsx
import React from 'react';
import { WORLDS } from '../../config/worlds.config.js';
import { StarRating } from './StarRating.jsx';

export function KingdomMap({
  worldResults = Array(10).fill(null),
  onSelectWorld,
  totalStars = 0,
  onGoReflect,
  allCompleted = false
}) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 10 Worlds Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3.5 w-full p-1 overflow-y-auto max-h-[58vh]">
        {WORLDS.map((w, idx) => {
          // World 0 is open. World n is open if world n-1 has >= 1 star.
          const isUnlocked = idx === 0 || (worldResults[idx - 1] != null && worldResults[idx - 1] > 0);
          const stars = worldResults[idx] || 0;
          const hasPlayed = worldResults[idx] != null;

          return (
            <div
              key={w.id}
              onClick={() => isUnlocked && onSelectWorld(idx)}
              style={{
                borderColor: isUnlocked ? `${w.accent}80` : 'rgba(255,255,255,0.1)'
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all duration-300 min-h-[125px] sm:min-h-[145px] ${
                isUnlocked
                  ? 'bg-[#14082c]/95 hover:scale-105 cursor-pointer shadow-xl'
                  : 'bg-[#100724]/40 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300">
                <span className="bg-white/10 px-2 py-0.5 rounded-md font-mono">World {idx + 1}</span>
                <span style={{ color: w.accent }} className="font-extrabold">
                  {isUnlocked ? (hasPlayed ? `${stars}★` : 'OPEN') : 'LOCK'}
                </span>
              </div>

              <span className="text-3xl sm:text-4xl my-1 drop-shadow-md">
                {isUnlocked ? w.emoji : '🔒'}
              </span>

              <div className="w-full">
                <span className="font-display font-extrabold text-white text-xs sm:text-sm leading-tight line-clamp-1 block">
                  {w.name}
                </span>
                <span className="text-[10px] text-slate-300 block line-clamp-1 mt-0.5">
                  {w.boss.name}
                </span>
              </div>

              {/* Star Rating Indicator */}
              <div className="mt-1">
                {isUnlocked ? (
                  hasPlayed ? (
                    <StarRating stars={stars} size="sm" />
                  ) : (
                    <span className="text-emerald-400 text-[11px] font-bold">Investigate →</span>
                  )
                ) : (
                  <span className="text-slate-400 text-[9px] font-semibold">Needs 1★ in W{idx}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
