import { TCounselList } from '@/types/counsel';
import { atom } from 'recoil';

export const selectedCounselState = atom<TCounselList[]>({
  key: 'selectedCounselState',
  default: [],
});

export const selectedCounselHideWatchOptionsState = atom<string[]>({
  key: 'selectedCounselHideWatchOptionsState',
  default: [],
});

export const selectedCounselIdxState = atom<number>({
  key: 'selectedCounselIdxState',
  default: undefined,
});
