import { TConfirm, TToastList } from '@/types/common';
import { atom } from 'recoil';

export const toastListState = atom<TToastList>({
  key: 'toastListState',
  default: [],
});

export const confirmState = atom<TConfirm>({
  key: 'confirmState',
  default: {
    isOpen: false,
    confirmVariant: 'gray',
  },
});
