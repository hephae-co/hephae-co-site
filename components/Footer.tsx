import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <img
              src="https://insights.ai.hephae.co/hephae_logo_blue.png"
              alt="Hephae.co"
              className="h-8 w-auto object-contain mb-2"
            />
            <p className="text-gray-500 text-sm mt-2">Defying limits with Generative Intelligence.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            © 2025 hephae.co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};