import React from 'react';
import { CheckType } from '../types/policy';

interface FilterTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: CheckType) => void;
}

const FILTER_TYPES = [
  {
    type: CheckType.CheckTypeVulnerability,
    label: 'Package',
    description: 'Filter based on package metadata and properties',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    type: CheckType.CheckTypeVulnerability,
    label: 'Vulnerability',
    description: 'Filter based on security vulnerabilities',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    type: CheckType.CheckTypeSecurityScorecard,
    label: 'Scorecard',
    description: 'Filter based on OpenSSF Scorecard metrics',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    type: CheckType.CheckTypeProject,
    label: 'Projects',
    description: 'Filter based on project-specific criteria',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )
  },
  {
    type: CheckType.CheckTypeLicense,
    label: 'Licenses',
    description: 'Filter based on package licenses',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

export const FilterTypeSelector: React.FC<FilterTypeSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl border border-slate-700/30 p-6 shadow-xl shadow-slate-900/20 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-slate-100">Select Filter Type</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {FILTER_TYPES.map((filterType) => (
            <button
              key={filterType.type}
              onClick={() => {
                onSelect(filterType.type);
                onClose();
              }}
              className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer group"
            >
              <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
                {filterType.icon}
              </div>
              <div>
                <h3 className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors">
                  {filterType.label}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">
                  {filterType.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 