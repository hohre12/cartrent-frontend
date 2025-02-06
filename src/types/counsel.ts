import { TFilterList } from './common';

/* front handle type */
export type TCounselFiltersStateType = {
  // 상담자
  type: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
