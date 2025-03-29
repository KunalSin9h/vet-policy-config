import React, { useState, useRef, useEffect } from 'react';
import { Filter } from '../../types/policy';

interface LicenseFilterProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
}

const COMMON_LICENSES = [
  { id: 'MIT', name: 'MIT License', description: 'A permissive license that allows for reuse with few restrictions' },
  { id: 'Apache-2.0', name: 'Apache License 2.0', description: 'A permissive license with patent protection' },
  { id: 'GPL-3.0', name: 'GNU General Public License v3.0', description: 'A copyleft license that requires source code disclosure' },
  { id: 'LGPL-3.0', name: 'GNU Lesser General Public License v3.0', description: 'A copyleft license that allows linking with proprietary software' },
  { id: 'BSD-3-Clause', name: 'BSD 3-Clause License', description: 'A permissive license with minimal restrictions' },
  { id: 'BSD-2-Clause', name: 'BSD 2-Clause License', description: 'A simplified BSD license' },
  { id: 'ISC', name: 'ISC License', description: 'A simplified BSD-style license' },
  { id: 'MPL-2.0', name: 'Mozilla Public License 2.0', description: 'A file-level copyleft license' },
  { id: 'AGPL-3.0', name: 'GNU Affero General Public License v3.0', description: 'A copyleft license for network services' },
  { id: 'Unlicense', name: 'The Unlicense', description: 'A public domain dedication' }
];

export const LicenseFilter: React.FC<LicenseFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLicenseToggle = (licenseId: string) => {
    const currentLicenses = filter.options?.license?.allowed || [];
    const newLicenses = currentLicenses.includes(licenseId)
      ? currentLicenses.filter(id => id !== licenseId)
      : [...currentLicenses, licenseId];
    
    onUpdate({
      ...filter,
      options: {
        ...filter.options,
        license: {
          allowed: newLicenses,
        },
      },
      value: newLicenses.length > 0
        ? `license in [${newLicenses.map(id => `"${id}"`).join(', ')}]`
        : 'license == "MIT"',
    });
  };

  const filteredLicenses = COMMON_LICENSES.filter(license =>
    license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLicenses = filter.options?.license?.allowed || [];

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="block text-sm font-medium text-slate-300">Allowed Licenses</label>
      
      {/* Selected Licenses */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedLicenses.map(licenseId => {
          const license = COMMON_LICENSES.find(l => l.id === licenseId);
          return (
            <div
              key={licenseId}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm"
            >
              <span>{license?.name || licenseId}</span>
              <button
                onClick={() => handleLicenseToggle(licenseId)}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Search Input and Dropdown */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search licenses..."
          className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
        />

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl max-h-64 overflow-y-auto">
            {filteredLicenses.map(license => (
              <button
                key={license.id}
                onClick={() => {
                  handleLicenseToggle(license.id);
                  setSearchTerm('');
                }}
                className={`w-full px-4 py-2.5 text-left hover:bg-white/5 transition-colors ${
                  selectedLicenses.includes(license.id)
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-100'
                }`}
              >
                <div className="text-sm font-medium">{license.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{license.description}</div>
              </button>
            ))}
            {filteredLicenses.length === 0 && (
              <div className="px-4 py-2.5 text-sm text-slate-400">
                No licenses found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 