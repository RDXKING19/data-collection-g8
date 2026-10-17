// config/worlds.config.js — 10 Worlds of SurveyQuest

export const WORLDS = [
  {
    id: 0,
    name: 'Data Desk',
    emoji: '🗂️',
    accent: '#f472b6',
    conceptFocus: 'data-types',
    description: 'Sort data into categorical vs numerical, and discrete vs continuous.',
    boss: { name: 'The Mix-Up Merchant', emoji: '🌀', reward: 'Type Tracker' }
  },
  {
    id: 1,
    name: 'Source Street',
    emoji: '🔭',
    accent: '#fb923c',
    conceptFocus: 'sources-methods',
    description: 'Primary or secondary? Choose the right collection method.',
    boss: { name: 'Hearsay Hank', emoji: '🗣️', reward: 'Source Spotter' }
  },
  {
    id: 2,
    name: 'Population Plaza',
    emoji: '👥',
    accent: '#fbbf24',
    conceptFocus: 'population-sample',
    description: 'Population, sample and census, and why a census is not always practical.',
    boss: { name: 'Everyone-Asker Ed', emoji: '📣', reward: 'Sample Savvy' }
  },
  {
    id: 3,
    name: 'Fair Draw Fountain',
    emoji: '🎲',
    accent: '#4ade80',
    conceptFocus: 'sampling-methods',
    description: 'Random, systematic, stratified and convenience sampling with fair numbers.',
    boss: { name: 'Convenience Carl', emoji: '🛋️', reward: 'Fair Draw Master' }
  },
  {
    id: 4,
    name: 'Bias Bay',
    emoji: '⚖️',
    accent: '#38bdf8',
    conceptFocus: 'bias-spotting',
    description: 'Spot bias in samples or questions and apply the fair fix.',
    boss: { name: 'The Cherry Picker', emoji: '🍒', reward: 'Bias Banisher' }
  },
  {
    id: 5,
    name: 'Question Quarter',
    emoji: '❓',
    accent: '#818cf8',
    conceptFocus: 'question-design',
    description: 'Detect leading, double-barrelled questions and overlapping response options.',
    boss: { name: 'Loaded-Question Lou', emoji: '🎯', reward: 'Question Crafter' }
  },
  {
    id: 6,
    name: 'Tally Terrace',
    emoji: '✍️',
    accent: '#c084fc',
    conceptFocus: 'tally-frequency',
    description: 'Tally marks, frequency tables, totals, and percentages.',
    boss: { name: 'The Miscounter', emoji: '🧮', reward: 'Tally Titan' }
  },
  {
    id: 7,
    name: 'Interval Island',
    emoji: '🏝️',
    accent: '#22d3ee',
    conceptFocus: 'grouped-data',
    description: 'Equal class intervals, class width, boundary values, and grouped tables.',
    boss: { name: 'The Overlapper', emoji: '🔀', reward: 'Interval Ace' }
  },
  {
    id: 8,
    name: 'Council Chamber',
    emoji: '🏛️',
    accent: '#facc15',
    conceptFocus: 'real-world-planning',
    description: 'Plan and critique full data collections for real school decisions.',
    boss: { name: 'Rush-Job Rex', emoji: '⏱️', reward: 'Plan Perfect' }
  },
  {
    id: 9,
    name: 'Grand Survey Finale',
    emoji: '🏆',
    accent: '#f43f5e',
    conceptFocus: 'mixed-review',
    description: 'The ultimate data challenge mixing every concept from Worlds 1 to 9.',
    boss: { name: 'The Grand Misleader', emoji: '🎩', reward: 'Insight Chief 🎖️' }
  }
];

export const worldLabel = (i) => `World ${i + 1}`;
