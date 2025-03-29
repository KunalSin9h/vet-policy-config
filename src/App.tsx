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
  check_type: CheckType.CheckTypeVulnerability,
  summary: 'Detect known security vulnerabilities',
  description: 'This filter checks for known security vulnerabilities in dependencies',
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 pt-24 pb-16">
        <div className="block lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Filter Configuration */}
          <div className="space-y-6 mb-6 lg:mb-0">
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 shadow-xl shadow-slate-900/20 space-y-6">
              <div className="space-y-4">
                <input
                  type="text"
                  value={filterSuite.name}
                  onChange={(e) => handleFilterSuiteChange('name', e.target.value)}
                  placeholder="Filter Suite Name"
                  className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
                />
                <textarea
                  value={filterSuite.description}
                  onChange={(e) => handleFilterSuiteChange('description', e.target.value)}
                  placeholder="Filter Suite Description"
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Filter Suite Tags</label>
                  <TagInput
                    tags={filterSuite.tags}
                    onTagsChange={(tags) => handleFilterSuiteChange('tags', tags)}
                    placeholder="Add tags (press space or enter)"
                    className="bg-white/10"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-700/30">
                <div className="text-sm text-slate-400">
                  Filters: {filterSuite.filters.length} / {MAX_FILTERS}
                </div>
                <button 
                  onClick={handleAddFilter}
                  disabled={filterSuite.filters.length >= MAX_FILTERS}
                  className="px-5 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 shadow-sm shadow-blue-500/20 transition-all hover:shadow-md hover:shadow-blue-500/25 disabled:bg-slate-700/50 disabled:shadow-none disabled:cursor-not-allowed disabled:text-slate-500"
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
                <div className="text-center py-12 text-slate-400 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/30 shadow-xl shadow-slate-900/20">
                  No filters yet. Click "Add Filter" to create one.
                </div>
              )}
            </div>
          </div>

          {/* YAML Preview */}
          <div className="lg:sticky lg:top-24 h-fit bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/30 shadow-xl shadow-slate-900/20">
            <YamlPreview filterSuite={filterSuite} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
