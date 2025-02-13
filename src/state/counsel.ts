import { TCounselFiltersStateType } from '@/types/counsel';
import { Counsel } from '@/types/graphql';
import { atom } from 'recoil';

export const selectedCounselState = atom<Counsel[]>({
  key: 'selectedCounselState',
  default: [],
});

export const selectedCounselHideWatchOptionsState = atom<string[]>({
  key: 'selectedCounselHideWatchOptionsState',
  default: [],
});

export const counselFiltersState = atom<TCounselFiltersStateType>({
  key: 'counselFiltersState',
  default: {
    statuses: [],
    groups: [],
    users: [],
  },
});
