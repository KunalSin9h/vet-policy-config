import React from 'react';
import { Filter, FilterType } from '../../types/filters';
import { VulnerabilityFilter } from './VulnerabilityFilter';
import { LicenseFilter } from './LicenseFilter';
import { PackageFilter } from './PackageFilter';
import { ScorecardFilter } from './ScorecardFilter';
import { ProjectFilter } from './ProjectFilter';

interface FilterTypeProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
}

export const FilterTypeFactory: React.FC<FilterTypeProps> = ({ filter, onUpdate }) => {
  switch (filter.type) {
    case FilterType.Package:
      return <PackageFilter filter={filter} onUpdate={onUpdate} />;
    case FilterType.Vulnerability:
      return <VulnerabilityFilter filter={filter} onUpdate={onUpdate} />;
    case FilterType.Scorecard:
      return <ScorecardFilter filter={filter} onUpdate={onUpdate} />;
    case FilterType.Project:
      return <ProjectFilter filter={filter} onUpdate={onUpdate} />;
    case FilterType.License:
      return <LicenseFilter filter={filter} onUpdate={onUpdate} />;
    default:
      return null;
  }
}; 