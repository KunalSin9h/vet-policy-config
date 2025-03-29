import React from 'react';
import { Filter, CheckType, CHECK_TYPE_LABELS } from '../types/policy';
import { TagInput } from './TagInput';

interface FilterEditorProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
  onDelete: () => void;
}

export const FilterEditor: React.FC<FilterEditorProps> = ({
  filter,
  onUpdate,
  onDelete,
}) => {
  const handleChange = (field: keyof Filter, value: any) => {
    onUpdate({
      ...filter,
      [field]: value,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 shadow-xl shadow-slate-900/20">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 space-y-4 mr-4">
          <input
            type="text"
            value={filter.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Filter name"
            className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
          />
          <select
            value={filter.check_type}
            onChange={(e) => handleChange('check_type', e.target.value as CheckType)}
            className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 text-slate-100 transition-colors"
          >
            {Object.entries(CHECK_TYPE_LABELS).map(([type, label]) => (
              <option key={type} value={type} className="bg-slate-800 text-slate-100">{label}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={onDelete}
          className="px-4 py-2 bg-red-500/90 text-white rounded-xl text-sm font-medium hover:bg-red-600 shadow-sm shadow-red-500/20 transition-all hover:shadow-md hover:shadow-red-500/25"
        >
          Delete
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={filter.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Summary"
          className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
        />

        <textarea
          value={filter.value}
          onChange={(e) => handleChange('value', e.target.value)}
          placeholder="Filter expression"
          rows={3}
          className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
        />

        <textarea
          value={filter.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
          rows={2}
          className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Tags</label>
          <TagInput
            tags={filter.tags}
            onTagsChange={(tags) => handleChange('tags', tags)}
            placeholder="Add tags (press space or enter)"
            className="bg-white/10"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">References</label>
          <TagInput
            tags={filter.references}
            onTagsChange={(tags) => handleChange('references', tags)}
            placeholder="Add references (press space or enter)"
            className="bg-white/10"
          />
        </div>
      </div>
    </div>
  );
}; 