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
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60 p-6 shadow-lg shadow-slate-200/50">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 space-y-4 mr-4">
          <input
            type="text"
            value={filter.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Filter name"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
          />
          <select
            value={filter.check_type}
            onChange={(e) => handleChange('check_type', e.target.value as CheckType)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
          >
            {Object.entries(CHECK_TYPE_LABELS).map(([type, label]) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={onDelete}
          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
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
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
        />

        <textarea
          value={filter.value}
          onChange={(e) => handleChange('value', e.target.value)}
          placeholder="Filter expression"
          rows={3}
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
        />

        <textarea
          value={filter.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
          rows={2}
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-colors"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Tags</label>
          <TagInput
            tags={filter.tags}
            onTagsChange={(tags) => handleChange('tags', tags)}
            placeholder="Add tags (press space or enter)"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">References</label>
          <TagInput
            tags={filter.references}
            onTagsChange={(tags) => handleChange('references', tags)}
            placeholder="Add references (press space or enter)"
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
}; 