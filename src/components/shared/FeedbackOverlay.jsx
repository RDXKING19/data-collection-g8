// src/components/shared/FeedbackOverlay.jsx
import React, { useEffect } from 'react';

export function FeedbackOverlay({
  feedback = null,
  status,
  title,
  explanation,
  xpGained,
  badge,
  onNext,
  nextLabel
}) {
  // If feedback object is explicitly null and no status was passed, do not render
  if (feedback === null && !status) return null;

  // Support both passing an object feedback={feedback} or direct props
  const actualStatus = feedback?.status ?? status ?? 'correct';
  const actualTitle =
    feedback?.title ??
    title ??
    (actualStatus === 'badge'
      ? 'Badge Unlocked! 🎖️'
      : actualStatus === 'correct'
      ? 'Case Cracked! 🎯'
      : 'Clue Review 💡');
  const actualExplanation = feedback?.explanation ?? explanation ?? '';
  const actualXp = feedback?.xpGained ?? xpGained ?? 0;
  const actualBadge = feedback?.badge ?? badge ?? null;
  const label =
    nextLabel ??
    (feedback?.nextLabel
      ? feedback.nextLabel
      : 'Next Case →');

  const isCorrect = actualStatus === 'correct';
  const isBadge = actualStatus === 'badge';

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onNext?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNext]);

  const tone = isBadge
    ? 'border-amber-400 bg-[#25184a]/95 text-amber-200'
    : isCorrect
    ? 'border-emerald-400 bg-[#122828]/95 text-emerald-200'
    : 'border-rose-400 bg-[#2b1022]/95 text-rose-200';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in-up"
      role="dialog"
      aria-modal="true"
    >
      <div className={`w-full max-w-lg border-2 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center ${tone}`}>
        {/* Top Icon */}
        <div className="text-5xl sm:text-6xl mb-2">
          {isBadge ? '🎖️' : isCorrect ? '🎉' : '💡'}
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
          {actualTitle}
        </h3>

        {/* Badge Info */}
        {actualBadge && (
          <div className="w-full bg-amber-950/70 border border-amber-400/50 rounded-2xl p-4 mb-3 flex items-center gap-3">
            <span className="text-4xl">{actualBadge.icon}</span>
            <div className="text-left">
              <h4 className="font-display font-black text-lg sm:text-xl text-amber-300">
                {actualBadge.name}
              </h4>
              <p className="text-sm text-slate-200 font-extrabold">
                {actualBadge.desc || actualBadge.description}
              </p>
            </div>
          </div>
        )}

        {/* XP Banner */}
        {isCorrect && actualXp > 0 && (
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/50 px-5 py-2 rounded-full text-amber-300 font-black text-base mb-3 shadow-md">
            <span>✨</span>
            <span>+{actualXp} XP Earned</span>
          </div>
        )}

        {/* Explanation */}
        {actualExplanation && (
          <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 mb-5 text-left max-h-48 overflow-y-auto">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">
              Detective Explanation:
            </p>
            <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
              {actualExplanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={onNext}
          className="btn-gold font-display font-black text-base sm:text-lg px-9 py-3 rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
