import { atom } from 'recoil';

export const selectedUserHideWatchOptionsState = atom<string[]>({
  key: 'selectedUserHideWatchOptionsState',
  default: [],
});
