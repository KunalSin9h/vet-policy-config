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
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl">
            <span className="text-sm text-slate-400">Type:</span>
            <span className="text-sm font-medium text-slate-100">{CHECK_TYPE_LABELS[filter.check_type]}</span>
          </div>
          <input
            type="text"
            value={filter.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Filter name"
            className="w-full px-4 py-2.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400/40 placeholder-slate-400 text-slate-100 transition-colors"
          />
        </div>
        <button 
          onClick={onDelete}
          className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
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