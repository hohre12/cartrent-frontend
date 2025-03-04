import { TDeliveryFiltersStateType } from '@/types/delivery';
import { atom } from 'recoil';

export const selectedDeliveryHideWatchOptionsState = atom<string[]>({
  key: 'selectedDeliveryHideWatchOptionsState',
  default: [],
});

export const deliveryFiltersState = atom<TDeliveryFiltersStateType>({
  key: 'deliveryFiltersState',
  default: {
    users: [],
    financialCompanies: [],
    divisions: [],
    startDeliveryAtYearMonth: '',
    endDeliveryAtYearMonth: '',
  },
});
