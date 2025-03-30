import React from 'react';

const MobileWarning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-8 shadow-xl shadow-slate-900/20 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-semibold text-slate-100 mb-2">Desktop Only</h1>
        <p className="text-slate-300 mb-4">
          PolicyConfig is a dashboard tool designed for desktop use only. Please access it from a device with a screen width larger than 414 pixels for the best experience.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
          </svg>
          Recommended: &gt;414px screen width
        </div>
      </div>
    </div>
  );
};

export default MobileWarning; 