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
      // Required fields
      `name: ${suite.name}`,
      
      // Optional fields with content
      ...(suite.description.trim() ? ['description: |', ...suite.description.split('\n').map(line => `  ${line}`)] : []),
      ...(suite.tags.length ? ['tags:', ...suite.tags.map(tag => `  - ${tag}`)] : []),
      
      // Filters section (required)
      'filters:',
      ...suite.filters.map(filter => {
        const filterLines = [
          // Required fields
          '  - name: ' + filter.name,
          '    check_type: ' + filter.check_type,
          '    value: |',
          ...filter.value.split('\n').map(line => '      ' + line),
          
          // Optional fields with content
          ...(filter.summary.trim() ? ['    summary: ' + filter.summary] : []),
          ...(filter.description.trim() ? ['    description: |', ...filter.description.split('\n').map(line => '      ' + line)] : []),
          ...(filter.references.length ? ['    references:', ...filter.references.map(ref => '      - ' + ref)] : []),
          ...(filter.tags.length ? ['    tags:', ...filter.tags.map(tag => '      - ' + tag)] : [])
        ];
        return filterLines.join('\n');
      })
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
    a.download = 'policy.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-700/30 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/30">
        <h2 className="text-sm font-medium text-slate-100">YAML Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-600/50 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-slate-800/50">
        <pre className="!m-0 !bg-transparent !p-4">
          <code ref={codeRef} className="language-yaml !text-sm">
            {generateYAML(filterSuite)}
          </code>
        </pre>
      </div>
    </div>
  );
}; 