import React from 'react';
import { CheckType } from '../../types/policy';
import { VulnerabilityFilter } from './VulnerabilityFilter';
import { LicenseFilter } from './LicenseFilter';
import { PackageFilter } from './PackageFilter';
import { ScorecardFilter } from './ScorecardFilter';
import { ProjectFilter } from './ProjectFilter';
import { FilterTypeProps } from './types';

export const FilterTypeFactory: React.FC<FilterTypeProps> = ({ filter, onUpdate }) => {
  switch (filter.check_type) {
    case CheckType.CheckTypeVulnerability:
      return <VulnerabilityFilter filter={filter} onUpdate={onUpdate} />;
    case CheckType.CheckTypeLicense:
      return <LicenseFilter filter={filter} onUpdate={onUpdate} />;
    case CheckType.CheckTypeMalware:
      return <PackageFilter filter={filter} onUpdate={onUpdate} />;
    case CheckType.CheckTypeSecurityScorecard:
      return <ScorecardFilter filter={filter} onUpdate={onUpdate} />;
    case CheckType.CheckTypeProject:
      return <ProjectFilter filter={filter} onUpdate={onUpdate} />;
    // Add other filter type components here as they are created
    default:
      return null;
  }
}; 