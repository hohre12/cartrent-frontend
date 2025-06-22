import { TTaxFiltersStateType } from '@/types/tax';
import moment from 'moment';
import { atom } from 'recoil';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('M');

export const taxFiltersState = atom<TTaxFiltersStateType>({
  key: 'taxFiltersState',
  default: {
    year: currentYear,
    month: currentMonth,
  },
});
