import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  answer: string | string[] | number | null;
  onAnswer: (answer: string | string[] | number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, onAnswer }) => {
  const handleRadioChange = (value: string) => {
    onAnswer(value);
  };

  const handleCheckboxChange = (value: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    
    if (value === 'None of the above') {
      onAnswer([value]);
      return;
    }
    
    let newAnswers;
    if (currentAnswers.includes('None of the above')) {
      newAnswers = [value];
    } else if (currentAnswers.includes(value)) {
      newAnswers = currentAnswers.filter(a => a !== value);
    } else {
      newAnswers = [...currentAnswers, value];
    }
    
    onAnswer(newAnswers);
  };

  const handleScaleChange = (value: number) => {
    onAnswer(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      
      {question.type === 'radio' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer transition-all duration-200"
            >
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={answer === option}
                onChange={() => handleRadioChange(option)}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'checkbox' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer transition-all duration-200"
            >
              <input
                type="checkbox"
                value={option}
                checked={Array.isArray(answer) && answer.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'scale' && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{question.scaleLabels?.min}</span>
            <span>{question.scaleLabels?.max}</span>
          </div>
          <div className="flex justify-between items-center">
            {Array.from({ length: question.scaleMax! - question.scaleMin! + 1 }, (_, i) => {
              const value = question.scaleMin! + i;
              return (
                <label key={value} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value={value}
                    checked={answer === value}
                    onChange={() => handleScaleChange(value)}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="mt-1 text-sm text-gray-600">{value}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;