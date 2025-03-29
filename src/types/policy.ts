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

export interface Filter {
  name: string;
  value: string;
  check_type: CheckType;
  summary: string;
  description: string;
  references: string[];
  tags: string[];
}

export interface FilterSuite {
  name: string;
  description: string;
  filters: Filter[];
  tags: string[];
} 