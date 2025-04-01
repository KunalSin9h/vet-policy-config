import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/30 mt-12">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-400">
            {/* © {new Date().getFullYear()} SafeDep, Inc. All rights reserved. */}
          </div>
          <div className="flex gap-4">
            <a 
              href="https://safedep.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              SafeDep.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 