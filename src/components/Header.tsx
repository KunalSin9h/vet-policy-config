import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-b from-slate-900/95 to-slate-900/90 backdrop-blur-sm border-b border-slate-700/30 z-50">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <div>
            <h1 className="font-semibold text-slate-100 text-lg flex items-center gap-2">
              Vet <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text animate-gradient">PolicyConfig</span>
            </h1>
            <p className="text-xs text-slate-400">The easiest way to define filters and create policy file</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13h20M2 9h20M2 17h20M2 21h20" />
            </svg>
            <span className="text-sm font-medium text-slate-300">main</span>
            <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400/80"></span>
              <span className="text-xs text-slate-400">synced</span>
            </div>
          </div> */}

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/kunalsin9h/vet-policy-config" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a 
              href="https://docs.safedep.io/advanced/policy-as-code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Docs
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 