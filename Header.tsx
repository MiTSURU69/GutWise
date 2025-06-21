import React from 'react';
import { Heart, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8" />
            <Heart className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">GutWise</h1>
            <p className="text-emerald-100 text-sm">Your Personalized Gut Health Assessment</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;