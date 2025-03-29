import React, { useState } from 'react';
import { FilterEditor } from './components/FilterEditor';
import { PolicyPreview } from './components/PolicyPreview';
import { Filter, FilterSuite } from './types/policy';
import './App.css';

const defaultFilters: Filter[] = [
  {
    name: 'critical-vuln',
    value: 'vulns.critical.exists(p, true)',
    description: 'Check for critical vulnerabilities',
    enabled: true,
  },
  {
    name: 'safe-licenses',
    value: 'licenses.exists(p, (p != "MIT") && (p != "Apache-2.0"))',
    description: 'Ensure licenses are either MIT or Apache 2.0',
    enabled: true,
  },
  {
    name: 'ossf-maintained',
    value: 'scorecard.scores.Maintained == 0',
    description: 'Check if package is maintained according to OpenSSF scorecard',
    enabled: true,
  },
];

function App() {
  const [sideMode, setSideMode] = useState(false);
  const [filterSuite, setFilterSuite] = useState<FilterSuite>({
    name: 'Generic Filter Suite',
    description: 'Example filter suite with canned filters',
    filters: defaultFilters,
  });

  const handleFilterUpdate = (index: number, updatedFilter: Filter) => {
    const newFilters = [...filterSuite.filters];
    newFilters[index] = updatedFilter;
    setFilterSuite({
      ...filterSuite,
      filters: newFilters,
    });
  };

  const handleFilterDelete = (index: number) => {
    const newFilters = filterSuite.filters.filter((_, i) => i !== index);
    setFilterSuite({
      ...filterSuite,
      filters: newFilters,
    });
  };

  const handleAddFilter = () => {
    setFilterSuite({
      ...filterSuite,
      filters: [
        ...filterSuite.filters,
        {
          name: 'new-filter',
          value: '',
          enabled: true,
        },
      ],
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">VetPolicyConfig</h1>
            <p className="tagline">The easiest way to configure and manage security policies.</p>
          </div>
          <div className="header-actions">
            <select className="language-select">
              <option value="en">English</option>
            </select>
            <button 
              className="side-mode-button"
              onClick={() => setSideMode(!sideMode)}
            >
              Side-by-side mode
            </button>
          </div>
        </div>
      </header>

      <main className={`main-content ${sideMode ? 'side-mode' : ''}`}>
        <div className="editor-section">
          <div className="section-header">
            <h2>Policy Configuration</h2>
            <button onClick={handleAddFilter} className="add-filter-button">
              Add Filter
            </button>
          </div>
          <div className="filters-container">
            {filterSuite.filters.map((filter, index) => (
              <FilterEditor
                key={index}
                filter={filter}
                onUpdate={(updatedFilter) => handleFilterUpdate(index, updatedFilter)}
                onDelete={() => handleFilterDelete(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="preview-section">
          <PolicyPreview filterSuite={filterSuite} />
        </div>
      </main>
    </div>
  );
}

export default App;
