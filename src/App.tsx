import React, { useState } from 'react';
import { FilterEditor } from './components/FilterEditor';
import { YamlPreview } from './components/YamlPreview';
import { Filter, FilterSuite, CheckType } from './types/policy';
import { TagInput } from './components/TagInput';
import Header from './components/Header';
import Footer from './components/Footer';

const defaultFilter: Filter = {
  name: 'Vulnerability Check',
  value: 'is_vulnerability == true',
  check_type: CheckType.CheckTypeUnknown,
  summary: 'Detect known security vulnerabilities',
  description: 'This filter checks for known security vulnerabilities in dependencies',
  references: ['https://nvd.nist.gov/'],
  tags: ['security', 'vulnerability'],
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 pt-24 pb-16">
        <div className="block lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Filter Configuration */}
          <div className="space-y-6 mb-6 lg:mb-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 p-6 shadow-lg shadow-slate-200/50 space-y-6">
              <div className="space-y-4">
                <input
                  type="text"
                  value={filterSuite.name}
                  onChange={(e) => handleFilterSuiteChange('name', e.target.value)}
                  placeholder="Filter Suite Name"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
                />
                <textarea
                  value={filterSuite.description}
                  onChange={(e) => handleFilterSuiteChange('description', e.target.value)}
                  placeholder="Filter Suite Description"
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Filter Suite Tags</label>
                  <TagInput
                    tags={filterSuite.tags}
                    onTagsChange={(tags) => handleFilterSuiteChange('tags', tags)}
                    placeholder="Add tags (press space or enter)"
                    className="bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200/60">
                <div className="text-sm text-slate-600">
                  Filters: {filterSuite.filters.length} / {MAX_FILTERS}
                </div>
                <button 
                  onClick={handleAddFilter}
                  disabled={filterSuite.filters.length >= MAX_FILTERS}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
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
                <div className="text-center py-8 text-slate-500 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50">
                  No filters yet. Click "Add Filter" to create one.
                </div>
              )}
            </div>
          </div>

          {/* YAML Preview */}
          <div className="lg:sticky lg:top-24 h-fit bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg shadow-slate-200/50">
            <YamlPreview filterSuite={filterSuite} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
