import { atom, AtomEffect } from 'recoil';
// import { recoilPersist } from 'recoil-persist';
import LocalStorage from '../utils/localStorage';
import { setAuth } from '../services/api';
import { TOKEN_KEY } from '../constants/common';
import { recoilPersist } from 'recoil-persist';
import { User } from '@/types/graphql';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const tokenEffect: (key: string) => AtomEffect<string | null> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = LocalStorage.getItem(key);
    if (savedValue != null) {
      setSelf(savedValue);
    }

    onSet((newValue, _, isReset) => {
      if (isReset || newValue == null) return LocalStorage.removeItem(key);
      setAuth(newValue);
      return LocalStorage.setItem(key, newValue);
    });
  };

export const tokenState = atom<string | null>({
  key: TOKEN_KEY,
  default: null,
  effects: [tokenEffect(TOKEN_KEY)],
});
