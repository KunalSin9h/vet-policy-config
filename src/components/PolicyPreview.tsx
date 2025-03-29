import React from 'react';
import { FilterSuite } from '../types/policy';
import './PolicyPreview.css';

interface PolicyPreviewProps {
  filterSuite: FilterSuite;
}

export const PolicyPreview: React.FC<PolicyPreviewProps> = ({ filterSuite }) => {
  const generateYAML = (suite: FilterSuite): string => {
    const enabledFilters = suite.filters.filter(f => f.enabled);
    const yaml = [
      'name: ' + suite.name,
      'description: ' + suite.description,
      'filters:',
      ...enabledFilters.map(filter => [
        '  - name: ' + filter.name,
        '    value: |',
        ...filter.value.split('\n').map(line => '      ' + line),
        ...(filter.description ? ['    description: ' + filter.description] : [])
      ].join('\n'))
    ].join('\n');
    return yaml;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateYAML(filterSuite));
  };

  const handleDownload = () => {
    const blob = new Blob([generateYAML(filterSuite)], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'policy-config.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="policy-preview">
      <div className="preview-header">
        <h3>Policy Configuration Preview</h3>
        <div className="preview-actions">
          <button onClick={handleCopy}>Copy</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
      <pre className="preview-content">
        <code>{generateYAML(filterSuite)}</code>
      </pre>
    </div>
  );
}; 