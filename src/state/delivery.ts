import { TDeliveryFiltersStateType } from '@/types/delivery';
import moment from 'moment';
import { atom } from 'recoil';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('M');

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
    year: currentYear,
    month: currentMonth,
  },
});
