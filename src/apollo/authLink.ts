import { TOKEN_KEY } from '@/constants/common';
import { tokenState } from '@/state/auth';
import LocalStorage from '@/utils/localStorage';
import { setContext } from '@apollo/client/link/context';
import { useRecoilValue } from 'recoil';

export const authLink = setContext((_, { headers }) => {
  const token = LocalStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
