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
    <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 space-y-4 mr-4">
          <input
            type="text"
            value={filter.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Filter name"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={filter.check_type}
            onChange={(e) => handleChange('check_type', e.target.value as CheckType)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.entries(CHECK_TYPE_LABELS).map(([type, label]) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
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
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <textarea
          value={filter.value}
          onChange={(e) => handleChange('value', e.target.value)}
          placeholder="Filter expression"
          rows={3}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <textarea
          value={filter.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description"
          rows={2}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="space-y-2">
          <label className="block text-sm text-gray-700">Tags</label>
          <TagInput
            tags={filter.tags}
            onTagsChange={(tags) => handleChange('tags', tags)}
            placeholder="Add tags (press space or enter)"
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-700">References</label>
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