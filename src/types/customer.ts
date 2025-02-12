import { TFilterList } from './common';

/* front handle type */
export type TCustomerFiltersStateType = {
  groups: TFilterList<number>[];
  grades: TFilterList<number>[];
  users: TFilterList<number>[];
};
/* front handle type */
