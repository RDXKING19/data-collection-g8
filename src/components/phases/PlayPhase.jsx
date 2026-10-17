// src/components/phases/PlayPhase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { KingdomMap } from '../gamification/KingdomMap.jsx';
import { QuestionRenderer } from '../quiz/QuestionRenderer.jsx';
import { BossBattleModal } from '../quiz/BossBattleModal.jsx';
import { FeedbackOverlay } from '../shared/FeedbackOverlay.jsx';
import { BadgesModal } from '../gamification/BadgesModal.jsx';
import { generateSession, DISTRICTS, MODES } from '../../data/questionBank.js';
import { Rng } from '../../utils/rng.js';
import { calcStarsNormalised, calcXP } from '../../utils/scoring.js';
import { checkBadges } from '../../utils/badgeEngine.js';
import { narrate, playClickSound } from '../../utils/audio.js';
import {
  playCorrectNarration,
  playWrongNarration,
  playHint1Narration,
  playHint2Narration,
  districtCompleteNarration,
  bossWinNarration
} from '../../utils/narration.js';

const MODE_LIST = [
  { id: 'guided', name: 'Guided Practice', icon: '🧭', questions: 5, hints: true, timed: false, lives: null },
  { id: 'independent', name: 'Independent Practice', icon: '📝', questions: 10, hints: false, timed: false, lives: null },
  { id: 'timed', name: 'Timed Challenge', icon: '⏱️', questions: 8, hints: false, timed: true, lives: null },
  { id: 'boss', name: 'Boss Battle', icon: '👑', questions: 5, hints: false, timed: false, lives: 3 }
];

