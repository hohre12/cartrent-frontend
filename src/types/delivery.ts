import { TFilterList } from './common';

/* front handle type */
export type TDeliveryFiltersStateType = {
  users: TFilterList<number>[];
  financialCompanies: TFilterList<number>[];
  divisions: TFilterList<number>[];
  startDeliveryAtYearMonth: string;
  endDeliveryAtYearMonth: string;
};
/* front handle type */
