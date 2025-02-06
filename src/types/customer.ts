import { TFilterList } from './common';

/* front handle type */
export type TCustomerFiltersStateType = {
  group: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
