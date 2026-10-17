// src/App.jsx
import React, { useReducer, useState, useEffect } from 'react';
import { setMuted, playClickSound } from './utils/audio.js';
import { TopNav } from './components/TopNav.jsx';
import { IntroScreen } from './components/IntroScreen.jsx';
import { WonderPhase } from './components/phases/WonderPhase.jsx';
import { StoryPhase } from './components/phases/StoryPhase.jsx';
import { SimulatePhase } from './components/phases/SimulatePhase.jsx';
import { PlayPhase } from './components/phases/PlayPhase.jsx';
import { ReflectPhase, CelebrationScreen } from './components/phases/ReflectPhase.jsx';
import { checkBadges } from './utils/badgeEngine.js';

export const PHASES = ['wonder', 'story', 'simulate', 'practice', 'reflect'];

const INITIAL_STATE = {
  phase: 'intro', // 'intro' | 'wonder' | 'story' | 'simulate' | 'practice' | 'reflect' | 'celebration'
  furthestPhase: 4, // All phases unlocked for students (wonder, story, simulate, practice, reflect)
  storyPanel: 0,
  simStation: 0,
  simCompleted: [false, false, false], // 3 sections
  worldResults: Array(10).fill(null),
  xp: 0,
  streak: 0,
  bestStreak: 0,
  badges: [],
  totalCorrect: 0,
  totalAnswered: 0,
  bossesDefeated: 0,
  audioEnabled: true,
  journeyComplete: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE': {
      const pIdx = PHASES.indexOf(action.payload);
      const nextFurthest = pIdx >= 0 ? Math.max(state.furthestPhase, pIdx) : state.furthestPhase;
      return {
        ...state,
        phase: action.payload,
        furthestPhase: nextFurthest
      };
    }

    case 'GO_PHASE': {
      const targetPhase = action.payload;
      return { ...state, phase: targetPhase };
    }

    case 'COMPLETE_SIM_STATION': {
      const idx = action.payload;
      const updated = [...state.simCompleted];
      updated[idx] = true;
      const allDone = updated.slice(0, 3).every(Boolean);
      return {
        ...state,
        simCompleted: updated,
        furthestPhase: allDone ? Math.max(state.furthestPhase, 3) : state.furthestPhase
      };
    }

    case 'UPDATE_SCORE': {
      const { xpDelta = 0, isCorrect, newBadges = [], worldIdx, stars, bossWon } = action.payload;

      let nextStreak = state.streak;
      let nextBest = state.bestStreak;
      let nextCorrect = state.totalCorrect;
      let nextAnswered = state.totalAnswered;
      let nextBosses = state.bossesDefeated;

      if (isCorrect !== undefined) {
        if (isCorrect) {
          nextStreak += 1;
          nextBest = Math.max(nextBest, nextStreak);
          nextCorrect += 1;
        } else {
          nextStreak = 0;
        }
        nextAnswered += 1;
      }

      if (bossWon) {
        nextBosses += 1;
      }

      const nextResults = [...state.worldResults];
      if (worldIdx !== undefined && stars !== undefined) {
        nextResults[worldIdx] = Math.max(nextResults[worldIdx] || 0, stars);
      }

      const allWorldsDone = nextResults.every((r) => r != null && r > 0);
      const nextFurthest = allWorldsDone ? Math.max(state.furthestPhase, 4) : state.furthestPhase;

      return {
        ...state,
        xp: state.xp + xpDelta,
        streak: nextStreak,
        bestStreak: nextBest,
        totalCorrect: nextCorrect,
        totalAnswered: nextAnswered,
        bossesDefeated: nextBosses,
        worldResults: nextResults,
        furthestPhase: nextFurthest,
        badges: Array.from(new Set([...state.badges, ...newBadges]))
      };
    }

    case 'TOGGLE_AUDIO': {
      const nextAudio = !state.audioEnabled;
      setMuted(!nextAudio);
      return { ...state, audioEnabled: nextAudio };
    }

    case 'COMPLETE_JOURNEY':
      return {
        ...state,
        journeyComplete: true,
        phase: 'celebration'
      };

    case 'RESET_SESSION':
      return {
        ...INITIAL_STATE,
        audioEnabled: state.audioEnabled
      };

    default:
      return state;
  }
}

