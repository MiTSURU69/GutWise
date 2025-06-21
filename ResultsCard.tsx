import React from 'react';
import { CheckCircle2, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { Assessment } from '../types';

interface ResultsCardProps {
  assessment: Assessment;
  insights: string[];
  onRestart: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ assessment, insights, onRestart }) => {
  const getHealthIcon = () => {
    switch (assessment.healthLevel) {
      case 'Excellent':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'Good':
        return <TrendingUp className="w-8 h-8 text-blue-500" />;
      case 'Fair':
        return <Info className="w-8 h-8 text-yellow-500" />;
      case 'Needs Attention':
        return <AlertCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getHealthColor = () => {
    switch (assessment.healthLevel) {
      case 'Excellent':
        return 'text-green-600 border-green-200 bg-green-50';
      case 'Good':
        return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'Fair':
        return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'Needs Attention':
        return 'text-red-600 border-red-200 bg-red-50';
    }
  };

  const maxScore = 168;
  const percentage = Math.round((assessment.totalScore / maxScore) * 100);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Your Gut Health Assessment Results</h2>
        <p className="text-emerald-100">Completed on {new Date(assessment.completedAt).toLocaleDateString()}</p>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {getHealthIcon()}
          </div>
          <div className={`inline-block px-6 py-3 rounded-full border-2 ${getHealthColor()} font-semibold text-lg mb-4`}>
            {assessment.healthLevel}
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {percentage}%
          </div>
          <p className="text-gray-600">Overall Gut Health Score</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personalized Insights</h3>
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Remember</h3>
          <p className="text-blue-700">
            This assessment provides general insights based on your responses. For persistent digestive issues or 
            health concerns, please consult with a qualified healthcare professional for proper evaluation and 
            personalized medical advice.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
          >
            Take Assessment Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;