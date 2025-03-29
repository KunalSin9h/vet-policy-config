import React, { useEffect, useRef } from 'react';
import { FilterSuite } from '../types/policy';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import '../styles/prism-custom.css';

interface YamlPreviewProps {
  filterSuite: FilterSuite;
}

export const YamlPreview: React.FC<YamlPreviewProps> = ({ filterSuite }) => {
  const codeRef = useRef<HTMLElement>(null);

  const generateYAML = (suite: FilterSuite): string => {
    const yaml = [
      `name: ${suite.name}`,
      'description: |',
      ...suite.description.split('\n').map(line => `  ${line}`),
      ...(suite.tags.length ? ['tags:', ...suite.tags.map(tag => `  - ${tag}`)] : []),
      'filters:',
      ...suite.filters.map(filter => [
        '  - name: ' + filter.name,
        '    check_type: ' + filter.check_type,
        '    summary: ' + filter.summary,
        '    value: |',
        ...filter.value.split('\n').map(line => '      ' + line),
        ...(filter.description ? ['    description: |', ...filter.description.split('\n').map(line => '      ' + line)] : []),
        ...(filter.references.length ? ['    references:', ...filter.references.map(ref => '      - ' + ref)] : []),
        ...(filter.tags.length ? ['    tags:', ...filter.tags.map(tag => '      - ' + tag)] : [])
      ].join('\n'))
    ].join('\n');
    return yaml;
  };

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [filterSuite]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generateYAML(filterSuite));
  };

  const handleDownload = () => {
    const blob = new Blob([generateYAML(filterSuite)], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filter-suite.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">YAML Preview</h3>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Copy
          </button>
          <button 
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
      <div className="relative">
        <pre className="!bg-[#272822] rounded-md !p-4 overflow-x-auto">
          <code ref={codeRef} className="language-yaml !text-sm">
            {generateYAML(filterSuite)}
          </code>
        </pre>
      </div>
    </div>
  );
}; 