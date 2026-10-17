// data/briefs.js — Station C: Real-World Survey Planning Briefs

export const BRIEFS = [
  {
    id: 'travel-time',
    title: 'School Travel Time Study',
    description: 'The school principal wants to know how long students spend travelling to school each morning to review bus route partnerships.',
    slots: {
      type: {
        prompt: 'What kind of data is travel duration?',
        options: [
          { text: 'Numerical Continuous (measured time)', correct: true, why: 'Time flows continuously and can be measured in decimals.' },
          { text: 'Numerical Discrete (counted items)', correct: false, why: 'Time is not counted in discrete whole integer jumps.' },
          { text: 'Categorical (named labels)', correct: false, why: 'Travel duration represents a measurable physical quantity, not a name.' },
          { text: 'Unclassifiable', correct: false, why: 'Travel duration is a standard statistical continuous variable.' }
        ]
      },
      method: {
        prompt: 'Which data collection method gives the most representative first-hand insight?',
        options: [
          { text: 'Primary: Student homeroom questionnaire', correct: true, why: 'Collects directly from all students across diverse travel modes.' },
          { text: 'Secondary: Last year’s public bus log only', correct: false, why: 'Excludes walkers, cyclists, MRT riders, and car passengers.' },
          { text: 'Primary: Interview teachers in the staff lounge', correct: false, why: 'Teachers do not represent the student travel experience.' },
          { text: 'Observation: Watch the front gate for 5 minutes', correct: false, why: '5 minutes misses late and early arrivals completely.' }
        ]
      },
      sampling: {
        prompt: 'Which sampling method ensures all 4 school levels are fairly represented?',
        options: [
          { text: 'Stratified sampling by level (Sec 1 to Sec 4)', correct: true, why: 'Guarantees each grade level contributes in exact proportion to its size.' },
          { text: 'Convenience sampling: First 100 students at the gate', correct: false, why: 'Over-represents early arrivals and misses late travellers.' },
          { text: 'Voluntary online poll on social media', correct: false, why: 'Biased towards active internet users with strong opinions.' },
          { text: 'Census: Survey every single student in Singapore', correct: false, why: 'Impractical, costly, and outside the school scope.' }
        ],
        numeric: {
          prompt: 'If the school has 1 000 students (Sec 1: 300, Sec 2: 280, Sec 3: 260, Sec 4: 160) and we sample 100, how many Sec 3 students must be chosen?',
          answer: 26,
          formula: '(260 / 1 000) × 100 = 26'
        }
      },
      instrument: {
        prompt: 'Which question format is neutral and avoids overlapping choices?',
        options: [
          { text: '"How long does your journey usually take?" (Under 15 min, 15 to under 30, 30 to under 45, 45 or more)', correct: true, why: 'Clear non-overlapping brackets with no gaps.' },
          { text: '"How long does your journey take?" (0–15 min, 15–30 min, 30–45 min)', correct: false, why: 'Overlapping brackets: where does a 15-minute journey go?' },
          { text: '"Don’t you agree your morning journey is exhausting and too long?"', correct: false, why: 'Leading question that pushes students to answer negatively.' },
          { text: '"How long and how tiring is your commute?"', correct: false, why: 'Double-barrelled question combining two different questions into one.' }
        ]
      }
    }
  },
  {
    id: 'homework-hours',
    title: 'Weeknight Study Hours',
    description: 'The academic committee wants to assess how many hours of homework students complete on average weeknights.',
    slots: {
      type: {
        prompt: 'What kind of data is study duration in hours?',
        options: [
          { text: 'Numerical Continuous (measured time)', correct: true, why: 'Time is measured continuously (e.g. 1.5 hours).' },
          { text: 'Categorical', correct: false, why: 'Hours of work represents a quantifiable amount.' },
          { text: 'Numerical Discrete', correct: false, why: 'Study time does not only occur in integer increments.' },
          { text: 'Qualitative opinion', correct: false, why: 'Number of hours is a quantitative measurement.' }
        ]
      },
      method: {
        prompt: 'What is the most reliable primary source for student study hours?',
        options: [
          { text: 'Primary: Student survey logged over one typical week', correct: true, why: 'Direct reporting from the actual learners over a standard period.' },
          { text: 'Secondary: A 10-year-old foreign education report', correct: false, why: 'Out of date and does not reflect our current school students.' },
          { text: 'Observation: Look into bedroom windows at night', correct: false, why: 'Invasive, unethical, and impractical.' },
          { text: 'Secondary: Textbook publisher sales figures', correct: false, why: 'Measures book sales, not time spent studying.' }
        ]
      },
      sampling: {
        prompt: 'How to select a fair sample from the official student register of 240 students?',
        options: [
          { text: 'Systematic sampling: Select every 8th student from the alphabetical register', correct: true, why: 'Systematic sampling gives an evenly spaced, unbiased selection.' },
          { text: 'Convenience: Ask students in the library at 5 PM', correct: false, why: 'Biased towards students who study in the library after school.' },
          { text: 'Ask only the top 30 rank holders', correct: false, why: 'Severe selection bias towards high-achieving students.' },
          { text: 'Ask only the student council members', correct: false, why: 'Excludes the general student body.' }
        ],
        numeric: {
          prompt: 'From a cohort of 240 students, we need a sample of 30. What is the systematic sampling interval k?',
          answer: 8,
          formula: '240 / 30 = 8'
        }
      },
      instrument: {
        prompt: 'Which response scale provides mutually exclusive, complete coverage?',
        options: [
          { text: 'Less than 1 h · 1 to under 2 h · 2 to under 3 h · 3 h or more', correct: true, why: 'Every possible value fits into exactly one option.' },
          { text: '0–1 h · 1–2 h · 2–3 h · 3–4 h', correct: false, why: 'Overlapping boundaries at 1, 2, and 3 hours.' },
          { text: '0–1 h · 2–3 h · 4–5 h', correct: false, why: 'Leaves gaps: where do 1.5 hours or 3.2 hours belong?' },
          { text: '"Surely you spend at least 4 hours studying every night?"', correct: false, why: 'Leading question suggesting a high socially desirable answer.' }
        ]
      }
    }
  },
  {
    id: 'recycling-bins',
    title: 'Recess Recycling Initiative',
    description: 'The green club wants to track how many recyclable cans and bottles are placed in the recycling bins during recess.',
    slots: {
      type: {
        prompt: 'What kind of data is the count of recycled plastic bottles?',
        options: [
          { text: 'Numerical Discrete (counted items)', correct: true, why: 'Bottles are counted in whole numbers (0, 1, 2, 3...).' },
          { text: 'Numerical Continuous', correct: false, why: 'You cannot dispose of 1.73 whole bottles.' },
          { text: 'Categorical', correct: false, why: 'The count is a numerical quantity, not a descriptive category.' },
          { text: 'Secondary data', correct: false, why: 'This describes data type, not the source.' }
        ]
      },
      method: {
        prompt: 'Which collection method directly captures actual recycling actions at recess?',
        options: [
          { text: 'Primary: Direct structured observation at the bins during recess', correct: true, why: 'Direct observation records real behaviour without self-report bias.' },
          { text: 'Questionnaire: "Do you always recycle?"', correct: false, why: 'People often claim they recycle even when they forget (social desirability bias).' },
          { text: 'Secondary: Annual municipal trash report', correct: false, why: 'Lacks specific school-level and recess-level granularity.' },
          { text: 'Interview the school principal', correct: false, why: 'The principal does not watch the bins during recess.' }
        ]
      },
      sampling: {
        prompt: 'How to sample recess observation days across the 10-week term?',
        options: [
          { text: 'Select 10 randomly chosen days across the term', correct: true, why: 'Avoids day-of-week bias (e.g. Fridays being different from Mondays).' },
          { text: 'Observe on the first Monday only', correct: false, why: 'A single day could be unusual due to weather or special events.' },
          { text: 'Observe only during Earth Week', correct: false, why: 'Students behave differently during special environmental campaigns.' },
          { text: 'Observe for 30 seconds on one afternoon', correct: false, why: 'Far too brief to capture recess activity.' }
        ],
        numeric: {
          prompt: 'If there are 50 school days in the term and we sample every 5th day systematically, how many sample days are observed?',
          answer: 10,
          formula: '50 / 5 = 10'
        }
      },
      instrument: {
        prompt: 'Which recording tool accurately logs discrete recycling occurrences?',
        options: [
          { text: 'A tally sheet with 10-minute time blocks and clear item count boxes', correct: true, why: 'Organises discrete counts into verified 5-stroke tally marks.' },
          { text: 'A blank notebook page with no defined categories', correct: false, why: 'Prone to inconsistent and incomplete record-keeping.' },
          { text: 'A checklist asking "Were students good or bad?"', correct: false, why: 'Subjective opinion rather than objective data recording.' },
          { text: 'An audio recorder with no tally sheet', correct: false, why: 'Does not produce structured counts of items.' }
        ]
      }
    }
  }
];
