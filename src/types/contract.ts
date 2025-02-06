import { TFilterList } from './common';

/* front handle type */
export type TContractFiltersStateType = {
  status: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
