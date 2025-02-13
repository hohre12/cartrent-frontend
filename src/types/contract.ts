import { TFilterList } from './common';

/* front handle type */
export type TContractFiltersStateType = {
  shippingMethods: TFilterList<number>[];
  users: TFilterList<number>[];
  startContractAtYearMonth: string;
  endContractAtYearMonth: string;
};
/* front handle type */
