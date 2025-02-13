import { TCustomerFiltersStateType } from '@/types/customer';
import { Customer } from '@/types/graphql';
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

export const customerFiltersState = atom<TCustomerFiltersStateType>({
  key: 'customerFiltersState',
  default: {
    groups: [],
    grades: [],
    users: [],
  },
});
