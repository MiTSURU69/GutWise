import React, { useState } from 'react';
import Header from './components/Header';
import UserInfoForm from './components/UserInfoForm';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsCard from './components/ResultsCard';
import { gutHealthQuestions } from './data/questions';
import { UserInfo, QuestionnaireResponse, Assessment } from './types';
import { calculateQuestionScore, calculateTotalScore, getHealthLevel, getHealthInsights } from './utils/scoring';
import { useAssessment } from './hooks/useAssessment';

type AppState = 'userInfo' | 'questionnaire' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | number | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const { saveAssessment, loading } = useAssessment();

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setAppState('questionnaire');
  };

  const handleAnswer = (answer: string | string[] | number) => {
    setCurrentAnswer(answer);
  };

  const handleNext = async () => {
    if (currentAnswer === null) return;

    const currentQuestion = gutHealthQuestions[currentQuestionIndex];
    const score = calculateQuestionScore(currentQuestion, currentAnswer);
    
    const newResponse: QuestionnaireResponse = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      score
    };

    const newResponses = [...responses, newResponse];
    setResponses(newResponses);

    if (currentQuestionIndex < gutHealthQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(null);
    } else {
      // Complete assessment
      const totalScore = calculateTotalScore(newResponses);
      const healthLevel = getHealthLevel(totalScore);
      
      const finalAssessment: Assessment = {
        name: userInfo!.name,
        age: userInfo!.age,
        responses: newResponses,
        totalScore,
        healthLevel,
        completedAt: new Date().toISOString()
      };

      setAssessment(finalAssessment);
      setAppState('results');

      // Save to database
      try {
        await saveAssessment(finalAssessment);
      } catch (error) {
        console.error('Failed to save assessment:', error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousResponse = responses[currentQuestionIndex - 1];
      setCurrentAnswer(previousResponse.answer);
      setResponses(responses.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setAppState('userInfo');
    setUserInfo(null);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setCurrentAnswer(null);
    setAssessment(null);
  };

  const canProceed = currentAnswer !== null && 
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {appState === 'userInfo' && (
          <UserInfoForm onSubmit={handleUserInfoSubmit} />
        )}

        {appState === 'questionnaire' && (
          <div className="max-w-4xl mx-auto">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={gutHealthQuestions.length} 
            />
            
            <QuestionCard
              question={gutHealthQuestions[currentQuestionIndex]}
              answer={currentAnswer}
              onAnswer={handleAnswer}
            />

            <div className="flex justify-between mt-8 max-w-2xl mx-auto">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 text-emerald-600 border border-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={!canProceed || loading}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {currentQuestionIndex === gutHealthQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {appState === 'results' && assessment && (
          <ResultsCard
            assessment={assessment}
            insights={getHealthInsights(assessment.healthLevel, assessment.responses)}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;