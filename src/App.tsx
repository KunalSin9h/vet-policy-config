import React, { useState } from 'react';
import { FilterEditor } from './components/FilterEditor';
import { YamlPreview } from './components/YamlPreview';
import { Filter, FilterSuite, CheckType } from './types/policy';
import { TagInput } from './components/TagInput';
import Header from './components/Header';
import Footer from './components/Footer';

const defaultFilter: Filter = {
  name: '',
  value: '',
  check_type: CheckType.CheckTypeUnknown,
  summary: '',
  description: '',
  references: [],
  tags: [],
};

const MAX_FILTERS = 50;

function App() {
  const [filterSuite, setFilterSuite] = useState<FilterSuite>({
    name: 'vet filter suite',
    description: "Define your security guardrails using vet's filters",
    filters: [],
    tags: ['SecDevOps'],
  });

  const handleFilterSuiteChange = (field: keyof FilterSuite, value: any) => {
    const trimmedValue = typeof value === 'string' ? value.trim() : value;
    setFilterSuite(prev => ({
      ...prev,
      [field]: trimmedValue,
    }));
  };

  const handleFilterUpdate = (index: number, updatedFilter: Filter) => {
    const trimmedFilter = {
      ...updatedFilter,
      name: updatedFilter.name.trim(),
      value: updatedFilter.value.trim(),
      summary: updatedFilter.summary.trim(),
      description: updatedFilter.description.trim(),
      references: updatedFilter.references.map(ref => ref.trim()),
      tags: updatedFilter.tags.map(tag => tag.trim()),
    };
    const newFilters = [...filterSuite.filters];
    newFilters[index] = trimmedFilter;
    handleFilterSuiteChange('filters', newFilters);
  };

  const handleFilterDelete = (index: number) => {
    const newFilters = filterSuite.filters.filter((_, i) => i !== index);
    handleFilterSuiteChange('filters', newFilters);
  };

  const handleAddFilter = () => {
    if (filterSuite.filters.length >= MAX_FILTERS) {
      alert('Maximum limit of 50 filters reached');
      return;
    }
    handleFilterSuiteChange('filters', [...filterSuite.filters, { ...defaultFilter }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-2 gap-6 min-w-[1200px]">
          {/* Left Column - Filter Configuration */}
          <div className="min-w-[600px] space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-6">
              <div className="space-y-4">
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

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Filters: {filterSuite.filters.length} / {MAX_FILTERS}
                </div>
                <button 
                  onClick={handleAddFilter}
                  disabled={filterSuite.filters.length >= MAX_FILTERS}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add Filter
                </button>
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto mb-12">
              {filterSuite.filters.map((filter, index) => (
                <FilterEditor
                  key={index}
                  filter={filter}
                  onUpdate={(updatedFilter) => handleFilterUpdate(index, updatedFilter)}
                  onDelete={() => handleFilterDelete(index)}
                />
              ))}
              {filterSuite.filters.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm">
                  No filters yet. Click "Add Filter" to create one.
                </div>
              )}
            </div>
          </div>

          {/* Right Column - YAML Preview */}
          <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto min-w-[500px]">
            <YamlPreview filterSuite={filterSuite} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
