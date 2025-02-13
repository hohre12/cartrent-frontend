import { TFilterList } from './common';

/* front handle type */
export type TCounselFiltersStateType = {
  statuses: TFilterList<number>[];
  groups: TFilterList<number>[];
  users: TFilterList<number>[];
};
/* front handle type */
