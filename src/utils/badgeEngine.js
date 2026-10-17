// utils/badgeEngine.js — Gamification badge definitions and evaluator

export const BADGES = [
  {
    id: 'first_correct',
    name: 'Data Spark',
    icon: '✨',
    desc: 'Answer your first survey question correctly'
  },
  {
    id: 'streak_3',
    name: 'Pattern Spotter',
    icon: '🔥',
    desc: 'Achieve a streak of 3 correct answers'
  },
  {
    id: 'streak_5',
    name: 'Insight Instinct',
    icon: '⚡',
    desc: 'Achieve a streak of 5 correct answers'
  },
  {
    id: 'streak_10',
    name: 'Data Virtuoso',
    icon: '🌟',
    desc: 'Reach a blazing streak of 10 in a row'
  },
  {
    id: 'sim_all',
    name: 'Lab Certified',
    icon: '🧪',
    desc: 'Complete all 3 simulation stations'
  },
  {
    id: 'world_3star',
    name: 'Triple Star Council',
    icon: '⭐',
    desc: 'Earn a full 3 stars in any world'
  },
  {
    id: 'boss_won',
    name: 'Chief Challenger',
    icon: '👑',
    desc: 'Defeat a Boss Battle in any world'
  },
  {
    id: 'answered_20',
    name: 'Seasoned Surveyor',
    icon: '📋',
    desc: 'Answer 20 questions across the worlds'
  },
  {
    id: 'journey_complete',
    name: 'Insight Chief',
    icon: '🎖️',
    desc: 'Complete the entire SurveyQuest mission'
  }
];

export function checkBadges(state = {}) {
  const unlocked = [];
  const currentBadges = state.badges || [];

  const {
    totalCorrect = 0,
    totalAnswered = 0,
    streak = 0,
    bestStreak = 0,
    simCompleted = [],
    worldResults = [],
    bossesDefeated = 0,
    journeyComplete = false
  } = state;

  const effectiveStreak = Math.max(streak, bestStreak);

  if (totalCorrect >= 1 && !currentBadges.includes('first_correct')) {
    unlocked.push(BADGES.find(b => b.id === 'first_correct'));
  }
  if (effectiveStreak >= 3 && !currentBadges.includes('streak_3')) {
    unlocked.push(BADGES.find(b => b.id === 'streak_3'));
  }
  if (effectiveStreak >= 5 && !currentBadges.includes('streak_5')) {
    unlocked.push(BADGES.find(b => b.id === 'streak_5'));
  }
  if (effectiveStreak >= 10 && !currentBadges.includes('streak_10')) {
    unlocked.push(BADGES.find(b => b.id === 'streak_10'));
  }
  if (simCompleted.length >= 3 && simCompleted.slice(0, 3).every(Boolean) && !currentBadges.includes('sim_all')) {
    unlocked.push(BADGES.find(b => b.id === 'sim_all'));
  }
  if (worldResults.some(r => (r || 0) >= 3) && !currentBadges.includes('world_3star')) {
    unlocked.push(BADGES.find(b => b.id === 'world_3star'));
  }
  if (bossesDefeated >= 1 && !currentBadges.includes('boss_won')) {
    unlocked.push(BADGES.find(b => b.id === 'boss_won'));
  }
  if (totalAnswered >= 20 && !currentBadges.includes('answered_20')) {
    unlocked.push(BADGES.find(b => b.id === 'answered_20'));
  }
  if (journeyComplete && !currentBadges.includes('journey_complete')) {
    unlocked.push(BADGES.find(b => b.id === 'journey_complete'));
  }

  return unlocked.filter(Boolean);
}
