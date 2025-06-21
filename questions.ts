import { Question } from '../types';

export const gutHealthQuestions: Question[] = [
  {
    id: 'bowel-frequency',
    question: 'How often do you have bowel movements?',
    type: 'radio',
    options: [
      'More than 3 times per day',
      '1-3 times per day',
      'Every other day',
      '2-3 times per week',
      'Less than 2 times per week'
    ],
    weight: 3
  },
  {
    id: 'stool-consistency',
    question: 'What is the typical consistency of your stool?',
    type: 'radio',
    options: [
      'Very hard and difficult to pass',
      'Hard but manageable',
      'Well-formed and easy to pass',
      'Soft but formed',
      'Loose or watery'
    ],
    weight: 3
  },
  {
    id: 'digestive-discomfort',
    question: 'How often do you experience digestive discomfort (bloating, gas, cramping)?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Never', max: 'Daily' },
    weight: 2.5
  },
  {
    id: 'energy-levels',
    question: 'How would you rate your typical energy levels throughout the day?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Very Low', max: 'Very High' },
    weight: 2
  },
  {
    id: 'fiber-intake',
    question: 'How many servings of fruits and vegetables do you eat daily?',
    type: 'radio',
    options: [
      'Less than 1 serving',
      '1-2 servings',
      '3-4 servings',
      '5-6 servings',
      '7 or more servings'
    ],
    weight: 2.5
  },
  {
    id: 'water-intake',
    question: 'How much water do you typically drink per day?',
    type: 'radio',
    options: [
      'Less than 4 glasses',
      '4-6 glasses',
      '6-8 glasses',
      '8-10 glasses',
      'More than 10 glasses'
    ],
    weight: 2
  },
  {
    id: 'processed-foods',
    question: 'How often do you consume processed or fast foods?',
    type: 'radio',
    options: [
      'Multiple times daily',
      'Once daily',
      'Few times per week',
      'Once per week',
      'Rarely or never'
    ],
    weight: 2.5
  },
  {
    id: 'probiotics',
    question: 'Do you regularly consume probiotic foods or supplements?',
    type: 'radio',
    options: [
      'Never',
      'Rarely (few times per month)',
      'Sometimes (few times per week)',
      'Often (daily or almost daily)',
      'Multiple times daily'
    ],
    weight: 2
  },
  {
    id: 'stress-levels',
    question: 'How would you rate your typical stress levels?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Very Low', max: 'Very High' },
    weight: 2
  },
  {
    id: 'sleep-quality',
    question: 'How would you rate your sleep quality?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Very Poor', max: 'Excellent' },
    weight: 2
  },
  {
    id: 'exercise-frequency',
    question: 'How often do you engage in physical exercise?',
    type: 'radio',
    options: [
      'Never',
      '1-2 times per week',
      '3-4 times per week',
      '5-6 times per week',
      'Daily'
    ],
    weight: 1.5
  },
  {
    id: 'digestive-symptoms',
    question: 'Which digestive symptoms do you experience regularly? (Select all that apply)',
    type: 'checkbox',
    options: [
      'Heartburn or acid reflux',
      'Nausea',
      'Stomach pain or cramping',
      'Excessive gas',
      'Bloating',
      'Constipation',
      'Diarrhea',
      'Food intolerances',
      'None of the above'
    ],
    weight: 3
  },
  {
    id: 'antibiotic-usage',
    question: 'Have you taken antibiotics in the past 6 months?',
    type: 'radio',
    options: [
      'Multiple courses',
      'One course',
      'None',
      'I take them regularly for a condition'
    ],
    weight: 1.5
  },
  {
    id: 'meal-regularity',
    question: 'How regular are your meal times?',
    type: 'radio',
    options: [
      'Very irregular, I often skip meals',
      'Somewhat irregular',
      'Mostly regular',
      'Very regular, same times daily'
    ],
    weight: 1.5
  },
  {
    id: 'food-allergies',
    question: 'Do you have any known food allergies or intolerances?',
    type: 'radio',
    options: [
      'Multiple severe allergies/intolerances',
      'One or two mild intolerances',
      'Suspected but not confirmed',
      'None that I know of'
    ],
    weight: 2
  }
];