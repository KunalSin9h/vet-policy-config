import React, { useState, useRef, useEffect } from 'react';
import { Filter } from '../../types/policy';
import { PackageRegistryLogo } from './PackageRegistryLogo';

interface PackageFilterProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
}

interface PackageDetails {
  ecosystem: string;
  name: string;
  version?: string;
}

const ECOSYSTEMS = [
  { id: 'npm', name: 'NPM', description: 'Node Package Manager (JavaScript/Node.js)' },
  { id: 'pypi', name: 'PyPI', description: 'Python Package Index' },
  { id: 'maven', name: 'Maven', description: 'Java Package Repository' },
  { id: 'golang', name: 'Go', description: 'Go Package Registry' },
  { id: 'cargo', name: 'Cargo', description: 'Rust Package Registry' },
];

export const PackageFilter: React.FC<PackageFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [isEcosystemDropdownOpen, setIsEcosystemDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const packages = filter.options?.package?.packages || [];

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
    const newPackage: PackageDetails = {
      ecosystem: ecosystemId,
      name: '',
    };
    
    onUpdate({
      ...filter,
      options: {
        ...filter.options,
        package: {
          packages: [...packages, newPackage],
        },
      },
      value: generateFilterValue([...packages, newPackage]),
    });
    setIsEcosystemDropdownOpen(false);
    setSearchTerm('');
  };

  const handlePackageDetailsChange = (index: number, field: keyof PackageDetails, value: string) => {
    const updatedPackages = [...packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: value,
    };

    onUpdate({
      ...filter,
      options: {
        ...filter.options,
        package: {
          packages: updatedPackages,
        },
      },
      value: generateFilterValue(updatedPackages),
    });
  };

  const handleRemovePackage = (index: number) => {
    const updatedPackages = packages.filter((_, i) => i !== index);
    onUpdate({
      ...filter,
      options: {
        ...filter.options,
        package: {
          packages: updatedPackages,
        },
      },
      value: generateFilterValue(updatedPackages),
    });
  };

  const generateFilterValue = (pkgs: PackageDetails[]) => {
    if (pkgs.length === 0) return '';
    
    return pkgs
      .filter(pkg => pkg.ecosystem)
      .map(pkg => {
        const conditions = [`pkg.ecosystem == "${pkg.ecosystem}"`];
        
        if (pkg.name) {
          conditions.push(`pkg.name == "${pkg.name}"`);
        }
        
        if (pkg.version) {
          conditions.push(`pkg.version == "${pkg.version}"`);
        }
        
        return `      (${conditions.join(' &&\n            ')})`;
      })
      .join(' ||\n') + (pkgs.length > 0 ? '\n' : '');
  };

  const filteredEcosystems = ECOSYSTEMS.filter(eco =>
    eco.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eco.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4" ref={dropdownRef}>
      {/* Package List */}
      <div className="space-y-3">
        {packages.map((pkg, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Ecosystem */}
            <div className="w-1/4">
              <div className="px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm text-slate-100 flex items-center gap-2">
                <PackageRegistryLogo ecosystem={pkg.ecosystem} className="h-4 w-4" />
                {ECOSYSTEMS.find(e => e.id === pkg.ecosystem)?.name || 'Unknown'}
              </div>
            </div>

            {/* Package Name */}
            <div className="flex-1">
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => handlePackageDetailsChange(index, 'name', e.target.value)}
                placeholder="Package name"
                className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
              />
            </div>

            {/* Version */}
            <div className="w-1/4">
              <input
                type="text"
                value={pkg.version || ''}
                onChange={(e) => handlePackageDetailsChange(index, 'version', e.target.value)}
                placeholder="Version (optional)"
                className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
              />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemovePackage(index)}
              className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add Package Button */}
      <div className="relative">
        <button
          onClick={() => setIsEcosystemDropdownOpen(!isEcosystemDropdownOpen)}
          className="px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Package
        </button>

        {isEcosystemDropdownOpen && (
          <div className="absolute z-10 w-64 mt-1 bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl max-h-64 overflow-y-auto">
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
                className="w-full px-4 py-2.5 text-left hover:bg-white/5 transition-colors text-slate-100 flex items-center gap-2"
              >
                <PackageRegistryLogo ecosystem={ecosystem.id} className="h-4 w-4 text-slate-300" />
                <div>
                  <div className="text-sm font-medium">{ecosystem.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{ecosystem.description}</div>
                </div>
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
  );
}; 