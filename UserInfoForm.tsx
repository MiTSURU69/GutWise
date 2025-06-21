import React, { useState } from 'react';
import { User, Calendar } from 'lucide-react';
import { UserInfo } from '../types';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { name?: string; age?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!age || parseInt(age) < 16 || parseInt(age) > 120) {
      newErrors.age = 'Please enter a valid age between 16 and 120';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit({ name: name.trim(), age: parseInt(age) });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to GutWise</h2>
        <p className="text-gray-600">Let's start with some basic information about you</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your age"
            min="16"
            max="120"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
        >
          Start Assessment
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;