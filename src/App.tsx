import React, { useState } from 'react';
import { FilterEditor } from './components/FilterEditor';
import { YamlPreview } from './components/YamlPreview';
import { Filter, FilterSuite, CheckType } from './types/policy';
import { TagInput } from './components/TagInput';
import Header from './components/Header';

const defaultFilter: Filter = {
  name: '',
  value: '',
  check_type: CheckType.CheckTypeUnknown,
  summary: '',
  description: '',
  references: [],
  tags: [],
};

function App() {
  const [sideMode, setSideMode] = useState(false);
  const [filterSuite, setFilterSuite] = useState<FilterSuite>({
    name: 'SafeDep vet OSS suite',
    description: 'Customized filter suite for vet vetting vet.',
    filters: [],
    tags: ['general', 'safedep-vet'],
  });

  const handleFilterSuiteChange = (field: keyof FilterSuite, value: any) => {
    setFilterSuite(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilterUpdate = (index: number, updatedFilter: Filter) => {
    const newFilters = [...filterSuite.filters];
    newFilters[index] = updatedFilter;
    handleFilterSuiteChange('filters', newFilters);
  };

  const handleFilterDelete = (index: number) => {
    const newFilters = filterSuite.filters.filter((_, i) => i !== index);
    handleFilterSuiteChange('filters', newFilters);
  };

  const handleAddFilter = () => {
    handleFilterSuiteChange('filters', [...filterSuite.filters, { ...defaultFilter }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className={`max-w-7xl mx-auto px-4 pt-24 ${sideMode ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 space-y-4 mr-4">
            <input
              type="text"
              value={filterSuite.name}
              onChange={(e) => handleFilterSuiteChange('name', e.target.value)}
              placeholder="Filter Suite Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              value={filterSuite.description}
              onChange={(e) => handleFilterSuiteChange('description', e.target.value)}
              placeholder="Filter Suite Description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">Filter Suite Tags</label>
              <TagInput
                tags={filterSuite.tags}
                onTagsChange={(tags) => handleFilterSuiteChange('tags', tags)}
                placeholder="Add tags (press space or enter)"
              />
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button 
              onClick={() => setSideMode(!sideMode)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              {sideMode ? 'Single view' : 'Side-by-side'}
            </button>
            <button 
              onClick={handleAddFilter}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Add Filter
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filterSuite.filters.map((filter, index) => (
            <FilterEditor
              key={index}
              filter={filter}
              onUpdate={(updatedFilter) => handleFilterUpdate(index, updatedFilter)}
              onDelete={() => handleFilterDelete(index)}
            />
          ))}
          {filterSuite.filters.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No filters yet. Click "Add Filter" to create one.
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <YamlPreview filterSuite={filterSuite} />
        </div>
      </main>
    </div>
  );
}

export default App;
