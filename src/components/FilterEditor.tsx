import React from 'react';
import { Filter } from '../types/policy';
import './FilterEditor.css';

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
  const handleChange = (field: keyof Filter, value: string | boolean) => {
    onUpdate({
      ...filter,
      [field]: value,
    });
  };

  return (
    <div className="filter-editor">
      <div className="filter-header">
        <div className="filter-enable">
          <input
            type="checkbox"
            checked={filter.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
          />
        </div>
        <input
          type="text"
          className="filter-name"
          value={filter.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Filter name"
        />
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
      <textarea
        className="filter-value"
        value={filter.value}
        onChange={(e) => handleChange('value', e.target.value)}
        placeholder="Enter filter expression..."
        rows={3}
      />
      <input
        type="text"
        className="filter-description"
        value={filter.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Filter description (optional)"
      />
    </div>
  );
}; 