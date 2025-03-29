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

const SCORE_OPTIONS: ScoreOption[] = [
  {
    id: 'high',
    label: 'High Scorecard',
    value: 'overall_score > 7.0',
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
    value: 'overall_score < 5.0',
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
    value: 'overall_score < 3.0',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-red-400 bg-red-500/20 border-red-500/30',
  },
];

export const ScorecardFilter: React.FC<ScorecardFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: ScoreOption) => {
    setIsCustom(false);
    setSelectedOption(option.id);
    onUpdate({
      ...filter,
      value: option.value,
    });
  };

  const handleCustomValueChange = (value: string) => {
    setCustomValue(value);
    setSelectedOption(null);
    onUpdate({
      ...filter,
      value: `overall_score ${value}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SCORE_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              selectedOption === option.id
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
          onClick={() => setIsCustom(!isCustom)}
          className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            isCustom
              ? 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
              : 'bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Custom Value
        </button>

        {isCustom && (
          <input
            type="text"
            value={customValue}
            onChange={(e) => handleCustomValueChange(e.target.value)}
            placeholder="Enter comparison (e.g. >= 6.5)"
            className="flex-1 px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
          />
        )}
      </div>
    </div>
  );
}; 