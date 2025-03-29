export enum CheckType {
  CheckTypeUnknown = 'CheckTypeUnknown',
  CheckTypeVulnerability = 'CheckTypeVulnerability',
  CheckTypeMalware = 'CheckTypeMalware',
  CheckTypePopularity = 'CheckTypePopularity',
  CheckTypeMaintenance = 'CheckTypeMaintenance',
  CheckTypeSecurityScorecard = 'CheckTypeSecurityScorecard',
  CheckTypeLicense = 'CheckTypeLicense',
  CheckTypeOther = 'CheckTypeOther',
}

export enum VulnerabilitySeverity {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW',
}

export const VULNERABILITY_SEVERITY_LABELS: Record<VulnerabilitySeverity, string> = {
  [VulnerabilitySeverity.Critical]: 'Critical',
  [VulnerabilitySeverity.High]: 'High',
  [VulnerabilitySeverity.Medium]: 'Medium',
  [VulnerabilitySeverity.Low]: 'Low',
};

export const CHECK_TYPE_LABELS: Record<CheckType, string> = {
  [CheckType.CheckTypeUnknown]: 'Unknown',
  [CheckType.CheckTypeVulnerability]: 'Vulnerability',
  [CheckType.CheckTypeMalware]: 'Malware',
  [CheckType.CheckTypePopularity]: 'Popularity',
  [CheckType.CheckTypeMaintenance]: 'Maintenance',
  [CheckType.CheckTypeSecurityScorecard]: 'Security Scorecard',
  [CheckType.CheckTypeLicense]: 'License',
  [CheckType.CheckTypeOther]: 'Other',
};

export interface VulnerabilityOptions {
  severity: VulnerabilitySeverity[];
}

export interface Filter {
  name: string;
  value: string;
  check_type: CheckType;
  summary: string;
  description: string;
  references: string[];
  tags: string[];
  options?: {
    vulnerability?: VulnerabilityOptions;
  };
}

export interface FilterSuite {
  name: string;
  description: string;
  filters: Filter[];
  tags: string[];
} 