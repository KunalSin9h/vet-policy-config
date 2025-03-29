import React from 'react';
import { Filter, CheckType } from '../../types/policy';
import { VulnerabilityFilter } from './VulnerabilityFilter';
import { FilterTypeProps } from './types';

export const FilterTypeFactory: React.FC<FilterTypeProps> = ({ filter, onUpdate }) => {
  switch (filter.check_type) {
    case CheckType.CheckTypeVulnerability:
      return <VulnerabilityFilter filter={filter} onUpdate={onUpdate} />;
    // Add other filter type components here as they are created
    default:
      return null;
  }
}; 