export function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const [slideInfo, setSlideInfo] = useState(null);

  // Central badge evaluator effect
  useEffect(() => {
    const newlyUnlocked = checkBadges(state);
    if (newlyUnlocked.length > 0) {
      const newBadgeIds = newlyUnlocked.map((b) => b.id);
      dispatch({
        type: 'UPDATE_SCORE',
        payload: { newBadges: newBadgeIds }
      });
    }
  }, [state.totalCorrect, state.totalAnswered, state.bestStreak, state.simCompleted, state.worldResults, state.bossesDefeated, state.journeyComplete]);

  const totalStars = state.worldResults.reduce((a, b) => a + (b || 0), 0);
  const hasProgress = state.xp > 0 || totalStars > 0 || state.badges.length > 0;

  return (
    <div className="app-container h-full w-full flex flex-col relative overflow-hidden">
      {/* Top Navigation Capsule (Rendered if not in Intro or Celebration) */}
      {state.phase !== 'intro' && state.phase !== 'celebration' && (
        <TopNav
          phase={state.phase}
          furthestPhase={state.furthestPhase}
          muted={!state.audioEnabled}
          onToggleMute={() => dispatch({ type: 'TOGGLE_AUDIO' })}
          onHome={() => dispatch({ type: 'RESET_SESSION' })}
          onGoPhase={(p) => dispatch({ type: 'GO_PHASE', payload: p })}
          slideInfo={state.phase === 'story' ? slideInfo : null}
          hasProgress={hasProgress}
        />
      )}

      {/* Main Content Area */}
      <main className="app-main flex-1 flex flex-col min-h-0 w-full overflow-hidden relative">
        {state.phase === 'intro' && (
          <IntroScreen
            onBegin={() => {
              playClickSound();
              dispatch({ type: 'SET_PHASE', payload: 'wonder' });
            }}
          />
        )}

        {state.phase === 'wonder' && (
          <WonderPhase
            muted={!state.audioEnabled}
            onNext={() => {
              playClickSound();
              dispatch({ type: 'SET_PHASE', payload: 'story' });
            }}
          />
        )}

        {state.phase === 'story' && (
          <StoryPhase
            muted={!state.audioEnabled}
            onDone={() => {
              playClickSound();
              dispatch({ type: 'SET_PHASE', payload: 'simulate' });
            }}
            onSlideChange={(current, total) => setSlideInfo({ current, total })}
          />
        )}

        {state.phase === 'simulate' && (
          <SimulatePhase
            muted={!state.audioEnabled}
            simCompleted={state.simCompleted}
            onCompleteStation={(idx) => dispatch({ type: 'COMPLETE_SIM_STATION', payload: idx })}
            onNext={() => {
              playClickSound();
              dispatch({ type: 'SET_PHASE', payload: 'practice' });
            }}
          />
        )}

        {state.phase === 'practice' && (
          <PlayPhase
            muted={!state.audioEnabled}
            xp={state.xp}
            streak={state.streak}
            bestStreak={state.bestStreak}
            badges={state.badges}
            worldResults={state.worldResults}
            onUpdateScore={(payload) => dispatch({ type: 'UPDATE_SCORE', payload })}
            onGoReflect={() => {
              playClickSound();
              dispatch({ type: 'SET_PHASE', payload: 'reflect' });
            }}
          />
        )}

        {state.phase === 'reflect' && (
          <ReflectPhase
            xp={state.xp}
            stars={totalStars}
            bestStreak={state.bestStreak}
            badges={state.badges}
            worldResults={state.worldResults}
            muted={!state.audioEnabled}
            onComplete={() => dispatch({ type: 'COMPLETE_JOURNEY' })}
          />
        )}

        {state.phase === 'celebration' && (
          <CelebrationScreen
            xp={state.xp}
            stars={totalStars}
            bestStreak={state.bestStreak}
            muted={!state.audioEnabled}
            onRestart={() => dispatch({ type: 'RESET_SESSION' })}
          />
        )}
      </main>
    </div>
  );
}

export default App;