export function PlayPhase({
  muted = false,
  xp = 0,
  streak = 0,
  bestStreak = 0,
  badges = [],
  worldResults = Array(10).fill(null),
  onUpdateScore,
  onGoReflect
}) {
  const [selectedMode, setSelectedMode] = useState('independent');
  const [activeWorld, setActiveWorld] = useState(null); // null = map, number = active session
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctInSession, setCorrectInSession] = useState(0);
  const [showBossIntro, setShowBossIntro] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  const timerRef = useRef(null);
  const rngRef = useRef(new Rng(Date.now()));

  const totalStars = worldResults.reduce((a, b) => a + (b || 0), 0);
  const allWorldsCompleted = worldResults.every((r) => r != null && r > 0);

  // Per-question timer for Timed Challenge
  useEffect(() => {
    if (activeWorld !== null && selectedMode === 'timed' && !feedback) {
      setTimeLeft(60);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [activeWorld, selectedMode, qIdx, feedback]);

  const handleTimeout = () => {
    const q = questions[qIdx];
    if (!q) return;

    onUpdateScore({
      xpDelta: 0,
      isCorrect: false,
      newBadges: []
    });

    setFeedback({
      status: 'wrong',
      title: 'Time’s Up! ⏱️',
      explanation: `60 seconds expired. ${q.explanation}`,
      xpGained: 0,
      badge: null
    });
  };

  const startWorldSession = (worldIdx, modeId = selectedMode) => {
    const sessionQuestions = generateSession(worldIdx, modeId, rngRef.current);
    const modeConfig = MODE_LIST.find((m) => m.id === modeId) || MODE_LIST[1];

    setQuestions(sessionQuestions);
    setQIdx(0);
    setSelectedOption(null);
    setFeedback(null);
    setHintLevel(0);
    setCorrectInSession(0);
    setTimeLeft(60);
    setLives(modeConfig.lives || 3);

    if (modeId === 'boss') {
      setShowBossIntro(true);
    } else {
      setActiveWorld(worldIdx);
    }
  };

  const handleOptionSelect = (opt) => {
    playClickSound();
    if (selectedOption !== null || feedback !== null) return;
    setSelectedOption(opt);

    const q = questions[qIdx];
    const isCorrect = opt === q.correctAnswer;

    if (isCorrect) {
      const nextCorrect = correctInSession + 1;
      setCorrectInSession(nextCorrect);
      const earnedXP = calcXP({ attempts: 1, hintsUsed: hintLevel, streak: streak + 1 });

      if (!muted) {
        narrate(playCorrectNarration(nextCorrect), true);
      }

      const nextBadges = checkBadges({
        totalCorrect: (onUpdateScore?.totalCorrect || 0) + 1,
        totalAnswered: (onUpdateScore?.totalAnswered || 0) + 1,
        streak: streak + 1,
        bestStreak: Math.max(bestStreak, streak + 1),
        simCompleted: [true, true, true],
        worldResults,
        bossesDefeated: 0,
        journeyComplete: false,
        badges
      });

      onUpdateScore({
        xpDelta: earnedXP,
        isCorrect: true,
        newBadges: nextBadges.map((b) => b.id)
      });

      setFeedback({
        status: 'correct',
        title: 'Spot On! 🎯',
        explanation: q.explanation,
        xpGained: earnedXP,
        badge: nextBadges.length > 0 ? nextBadges[0] : null
      });
    } else {
      let nextLives = lives;
      if (selectedMode === 'boss') {
        nextLives = lives - 1;
        setLives(nextLives);
      }

      if (!muted) {
        narrate(playWrongNarration(qIdx), true);
      }

      onUpdateScore({
        xpDelta: 0,
        isCorrect: false,
        newBadges: []
      });

      setFeedback({
        status: 'wrong',
        title: nextLives <= 0 && selectedMode === 'boss' ? 'Out of Detective Lives!' : 'Not Quite! 🔍',
        explanation: q.explanation,
        xpGained: 0,
        badge: null
      });
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    setHintLevel(0);

    if (selectedMode === 'boss' && lives <= 0) {
      finishQuizSession(correctInSession);
      return;
    }

    if (qIdx < questions.length - 1) {
      setQIdx((i) => i + 1);
    } else {
      finishQuizSession(correctInSession);
    }
  };

  const handleRetryQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleUseHint = () => {
    playClickSound();
    if (hintLevel < 2) {
      const nextHint = hintLevel + 1;
      setHintLevel(nextHint);
      const q = questions[qIdx];
      const hintText = nextHint === 1 ? q.hint1 : q.hint2;
      if (!muted) {
        narrate(nextHint === 1 ? playHint1Narration(hintText) : playHint2Narration(hintText), true);
      }
    }
  };

  const finishQuizSession = (correctCount) => {
    clearInterval(timerRef.current);
    const totalQ = questions.length;
    const starsEarned = calcStarsNormalised(correctCount, totalQ);
    const district = DISTRICTS[activeWorld];

    if (!muted) {
      if (selectedMode === 'boss' && lives > 0) {
        narrate(bossWinNarration(district.boss.name), true);
      } else if (starsEarned === 3) {
        narrate(districtCompleteNarration(district.name, 3), true);
      }
    }

    onUpdateScore({
      worldIdx: activeWorld,
      stars: starsEarned,
      bossWon: selectedMode === 'boss' && lives > 0
    });

    setActiveWorld(null);
  };

  const currentQ = questions[qIdx];

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Main Glass Card Frame (Matching angle-on-line-g7 reference layout) */}
      <div className="w-full max-w-6xl max-h-[94vh] glass-card flex flex-col items-center text-center fade-in-up z-20 my-auto py-4 sm:py-5 px-5 sm:px-8 overflow-hidden bg-[#160b38]/95 border-2 border-purple-400/40 rounded-3xl shadow-2xl backdrop-blur-md">
        {/* Phase Band */}
        <div className="phase-band phase-band--play w-24 h-2 bg-emerald-400 rounded-full mb-2.5 shadow-[0_0_18px_rgba(52,211,153,0.85)] shrink-0" />

        {/* ---------------- VIEW 1: WORLD SELECTION & MODES ---------------- */}
        {activeWorld === null && (
          <div className="w-full flex flex-col items-center flex-1 min-h-0 overflow-hidden">
            {/* Header & Stats Bar */}
            <div className="w-full flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl sm:text-4xl">🎮</span>
                <div className="text-left">
                  <h2 className="text-section-heading text-emerald-200 text-xl sm:text-2xl font-black">
                    Practice Detective Worlds
                  </h2>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-300">
                    10 Statistical Missions · Need 1★ in World n to unlock World n+1
                  </span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowBadgesModal(true)}
                  className="bg-[#14082c]/90 border border-purple-400/40 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-md cursor-pointer hover:border-amber-400 transition"
                >
                  <span className="text-base">🎖️</span>
                  <span className="font-display font-black text-white text-xs sm:text-sm">
                    {badges.length} Badges
                  </span>
                </button>

                <div className="bg-[#14082c]/90 border border-emerald-400/40 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-md">
                  <span className="text-amber-400 text-base">⭐</span>
                  <span className="font-display font-black text-white text-xs sm:text-sm">
                    {totalStars} / 30
                  </span>
                </div>

                {allWorldsCompleted && (
                  <button
                    onClick={onGoReflect}
                    className="btn-gold text-xs sm:text-sm font-black px-4 py-2 shadow-lg cursor-pointer animate-bounce"
                  >
                    Go to Reflect 📝
                  </button>
                )}
              </div>
            </div>

            {/* Mode Selector Tabs (Matching reference layout) */}
            <div className="w-full max-w-2xl bg-[#120726]/80 border border-white/10 rounded-2xl p-1.5 mb-3 flex items-center justify-center gap-1.5 shrink-0">
              {MODE_LIST.map((m) => {
                const isActive = selectedMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={`flex-1 py-1.5 px-2 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-black scale-[1.02]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span className="truncate">{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* World Map Grid */}
            <div className="w-full flex-1 min-h-0 overflow-y-auto">
              <KingdomMap
                worldResults={worldResults}
                onSelectWorld={(wIdx) => startWorldSession(wIdx, selectedMode)}
                totalStars={totalStars}
                onGoReflect={onGoReflect}
                allCompleted={allWorldsCompleted}
              />
            </div>
          </div>
        )}

        {/* ---------------- VIEW 2: ACTIVE QUESTION SESSION ---------------- */}
        {activeWorld !== null && currentQ && (
          <div className="w-full flex flex-col items-center flex-1 min-h-0 overflow-y-auto overflow-x-hidden justify-between">
            {/* Top Quiz Stats Bar */}
            <div className="w-full max-w-4xl flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveWorld(null)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full transition cursor-pointer"
                >
                  ← Map
                </button>
                <div className="flex items-baseline gap-1.5 text-left">
                  <span className="font-display font-black text-sm sm:text-base text-white">
                    {DISTRICTS[activeWorld].name}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                    ({MODE_LIST.find((m) => m.id === selectedMode)?.name || 'Practice'})
                  </span>
                </div>
              </div>

              {/* Mode Specific Stats & Question Counter */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {selectedMode === 'boss' && (
                  <div className="flex items-center gap-1 bg-rose-950/70 border border-rose-400/40 px-2.5 py-0.5 rounded-full text-rose-300 text-xs font-bold">
                    <span>❤️</span>
                    <span>{lives}</span>
                  </div>
                )}

                {selectedMode === 'timed' && (
                  <div
                    className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-black ${
                      timeLeft <= 10
                        ? 'bg-rose-950/80 border-rose-400 text-rose-300 animate-pulse'
                        : 'bg-white/10 border-white/20 text-amber-300'
                    }`}
                  >
                    <span>⏱️</span>
                    <span>{timeLeft}s</span>
                  </div>
                )}

                <div className="flex items-center gap-1 bg-[#14082c]/90 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-xs font-black text-amber-300">
                  <span>🔥</span>
                  <span>{streak}</span>
                </div>

                <div className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full text-xs font-black text-slate-200">
                  Q {qIdx + 1} / {questions.length}
                </div>

                <div className="hidden sm:flex items-center gap-1 bg-[#14082c]/90 border border-purple-400/40 px-2.5 py-0.5 rounded-full text-xs font-black text-purple-200">
                  <span>✨</span>
                  <span>{xp} XP</span>
                </div>
              </div>
            </div>

            {/* Question Renderer */}
            <QuestionRenderer
              question={currentQ}
              selectedOption={selectedOption}
              onSelectOption={handleOptionSelect}
              showHints={selectedMode === 'guided'}
              hintLevel={hintLevel}
              onUseHint={handleUseHint}
              disabled={selectedOption !== null}
            />

            {/* Feedback Overlay */}
            {feedback && (
              <FeedbackOverlay
                status={feedback.status}
                title={feedback.title}
                explanation={feedback.explanation}
                xpGained={feedback.xpGained}
                badge={feedback.badge}
                onNext={handleNextQuestion}
                nextLabel={qIdx < questions.length - 1 ? 'Next Question →' : 'Finish District ✓'}
              />
            )}
          </div>
        )}

        {/* Boss Battle Modal */}
        {showBossIntro && activeWorld !== null && (
          <BossBattleModal
            isOpen={showBossIntro}
            boss={DISTRICTS[activeWorld].boss}
            districtName={DISTRICTS[activeWorld].name}
            onStart={() => {
              setShowBossIntro(false);
              setActiveWorld(activeWorld);
            }}
          />
        )}

        {/* Badges Modal */}
        {showBadgesModal && (
          <BadgesModal
            isOpen={showBadgesModal}
            onClose={() => setShowBadgesModal(false)}
            unlockedBadges={badges}
          />
        )}
      </div>
    </div>
  );
}

export default PlayPhase;
