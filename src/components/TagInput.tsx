import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add tags...',
  className = '',
}) => {
  const [input, setInput] = useState('');

  const addTag = (value: string) => {
    const newTag = value.trim();
    if (newTag && !tags.includes(newTag)) {
      onTagsChange([...tags, newTag]);
    }
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading/trailing whitespace as user types
    setInput(e.target.value.trimStart());
  };

  const handleBlur = () => {
    if (input.trim()) {
      addTag(input);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={`flex flex-wrap gap-2 px-2 py-1.5 bg-white/10 border border-slate-700/50 rounded-xl text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400/20 focus-within:border-blue-400/40 transition-colors ${className}`}>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1 px-2 py-1 bg-slate-600 text-slate-100 rounded-lg text-sm font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-slate-300 hover:text-white transition-colors ml-1"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[100px] bg-transparent text-slate-100 placeholder-slate-400 outline-none text-sm"
      />
    </div>
  );
}; 