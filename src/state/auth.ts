import { atom, AtomEffect } from 'recoil';
// import { recoilPersist } from 'recoil-persist';
import LocalStorage from '../utils/localStorage';
import { setAuth } from '../services/api';
import { TOKEN_KEY } from '../constants/common';

// const { persistAtom } = recoilPersist({
// key: 'user',
// storage: localStorage,
// });

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