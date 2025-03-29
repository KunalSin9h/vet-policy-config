import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} SafeDep. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a 
              href="https://github.com/safedep/vet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              GitHub
            </a>
            <a 
              href="https://safedep.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              SafeDep
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 