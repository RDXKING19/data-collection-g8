// scripts/stress_test_bank.js
import { generateBank, generateWorld, generateSession, MODES } from '../src/data/questionBank.js';
import { createRNG } from '../src/utils/rng.js';

console.log('--- Starting SurveyQuest Question Bank Stress Test ---');

// Test 1: Static 100 questions integrity
const bank = generateBank(12345);
if (bank.length !== 100) {
  throw new Error(`Expected 100 questions, got ${bank.length}`);
}
console.log('✓ Bank contains exactly 100 questions');

// Test 2: Invariants for all 100 questions
for (let i = 0; i < bank.length; i++) {
  const q = bank[i];
  if (!q.id) throw new Error(`Question ${i} missing id`);
  if (!q.questionText || q.questionText.length < 5) throw new Error(`Question ${i} invalid questionText`);
  if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Question ${i} does not have 4 options`);
  if (!q.options.includes(q.correctAnswer)) throw new Error(`Question ${i} correctAnswer "${q.correctAnswer}" not in options [${q.options.join(', ')}]`);
  if (!q.explanation || q.explanation.length < 5) throw new Error(`Question ${i} missing explanation`);
  if (!q.hint1 || !q.hint2) throw new Error(`Question ${i} missing hints`);
}
console.log('✓ All 100 questions pass schema, 4-option, and correct-answer invariants');

// Test 3: Uniqueness of questionText within each world
for (let w = 0; w < 10; w++) {
  const worldQs = bank.slice(w * 10, (w + 1) * 10);
  const texts = new Set(worldQs.map(q => q.questionText));
  if (texts.size !== 10) {
    throw new Error(`World ${w} has duplicate question text! Expected 10 unique, got ${texts.size}`);
  }
}
console.log('✓ All 10 worlds have 10 completely unique questions (zero duplicates)');

// Test 4: Stress test across 100 seeds for all modes
const modes = Object.keys(MODES);
for (let seed = 1; seed <= 100; seed++) {
  const rng = createRNG(seed);
  for (let w = 0; w < 10; w++) {
    for (const m of modes) {
      const session = generateSession(w, m, rng);
      const expectedCount = MODES[m].questions;
      if (session.length !== expectedCount) {
        throw new Error(`Seed ${seed}, World ${w}, Mode ${m}: Expected ${expectedCount} Qs, got ${session.length}`);
      }
    }
  }
}
console.log('✓ 100-seed stress test passed across all 10 worlds and all 4 modes (Guided, Independent, Timed, Boss)');
console.log('--- All Bank Tests Passed Cleanly! ---');
