// data/pools.js — Curated single-defensible-answer scenario and item pools

export const CATEGORICAL_ITEMS = [
  { text: "Favourite CCA club (e.g. Robotics, Choir, Basketball)", reason: "Named categories with no numeric meaning." },
  { text: "Bus service number (e.g. Bus 14, 65, 174)", reason: "The numeral is just an identifying label, not a countable amount." },
  { text: "Locker identification code (e.g. Locker #204)", reason: "Numeral acts as an address/label, not an amount or measurement." },
  { text: "Preferred mode of transport to school (Bus, MRT, Walk, Car)", reason: "Descriptive categories." },
  { text: "Student council badge level (Bronze, Silver, Gold)", reason: "Non-numeric categories." },
  { text: "Mother tongue language taken (Chinese, Malay, Tamil, Hindi)", reason: "Categories of subject." }
];

export const DISCRETE_ITEMS = [
  { text: "Number of siblings in a family", reason: "Counted in distinct whole number steps." },
  { text: "Number of CCAs joined by a student", reason: "Can only take whole counted values (1, 2, 3...)." },
  { text: "Number of library books borrowed in a term", reason: "Whole counted items; you cannot borrow 2.4 books." },
  { text: "Number of goals scored by the school soccer team", reason: "Counted in whole integer units." },
  { text: "Number of students absent in a class on Monday", reason: "Counted in whole individual students." }
];

export const CONTINUOUS_ITEMS = [
  { text: "Time taken to walk from home to school (in minutes)", reason: "Measured along a continuous scale; can take any decimal value." },
  { text: "A student's height measured to the nearest centimetre", reason: "Height is an inherently continuous physical measurement, even if rounded." },
  { text: "Mass of a school backpack in kilograms", reason: "Mass is measured continuously along a scale." },
  { text: "Time taken to complete the 2.4 km run", reason: "Continuous duration of time that can be measured to fractions of a second." },
  { text: "Volume of water remaining in a student's bottle (in mL)", reason: "Fluid volume is continuous and measured." }
];

export const PRIMARY_SECONDARY_PAIRS = [
  {
    topic: "Canteen food preferences",
    primary: "The council distributes a questionnaire to students during homeroom.",
    secondary: "The council checks last term's canteen stall sales records from the vendor.",
    primaryReason: "Collected first-hand directly by the investigator.",
    secondaryReason: "Extracted from already existing administrative records."
  },
  {
    topic: "Student travel habits",
    primary: "Prefects count students entering through the turnstiles between 7:00 and 7:30 AM.",
    secondary: "The team downloads the public transport ez-link tap report provided by the transport authority.",
    primaryReason: "Direct observation conducted first-hand by the student researchers.",
    secondaryReason: "Existing third-party dataset collected for another primary purpose."
  },
  {
    topic: "Recycling habits at recess",
    primary: "Observing and recording what items students toss into the blue bin during lunch.",
    secondary: "Reading the town council's annual recycling tonnage publication.",
    primaryReason: "Direct first-hand empirical observation.",
    secondaryReason: "Pre-existing published report."
  }
];

export const BIAS_CASES = [
  {
    title: "Convenience Sampling",
    scenario: "Jun Hao surveys 30 students sitting with him at the basketball court about adding a sports stall.",
    flaw: "Convenience sample: excludes students in the library, classrooms, and canteen.",
    fix: "Take a random or stratified sample across all student levels and locations."
  },
  {
    title: "Voluntary Response Bias",
    scenario: "The council posts a survey link on their informal Instagram story asking if homework is too hard.",
    flaw: "Voluntary response: only students with strong negative feelings or internet access bother to respond.",
    fix: "Select a random sample from the official student register."
  },
  {
    title: "Leading Question",
    scenario: "Asking: 'Don't you agree that our school recess is far too short?'",
    flaw: "Leading question: pushes the respondent towards answering 'yes'.",
    fix: "Ask a neutral question: 'How would you rate the current length of recess?'"
  },
  {
    title: "Overlapping Class Options",
    scenario: "A survey form offers choices: 0–15 mins, 15–30 mins, 30–45 mins.",
    flaw: "Overlapping boundaries: a student taking exactly 15 minutes does not know which box to tick.",
    fix: "Use clear non-overlapping brackets: Less than 15 mins, 15 to under 30 mins, 30 mins or more."
  }
];
