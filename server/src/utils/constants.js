// App-wide constants

const ROLES = {
  STUDENT: 'student',
  COUNSELLOR: 'counsellor',
  ADMIN: 'admin',
  VOLUNTEER: 'volunteer',
};

const ASSESSMENT_TYPES = {
  PHQ9: 'PHQ9',
  GAD7: 'GAD7',
  GHQ12: 'GHQ12',
};

const SEVERITY_LEVELS = {
  MINIMAL: 'minimal',
  MILD: 'mild',
  MODERATE: 'moderate',
  MODERATELY_SEVERE: 'moderately_severe',
  SEVERE: 'severe',
};

const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

const MOODS = {
  VERY_HAPPY: 'very_happy',
  HAPPY: 'happy',
  NEUTRAL: 'neutral',
  SAD: 'sad',
  VERY_SAD: 'very_sad',
  ANXIOUS: 'anxious',
  ANGRY: 'angry',
  STRESSED: 'stressed',
};

const EMOTIONS = {
  HAPPY: 'happy',
  SAD: 'sad',
  ANXIOUS: 'anxious',
  ANGRY: 'angry',
  NEUTRAL: 'neutral',
  STRESSED: 'stressed',
  HOPELESS: 'hopeless',
  CONFUSED: 'confused',
};

const FORUM_CATEGORIES = [
  'exam_stress',
  'loneliness',
  'homesickness',
  'career_anxiety',
  'depression',
  'anxiety',
  'sleep',
  'relationships',
  'self_care',
  'success_stories',
  'general',
];

const RESOURCE_CATEGORIES = [
  'exam_stress',
  'sleep_improvement',
  'depression_awareness',
  'anxiety_coping',
  'time_management',
  'meditation',
  'breathing_exercises',
  'self_care',
  'relationships',
  'career_planning',
];

const EMERGENCY_CONTACTS = [
  { name: 'Vandrevala Foundation', number: '1860-2662-345', hours: '24/7', country: 'India' },
  { name: 'iCall', number: '9152987821', hours: 'Mon-Sat, 8am-10pm', country: 'India' },
  { name: 'AASRA', number: '91-22-27546669', hours: '24/7', country: 'India' },
  { name: 'Snehi', number: '044-24640050', hours: '24/7', country: 'India' },
];

module.exports = {
  ROLES,
  ASSESSMENT_TYPES,
  SEVERITY_LEVELS,
  RISK_LEVELS,
  APPOINTMENT_STATUS,
  MOODS,
  EMOTIONS,
  FORUM_CATEGORIES,
  RESOURCE_CATEGORIES,
  EMERGENCY_CONTACTS,
};
