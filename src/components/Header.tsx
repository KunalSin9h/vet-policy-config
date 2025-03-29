import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/30 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="font-semibold text-slate-100 text-2xl">
          Vet <span className="text-blue-400 font-mono">PolicyConfig</span>
        </h1>
      </div>
    </header>
  );
};

export default Header; 