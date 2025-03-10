import { TFilterList } from './common';

/* front handle type */
export type TPayStubFiltersStateType = {
  year: string;
  month: string;
  userIds: TFilterList<number>[];
  positionIds: TFilterList<number>[];
};
/* front handle type */
