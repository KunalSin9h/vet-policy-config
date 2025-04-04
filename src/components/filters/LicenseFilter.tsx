import React, { useState } from 'react';
import { LicenseFilter as LicenseFilterType } from '../../types/filters';
import { Dropdown } from '../Dropdown';

interface LicenseFilterProps {
  filter: LicenseFilterType;
  onUpdate: (updatedFilter: LicenseFilterType) => void;
}

const COMMON_LICENSES = [
  // Permissive Licenses
  { id: 'MIT', name: 'MIT License', description: 'A permissive license that allows for reuse with few restrictions' },
  { id: 'Apache-2.0', name: 'Apache License 2.0', description: 'A permissive license with patent protection' },
  { id: 'BSD-3-Clause', name: 'BSD 3-Clause License', description: 'A permissive license with minimal restrictions' },
  { id: 'BSD-2-Clause', name: 'BSD 2-Clause License', description: 'A simplified BSD license' },
  { id: 'ISC', name: 'ISC License', description: 'A simplified BSD-style license' },
  { id: 'Python-2.0', name: 'Python License 2.0', description: 'License for Python and its standard libraries' },
  { id: 'PostgreSQL', name: 'PostgreSQL License', description: 'A liberal Open Source license' },
  
  // Copyleft Licenses
  { id: 'GPL-3.0-only', name: 'GNU GPL v3.0 only', description: 'Strong copyleft license, version 3.0 only' },
  { id: 'GPL-3.0-or-later', name: 'GNU GPL v3.0 or later', description: 'Strong copyleft license, version 3.0 or later' },
  { id: 'GPL-2.0-only', name: 'GNU GPL v2.0 only', description: 'Strong copyleft license, version 2.0 only' },
  { id: 'GPL-2.0-or-later', name: 'GNU GPL v2.0 or later', description: 'Strong copyleft license, version 2.0 or later' },
  { id: 'LGPL-3.0-only', name: 'GNU LGPL v3.0 only', description: 'Lesser GPL version 3.0 only' },
  { id: 'LGPL-3.0-or-later', name: 'GNU LGPL v3.0 or later', description: 'Lesser GPL version 3.0 or later' },
  { id: 'LGPL-2.1-only', name: 'GNU LGPL v2.1 only', description: 'Lesser GPL version 2.1 only' },
  { id: 'LGPL-2.1-or-later', name: 'GNU LGPL v2.1 or later', description: 'Lesser GPL version 2.1 or later' },
  { id: 'AGPL-3.0-only', name: 'GNU AGPL v3.0 only', description: 'Affero GPL version 3.0 only' },
  { id: 'AGPL-3.0-or-later', name: 'GNU AGPL v3.0 or later', description: 'Affero GPL version 3.0 or later' },
  { id: 'MPL-2.0', name: 'Mozilla Public License 2.0', description: 'A file-level copyleft license' },
  
  // Other Common Licenses
  { id: 'EPL-2.0', name: 'Eclipse Public License 2.0', description: 'Commercial-friendly copyleft license' },
  { id: 'AFL-3.0', name: 'Academic Free License v3.0', description: 'Academic Free License' },
  { id: 'Artistic-2.0', name: 'Artistic License 2.0', description: 'Perl-friendly license' },
  { id: 'BSL-1.0', name: 'Boost Software License 1.0', description: 'Simple permissive license' },
  { id: 'CC0-1.0', name: 'Creative Commons Zero v1.0', description: 'Public domain dedication' },
  { id: 'Unlicense', name: 'The Unlicense', description: 'Public domain dedication' },
  { id: 'OSL-3.0', name: 'Open Software License 3.0', description: 'Copyleft license with patent rights' }
];

export const LicenseFilter: React.FC<LicenseFilterProps> = ({
  filter,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLicenseToggle = (licenseId: string) => {
    const currentLicenses = filter.options.allowed;
    const newLicenses = currentLicenses.includes(licenseId)
      ? currentLicenses.filter(id => id !== licenseId)
      : [...currentLicenses, licenseId];
    
    onUpdate({
      ...filter,
      options: {
        allowed: newLicenses,
      },
      value: newLicenses.length > 0
        ? newLicenses.map(id => `      licenses.exists(p, p == "${id}")`).join(' ||\n') + (newLicenses.length > 1 ? '\n' : '')
        : '      licenses.exists(p, p == "MIT")',
    });
  };

  const filteredLicenses = COMMON_LICENSES.filter(license =>
    license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLicenses = filter.options.allowed;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">Contains License</label>
      
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
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder="Search SPDX licenses..."
              className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
            />
            {isOpen && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        }
      >
        <div className="bg-slate-800 border border-slate-700/50 rounded-xl shadow-xl max-h-[240px] overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600/50 [&::-webkit-scrollbar-track]:bg-slate-700/[0.16] hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/75">
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
      </Dropdown>
    </div>
  );
}; 