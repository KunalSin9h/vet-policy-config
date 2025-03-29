import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="font-semibold text-black text-2xl">
          Vet <span className="text-blue-500 font-mono">PolicyConfig</span>
        </h1>
      </div>
    </header>
  );
};

export default Header; 