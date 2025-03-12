import { TPayStubFiltersStateType } from '@/types/payStub';
import moment from 'moment';
import { atom } from 'recoil';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('M');

export const selectedPayStubHideWatchOptionsState = atom<string[]>({
  key: 'selectedPayStubHideWatchOptionsState',
  default: [],
});

export const payStubFiltersState = atom<TPayStubFiltersStateType>({
  key: 'payStubFiltersState',
  default: {
    year: currentYear,
    month: currentMonth,
    userIds: [],
    positionIds: [],
  },
});
