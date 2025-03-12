import { TAdjustmentFiltersStateType } from '@/types/adjustment';
import moment from 'moment';
import { atom } from 'recoil';

const currentYear = moment().format('YYYY');
const currentMonth = moment().format('M');

export const selectedAdjustmentHideWatchOptionsState = atom<string[]>({
  key: 'selectedAdjustmentHideWatchOptionsState',
  default: [],
});

export const adjustmentFiltersState = atom<TAdjustmentFiltersStateType>({
  key: 'adjustmentFiltersState',
  default: {
    year: currentYear,
    month: currentMonth,
    users: [],
  },
});
