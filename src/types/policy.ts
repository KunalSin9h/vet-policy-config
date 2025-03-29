export interface Filter {
  name: string;
  value: string;
  description?: string;
  enabled: boolean;
}

export interface FilterSuite {
  name: string;
  description: string;
  filters: Filter[];
}

export interface PolicyConfig {
  filterSuite: FilterSuite;
  presets: {
    [key: string]: FilterSuite;
  };
}

export type FilterCategory = 'vulnerabilities' | 'licenses' | 'maintenance' | 'security' | 'custom';

export interface PresetOption {
  name: string;
  description: string;
  category: FilterCategory;
} 