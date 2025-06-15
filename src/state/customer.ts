import { TCustomerFiltersStateType } from '@/types/customer';
import { Customer, CustomerSortDirectionType } from '@/types/graphql';
import { atom } from 'recoil';

export const selectedCustomerIdxState = atom<number>({
  key: 'selectedCustomerIdxState',
  default: undefined,
});

export const selectedCustomerState = atom<Customer[]>({
  key: 'selectedCustomerState',
  default: [],
});

export const selectedCustomerHideWatchOptionsState = atom<string[]>({
  key: 'selectedCustomerHideWatchOptionsState',
  default: [],
});

export const selectedCustomerSortState = atom<{
  sortKey: 'memo' | 'created_at' | 'counselAt';
  sortDirection: CustomerSortDirectionType;
}>({
  key: 'selectedCustomerSortState',
  default: {
    sortKey: 'memo',
    sortDirection: CustomerSortDirectionType.Desc,
  },
});

export const customerFiltersState = atom<TCustomerFiltersStateType>({
  key: 'customerFiltersState',
  default: {
    groups: [],
    grades: [],
    users: [],
  },
});
