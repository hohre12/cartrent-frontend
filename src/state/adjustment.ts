import { TAdjustmentFiltersStateType } from '@/types/adjustment';
import { Adjustment } from '@/types/graphql';
import { atom } from 'recoil';

export const selectedAdjustmentHideWatchOptionsState = atom<string[]>({
  key: 'selectedAdjustmentHideWatchOptionsState',
  default: [],
});

export const adjustmentFiltersState = atom<TAdjustmentFiltersStateType>({
  key: 'adjustmentFiltersState',
  default: {
    year: '',
    month: '',
    users: [],
  },
});
