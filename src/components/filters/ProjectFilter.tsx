import React, { useState, JSX } from 'react';
import { Filter } from '../../types/policy';

interface ProjectFilterProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
}

interface RepoOption {
  id: string;
  label: string;
  value: string;
  icon: JSX.Element;
  color: string;
}

interface PopularityOption {
  id: string;
  label: string;
  value: string;
  color: string;
}

const REPO_OPTIONS: RepoOption[] = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'project.repository_type == "GitHub"',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  },
  {
    id: 'gitlab',
    label: 'GitLab',
    value: 'project.repository_type == "GitLab"',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
      </svg>
    ),
    color: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  },
  {
    id: 'other',
    label: 'Other',
    value: 'project.repository_type != "GitHub" && project.repository_type != "GitLab"',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
        <path d="M11 11V9h2v6h-2v-4zm0-8h2v2h-2V3z" />
      </svg>
    ),
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  },
];

const POPULARITY_OPTIONS: PopularityOption[] = [
  {
    id: 'low',
    label: '< 10',
    value: 'projects.exists(p, p.stars < 10)',
    color: 'text-slate-400 bg-slate-500/20 border-slate-500/30',
  },
  {
    id: 'medium',
    label: '10-100',
    value: 'projects.exists(p, p.stars >= 10 && p.stars < 100)',
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  },
  {
    id: 'high',
    label: '100+',
    value: 'projects.exists(p, p.stars >= 100)',
    color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  },
  {
    id: 'very-high',
    label: '1000+',
    value: 'projects.exists(p, p.stars >= 1000)',
    color: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  },
];

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPopularity, setSelectedPopularity] = useState<string | null>(null);

  const handleOptionSelect = (option: RepoOption) => {
    setSelectedOption(option.id);
    onUpdate({
      ...filter,
      value: option.value,
    });
  };

  const handlePopularitySelect = (option: PopularityOption) => {
    setSelectedPopularity(option.id);
    onUpdate({
      ...filter,
      value: option.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Repository Type Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Repository Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {REPO_OPTIONS.map((option) => (
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
      </div>

      {/* Popularity Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Popularity</h3>
        <div className="grid grid-cols-4 gap-2">
          {POPULARITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handlePopularitySelect(option)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedPopularity === option.id
                  ? option.color
                  : 'bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10'
              }`}
            >
              {option.label}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 