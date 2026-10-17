// data/recap.js — Reflect Phase 3-question conceptual recap

export const RECAP_QUESTIONS = [
  {
    id: 'recap-1',
    prompt: 'Why is a convenience sample of 100 students at the basketball court less reliable than a random sample of 50 students across the school register?',
    options: [
      { text: 'A sample that excludes groups of students is biased, and increasing its size does not fix that bias.', correct: true },
      { text: '100 is an unlucky number in statistics.', correct: false },
      { text: 'Basketball players are not allowed to participate in school surveys.', correct: false },
      { text: 'Random samples must always have at least 1 000 respondents.', correct: false }
    ],
    explanation: 'A biased sampling method systematically excludes portions of the population (e.g. students in the library or canteen). Making the biased sample larger simply produces an even more precisely biased result!'
  },
  {
    id: 'recap-2',
    prompt: 'What is the key difference between discrete data and continuous data?',
    options: [
      { text: 'Discrete data is counted in distinct whole steps, while continuous data is measured along an unbroken scale.', correct: true },
      { text: 'Discrete data uses letters, while continuous data uses symbols.', correct: false },
      { text: 'Discrete data only applies to adults, while continuous data applies to students.', correct: false },
      { text: 'There is no mathematical difference.', correct: false }
    ],
    explanation: 'Counting items (like number of siblings or books) yields discrete whole numbers. Measuring physical quantities (like travel time or height) yields continuous values.'
  },
  {
    id: 'recap-3',
    prompt: 'Under the standard left-closed convention (a ≤ x < b), which class interval contains the boundary value of exactly 20?',
    options: [
      { text: '20 ≤ x < 30', correct: true },
      { text: '10 ≤ x < 20', correct: false },
      { text: 'Both intervals contain 20', correct: false },
      { text: 'Neither interval contains 20', correct: false }
    ],
    explanation: 'In left-closed notation (a ≤ x < b), the lower boundary is included (≤) and the upper boundary is strictly excluded (<). Thus, 20 belongs in 20 ≤ x < 30.'
  }
];
