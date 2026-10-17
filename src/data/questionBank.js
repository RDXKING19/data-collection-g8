// src/data/questionBank.js — Procedural 100-Question Bank for SurveyQuest (10 Worlds × 10 Slots)
import { WORLDS } from '../config/worlds.config.js';

export const DISTRICTS = WORLDS.map((w) => ({
  id: w.id,
  name: w.name,
  icon: w.emoji,
  accent: w.accent,
  conceptFocus: w.conceptFocus,
  description: w.description,
  boss: w.boss
}));

export const MODES = {
  guided: { id: 'guided', name: 'Guided Practice', questions: 5, slots: [0, 1, 2, 3, 4], hasHints: true, isTimed: false, hasLives: false },
  independent: { id: 'independent', name: 'Independent Practice', questions: 10, slots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], hasHints: false, isTimed: false, hasLives: false },
  timed: { id: 'timed', name: 'Timed Challenge', questions: 8, slots: [0, 1, 2, 3, 5, 6, 7, 8], hasHints: false, isTimed: true, timeLimit: 60, hasLives: false },
  boss: { id: 'boss', name: 'Boss Battle', questions: 5, slots: [1, 3, 5, 7, 9], hasHints: false, isTimed: false, hasLives: true, maxLives: 3 }
};

// Procedural bank catalog: 10 worlds x 10 slots
const QUESTIONS = [
  /* ------------------- WORLD 0: Data Desk (Data Types) ------------------- */
  [
    {
      slot: 0,
      visual: 'type-tree',
      visualData: { highlight: 'categorical', variable: 'Bus Service 65' },
      questionText: 'The school council records several items for student commuters. Which of the following variables is Categorical?',
      options: ['Bus service number (e.g. Bus 65)', 'Travel duration in minutes', 'Distance to school in km', 'Number of transfers taken'],
      correctAnswer: 'Bus service number (e.g. Bus 65)',
      explanation: 'Even though bus services use numerals (e.g. Bus 65), the number is simply an identifying label/name, not a countable or measurable amount. Therefore, it is Categorical.',
      hint1: 'Ask yourself: Does the number represent an amount or just an identifying code?',
      hint2: 'Bus numbers identify routes like names do; you cannot add Bus 14 and Bus 51 together.'
    },
    {
      slot: 1,
      visual: 'type-tree',
      visualData: { highlight: 'categorical', variable: 'Locker #204' },
      questionText: 'Priya records each student’s locker identification code (e.g. Locker #204). What statistical data type is this?',
      options: ['Categorical (identifying label)', 'Numerical Discrete (counted amount)', 'Numerical Continuous (measurement)', 'Quantitative ratio'],
      correctAnswer: 'Categorical (identifying label)',
      explanation: 'A locker number acts as a postal address or label. It does not measure or count a quantity, so it is classified as categorical data.',
      hint1: 'Consider whether the numeral represents a counted count or a name tag.',
      hint2: 'Numerals that function as names, barcodes, or addresses are categorical.'
    },
    {
      slot: 2,
      visual: 'type-tree',
      visualData: { highlight: 'discrete', variable: 'Number of Siblings' },
      questionText: 'Jun Hao surveys classmates on the number of siblings in their family (0, 1, 2, 3...). What kind of data is this?',
      options: ['Numerical Discrete', 'Numerical Continuous', 'Categorical qualitative', 'Ordinal label'],
      correctAnswer: 'Numerical Discrete',
      explanation: 'The number of siblings is counted in distinct, unbroken whole-number steps (0, 1, 2, 3...). You cannot have 2.37 siblings, so it is Numerical Discrete.',
      hint1: 'Is this variable counted in whole steps, or measured on a continuous sliding scale?',
      hint2: 'Counted values that jump in whole integers are discrete.'
    },
    {
      slot: 3,
      visual: 'type-tree',
      visualData: { highlight: 'categorical', variable: 'Favourite Canteen Stall' },
      questionText: 'Students cast votes for their favourite canteen stall: Nasi Lemak, Chicken Rice, Pasta, or Vegetarian. How is this data classified?',
      options: ['Categorical', 'Numerical Discrete', 'Numerical Continuous', 'Secondary dataset'],
      correctAnswer: 'Categorical',
      explanation: 'Food preferences are descriptive qualitative names that place students into groups or categories, not numbers.',
      hint1: 'Do the responses take the form of words/categories or numbers?',
      hint2: 'Names of stalls and food choices are descriptive categories.'
    },
    {
      slot: 4,
      visual: 'type-tree',
      visualData: { highlight: 'continuous', variable: 'Travel Time (minutes)' },
      questionText: 'A survey asks students for their morning travel time in minutes. What data type is travel duration?',
      options: ['Numerical Continuous', 'Numerical Discrete', 'Categorical label', 'Ordinal discrete'],
      correctAnswer: 'Numerical Continuous',
      explanation: 'Time is a physical measurement that flows continuously and can take any decimal value (e.g. 18.5 minutes, 18.54 minutes), making it Numerical Continuous.',
      hint1: 'Is time counted in discrete jumps, or measured along an unbroken continuum?',
      hint2: 'Measurements of time, height, and mass are continuous.'
    },
    {
      slot: 5,
      visual: 'type-tree',
      visualData: { highlight: 'categorical', variable: 'Jersey #10' },
      questionText: 'The basketball team captain wears jersey #10. Which statistical classification correctly describes jersey numbers?',
      options: ['Categorical (identifier label)', 'Numerical Discrete (counted score)', 'Numerical Continuous (measurement)', 'Discrete interval'],
      correctAnswer: 'Categorical (identifier label)',
      explanation: 'Jersey numbers do not indicate a measurement or quantity; player #10 is not twice player #5. They are categorical label numerals.',
      hint1: 'Does jersey #10 mean the player has twice as much of something as player #5?',
      hint2: 'Numbers used exclusively for identification are categorical.'
    },
    {
      slot: 6,
      visual: 'type-tree',
      visualData: { highlight: 'discrete', variable: 'Library Books Borrowed' },
      questionText: 'Tally the Owl inspects the library log: the number of books borrowed by each student this term. What data type is this?',
      options: ['Numerical Discrete', 'Numerical Continuous', 'Categorical', 'Qualitative descriptor'],
      correctAnswer: 'Numerical Discrete',
      explanation: 'Books are discrete whole physical items. A student can borrow 0, 1, 2, or 5 books, but never a fraction like 3.4 books.',
      hint1: 'Can a student borrow a decimal fraction of a physical library book?',
      hint2: 'Counted physical objects produce discrete whole integers.'
    },
    {
      slot: 7,
      visual: 'type-tree',
      visualData: { highlight: 'continuous', variable: 'Height rounded to cm' },
      questionText: 'A school nurse measures students’ heights and rounds each reading to the nearest whole centimetre. What data type is height?',
      options: ['Numerical Continuous', 'Numerical Discrete', 'Categorical', 'Nominal scale'],
      correctAnswer: 'Numerical Continuous',
      explanation: 'Height is fundamentally a continuous physical dimension. Rounding a continuous measurement to the nearest whole centimetre for convenience does NOT make it discrete!',
      hint1: 'Does rounding a continuous measurement change its fundamental physical nature?',
      hint2: 'Rounding measurements (height, weight, time) does not alter the fact that they are continuous.'
    },
    {
      slot: 8,
      visual: 'type-tree',
      visualData: { highlight: 'continuous', variable: 'Backpack Mass (kg)' },
      questionText: 'The health committee weighs school backpacks in kilograms. What statistical classification applies to backpack mass?',
      options: ['Numerical Continuous', 'Numerical Discrete', 'Categorical', 'Label numeral'],
      correctAnswer: 'Numerical Continuous',
      explanation: 'Mass is a continuous measurement on a physical scale (e.g. 4.25 kg, 5.1 kg). It can take any real value within a range.',
      hint1: 'Is mass counted or measured on a weighing scale?',
      hint2: 'Measurements on scales and meters represent continuous quantities.'
    },
    {
      slot: 9,
      visual: 'type-tree',
      visualData: { highlight: 'discrete', variable: 'Goals Scored' },
      questionText: 'Which of the following variables is classified as Numerical Discrete?',
      options: ['Number of goals scored in a soccer match', 'Volume of water in a bottle (mL)', 'Time taken to run 100 metres', 'Student postal code'],
      correctAnswer: 'Number of goals scored in a soccer match',
      explanation: 'Goals are counted in whole numbers (0, 1, 2...). Water volume and 100m time are continuous measurements, and postal codes are categorical labels.',
      hint1: 'Look for the variable that is counted in whole indivisible units.',
      hint2: 'Goals can only increase by +1 at a time.'
    }
  ],

  /* ------------------- WORLD 1: Source Street (Sources & Methods) ------------------- */
  [
    {
      slot: 0,
      visual: 'source-card',
      visualData: { source: 'primary', method: 'Questionnaire', scenario: 'Priya hands out questionnaires directly to 60 students in the canteen.' },
      questionText: 'Priya distributes a survey questionnaire directly to 60 students during recess to ask about food choices. What data source is this?',
      options: ['Primary data', 'Secondary data', 'Census data', 'Archival data'],
      correctAnswer: 'Primary data',
      explanation: 'Primary data is collected first-hand directly by the investigator for the specific purpose of the study.',
      hint1: 'Did the student council collect this information first-hand or read it from a past report?',
      hint2: 'First-hand collection directly from respondents is primary.'
    },
    {
      slot: 1,
      visual: 'source-card',
      visualData: { source: 'secondary', method: 'Records Retrieval', scenario: 'Jun Hao downloads the canteen vendor sales ledger from last term.' },
      questionText: 'Jun Hao retrieves last term’s canteen stall sales records from the school administration database. What data source is this?',
      options: ['Secondary data', 'Primary data', 'Experimental data', 'Direct observation'],
      correctAnswer: 'Secondary data',
      explanation: 'Secondary data was already collected by someone else (the school administration or vendor) for another administrative purpose.',
      hint1: 'Was this data already collected and stored in records before this study?',
      hint2: 'Using existing files, logs, or reports constitutes secondary data.'
    },
    {
      slot: 2,
      visual: 'source-card',
      visualData: { source: 'primary', method: 'Direct Observation', scenario: 'Prefects tally students tossing plastic bottles into the blue recycling bin.' },
      questionText: 'Which method is most suitable to find out how many students actually use the blue recycling bin during recess without bias?',
      options: ['Direct Observation at the recycling bin', 'Questionnaire asking "Do you recycle?"', 'Surveying teachers in the staff room', 'Interviewing the principal'],
      correctAnswer: 'Direct Observation at the recycling bin',
      explanation: 'Direct observation records real behaviour objectively. Asking students "Do you recycle?" often leads to dishonest or socially desirable answers.',
      hint1: 'Which method records what students actually do rather than what they claim they do?',
      hint2: 'Observation watches actual behaviour directly.'
    },
    {
      slot: 3,
      visual: 'source-card',
      visualData: { source: 'primary', method: 'In-Depth Interview', scenario: 'Speaking with 8 student leaders to understand complex exam stress factors.' },
      questionText: 'The school counsellor wants deep, detailed personal insights into student study stress from 8 class captains. Which method is best?',
      options: ['In-depth face-to-face Interview', 'Quick tick-box questionnaire', 'Watching students through windows', 'Reading textbook publishing figures'],
      correctAnswer: 'In-depth face-to-face Interview',
      explanation: 'Interviews allow follow-up questions, clarification, and detailed exploration of complex feelings and personal perspectives.',
      hint1: 'Which method allows the interviewer to ask "Why?" and probe deeply?',
      hint2: 'One-on-one interviews excel at exploring complex thoughts and emotions.'
    },
    {
      slot: 4,
      visual: 'source-card',
      visualData: { source: 'primary', method: 'Questionnaire', scenario: 'Collecting simple uniform preference choices from all 300 Sec 2 students.' },
      questionText: 'The council needs to collect simple uniform preference options from 300 Sec 2 students in 20 minutes. Which method is most effective?',
      options: ['Paper or digital Questionnaire', 'Individual 15-minute interviews', 'Observing uniforms in the canteen', 'Laboratory scientific experiment'],
      correctAnswer: 'Paper or digital Questionnaire',
      explanation: 'A standardized questionnaire is quick, cost-effective, and can be completed simultaneously by hundreds of respondents.',
      hint1: 'Which method can reach 300 people at the same time quickly?',
      hint2: 'Questionnaires can be answered simultaneously by an entire cohort.'
    },
    {
      slot: 5,
      visual: 'source-card',
      visualData: { source: 'secondary', method: 'Public Transport Report', scenario: 'Downloading ez-link card tap records published by the transit authority.' },
      questionText: 'To study travel patterns, the council downloads published public bus and train ridership statistics. This dataset is:',
      options: ['Secondary data', 'Primary data', 'Census fieldwork', 'Direct empirical experiment'],
      correctAnswer: 'Secondary data',
      explanation: 'Because the data was collected previously by the transit authority and downloaded by the students, it is secondary data.',
      hint1: 'Did the students tap the cards themselves or download an existing database?',
      hint2: 'Pre-existing public agency databases are secondary sources.'
    },
    {
      slot: 6,
      visual: 'source-card',
      visualData: { source: 'primary', method: 'Gate Count Observation', scenario: 'Prefects count students walking through the turnstiles from 7:00 to 7:30 AM.' },
      questionText: 'Prefects stand at the main gate and tally the exact number of students arriving on foot between 7:00 and 7:30 AM. This is:',
      options: ['Primary data gathered by observation', 'Secondary data gathered by interview', 'A full national census', 'Secondary documentary evidence'],
      correctAnswer: 'Primary data gathered by observation',
      explanation: 'The prefects gather the counts themselves in real time through observation, making it primary empirical data.',
      hint1: 'Who is counting the arrivals and when is it happening?',
      hint2: 'Counting real-world events as they happen is primary observation.'
    },
    {
      slot: 7,
      visual: 'source-card',
      visualData: { source: 'secondary', method: 'Evaluation', scenario: 'Critiquing an online article published 5 years ago about teenage hobbies.' },
      questionText: 'What is a major potential disadvantage of relying solely on secondary data from an online study?',
      options: ['It may be out of date or collected for a different demographic', 'It is always completely fake', 'It takes too much time to collect first-hand', 'It cannot be stored on a computer'],
      correctAnswer: 'It may be out of date or collected for a different demographic',
      explanation: 'Secondary data was collected by other people for different purposes and may not accurately reflect current conditions or our specific school group.',
      hint1: 'Think about whether someone else’s past study perfectly matches our current school.',
      hint2: 'Secondary data can be outdated, biased, or poorly matched to your specific question.'
    },
    {
      slot: 8,
      visual: 'source-card',
      visualData: { source: 'primary', method: 'Experiment', scenario: 'Testing how temperature affects battery life in 10 identical digital timers.' },
      questionText: 'A science team tests how ambient temperature affects timer battery lifespan in controlled conditions. This method is:',
      options: ['An Experiment', 'A Questionnaire', 'An Interview', 'Secondary data retrieval'],
      correctAnswer: 'An Experiment',
      explanation: 'Testing cause-and-effect relationships under controlled conditions by manipulating variables is an Experiment.',
      hint1: 'Which method tests variables under controlled scientific conditions?',
      hint2: 'Investigating outcomes by changing conditions is an experiment.'
    },
    {
      slot: 9,
      visual: 'source-card',
      visualData: { source: 'secondary', method: 'Efficiency Trade-off', scenario: 'Comparing primary fieldwork vs checking the school annual archive.' },
      questionText: 'What is the chief advantage of using secondary data when reliable archives already exist?',
      options: ['It saves considerable time, manpower, and survey expense', 'It is always 100% free of any bias', 'It guarantees every student was interviewed', 'It replaces the need for data analysis'],
      correctAnswer: 'It saves considerable time, manpower, and survey expense',
      explanation: 'Using existing reliable records eliminates the heavy time, effort, and financial cost required to conduct fresh field surveys.',
      hint1: 'Why look up existing records rather than surveying 1 000 people from scratch?',
      hint2: 'Secondary data is readily available, saving substantial time and resources.'
    }
  ],

  /* ------------------- WORLD 2: Population Plaza (Population & Sample) ------------------- */
  [
    {
      slot: 0,
      visual: 'dot-crowd',
      visualData: { N: 120, n: 12, title: 'Sunbird Secondary (1 200 Students Total)' },
      questionText: 'Sunbird Secondary has 1 200 students. The student council surveys 120 students about canteen drinks. What is the Population?',
      options: ['All 1 200 students in Sunbird Secondary', 'The 120 surveyed students', 'The 10 student council members', 'Only students who buy drinks'],
      correctAnswer: 'All 1 200 students in Sunbird Secondary',
      explanation: 'The population is the entire group of individuals that the study aims to draw conclusions about (all 1 200 students).',
      hint1: 'Does population refer to everyone in the whole school, or just the small surveyed group?',
      hint2: 'The entire pool of interest is the population.'
    },
    {
      slot: 1,
      visual: 'dot-crowd',
      visualData: { N: 120, n: 12, title: 'Sample of 120 Selected Students' },
      questionText: 'In the survey of 1 200 students where 120 students complete questionnaires, what does the group of 120 represent?',
      options: ['The Sample', 'The Population', 'The Census', 'The Variable'],
      correctAnswer: 'The Sample',
      explanation: 'A sample is a subset of individuals chosen from the population to represent the whole group.',
      hint1: 'What term describes a subset chosen from the larger population?',
      hint2: 'The smaller group actually surveyed is the sample.'
    },
    {
      slot: 2,
      visual: 'none',
      questionText: 'What statistical term describes a data collection process that surveys every single individual in the entire population?',
      options: ['A Census', 'A Convenience Sample', 'A Stratified Sample', 'An Observation'],
      correctAnswer: 'A Census',
      explanation: 'A census is an official count or survey that covers every single member of the target population with no omissions.',
      hint1: 'Think of national counts where every resident in the country is counted.',
      hint2: 'When 100% of the population is surveyed, it is a census.'
    },
    {
      slot: 3,
      visual: 'none',
      questionText: 'A factory manufactures 50 000 light bulbs daily. Why does the quality control team test a sample rather than conduct a census?',
      options: ['Lifespan testing destroys the bulbs, so a census would destroy all stock', 'A census is legally banned for light bulbs', 'Light bulbs change their brightness when counted', 'Factory workers dislike counting'],
      correctAnswer: 'Lifespan testing destroys the bulbs, so a census would destroy all stock',
      explanation: 'When testing is destructive (e.g. testing bulbs till they burn out or crash-testing cars), a census would destroy the entire inventory. Sampling is mandatory.',
      hint1: 'What happens to a light bulb when you test how many hours it takes to burn out?',
      hint2: 'Destructive testing requires sampling so unsold products remain intact.'
    },
    {
      slot: 4,
      visual: 'none',
      questionText: 'In which scenario is conducting a full Census both practical and necessary?',
      options: ['Electing the Student Council President from a school of 800 voters', 'Finding average teenage screen time across Southeast Asia', 'Testing the crash resistance of newly manufactured cars', 'Estimating the fish population of the Singapore River'],
      correctAnswer: 'Electing the Student Council President from a school of 800 voters',
      explanation: 'In elections, every eligible voter has the democratic right to vote, the population is small, and every single vote directly impacts the outcome.',
      hint1: 'In which situation is it unacceptable to guess or leave out eligible members?',
      hint2: 'Official elections require counting every legitimate vote.'
    },
    {
      slot: 5,
      visual: 'none',
      questionText: 'What is the primary advantage of taking a representative sample over attempting a complete census of 100 000 citizens?',
      options: ['Sampling saves huge amounts of time, cost, and human resources', 'Sampling ensures that zero mathematical errors can ever occur', 'Sampling requires asking every citizen twice', 'Samples are always larger than populations'],
      correctAnswer: 'Sampling saves huge amounts of time, cost, and human resources',
      explanation: 'A well-drawn representative sample provides reliable estimates at a tiny fraction of the time, cost, and logistical burden of a full census.',
      hint1: 'Why not knock on 100 000 doors when 1 000 well-chosen doors can give accurate results?',
      hint2: 'Sampling is vastly faster, cheaper, and more feasible.'
    },
    {
      slot: 6,
      visual: 'none',
      questionText: 'A medical company tests whether a new medicine capsule dissolves in 15 minutes. Why must they use a sample?',
      options: ['Dissolving the capsule destroys it, so a census would leave zero capsules to sell', 'Capsules cannot be counted with mathematics', 'Doctors are not allowed to conduct censuses', 'A census takes only 2 seconds'],
      correctAnswer: 'Dissolving the capsule destroys it, so a census would leave zero capsules to sell',
      explanation: 'Testing whether medicine dissolves destroys the medicine. A census would leave no product remaining for patients.',
      hint1: 'If you dissolve every capsule in acid to test it, what is left to sell?',
      hint2: 'Destructive testing cannot use a census.'
    },
    {
      slot: 7,
      visual: 'dot-crowd',
      visualData: { N: 50, n: 5, title: 'Cohort of 500 Students (1 dot = 10 students)' },
      questionText: 'From a cohort of 500 Sec 2 students, exactly 50 students are selected for a study. What percentage of the cohort is in the sample?',
      options: ['10%', '5%', '20%', '50%'],
      correctAnswer: '10%',
      explanation: 'Sampling fraction = (Sample size n ÷ Population N) × 100% = (50 ÷ 500) × 100% = 10%.',
      hint1: 'Divide the sample size (50) by the population size (500) and multiply by 100.',
      hint2: '50 / 500 = 1/10 = 10%.'
    },
    {
      slot: 8,
      visual: 'dot-crowd',
      visualData: { N: 40, n: 10, title: 'School of 400 Students (25% Sample)' },
      questionText: 'A school has 400 students. The research team decides to survey a 25% sample. How many students are chosen?',
      options: ['100 students', '25 students', '40 students', '200 students'],
      correctAnswer: '100 students',
      explanation: 'Sample size n = 25% of 400 = 0.25 × 400 = 100 students.',
      hint1: 'Calculate one-quarter (25%) of 400.',
      hint2: '400 ÷ 4 = 100.'
    },
    {
      slot: 9,
      visual: 'none',
      questionText: 'Which statement accurately describes the relationship between a sample and its target population?',
      options: ['A sample must be chosen representative of the population to draw valid conclusions', 'A sample is always larger in number than its population', 'Any sample chosen by convenience is automatically representative', 'A sample eliminates the need to define a target population'],
      correctAnswer: 'A sample must be chosen representative of the population to draw valid conclusions',
      explanation: 'To make valid inferences about a population, the sample must faithfully reflect the characteristics and diversity of that population.',
      hint1: 'What quality must a sample have for its results to apply to the whole group?',
      hint2: 'Representativeness is the golden rule of sampling.'
    }
  ],

  /* ------------------- WORLD 3: Fair Draw Fountain (Sampling Methods) ------------------- */
  [
    {
      slot: 0,
      visual: 'dot-crowd',
      visualData: { N: 100, n: 15, title: 'Computer Lottery Draw from All 1 200 IDs' },
      questionText: 'Each of the 1 200 student ID numbers is entered into a computer generator that randomly selects 100 numbers. What sampling method is this?',
      options: ['Simple Random Sampling', 'Convenience Sampling', 'Systematic Sampling', 'Voluntary Response Sampling'],
      correctAnswer: 'Simple Random Sampling',
      explanation: 'In simple random sampling, every individual in the population has an equal chance of being selected, and draws are independent.',
      hint1: 'Every student had the exact same random probability of being picked by the computer.',
      hint2: 'Equal random chance for all members defines simple random sampling.'
    },
    {
      slot: 1,
      visual: 'systematic-row',
      visualData: { N: 20, k: 5, start: 3 },
      questionText: 'From an alphabetical register of 300 students, Jun Hao picks student #3, then #8, #13, #18 (every 5th name). What sampling method is this?',
      options: ['Systematic Sampling', 'Convenience Sampling', 'Stratified Sampling', 'Census Fieldwork'],
      correctAnswer: 'Systematic Sampling',
      explanation: 'Systematic sampling selects members from an ordered list at regular fixed intervals (k = 5) following a random start point.',
      hint1: 'The researcher steps through an ordered register at equal jumps of k.',
      hint2: 'Picking every k-th item is systematic sampling.'
    },
    {
      slot: 2,
      visual: 'strata-blocks',
      visualData: {
        strata: [
          { label: 'Sec 1', size: 300, alloc: 30, color: '#f472b6' },
          { label: 'Sec 2', size: 300, alloc: 30, color: '#fb923c' },
          { label: 'Sec 3', size: 200, alloc: 20, color: '#fbbf24' },
          { label: 'Sec 4', size: 200, alloc: 20, color: '#4ade80' }
        ],
        totalSample: 100
      },
      questionText: 'A school divides its students into Sec 1, 2, 3, and 4 grade levels, and samples from each level in proportion to its size. This method is:',
      options: ['Stratified Sampling', 'Convenience Sampling', 'Voluntary Response Sampling', 'Cluster Haphazard Sampling'],
      correctAnswer: 'Stratified Sampling',
      explanation: 'Stratified sampling divides the population into distinct non-overlapping sub-groups (strata) and samples proportionally from each stratum.',
      hint1: 'The population is split into sub-groups (strata) like grade levels before sampling.',
      hint2: 'Sampling proportionally from distinct sub-groups is stratified sampling.'
    },
    {
      slot: 3,
      visual: 'systematic-row',
      visualData: { N: 24, k: 8, start: 2 },
      questionText: 'An ordered register contains N = 240 students. We require a sample of n = 30 students. What is the systematic sampling interval k?',
      options: ['k = 8', 'k = 30', 'k = 210', 'k = 10'],
      correctAnswer: 'k = 8',
      explanation: 'Systematic interval k = Population N ÷ Sample n = 240 ÷ 30 = 8. We select every 8th student on the list.',
      hint1: 'Use the formula: k = Population N ÷ Sample size n.',
      hint2: '240 ÷ 30 = 8.'
    },
    {
      slot: 4,
      visual: 'strata-blocks',
      visualData: {
        strata: [
          { label: 'Sec 1', size: 300, alloc: 30, color: '#f472b6' },
          { label: 'Sec 2', size: 280, alloc: 28, color: '#fb923c' },
          { label: 'Sec 3', size: 260, alloc: 26, color: '#fbbf24' },
          { label: 'Sec 4', size: 160, alloc: 16, color: '#4ade80' }
        ],
        totalSample: 100
      },
      questionText: 'In a school of 1 000 students (Sec 1: 300, Sec 2: 280, Sec 3: 260, Sec 4: 160), a stratified sample of 100 is chosen. How many Sec 3 students are selected?',
      options: ['26 students', '25 students', '30 students', '16 students'],
      correctAnswer: '26 students',
      explanation: 'Stratum allocation = (Stratum size ÷ Population N) × Sample n = (260 ÷ 1 000) × 100 = 26 students.',
      hint1: 'Sec 3 represents 260 out of 1 000 students (26%). Find 26% of 100.',
      hint2: '(260 / 1000) × 100 = 26.'
    },
    {
      slot: 5,
      visual: 'systematic-row',
      visualData: { N: 20, k: 20, start: 4 },
      questionText: 'A cohort list has N = 400 names. We want to draw a sample of n = 20 students. What is the sampling jump interval k?',
      options: ['k = 20', 'k = 40', 'k = 5', 'k = 200'],
      correctAnswer: 'k = 20',
      explanation: 'k = N ÷ n = 400 ÷ 20 = 20. We pick every 20th name on the list.',
      hint1: 'Divide 400 by 20.',
      hint2: '400 ÷ 20 = 20.'
    },
    {
      slot: 6,
      visual: 'strata-blocks',
      visualData: {
        strata: [
          { label: 'Boys', size: 60, alloc: 12, color: '#38bdf8' },
          { label: 'Girls', size: 40, alloc: 8, color: '#f472b6' }
        ],
        totalSample: 20
      },
      questionText: 'A robotics club has 60 boys and 40 girls (total 100). A stratified sample of 20 members is chosen. How many girls must be selected?',
      options: ['8 girls', '10 girls', '12 girls', '4 girls'],
      correctAnswer: '8 girls',
      explanation: 'Girls make up 40% of the club (40 ÷ 100). For a sample of 20: 0.40 × 20 = 8 girls.',
      hint1: 'What fraction of the club are girls? Multiply that fraction by 20.',
      hint2: '(40 / 100) × 20 = 8.'
    },
    {
      slot: 7,
      visual: 'systematic-row',
      visualData: { N: 25, k: 25, start: 10 },
      questionText: 'A researcher numbers 500 community members and selects every 25th person on the list. How many people are in the final sample?',
      options: ['20 people', '25 people', '50 people', '10 people'],
      correctAnswer: '20 people',
      explanation: 'Sample size n = N ÷ k = 500 ÷ 25 = 20 people.',
      hint1: 'If you have 500 items and take every 25th item, how many items do you get?',
      hint2: '500 ÷ 25 = 20.'
    },
    {
      slot: 8,
      visual: 'dot-crowd',
      visualData: { N: 100, n: 30, title: 'First 30 Students Exiting the Gate' },
      questionText: 'Jun Hao stands at the gate at 1:30 PM and surveys the first 30 students who walk out. What sampling method is this?',
      options: ['Convenience Sampling', 'Simple Random Sampling', 'Stratified Proportional Sampling', 'Systematic Random Sampling'],
      correctAnswer: 'Convenience Sampling',
      explanation: 'Convenience sampling picks individuals who happen to be easily available and accessible, ignoring fair random selection principles.',
      hint1: 'Jun Hao chose whoever was easiest to reach right in front of him.',
      hint2: 'Sampling based on ease of access is convenience sampling.'
    },
    {
      slot: 9,
      visual: 'strata-blocks',
      visualData: {
        strata: [
          { label: 'Sec 1', size: 250, alloc: 25, color: '#f472b6' },
          { label: 'Sec 2', size: 250, alloc: 25, color: '#fb923c' },
          { label: 'Sec 3', size: 250, alloc: 25, color: '#fbbf24' },
          { label: 'Sec 4', size: 250, alloc: 25, color: '#4ade80' }
        ],
        totalSample: 100
      },
      questionText: 'Why is Stratified Sampling preferable over Simple Random Sampling when distinct grade levels might hold very different views?',
      options: ['It guarantees every grade level is represented in exact proportion to its size', 'It is completely free of any mathematical calculation', 'It allows researchers to ignore Sec 4 students', 'It always produces a sample larger than the population'],
      correctAnswer: 'It guarantees every grade level is represented in exact proportion to its size',
      explanation: 'Simple random sampling could by chance select too few students from a key grade level. Stratified sampling guarantees every level is fairly represented.',
      hint1: 'What could accidentally happen in a pure lottery draw with small sub-groups?',
      hint2: 'Stratification prevents key sub-groups from being accidentally under-represented.'
    }
  ],

  /* ------------------- WORLD 4: Bias Bay (Spotting Bias) ------------------- */
  [
    {
      slot: 0,
      visual: 'dot-crowd',
      visualData: { N: 100, n: 25, highlightZone: 'Basketball Court', title: 'Surveying only peers on the basketball court' },
      questionText: 'Jun Hao surveys only his friends on the basketball court about adding a new sports stall. What primary bias is present?',
      options: ['Convenience sampling bias', 'Voluntary response bias', 'Undercoverage of basketball players', 'Response fatigue bias'],
      correctAnswer: 'Convenience sampling bias',
      explanation: 'Jun Hao sampled only people who were convenient and close to him. Basketball players have much stronger enthusiasm for sports than the general school.',
      hint1: 'Did Jun Hao choose a fair cross-section of the school or just people nearby?',
      hint2: 'Surveying people who are readily at hand is convenience bias.'
    },
    {
      slot: 1,
      visual: 'survey-card',
      visualData: { question: 'Optional link on Instagram: Is homework too hard?', options: ['Yes! It is terrible', 'No'], isBiased: true, flawTag: 'Voluntary Response' },
      questionText: 'The council posts an optional survey link on Instagram asking if homework is too hard. What type of bias does this create?',
      options: ['Voluntary response bias', 'Systematic sampling bias', 'Stratified bias', 'Measurement instrument error'],
      correctAnswer: 'Voluntary response bias',
      explanation: 'In voluntary response sampling, people choose whether to respond. Individuals with strong negative feelings or complaints are far more likely to reply.',
      hint1: 'Who clicks on an optional social media poll about homework?',
      hint2: 'When respondents self-select, it creates voluntary response bias.'
    },
    {
      slot: 2,
      visual: 'dot-crowd',
      visualData: { N: 100, n: 60, title: 'Increasing a biased sample from 20 to 60' },
      questionText: 'Why does increasing Jun Hao’s basketball court sample size from 20 to 200 students NOT fix the survey’s bias?',
      options: ['A bigger biased sample only measures the biased group more precisely; it still excludes the rest of the school', '200 is an unlucky number in statistics', 'Basketball players are not permitted to answer surveys', 'Sample sizes above 100 are illegal'],
      correctAnswer: 'A bigger biased sample only measures the biased group more precisely; it still excludes the rest of the school',
      explanation: 'The fundamental rule: Sample size does NOT cure bias. If the method systematically leaves out classrooms, library, and arts rooms, a larger sample remains biased.',
      hint1: 'If you ask 200 basketball players instead of 20, have you included the music and library students?',
      hint2: 'Fairness of the method matters infinitely more than the raw sample count.'
    },
    {
      slot: 3,
      visual: 'none',
      questionText: 'A telephone survey regarding family transit habits is conducted strictly between 10:00 AM and 11:30 AM on weekdays. Who is undercovered?',
      options: ['Working parents and full-time day workers who are away from home', 'Elderly retirees at home', 'People who dislike telephones', 'The telephone operators'],
      correctAnswer: 'Working parents and full-time day workers who are away from home',
      explanation: 'Calling landlines during standard working hours systematically excludes full-time workers and students who are away from home during the day.',
      hint1: 'Who is usually NOT at home at 10:30 AM on a Tuesday morning?',
      hint2: 'Undercoverage occurs when a group has no opportunity to be included.'
    },
    {
      slot: 4,
      visual: 'none',
      questionText: 'An online gaming forum runs a voluntary poll with 50 000 votes. Why can’t we conclude this represents the general teenage population?',
      options: ['Voluntary response on a gaming site over-represents avid gamers and excludes non-gamers', '50 000 people is too small a sample size', 'Computers cannot calculate statistics', 'Gaming polls are only valid for adults'],
      correctAnswer: 'Voluntary response on a gaming site over-represents avid gamers and excludes non-gamers',
      explanation: 'No matter how huge the sample count (even 50 000!), voluntary response on a niche website represents only self-selected gamers with internet access.',
      hint1: 'Does everyone in the country visit that specific online gaming forum?',
      hint2: 'Massive sample size cannot overcome self-selection bias.'
    },
    {
      slot: 5,
      visual: 'none',
      questionText: 'The council mails paper survey forms to 200 families, but only 18 forms are mailed back. What bias threatens the reliability of the findings?',
      options: ['Non-response bias', 'Leading question bias', 'Stratified allocation bias', 'Class interval overlap bias'],
      correctAnswer: 'Non-response bias',
      explanation: 'When a large fraction of chosen respondents fail or refuse to respond (here, over 90%), non-response bias occurs because the non-responders may differ significantly.',
      hint1: 'What happens when over 90% of selected people do not reply?',
      hint2: 'When selected individuals do not participate, it is non-response bias.'
    },
    {
      slot: 6,
      visual: 'none',
      questionText: 'How should the student council fix a survey that was previously conducted only inside the quiet study corner of the library?',
      options: ['Draw a simple random or stratified sample from the official student cohort register', 'Survey even more students in the library', 'Survey students in the library late at night', 'Offer candy to library visitors only'],
      correctAnswer: 'Draw a simple random or stratified sample from the official student cohort register',
      explanation: 'To eliminate location convenience bias, select respondents randomly from the official school register so every student has an equal chance.',
      hint1: 'How do you ensure students from all locations and clubs have an equal chance?',
      hint2: 'Using the comprehensive official register for random selection fixes undercoverage.'
    },
    {
      slot: 7,
      visual: 'none',
      questionText: 'A survey about school morning traffic congestion is conducted only on sunny Friday mornings. What is the flaw in this plan?',
      options: ['It ignores rainy days and standard weekday commute conditions across Monday to Thursday', 'Fridays have no morning traffic', 'Traffic can only be measured on weekends', 'Friday is an invalid day for data'],
      correctAnswer: 'It ignores rainy days and standard weekday commute conditions across Monday to Thursday',
      explanation: 'Commuter behaviour and traffic volume vary significantly on rainy days and across different days of the week; sampling only sunny Fridays is unrepresentative.',
      hint1: 'Does morning traffic look identical on a sunny Friday compared to a stormy Tuesday?',
      hint2: 'Sampling only one specific day or weather condition creates time/condition bias.'
    },
    {
      slot: 8,
      visual: 'none',
      questionText: 'What is the defining requirement of an unbiased, representative sampling process?',
      options: ['Every individual in the defined population has a known, non-zero probability of being selected', 'The sample must always contain at least 10 000 participants', 'The survey must be conducted entirely in person', 'Only volunteers should be allowed to respond'],
      correctAnswer: 'Every individual in the defined population has a known, non-zero probability of being selected',
      explanation: 'A representative sampling method gives every member of the population a fair, known opportunity of selection without systematic exclusions.',
      hint1: 'What must be true for all members of the population to avoid bias?',
      hint2: 'Equal or known non-zero probability of selection is the foundation of unbiased sampling.'
    },
    {
      slot: 9,
      visual: 'none',
      questionText: 'Which strategy best eliminates non-response bias in a school survey?',
      options: ['Actively following up with selected non-respondents to ensure a high completion rate', 'Deleting the questions that students disliked', 'Replacing non-respondents with friends who are nearby', 'Decreasing the sample size to 2 people'],
      correctAnswer: 'Actively following up with selected non-respondents to ensure a high completion rate',
      explanation: 'Following up through reminders and accessible formats ensures that the completed sample matches the original representative selection.',
      hint1: 'How do researchers make sure chosen respondents actually complete their forms?',
      hint2: 'Active follow-ups and reminders secure a high, representative response rate.'
    }
  ],

  /* ------------------- WORLD 5: Question Quarter (Question Design) ------------------- */
  [
    {
      slot: 0,
      visual: 'survey-card',
      visualData: { question: 'Don’t you agree that our school recess is far too short and exhausting?', options: ['Yes', 'No'], isBiased: true, flawTag: 'Leading Question' },
      questionText: '"Don’t you agree that our school recess is far too short and exhausting?" Why is this questionnaire item flawed?',
      options: ['It is a leading question that pushes the respondent toward agreeing', 'It has too many options', 'It cannot be answered by students', 'It is a numerical continuous question'],
      correctAnswer: 'It is a leading question that pushes the respondent toward agreeing',
      explanation: 'The wording "Don\'t you agree..." and negative adjectives like "too short and exhausting" lead and bias the respondent toward saying "Yes".',
      hint1: 'Does the question ask for an honest neutral opinion, or suggest the answer?',
      hint2: 'A question that suggests what the answer should be is a leading question.'
    },
    {
      slot: 1,
      visual: 'survey-card',
      visualData: { question: 'How satisfied are you with the current duration of school recess?', options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'], isBiased: false, flawTag: 'Neutral' },
      questionText: 'Which of the following versions is the fairest, most neutral question to ask students about recess length?',
      options: ['"How satisfied are you with the current duration of recess?"', '"Don’t you think recess should be doubled?"', '"Only lazy students want longer recess, right?"', '"Recess is great, isn’t it?"'],
      correctAnswer: '"How satisfied are you with the current duration of recess?"',
      explanation: 'A neutral question uses objective wording and provides a balanced scale of responses without pushing respondents toward any viewpoint.',
      hint1: 'Which question avoids emotional, slanted, or pushy words?',
      hint2: 'Neutral phrasing allows respondents to express positive, neutral, or negative views freely.'
    },
    {
      slot: 2,
      visual: 'survey-card',
      visualData: { question: 'Do you enjoy eating healthy canteen food and playing basketball during recess?', options: ['Yes', 'No'], isBiased: true, flawTag: 'Double-Barrelled' },
      questionText: '"Do you enjoy eating healthy canteen food and playing basketball at recess?" Why is this question flawed?',
      options: ['It is double-barrelled: it asks two distinct questions in one sentence', 'It is too short', 'It contains too many numbers', 'It requires an experiment to solve'],
      correctAnswer: 'It is double-barrelled: it asks two distinct questions in one sentence',
      explanation: 'A double-barrelled question joins two separate topics (healthy food AND playing basketball). A student who likes the food but hates basketball cannot answer accurately.',
      hint1: 'What if a student loves healthy food but hates playing basketball?',
      hint2: 'Asking two questions at once is double-barrelled.'
    },
    {
      slot: 3,
      visual: 'survey-card',
      visualData: { question: 'How many hours do you study on a weeknight?', options: ['0–1 h', '1–2 h', '2–3 h', '3–4 h'], isBiased: true, flawTag: 'Overlapping Options' },
      questionText: 'A survey asks: "How many hours do you study?" with choices [0–1 h, 1–2 h, 2–3 h, 3–4 h]. What is the design flaw?',
      options: ['The options overlap: a student studying exactly 1 hour does not know which box to tick', 'The numbers are too small', 'It does not mention homework', 'It has too few options'],
      correctAnswer: 'The options overlap: a student studying exactly 1 hour does not know which box to tick',
      explanation: 'The boundaries overlap at 1, 2, and 3 hours. Someone who studies exactly 1.0 hour could logically tick either 0–1 h or 1–2 h, corrupting the tally.',
      hint1: 'Where should a student who studies for exactly 1 hour place their tick?',
      hint2: 'When response brackets share boundary endpoints, they overlap.'
    },
    {
      slot: 4,
      visual: 'survey-card',
      visualData: { question: 'Weeknight Study Hours', options: ['Less than 1 h', '1 to under 2 h', '2 to under 3 h', '3 h or more'], isBiased: false, flawTag: 'Clean Non-Overlapping' },
      questionText: 'Which set of response options avoids both overlaps and gaps for recording daily study hours?',
      options: ['Less than 1 h · 1 to under 2 h · 2 to under 3 h · 3 h or more', '0–1 h · 1–2 h · 2–3 h · 3–4 h', '0–1 h · 2–3 h · 4–5 h', '1 h only · 2 h only · 3 h only'],
      correctAnswer: 'Less than 1 h · 1 to under 2 h · 2 to under 3 h · 3 h or more',
      explanation: 'This set is mutually exclusive (no overlap at 1 or 2 hours) and collectively exhaustive (covers all values from 0 up to any maximum).',
      hint1: 'Look for options where every possible number fits into exactly one bracket.',
      hint2: '"Under" and "or more" phrasing prevents ambiguity at boundaries.'
    },
    {
      slot: 5,
      visual: 'survey-card',
      visualData: { question: 'How often do you read books?', options: ['Often', 'Sometimes', 'Rarely'], isBiased: true, flawTag: 'Vague Terms' },
      questionText: 'A question asks: "How often do you read books?" with options [Often, Sometimes, Rarely]. What is the primary weakness?',
      options: ['Vague subjective terms: "Often" means once a day to one person and once a month to another', 'It is a leading question', 'It uses numbers incorrectly', 'Reading is not a valid survey topic'],
      correctAnswer: 'Vague subjective terms: "Often" means once a day to one person and once a month to another',
      explanation: 'Words like "Often" or "Rarely" are subjective and ambiguous. It is far better to use defined timeframes (e.g. "Every day", "1–2 times a week").',
      hint1: 'Does "often" mean the exact same frequency to every human being?',
      hint2: 'Undefined frequency words are vague and subjective.'
    },
    {
      slot: 6,
      visual: 'survey-card',
      visualData: { question: 'Select your age bracket:', options: ['12–13 years', '15–16 years'], isBiased: true, flawTag: 'Gaps in Options' },
      questionText: 'A secondary school questionnaire asks for age with options [12–13 years, 15–16 years]. What is the obvious error?',
      options: ['There is a gap: 14-year-old students have no option to choose', '12-year-olds are not in secondary school', 'The brackets overlap', 'Age is not measurable'],
      correctAnswer: 'There is a gap: 14-year-old students have no option to choose',
      explanation: 'Options must be collectively exhaustive. Omitting age 14 leaves a huge gap and prevents Sec 2 students from participating.',
      hint1: 'What happens if a 14-year-old tries to complete this survey?',
      hint2: 'Missing categories create gaps in the data.'
    },
    {
      slot: 7,
      visual: 'survey-card',
      visualData: { question: 'Isn’t it obvious that homework should be abolished?', options: ['Yes', 'No'], isBiased: true, flawTag: 'Leading' },
      questionText: '"Isn’t it obvious that homework should be abolished?" How should this question be rewritten to be unbiased?',
      options: ['"What is your opinion on the amount of homework assigned?"', '"Don’t you hate homework as much as everyone else?"', '"Why is homework the worst thing ever?"', '"Surely homework is useless?"'],
      correctAnswer: '"What is your opinion on the amount of homework assigned?"',
      explanation: 'Neutral wording asks for the respondent\'s genuine perspective without emotional or loaded adjectives.',
      hint1: 'Choose the option that sounds completely balanced and impartial.',
      hint2: 'Impartial phrasing asks for an opinion without taking a side.'
    },
    {
      slot: 8,
      visual: 'none',
      questionText: 'When designing multiple-choice survey response options, what two mathematical principles must be satisfied?',
      options: ['Options must be mutually exclusive (no overlap) and collectively exhaustive (no gaps)', 'Options must have exactly 10 choices and use rhyme', 'Options must always be sorted by student height', 'Options must only use single-digit numbers'],
      correctAnswer: 'Options must be mutually exclusive (no overlap) and collectively exhaustive (no gaps)',
      explanation: 'Mutually exclusive means every response fits in at most one choice. Collectively exhaustive means every response has somewhere to go.',
      hint1: 'Every respondent must fit into exactly one box — no more, no less.',
      hint2: 'No overlaps (mutually exclusive) and no gaps (collectively exhaustive).'
    },
    {
      slot: 9,
      visual: 'none',
      questionText: 'Why should sensitive survey questions (such as household income or personal habits) include broad brackets or a "Prefer not to say" choice?',
      options: ['To respect respondent privacy and reduce dishonest answers or non-response', 'To make the survey questionnaire look longer', 'Because personal income is illegal to study', 'To ensure everyone answers the exact same amount'],
      correctAnswer: 'To respect respondent privacy and reduce dishonest answers or non-response',
      explanation: 'When questions feel overly intrusive, respondents either abandon the survey or provide false data. Respectful brackets and privacy options preserve data integrity.',
      hint1: 'What do people do when a survey demands uncomfortable personal details?',
      hint2: 'Providing privacy options prevents false answers and high drop-out rates.'
    }
  ],

  /* ------------------- WORLD 6: Tally Terrace (Tally Marks & Frequencies) ------------------- */
  [
    {
      slot: 0,
      visual: 'tally',
      visualData: { count: 17, label: 'Recorded Student Votes' },
      questionText: 'A tally chart displays 3 complete bundles of five and 2 additional vertical strokes. What frequency does this represent?',
      options: ['17', '15', '12', '20'],
      correctAnswer: '17',
      explanation: 'Each complete bundle represents 5. Total = (3 × 5) + 2 = 15 + 2 = 17.',
      hint1: 'Multiply the number of 5-bundles by 5, then add the remainder strokes.',
      hint2: '3 × 5 = 15; 15 + 2 = 17.'
    },
    {
      slot: 1,
      visual: 'tally',
      visualData: { count: 14, label: 'Target Frequency = 14' },
      questionText: 'How is a frequency count of 14 represented using standard statistical tally marks?',
      options: ['2 bundles of 5 and 4 vertical strokes', '3 bundles of 5 and 1 stroke', '1 bundle of 5 and 9 strokes', '14 vertical strokes with no diagonals'],
      correctAnswer: '2 bundles of 5 and 4 vertical strokes',
      explanation: '14 divided by 5 gives 2 complete bundles of 5 (10) plus 4 remainder strokes.',
      hint1: 'How many groups of 5 can you make out of 14? What is left over?',
      hint2: '14 = 5 + 5 + 4.'
    },
    {
      slot: 2,
      visual: 'freq-table',
      visualData: {
        title: 'Canteen Food Votes (Total = 30)',
        rows: [
          { category: 'Chicken Rice', tally: 12, freq: 12 },
          { category: 'Pasta', tally: 9, freq: 9 },
          { category: 'Noodles', tally: 9, freq: null }
        ],
        unknownIdx: 2
      },
      questionText: 'In a survey of 30 students, 12 voted for Chicken Rice, 9 for Pasta, and the rest for Noodles. What is the frequency for Noodles?',
      options: ['9', '11', '8', '10'],
      correctAnswer: '9',
      explanation: 'Missing frequency = Total − known frequencies = 30 − (12 + 9) = 30 − 21 = 9.',
      hint1: 'Subtract the known votes (12 + 9 = 21) from the total (30).',
      hint2: '30 − 21 = 9.'
    },
    {
      slot: 3,
      visual: 'freq-table',
      visualData: {
        title: 'Commute Mode (Total = 25)',
        rows: [
          { category: 'Walk', tally: 5, freq: 5 },
          { category: 'Bus', tally: 12, freq: 12 },
          { category: 'MRT', tally: 8, freq: 8 }
        ]
      },
      questionText: 'In a class of 25 students, 5 walk to school. What percentage of the class walks to school?',
      options: ['20%', '5%', '25%', '15%'],
      correctAnswer: '20%',
      explanation: 'Percentage = (Frequency ÷ Total) × 100% = (5 ÷ 25) × 100% = 20%.',
      hint1: 'Divide 5 by 25 and multiply by 100.',
      hint2: '5 / 25 = 1/5 = 20%.'
    },
    {
      slot: 4,
      visual: 'tally',
      visualData: { count: 20, label: 'Class Survey' },
      questionText: 'A tally chart row has exactly 4 complete bundles of five with no extra strokes. What is the frequency?',
      options: ['20', '25', '16', '24'],
      correctAnswer: '20',
      explanation: '4 bundles of five = 4 × 5 = 20.',
      hint1: 'Each bundle equals 5.',
      hint2: '4 × 5 = 20.'
    },
    {
      slot: 5,
      visual: 'freq-table',
      visualData: {
        title: 'Transport Survey (Total = 40)',
        rows: [
          { category: 'Bus', tally: 18, freq: 18 },
          { category: 'MRT', tally: 14, freq: 14 },
          { category: 'Car', tally: 8, freq: null }
        ],
        unknownIdx: 2
      },
      questionText: 'A transport table for 40 students shows: Bus (18), MRT (14), Car (?). What is the missing Car frequency?',
      options: ['8', '10', '6', '12'],
      correctAnswer: '8',
      explanation: 'Total = 40. Known = 18 + 14 = 32. Car = 40 − 32 = 8.',
      hint1: 'Add the known frequencies (18 + 14) and subtract from 40.',
      hint2: '40 − 32 = 8.'
    },
    {
      slot: 6,
      visual: 'freq-table',
      visualData: {
        title: 'Favourite Colours (Total = 50)',
        rows: [
          { category: 'Blue', tally: 15, freq: 15 },
          { category: 'Red', tally: 20, freq: 20 },
          { category: 'Green', tally: 15, freq: 15 }
        ]
      },
      questionText: 'In a survey of 50 students, exactly 15 chose Blue. What percentage of the surveyed students chose Blue?',
      options: ['30%', '15%', '25%', '35%'],
      correctAnswer: '30%',
      explanation: '(15 ÷ 50) × 100% = 30%.',
      hint1: '15 out of 50 is equivalent to how many out of 100?',
      hint2: '15 × 2 = 30%.'
    },
    {
      slot: 7,
      visual: 'tally',
      visualData: { count: 5, label: 'Single Bundle' },
      questionText: 'Why is the fifth tally mark drawn diagonally across the preceding four vertical strokes?',
      options: ['To bundle counts into groups of 5 for fast, accurate counting', 'To show that the count was an error', 'Because paper has limited width', 'To subtract 1 from the total'],
      correctAnswer: 'To bundle counts into groups of 5 for fast, accurate counting',
      explanation: 'Bundling in fives allows human eyes to count subtotals quickly by fives (5, 10, 15...) rather than counting individual lines one by one.',
      hint1: 'Why do we group items into packets of 5?',
      hint2: 'Grouping in 5s makes tallies rapid and effortless to read.'
    },
    {
      slot: 8,
      visual: 'tally',
      visualData: { count: 12, label: 'Updated Count' },
      questionText: 'A tally chart currently shows 1 bundle of 5 and 4 strokes (total 9). If 3 more students are added, what is the new tally count?',
      options: ['12 (2 bundles of 5 and 2 strokes)', '11', '14', '15'],
      correctAnswer: '12 (2 bundles of 5 and 2 strokes)',
      explanation: '9 + 3 = 12. In tallies, adding 1 completes the second bundle of 5, leaving 2 additional strokes.',
      hint1: 'Add 3 to 9, then convert 12 into tally groups of 5.',
      hint2: '12 = two 5-bundles + 2 strokes.'
    },
    {
      slot: 9,
      visual: 'freq-table',
      visualData: {
        title: 'Fruit Preference (Total = 20)',
        rows: [
          { category: 'Apple', tally: 6, freq: 6 },
          { category: 'Banana', tally: 8, freq: 8 },
          { category: 'Orange', tally: 6, freq: 6 }
        ]
      },
      questionText: 'In a survey of 20 students, 8 preferred Banana. What percentage chose Banana?',
      options: ['40%', '35%', '8%', '48%'],
      correctAnswer: '40%',
      explanation: '(8 ÷ 20) × 100% = 40%.',
      hint1: 'Multiply both 8 and 20 by 5 to find the percentage out of 100.',
      hint2: '8 × 5 = 40%.'
    }
  ],

  /* ------------------- WORLD 7: Table Tower (Grouped Tables) ------------------- */
  [
    {
      slot: 0,
      visual: 'interval-line',
      visualData: { min: 0, max: 40, width: 10, markerValue: 20, convention: 'left-closed' },
      questionText: 'Under the standard convention a ≤ x < b, which class interval contains a value of exactly 20?',
      options: ['20 ≤ x < 30', '10 ≤ x < 20', 'Both intervals contain 20', 'Neither interval contains 20'],
      correctAnswer: '20 ≤ x < 30',
      explanation: 'In left-closed notation (a ≤ x < b), the lower boundary is included (≤) and the upper boundary is excluded (<). Thus, 20 belongs in 20 ≤ x < 30.',
      hint1: 'Check which interval has the "≤" symbol on the number 20.',
      hint2: 'The lower boundary includes the value; the upper boundary strictly excludes it.'
    },
    {
      slot: 1,
      visual: 'interval-line',
      visualData: { min: 140, max: 180, width: 10, convention: 'left-closed' },
      questionText: 'What is the class width of the interval 150 ≤ h < 160?',
      options: ['10', '150', '160', '5'],
      correctAnswer: '10',
      explanation: 'Class width = upper boundary − lower boundary = 160 − 150 = 10.',
      hint1: 'Subtract the lower number from the upper number.',
      hint2: '160 − 150 = 10.'
    },
    {
      slot: 2,
      visual: 'interval-line',
      visualData: { min: 140, max: 180, width: 10, markerValue: 159.9, convention: 'left-closed' },
      questionText: 'Under the convention a ≤ x < b, in which class interval does a student height of 159.9 cm belong?',
      options: ['150 ≤ h < 160', '160 ≤ h < 170', '140 ≤ h < 150', 'It cannot be placed'],
      correctAnswer: '150 ≤ h < 160',
      explanation: '159.9 is strictly less than 160, so it fits inside 150 ≤ h < 160.',
      hint1: 'Is 159.9 strictly less than 160?',
      hint2: 'Since 159.9 < 160, it stays in the 150 ≤ h < 160 bracket.'
    },
    {
      slot: 3,
      visual: 'interval-line',
      visualData: { min: 20, max: 60, width: 10, markerValue: 40, convention: 'left-closed' },
      questionText: 'A student scores 40 marks. Under left-closed intervals (a ≤ x < b), which class holds the score 40?',
      options: ['40 ≤ m < 50', '30 ≤ m < 40', '50 ≤ m < 60', 'It splits evenly between both'],
      correctAnswer: '40 ≤ m < 50',
      explanation: 'Because the lower boundary includes 40 (40 ≤ m), the score 40 belongs in 40 ≤ m < 50.',
      hint1: 'Look at the inequality signs: "≤" includes, while "<" excludes.',
      hint2: '40 is the lower boundary of 40 ≤ m < 50.'
    },
    {
      slot: 4,
      visual: 'interval-line',
      visualData: { min: 10, max: 60, width: 10, convention: 'left-closed' },
      questionText: 'Continuous data values range from 12 to 58. If the first interval starts at 10, which class width produces 5 neat classes?',
      options: ['Class width of 10', 'Class width of 5', 'Class width of 20', 'Class width of 2'],
      correctAnswer: 'Class width of 10',
      explanation: 'With width 10, the classes are 10–20, 20–30, 30–40, 40–50, 50–60. That is exactly 5 equal classes covering all values up to 58.',
      hint1: 'Calculate (60 − 10) ÷ 5 classes.',
      hint2: '50 ÷ 5 = 10.'
    },
    {
      slot: 5,
      visual: 'none',
      questionText: 'Why is it standard statistical practice for class intervals in grouped tables to be equal in width and contiguous?',
      options: ['To allow fair comparison of frequencies and seamless histogram plotting without distortion', 'To ensure every class has the exact same frequency', 'Because unequal widths are mathematically impossible to draw', 'To make the table fit on one line'],
      correctAnswer: 'To allow fair comparison of frequencies and seamless histogram plotting without distortion',
      explanation: 'Equal widths ensure that frequency counts reflect density fairly without distorting visual representations like histograms.',
      hint1: 'What happens to a chart if one bar is three times wider than another bar?',
      hint2: 'Equal class widths prevent visual distortion in data comparison.'
    },
    {
      slot: 6,
      visual: 'interval-line',
      visualData: { min: 10, max: 40, width: 15, convention: 'left-closed' },
      questionText: 'In the class interval 10 ≤ t < 25, what is the class width?',
      options: ['15', '25', '10', '35'],
      correctAnswer: '15',
      explanation: 'Class width = 25 − 10 = 15.',
      hint1: 'Upper limit minus lower limit.',
      hint2: '25 − 10 = 15.'
    },
    {
      slot: 7,
      visual: 'interval-line',
      visualData: { min: 10, max: 40, width: 10, markerValue: 30, convention: 'left-closed' },
      questionText: 'Under the rule a ≤ x < b, does the interval 20 ≤ x < 30 include the value 30?',
      options: ['No, 30 is strictly excluded by the "<" symbol', 'Yes, because 30 is listed in the label', 'Only if the value is rounded', 'Yes, both endpoints are always included'],
      correctAnswer: 'No, 30 is strictly excluded by the "<" symbol',
      explanation: 'The "<" symbol means strictly less than. 30 is not less than 30, so it is excluded from this interval and placed in 30 ≤ x < 40.',
      hint1: 'Does "x < 30" allow x to equal 30?',
      hint2: 'No, "<" strictly excludes the boundary value.'
    },
    {
      slot: 8,
      visual: 'interval-line',
      visualData: { min: 40, max: 70, width: 10, convention: 'left-closed' },
      questionText: 'Student weights range from 42 kg to 68 kg. Which sequence of intervals properly groups this continuous data without gaps?',
      options: ['40 ≤ w < 50, 50 ≤ w < 60, 60 ≤ w < 70', '40–50, 51–60, 61–70', '40 ≤ w < 48, 52 ≤ w < 60', '0–100 only'],
      correctAnswer: '40 ≤ w < 50, 50 ≤ w < 60, 60 ≤ w < 70',
      explanation: 'For continuous data, boundaries must connect seamlessly (50 to 50, 60 to 60) so that decimal values like 50.4 kg have a home.',
      hint1: 'Continuous data cannot have gaps like 50 to 51 because decimal values would fall through.',
      hint2: 'Intervals must share continuous boundaries: 40–50, 50–60, 60–70.'
    },
    {
      slot: 9,
      visual: 'none',
      questionText: 'In discrete data grouping (like books borrowed), intervals are written as 1–5, 6–10, 11–15. Why is a gap between 5 and 6 acceptable here?',
      options: ['Counted integers jump from 5 directly to 6, so no value can exist between them', 'It is an acknowledged mathematical error', 'Discrete data is always rounded', 'Because books are heavy'],
      correctAnswer: 'Counted integers jump from 5 directly to 6, so no value can exist between them',
      explanation: 'Whole numbers can only be 5 or 6; you cannot borrow 5.5 books. Hence, inclusive integer ranges like 1–5 and 6–10 leave no gaps in practice.',
      hint1: 'Can a counted whole number be 5.4?',
      hint2: 'Since discrete values are integers only, there are no values between 5 and 6.'
    }
  ],

  /* ------------------- WORLD 8: Percentage Pier (Relative Frequencies) ------------------- */
  [
    {
      slot: 0,
      visual: 'freq-table',
      visualData: {
        title: 'Sports Preference (Total = 50)',
        rows: [
          { category: 'Badminton', tally: 12, freq: 12 },
          { category: 'Basketball', tally: 20, freq: 20 },
          { category: 'Others', tally: 18, freq: 18 }
        ]
      },
      questionText: 'Out of 50 surveyed students, 12 choose Badminton. What is the relative frequency of Badminton as a percentage?',
      options: ['24%', '12%', '20%', '30%'],
      correctAnswer: '24%',
      explanation: 'Relative frequency % = (12 ÷ 50) × 100% = 24%.',
      hint1: 'Multiply 12 by 2 to convert from out-of-50 to out-of-100.',
      hint2: '12 × 2 = 24%.'
    },
    {
      slot: 1,
      visual: 'freq-table',
      visualData: {
        title: 'Morning Travel (Total = 20)',
        rows: [
          { category: 'Walk', tally: 7, freq: 7 },
          { category: 'Bus', tally: 13, freq: 13 }
        ]
      },
      questionText: 'Out of 20 surveyed students, 7 walk to school. What percentage walk to school?',
      options: ['35%', '7%', '28%', '40%'],
      correctAnswer: '35%',
      explanation: '(7 ÷ 20) × 100% = 35%.',
      hint1: 'Multiply 7 by 5 to find the percentage out of 100.',
      hint2: '7 × 5 = 35%.'
    },
    {
      slot: 2,
      visual: 'freq-table',
      visualData: {
        title: 'Transit Mode (Total = 100)',
        rows: [
          { category: 'Bus', tally: 45, freq: 45 },
          { category: 'MRT', tally: 35, freq: 35 },
          { category: 'Cycle', tally: 20, freq: null }
        ],
        unknownIdx: 2
      },
      questionText: 'In a survey of 100 students: 45 take the Bus, 35 take the MRT, and the rest Cycle. What percentage cycle?',
      options: ['20%', '25%', '15%', '30%'],
      correctAnswer: '20%',
      explanation: 'Total = 100. Cycling = 100 − (45 + 35) = 100 − 80 = 20. Out of 100, 20 is exactly 20%.',
      hint1: 'Subtract 45 and 35 from 100.',
      hint2: '100 − 80 = 20%.'
    },
    {
      slot: 3,
      visual: 'freq-table',
      visualData: {
        title: 'Math Grade A (Total = 25)',
        rows: [
          { category: 'Grade A', tally: 10, freq: 10 },
          { category: 'Other Grades', tally: 15, freq: 15 }
        ]
      },
      questionText: 'In a class of 25 students, 10 achieved Grade A in mathematics. What percentage achieved Grade A?',
      options: ['40%', '25%', '10%', '50%'],
      correctAnswer: '40%',
      explanation: '(10 ÷ 25) × 100% = 40%.',
      hint1: '10 out of 25 is equivalent to how many out of 100? Multiply by 4.',
      hint2: '10 × 4 = 40%.'
    },
    {
      slot: 4,
      visual: 'none',
      questionText: 'In a school of 200 students, exactly 30% participate in performing arts. How many students participate?',
      options: ['60 students', '30 students', '50 students', '40 students'],
      correctAnswer: '60 students',
      explanation: 'Number of students = 30% of 200 = 0.30 × 200 = 60 students.',
      hint1: '30% means 30 for every 100 students.',
      hint2: '30 × 2 = 60.'
    },
    {
      slot: 5,
      visual: 'none',
      questionText: 'What must the sum of all relative frequencies expressed as percentages across all categories always equal?',
      options: ['100%', '50%', 'Depends on sample size', '360%'],
      correctAnswer: '100%',
      explanation: 'Because every individual is accounted for across all non-overlapping categories, the total of all relative frequency percentages must equal 100%.',
      hint1: 'What is the complete whole percentage?',
      hint2: 'All parts of a whole sum to 100%.'
    },
    {
      slot: 6,
      visual: 'freq-table',
      visualData: {
        title: 'Teacher Vehicles (Total = 10)',
        rows: [
          { category: 'Electric', tally: 3, freq: 3 },
          { category: 'Petrol', tally: 7, freq: 7 }
        ]
      },
      questionText: 'Out of 10 surveyed teachers, 3 drive an electric vehicle. What percentage drive an electric vehicle?',
      options: ['30%', '3%', '13%', '33%'],
      correctAnswer: '30%',
      explanation: '(3 ÷ 10) × 100% = 30%.',
      hint1: '3 out of 10 is how many out of 100?',
      hint2: '3 × 10 = 30%.'
    },
    {
      slot: 7,
      visual: 'freq-table',
      visualData: {
        title: 'CCA Percentage Distribution',
        rows: [
          { category: 'Basketball', tally: 40, freq: 40 },
          { category: 'Soccer', tally: 35, freq: 35 },
          { category: 'Netball', tally: 15, freq: 15 },
          { category: 'Others', tally: 10, freq: null }
        ],
        unknownIdx: 3
      },
      questionText: 'CCA distribution: Basketball (40%), Soccer (35%), Netball (15%), Others (?). What percentage chose Others?',
      options: ['10%', '15%', '5%', '20%'],
      correctAnswer: '10%',
      explanation: 'Total = 100%. Others = 100% − (40% + 35% + 15%) = 100% − 90% = 10%.',
      hint1: 'Subtract 40 + 35 + 15 from 100.',
      hint2: '100 − 90 = 10%.'
    },
    {
      slot: 8,
      visual: 'freq-table',
      visualData: {
        title: 'Language Cohort (Total = 50)',
        rows: [
          { category: 'Higher MT', tally: 18, freq: 18 },
          { category: 'Standard MT', tally: 32, freq: 32 }
        ]
      },
      questionText: 'In a cohort of 50 students, 18 take Higher Mother Tongue. What percentage take Higher Mother Tongue?',
      options: ['36%', '18%', '32%', '28%'],
      correctAnswer: '36%',
      explanation: '(18 ÷ 50) × 100% = 36%.',
      hint1: 'Double 18 to find the value out of 100.',
      hint2: '18 × 2 = 36%.'
    },
    {
      slot: 9,
      visual: 'freq-table',
      visualData: {
        title: 'Dietary Habit (Total = 25)',
        rows: [
          { category: 'Daily Fruit', tally: 16, freq: 16 },
          { category: 'Occasional', tally: 9, freq: 9 }
        ]
      },
      questionText: 'Out of 25 surveyed students, 16 eat fruits daily. What percentage eat fruits daily?',
      options: ['64%', '16%', '50%', '60%'],
      correctAnswer: '64%',
      explanation: '(16 ÷ 25) × 100% = 64%.',
      hint1: 'Multiply 16 by 4.',
      hint2: '16 × 4 = 64%.'
    }
  ],

  /* ------------------- WORLD 9: Master Insight Desk (Mixed Grand Review) ------------------- */
  [
    {
      slot: 0,
      visual: 'type-tree',
      visualData: { highlight: 'continuous', variable: 'Queue Wait Time' },
      questionText: 'The council times how many seconds students queue for food. What statistical data type is queue duration?',
      options: ['Numerical Continuous', 'Numerical Discrete', 'Categorical label', 'Nominal frequency'],
      correctAnswer: 'Numerical Continuous',
      explanation: 'Time duration is measured continuously along an unbroken scale, making it Numerical Continuous.',
      hint1: 'Can queue duration take any decimal fraction of a minute?',
      hint2: 'Time is a continuous measurement.'
    },
    {
      slot: 1,
      visual: 'survey-card',
      visualData: { question: 'School Instagram Story Poll: Should school start at 9:00 AM?', options: ['Yes!', 'No'], isBiased: true, flawTag: 'Voluntary Response' },
      questionText: 'An informal online poll asks followers if school should start at 9:00 AM. What bias makes this unreliable for policy decisions?',
      options: ['Voluntary response bias', 'Systematic sampling error', 'Stratified proportional bias', 'Destructive sampling bias'],
      correctAnswer: 'Voluntary response bias',
      explanation: 'Respondents choose whether to vote, over-representing active followers with strong opinions and excluding non-social media users.',
      hint1: 'People self-selected whether to participate on an app.',
      hint2: 'Self-selected online polls suffer from voluntary response bias.'
    },
    {
      slot: 2,
      visual: 'systematic-row',
      visualData: { N: 25, k: 20, start: 5 },
      questionText: 'A cohort list has N = 500 students. We require a systematic sample of n = 25 students. What is the interval k?',
      options: ['k = 20', 'k = 25', 'k = 15', 'k = 50'],
      correctAnswer: 'k = 20',
      explanation: 'k = N ÷ n = 500 ÷ 25 = 20.',
      hint1: 'Divide 500 by 25.',
      hint2: '500 ÷ 25 = 20.'
    },
    {
      slot: 3,
      visual: 'strata-blocks',
      visualData: {
        strata: [
          { label: 'Sec 1', size: 300, alloc: 30, color: '#f472b6' },
          { label: 'Sec 2', size: 300, alloc: 30, color: '#fb923c' },
          { label: 'Sec 3', size: 300, alloc: 30, color: '#fbbf24' },
          { label: 'Sec 4', size: 300, alloc: 30, color: '#4ade80' }
        ],
        totalSample: 120
      },
      questionText: 'A school has 1 200 students with 300 in Sec 1. If a stratified sample of 120 is drawn, how many Sec 1 students must be sampled?',
      options: ['30 students', '25 students', '40 students', '20 students'],
      correctAnswer: '30 students',
      explanation: 'Sec 1 represents 300 ÷ 1 200 = 1/4 (25%) of the school. For a sample of 120: 120 ÷ 4 = 30 students.',
      hint1: '300 is one-quarter of 1 200. What is one-quarter of 120?',
      hint2: '120 ÷ 4 = 30.'
    },
    {
      slot: 4,
      visual: 'survey-card',
      visualData: { question: 'Don’t you agree the canteen drinks are overpriced?', options: ['Agree', 'Disagree'], isBiased: true, flawTag: 'Leading' },
      questionText: 'Which of the following is a leading question that introduces severe bias into a questionnaire?',
      options: ['"Don’t you agree the canteen drinks are overpriced?"', '"How would you rate the pricing of canteen drinks?"', '"What is the average price you pay for lunch?"', '"Which stall do you visit most often?"'],
      correctAnswer: '"Don’t you agree the canteen drinks are overpriced?"',
      explanation: '"Don\'t you agree..." leads the respondent by asserting that drinks are overpriced, nudging them to agree.',
      hint1: 'Look for the question that nudges the reader toward a specific negative answer.',
      hint2: '"Don\'t you agree..." is classic leading phrasing.'
    },
    {
      slot: 5,
      visual: 'interval-line',
      visualData: { min: 10, max: 30, width: 5, markerValue: 15, convention: 'left-closed' },
      questionText: 'Under standard left-closed notation (a ≤ t < b), which interval contains a run time of exactly 15.0 minutes?',
      options: ['15 ≤ t < 20', '10 ≤ t < 15', 'Both intervals', 'Neither interval'],
      correctAnswer: '15 ≤ t < 20',
      explanation: 'In left-closed notation, 15 is included at the lower boundary (15 ≤ t), placing 15.0 inside 15 ≤ t < 20.',
      hint1: 'Look for where "≤" touches 15.',
      hint2: '15 is the lower inclusive boundary of 15 ≤ t < 20.'
    },
    {
      slot: 6,
      visual: 'freq-table',
      visualData: {
        title: 'Study Location (Total = 50)',
        rows: [
          { category: 'Library', tally: 17, freq: 17 },
          { category: 'Classroom', tally: 23, freq: 23 },
          { category: 'Home', tally: 10, freq: 10 }
        ]
      },
      questionText: 'In a survey of 50 students, 17 prefer studying in the Library. What percentage is this?',
      options: ['34%', '17%', '30%', '35%'],
      correctAnswer: '34%',
      explanation: '(17 ÷ 50) × 100% = 34%.',
      hint1: 'Double 17 to get the percentage out of 100.',
      hint2: '17 × 2 = 34%.'
    },
    {
      slot: 7,
      visual: 'tally',
      visualData: { count: 23, label: 'Grand Review Tally' },
      questionText: 'A tally chart records 4 bundles of five and 3 individual strokes. What frequency does this represent?',
      options: ['23', '20', '19', '25'],
      correctAnswer: '23',
      explanation: '(4 × 5) + 3 = 20 + 3 = 23.',
      hint1: '4 × 5 = 20. Now add 3.',
      hint2: '20 + 3 = 23.'
    },
    {
      slot: 8,
      visual: 'source-card',
      visualData: { source: 'secondary', method: 'Financial Audit', scenario: 'Checking past accounting ledgers from the school bursar.' },
      questionText: 'Auditing last year’s printed canteen receipts from the school finance office is classified as:',
      options: ['Secondary data', 'Primary questionnaire', 'Direct observation', 'Experimental data'],
      correctAnswer: 'Secondary data',
      explanation: 'Because the receipts were recorded previously by the bursar for accounting purposes, they constitute secondary data.',
      hint1: 'Were the receipts created in the past by another department?',
      hint2: 'Existing administrative files are secondary data.'
    },
    {
      slot: 9,
      visual: 'none',
      questionText: 'What is the Golden Rule of Statistical Sampling?',
      options: ['A fair, unbiased sampling method is far more critical than raw sample size', 'A bigger sample automatically cures any unfair method', 'Always survey only volunteers because they are happy to help', 'Never use numbers in survey questions'],
      correctAnswer: 'A fair, unbiased sampling method is far more critical than raw sample size',
      explanation: 'A huge sample drawn with a biased method only measures the bias with greater certainty. True insight requires an unbiased, representative method.',
      hint1: 'Does size fix bias, or does fairness come first?',
      hint2: 'Method fairness beats raw size every time.'
    }
  ]
];

export function generateQuestion(worldId, qIdxInWorld, rng) {
  const worldQuestions = QUESTIONS[worldId] || QUESTIONS[0];
  const qData = worldQuestions[qIdxInWorld % worldQuestions.length];

  // Clone options and shuffle if rng provided
  const shuffledOptions = rng ? rng.shuffle([...qData.options]) : [...qData.options];

  return {
    id: `w${worldId}-s${qIdxInWorld}`,
    districtId: worldId,
    category: WORLDS[worldId]?.conceptFocus || 'data-collection',
    visual: qData.visual || 'none',
    visualData: qData.visualData || {},
    questionText: qData.questionText,
    options: shuffledOptions,
    correctAnswer: qData.correctAnswer,
    explanation: qData.explanation,
    hint1: qData.hint1,
    hint2: qData.hint2
  };
}

export function generateWorld(worldId, rng) {
  const questions = [];
  for (let slot = 0; slot < 10; slot++) {
    questions.push(generateQuestion(worldId, slot, rng));
  }
  return questions;
}

export function generateBank(seed = 12345) {
  const bank = [];
  for (let w = 0; w < 10; w++) {
    bank.push(...generateWorld(w, null));
  }
  return bank;
}

export function generateSession(worldId, modeId = 'independent', rng) {
  const mode = MODES[modeId] || MODES.independent;
  const worldQuestions = generateWorld(worldId, rng);
  return mode.slots.map((s) => worldQuestions[s]);
}
