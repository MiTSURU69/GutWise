import { useState } from 'react';
import { Assessment, QuestionnaireResponse } from '../types';
import { supabase } from '../lib/supabase';

export const useAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAssessment = async (assessment: Assessment): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error: insertError } = await supabase
        .from('assessments')
        .insert([{
          name: assessment.name,
          age: assessment.age,
          responses: assessment.responses,
          total_score: assessment.totalScore,
          health_level: assessment.healthLevel,
          completed_at: assessment.completedAt
        }]);

      if (insertError) {
        throw insertError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving the assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveAssessment,
    loading,
    error
  };
};