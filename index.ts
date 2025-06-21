export interface Question {
  id: string;
  question: string;
  type: 'radio' | 'checkbox' | 'scale';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  weight: number;
}

export interface UserInfo {
  name: string;
  age: number;
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | string[] | number;
  score: number;
}

export interface Assessment {
  id?: string;
  name: string;
  age: number;
  responses: QuestionnaireResponse[];
  totalScore: number;
  healthLevel: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  completedAt: string;
}