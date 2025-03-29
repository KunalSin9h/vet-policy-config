import { useState } from 'react';
import { FilterEditor } from './components/FilterEditor';
import { YamlPreview } from './components/YamlPreview';
import { Filter, FilterSuite, CheckType, VulnerabilitySeverity } from './types/policy';
import { TagInput } from './components/TagInput';
import { FilterTypeSelector } from './components/FilterTypeSelector';
import Header from './components/Header';
import Footer from './components/Footer';

const getDefaultFilter = (type: CheckType): Filter => ({
  name: type === CheckType.CheckTypeVulnerability ? 'Vulnerability Check' :
        type === CheckType.CheckTypeLicense ? 'License Check' :
        type === CheckType.CheckTypeSecurityScorecard ? 'Scorecard Check' :
        type === CheckType.CheckTypeMaintenance ? 'Project Check' :
        type === CheckType.CheckTypeProject ? 'Project Check' : 'Package Check',
  value: type === CheckType.CheckTypeVulnerability ? '' :
         type === CheckType.CheckTypeLicense ? '' :
         type === CheckType.CheckTypeSecurityScorecard ? '' :
         type === CheckType.CheckTypeMaintenance ? '' : '',
  check_type: type,
  references: [],
  tags: [],
  options: type === CheckType.CheckTypeVulnerability ? {
    vulnerability: {
      severity: [],
    },
  } : undefined,
});

const MAX_FILTERS = 50;

function App() {
  const [filterSuite, setFilterSuite] = useState<FilterSuite>({
    name: 'vet filter suite',
    description: "Define your security guardrails using vet's filters",
    filters: [],
    tags: ['SecDevOps'],
  });

  const [isFilterTypeSelectorOpen, setIsFilterTypeSelectorOpen] = useState(false);

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
      summary: updatedFilter.summary?.trim() ?? undefined,
      description: updatedFilter.description?.trim() ?? undefined,
      references: updatedFilter.references?.map(ref => ref.trim()) ?? [],
      tags: updatedFilter.tags?.map(tag => tag.trim()) ?? [],
    };
    const newFilters = [...filterSuite.filters];
    newFilters[index] = trimmedFilter;
    handleFilterSuiteChange('filters', newFilters);
  };

  const handleFilterDelete = (index: number) => {
    const newFilters = filterSuite.filters.filter((_, i) => i !== index);
    handleFilterSuiteChange('filters', newFilters);
  };

  const handleAddFilter = (type: CheckType) => {
    if (filterSuite.filters.length >= MAX_FILTERS) {
      alert('Maximum limit of 50 filters reached');
      return;
    }
    handleFilterSuiteChange('filters', [...filterSuite.filters, getDefaultFilter(type)]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col">
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
                  onClick={() => setIsFilterTypeSelectorOpen(true)}
                  disabled={filterSuite.filters.length >= MAX_FILTERS}
                  className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors disabled:bg-slate-700/30 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
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

      <FilterTypeSelector
        isOpen={isFilterTypeSelectorOpen}
        onClose={() => setIsFilterTypeSelectorOpen(false)}
        onSelect={(type) => {
          handleAddFilter(type);
          setIsFilterTypeSelectorOpen(false);
        }}
      />
    </div>
  );
}

export default App;
