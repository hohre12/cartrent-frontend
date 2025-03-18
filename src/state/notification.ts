import { atom } from 'recoil';

export const notificationIsNewState = atom<boolean>({
  key: 'notificationIsNewState',
  default: false,
});
