import { TCustomerFiltersStateType, TCustomer } from '@/types/customer';
import { atom } from 'recoil';

export const selectedCustomerIdxState = atom<number>({
  key: 'selectedCustomerIdxState',
  default: undefined,
});

export const selectedCustomerState = atom<TCustomer[]>({
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
    group: [],
    createdAt: undefined,
  },
});
