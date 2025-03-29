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

interface FilterOption {
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

const POPULARITY_OPTIONS: FilterOption[] = [
  {
    id: 'low',
    label: '< 10',
    value: 'project.stars < 10',
    color: 'text-slate-400 bg-slate-500/20 border-slate-500/30',
  },
  {
    id: 'medium',
    label: '10-100',
    value: 'project.stars >= 10 && project.stars < 100',
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  },
  {
    id: 'high',
    label: '100+',
    value: 'project.stars >= 100',
    color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  },
  {
    id: 'very-high',
    label: '1000+',
    value: 'project.stars >= 1000',
    color: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  },
];

const FORK_OPTIONS: FilterOption[] = [
  {
    id: 'low-forks',
    label: '< 10',
    value: 'project.forks < 10',
    color: 'text-slate-400 bg-slate-500/20 border-slate-500/30',
  },
  {
    id: 'medium-forks',
    label: '10-50',
    value: 'project.forks >= 10 && project.forks < 50',
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  },
  {
    id: 'high-forks',
    label: '50+',
    value: 'project.forks >= 50',
    color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  },
];

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPopularity, setSelectedPopularity] = useState<string | null>(null);
  const [selectedForkCount, setSelectedForkCount] = useState<string | null>(null);

  const updateFilterValue = (
    repoOption: string | null, 
    popularityOption: string | null,
    forkOption: string | null
  ) => {
    const conditions: string[] = [];
    
    if (repoOption) {
      const repo = REPO_OPTIONS.find(opt => opt.id === repoOption);
      if (repo) conditions.push(repo.value);
    }
    
    if (popularityOption) {
      const popularity = POPULARITY_OPTIONS.find(opt => opt.id === popularityOption);
      if (popularity) conditions.push(popularity.value);
    }

    if (forkOption) {
      const forkCount = FORK_OPTIONS.find(opt => opt.id === forkOption);
      if (forkCount) conditions.push(forkCount.value);
    }

    onUpdate({
      ...filter,
      value: conditions.length > 0 ? conditions.join(' && ') : '',
    });
  };

  const handleOptionSelect = (option: RepoOption) => {
    const newOption = selectedOption === option.id ? null : option.id;
    setSelectedOption(newOption);
    updateFilterValue(newOption, selectedPopularity, selectedForkCount);
  };

  const handlePopularitySelect = (option: FilterOption) => {
    const newPopularity = selectedPopularity === option.id ? null : option.id;
    setSelectedPopularity(newPopularity);
    updateFilterValue(selectedOption, newPopularity, selectedForkCount);
  };

  const handleForkCountSelect = (option: FilterOption) => {
    const newForkCount = selectedForkCount === option.id ? null : option.id;
    setSelectedForkCount(newForkCount);
    updateFilterValue(selectedOption, selectedPopularity, newForkCount);
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

      {/* Fork Count Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Fork Count</h3>
        <div className="grid grid-cols-3 gap-2">
          {FORK_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleForkCountSelect(option)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedForkCount === option.id
                  ? option.color
                  : 'bg-white/5 text-slate-300 border border-slate-700/50 hover:bg-white/10'
              }`}
            >
              {option.label}
              <svg viewBox="0 0 128 128" className="h-4 w-4">
                <path fill="currentColor" d="M26.666 0C11.97 0 0 11.97 0 26.666c0 12.87 9.181 23.651 21.334 26.13v37.87c0 11.77 9.68 21.334 21.332 21.334h.195c1.302 9.023 9.1 16 18.473 16C71.612 128 80 119.612 80 109.334s-8.388-18.668-18.666-18.668c-9.372 0-17.17 6.977-18.473 16h-.195c-8.737 0-16-7.152-16-16V63.779a18.514 18.514 0 0 0 13.24 5.555h2.955c1.303 9.023 9.1 16 18.473 16 9.372 0 17.169-6.977 18.47-16h11.057c1.303 9.023 9.1 16 18.473 16 10.278 0 18.666-8.39 18.666-18.668C128 56.388 119.612 48 109.334 48c-9.373 0-17.171 6.977-18.473 16H79.805c-1.301-9.023-9.098-16-18.471-16s-17.171 6.977-18.473 16h-2.955c-6.433 0-11.793-4.589-12.988-10.672 14.58-.136 26.416-12.05 26.416-26.662C53.334 11.97 41.362 0 26.666 0zm0 5.334A21.292 21.292 0 0 1 48 26.666 21.294 21.294 0 0 1 26.666 48 21.292 21.292 0 0 1 5.334 26.666 21.29 21.29 0 0 1 26.666 5.334zm-5.215 7.541C18.67 12.889 16 15.123 16 18.166v17.043c0 4.043 4.709 6.663 8.145 4.533l13.634-8.455c3.257-2.02 3.274-7.002.032-9.045l-13.635-8.59a5.024 5.024 0 0 0-2.725-.777zm-.117 5.291 13.635 8.588-13.635 8.455V18.166zm40 35.168a13.29 13.29 0 0 1 13.332 13.332A13.293 13.293 0 0 1 61.334 80 13.294 13.294 0 0 1 48 66.666a13.293 13.293 0 0 1 13.334-13.332zm48 0a13.29 13.29 0 0 1 13.332 13.332A13.293 13.293 0 0 1 109.334 80 13.294 13.294 0 0 1 96 66.666a13.293 13.293 0 0 1 13.334-13.332zm-42.568 6.951a2.667 2.667 0 0 0-1.887.78l-6.3 6.294-2.093-2.084a2.667 2.667 0 0 0-3.771.006 2.667 2.667 0 0 0 .008 3.772l3.974 3.96a2.667 2.667 0 0 0 3.766-.001l8.185-8.174a2.667 2.667 0 0 0 .002-3.772 2.667 2.667 0 0 0-1.884-.78zm48 0a2.667 2.667 0 0 0-1.887.78l-6.3 6.294-2.093-2.084a2.667 2.667 0 0 0-3.771.006 2.667 2.667 0 0 0 .008 3.772l3.974 3.96a2.667 2.667 0 0 0 3.766-.001l8.185-8.174a2.667 2.667 0 0 0 .002-3.772 2.667 2.667 0 0 0-1.884-.78zM61.334 96a13.293 13.293 0 0 1 13.332 13.334 13.29 13.29 0 0 1-13.332 13.332A13.293 13.293 0 0 1 48 109.334 13.294 13.294 0 0 1 61.334 96zM56 105.334c-2.193 0-4 1.807-4 4 0 2.195 1.808 4 4 4s4-1.805 4-4c0-2.193-1.807-4-4-4zm10.666 0c-2.193 0-4 1.807-4 4 0 2.195 1.808 4 4 4s4-1.805 4-4c0-2.193-1.807-4-4-4zM56 108c.75 0 1.334.585 1.334 1.334 0 .753-.583 1.332-1.334 1.332-.75 0-1.334-.58-1.334-1.332 0-.75.585-1.334 1.334-1.334zm10.666 0c.75 0 1.334.585 1.334 1.334 0 .753-.583 1.332-1.334 1.332-.75 0-1.332-.58-1.332-1.332 0-.75.583-1.334 1.332-1.334z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};