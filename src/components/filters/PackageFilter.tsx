import React, { useState, useRef, useEffect } from 'react';
import { Filter } from '../../types/policy';

interface PackageFilterProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
}

const ECOSYSTEMS = [
  { id: 'npm', name: 'NPM', description: 'Node Package Manager (JavaScript/Node.js)' },
  { id: 'pypi', name: 'PyPI', description: 'Python Package Index' },
  { id: 'maven', name: 'Maven', description: 'Java Package Repository' },
  { id: 'golang', name: 'Go', description: 'Go Package Registry' },
  { id: 'cargo', name: 'Cargo', description: 'Rust Package Registry' },
  { id: 'composer', name: 'Composer', description: 'PHP Package Manager' },
  { id: 'nuget', name: 'NuGet', description: '.NET Package Registry' },
  { id: 'rubygems', name: 'RubyGems', description: 'Ruby Package Manager' }
];

export const PackageFilter: React.FC<PackageFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [isEcosystemDropdownOpen, setIsEcosystemDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedEcosystem = filter.options?.package?.ecosystem || '';
  const packageName = filter.options?.package?.name || '';
  const packageVersion = filter.options?.package?.version || '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEcosystemDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEcosystemSelect = (ecosystemId: string) => {
    onUpdate({
      ...filter,
      options: {
        ...filter.options,
        package: {
          ...filter.options?.package,
          ecosystem: ecosystemId,
        },
      },
      value: generateFilterValue(ecosystemId, packageName, packageVersion),
    });
    setIsEcosystemDropdownOpen(false);
    setSearchTerm('');
  };

  const handlePackageDetailsChange = (field: 'name' | 'version', value: string) => {
    const updatedPackage = {
      ecosystem: selectedEcosystem,
      name: field === 'name' ? value : packageName,
      version: field === 'version' ? value : packageVersion,
    };

    onUpdate({
      ...filter,
      options: {
        ...filter.options,
        package: updatedPackage,
      },
      value: generateFilterValue(updatedPackage.ecosystem, updatedPackage.name, updatedPackage.version),
    });
  };

  const generateFilterValue = (ecosystem: string, name: string, version: string) => {
    if (!ecosystem || !name) return '';
    return version 
      ? `package == "${ecosystem}/${name}@${version}"`
      : `package == "${ecosystem}/${name}"`;
  };

  const filteredEcosystems = ECOSYSTEMS.filter(eco =>
    eco.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eco.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4" ref={dropdownRef}>
      {/* Ecosystem Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Package Ecosystem</label>
        <div className="relative">
          <button
            onClick={() => setIsEcosystemDropdownOpen(!isEcosystemDropdownOpen)}
            className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 text-slate-100 transition-colors flex items-center justify-between"
          >
            <span>{selectedEcosystem ? ECOSYSTEMS.find(e => e.id === selectedEcosystem)?.name : 'Select ecosystem'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${isEcosystemDropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {isEcosystemDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl max-h-64 overflow-y-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ecosystems..."
                className="w-full px-4 py-2.5 bg-white/5 border-b border-slate-700/50 text-sm focus:outline-none placeholder-slate-400 text-slate-100"
              />
              {filteredEcosystems.map(ecosystem => (
                <button
                  key={ecosystem.id}
                  onClick={() => handleEcosystemSelect(ecosystem.id)}
                  className={`w-full px-4 py-2.5 text-left hover:bg-white/5 transition-colors ${
                    selectedEcosystem === ecosystem.id
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-100'
                  }`}
                >
                  <div className="text-sm font-medium">{ecosystem.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{ecosystem.description}</div>
                </button>
              ))}
              {filteredEcosystems.length === 0 && (
                <div className="px-4 py-2.5 text-sm text-slate-400">
                  No ecosystems found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Package Details */}
      {selectedEcosystem && (
        <div className="space-y-4 animate-fadeIn">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Package Name</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => handlePackageDetailsChange('name', e.target.value)}
              placeholder="e.g., react, lodash, express"
              className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Version (Optional)</label>
            <input
              type="text"
              value={packageVersion}
              onChange={(e) => handlePackageDetailsChange('version', e.target.value)}
              placeholder="e.g., 1.0.0, ^2.0.0, >=3.0.0"
              className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 