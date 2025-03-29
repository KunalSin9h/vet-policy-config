import React, { useState, JSX } from 'react';
import { Filter } from '../../types/policy';

interface ScorecardFilterProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
}

interface ScoreOption {
  id: string;
  label: string;
  value: string;
  icon: JSX.Element;
  color: string;
}

const OVERALL_SCORE_OPTIONS: ScoreOption[] = [
  {
    id: 'high',
    label: 'High Scorecard',
    value: 'scorecard.score >= 8.0',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-green-400 bg-green-500/20 border-green-500/30',
  },
  {
    id: 'medium',
    label: 'Medium Scorecard',
    value: 'scorecard.score >= 5.0 && scorecard.score < 8.0',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  },
  {
    id: 'low',
    label: 'Low Scorecard',
    value: 'scorecard.score < 5.0',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-red-400 bg-red-500/20 border-red-500/30',
  },
];

const MAINTAINABILITY_OPTIONS: ScoreOption[] = [
  {
    id: 'well-maintained',
    label: 'Well Maintained',
    value: 'scorecard.scores["Maintained"] == 10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-green-400 bg-green-500/20 border-green-500/30',
  },
  {
    id: 'somewhat-maintained',
    label: 'Somewhat Maintained',
    value: 'scorecard.scores["Maintained"] >= 5',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  },
  {
    id: 'poorly-maintained',
    label: 'Poorly Maintained',
    value: 'scorecard.scores["Maintained"] < 5',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  },
  {
    id: 'unmaintained',
    label: 'Unmaintained',
    value: 'scorecard.scores["Maintained"] == 0',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-red-400 bg-red-500/20 border-red-500/30',
  },
];

export const ScorecardFilter: React.FC<ScorecardFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [selectedOverallOption, setSelectedOverallOption] = useState<string | null>(null);
  const [selectedMaintainabilityOption, setSelectedMaintainabilityOption] = useState<string | null>(null);
  const [isCustomOverall, setIsCustomOverall] = useState(false);
  const [isCustomMaintainability, setIsCustomMaintainability] = useState(false);
  const [customOverallValue, setCustomOverallValue] = useState('');
  const [customMaintainabilityValue, setCustomMaintainabilityValue] = useState('');

  const updateFilterValue = (overallOptionId: string | null) => {
    let value = '';
    
    if (overallOptionId) {
      const option = OVERALL_SCORE_OPTIONS.find(opt => opt.id === overallOptionId);
      if (option) value = option.value;
    }

    onUpdate({
      ...filter,
      value,
    });
  };

  const handleOverallOptionSelect = (optionId: string) => {
    // If the same option is clicked again, deselect it
    const newOptionId = selectedOverallOption === optionId ? null : optionId;
    setSelectedOverallOption(newOptionId);
    setIsCustomOverall(false);
    setCustomOverallValue('');
    updateFilterValue(newOptionId);
  };

  const handleMaintainabilityOptionSelect = (option: ScoreOption) => {
    setIsCustomMaintainability(false);
    setSelectedMaintainabilityOption(option.id);
    setCustomMaintainabilityValue('');
    setTimeout(updateFilterValue, 0);
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Overall Score</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {OVERALL_SCORE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOverallOptionSelect(option.id)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedOverallOption === option.id
                  ? option.color
                  : 'bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10'
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Maintainability Score Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Project Maintainability</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MAINTAINABILITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleMaintainabilityOptionSelect(option)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedMaintainabilityOption === option.id
                  ? option.color
                  : 'bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10'
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsCustomMaintainability(!isCustomMaintainability);
              setSelectedMaintainabilityOption(null);
              if (!isCustomMaintainability) setCustomMaintainabilityValue('');
              setTimeout(updateFilterValue, 0);
            }}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              isCustomMaintainability
                ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                : 'bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Custom Maintainability Score
          </button>
          {isCustomMaintainability && (
            <input
              type="text"
              value={customMaintainabilityValue}
              onChange={(e) => {
                setCustomMaintainabilityValue(e.target.value);
                setTimeout(updateFilterValue, 0);
              }}
              placeholder="Enter comparison (e.g. >= 5)"
              className="flex-1 px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
            />
          )}
        </div>
      </div>
    </div>
  );
}; 