import { Question, QuestionnaireResponse } from '../types';

export const calculateQuestionScore = (
  question: Question,
  answer: string | string[] | number
): number => {
  let score = 0;

  switch (question.id) {
    case 'bowel-frequency':
      const bowelScores = [1, 5, 3, 2, 1];
      score = bowelScores[question.options!.indexOf(answer as string)];
      break;

    case 'stool-consistency':
      const stoolScores = [1, 2, 5, 4, 2];
      score = stoolScores[question.options!.indexOf(answer as string)];
      break;

    case 'digestive-discomfort':
      score = 6 - (answer as number); // Invert scale (less discomfort = higher score)
      break;

    case 'energy-levels':
      score = answer as number;
      break;

    case 'fiber-intake':
      const fiberScores = [1, 2, 3, 4, 5];
      score = fiberScores[question.options!.indexOf(answer as string)];
      break;

    case 'water-intake':
      const waterScores = [1, 2, 4, 5, 4];
      score = waterScores[question.options!.indexOf(answer as string)];
      break;

    case 'processed-foods':
      const processedScores = [1, 2, 3, 4, 5];
      score = processedScores[question.options!.indexOf(answer as string)];
      break;

    case 'probiotics':
      const probioticScores = [1, 2, 3, 4, 5];
      score = probioticScores[question.options!.indexOf(answer as string)];
      break;

    case 'stress-levels':
      score = 6 - (answer as number); // Invert scale
      break;

    case 'sleep-quality':
      score = answer as number;
      break;

    case 'exercise-frequency':
      const exerciseScores = [1, 2, 4, 5, 5];
      score = exerciseScores[question.options!.indexOf(answer as string)];
      break;

    case 'digestive-symptoms':
      const symptoms = answer as string[];
      if (symptoms.includes('None of the above')) {
        score = 5;
      } else {
        score = Math.max(1, 5 - symptoms.length);
      }
      break;

    case 'antibiotic-usage':
      const antibioticScores = [2, 3, 5, 1];
      score = antibioticScores[question.options!.indexOf(answer as string)];
      break;

    case 'meal-regularity':
      const mealScores = [1, 2, 4, 5];
      score = mealScores[question.options!.indexOf(answer as string)];
      break;

    case 'food-allergies':
      const allergyScores = [2, 3, 3, 5];
      score = allergyScores[question.options!.indexOf(answer as string)];
      break;

    default:
      score = 3; // Default neutral score
  }

  return score * question.weight;
};

export const calculateTotalScore = (responses: QuestionnaireResponse[]): number => {
  return responses.reduce((total, response) => total + response.score, 0);
};

export const getHealthLevel = (totalScore: number): 'Excellent' | 'Good' | 'Fair' | 'Needs Attention' => {
  const maxPossibleScore = 168; // Calculated based on questions and weights
  const percentage = (totalScore / maxPossibleScore) * 100;

  if (percentage >= 80) return 'Excellent';
  if (percentage >= 65) return 'Good';
  if (percentage >= 45) return 'Fair';
  return 'Needs Attention';
};

export const getHealthInsights = (
  healthLevel: string,
  responses: QuestionnaireResponse[]
): string[] => {
  const insights: string[] = [];

  switch (healthLevel) {
    case 'Excellent':
      insights.push('Your gut health appears to be in excellent condition!');
      insights.push('Continue maintaining your healthy lifestyle and dietary habits.');
      insights.push('Consider sharing your healthy habits with friends and family.');
      break;

    case 'Good':
      insights.push('Your gut health is generally good with room for minor improvements.');
      insights.push('Focus on maintaining consistent healthy habits.');
      insights.push('Consider increasing your fiber intake and staying well-hydrated.');
      break;

    case 'Fair':
      insights.push('Your gut health shows some areas that could benefit from attention.');
      insights.push('Consider increasing your intake of probiotic-rich foods.');
      insights.push('Focus on reducing processed foods and increasing fiber intake.');
      insights.push('Regular exercise and stress management may help improve your digestive health.');
      break;

    case 'Needs Attention':
      insights.push('Your responses suggest your gut health may need some focused attention.');
      insights.push('Consider consulting with a healthcare provider or nutritionist.');
      insights.push('Focus on a whole-foods diet rich in fiber and probiotics.');
      insights.push('Stress management and regular sleep patterns are crucial for gut health.');
      insights.push('Limit processed foods and consider keeping a food diary to identify triggers.');
      break;
  }

  return insights;
};