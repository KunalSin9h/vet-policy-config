import { Filter } from '../../types/policy';

export interface FilterTypeProps {
  filter: Filter;
  onUpdate: (updatedFilter: Filter) => void;
} 