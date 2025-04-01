import { CheckType } from './policy';
import { VulnerabilitySeverity } from '../components/filters/VulnerabilityFilter';

export enum FilterType {
  Package = 'Package',
  Vulnerability = 'Vulnerability',
  Scorecard = 'Scorecard',
  Project = 'Project',
  License = 'License'
}

export interface BaseFilter {
  id: string;
  name: string;
  type: FilterType;
  checkType: CheckType;
  summary?: string;
  description?: string;
  references?: string[];
  tags?: string[];
  value: string;
}

export interface PackageFilter extends BaseFilter {
  type: FilterType.Package;
  options: {
    packages: Array<{
      ecosystem: string;
      name: string;
      version?: string;
    }>;
  };
}

export interface VulnerabilityFilter extends BaseFilter {
  type: FilterType.Vulnerability;
  options: {
    severity: VulnerabilitySeverity[];
  };
}

export interface ScorecardFilter extends BaseFilter {
  type: FilterType.Scorecard;
  options: {
    metrics: string[];
    threshold: number;
  };
}

export interface ProjectFilter extends BaseFilter {
  type: FilterType.Project;
  options: {
    criteria: string[];
  };
}

export interface LicenseFilter extends BaseFilter {
  type: FilterType.License;
  options: {
    allowed: string[];
  };
}

export type Filter = PackageFilter | VulnerabilityFilter | ScorecardFilter | ProjectFilter | LicenseFilter;

export const getDefaultFilter = (type: FilterType): Filter => {
  const baseFilter = {
    id: crypto.randomUUID(),
    name: `${type} Check`,
    type,
    value: '',
    references: [],
    tags: [],
  };

  switch (type) {
    case FilterType.Package:
      return {
        ...baseFilter,
        type: FilterType.Package,
        checkType: CheckType.CheckTypeOther,
        options: {
          packages: [],
        },
      };
    
    case FilterType.Vulnerability:
      return {
        ...baseFilter,
        type: FilterType.Vulnerability,
        checkType: CheckType.CheckTypeVulnerability,
        options: {
          severity: [],
        },
      };
    
    case FilterType.Scorecard:
      return {
        ...baseFilter,
        type: FilterType.Scorecard,
        checkType: CheckType.CheckTypeSecurityScorecard,
        options: {
          metrics: [],
          threshold: 0,
        },
      };
    
    case FilterType.Project:
      return {
        ...baseFilter,
        type: FilterType.Project,
        checkType: CheckType.CheckTypeOther,
        options: {
          criteria: [],
        },
      };
    
    case FilterType.License:
      return {
        ...baseFilter,
        type: FilterType.License,
        checkType: CheckType.CheckTypeLicense,
        options: {
          allowed: [],
        },
      };
  }
}; 