import { TCustomerList } from '@/types/customer';
import { atom } from 'recoil';

export const selectedCustomerState = atom<TCustomerList[]>({
  key: 'selectedCustomerState',
  default: [],
});

export const selectedCustomerHideWatchOptionsState = atom<string[]>({
  key: 'selectedCustomerHideWatchOptionsState',
  default: [],
});
