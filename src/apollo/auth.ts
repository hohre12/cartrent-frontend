import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';
import LocalStorage from '@/utils/localStorage';
import client from './client';
import { REFRESH_MUTATION } from './mutations/auth';

export const refreshAccessToken = async () => {
  const refreshToken = LocalStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    LocalStorage.removeItem(TOKEN_KEY);
    LocalStorage.removeItem(REFRESH_TOKEN_KEY);
    window.location.replace('/login');
    return null;
  }
  try {
    const { data } = await client.mutate({
      mutation: REFRESH_MUTATION,
      variables: { refreshToken },
    });

    if (data?.refresh) {
      const { accessToken } = data.refresh;
      LocalStorage.setItem(TOKEN_KEY, accessToken);
      return accessToken;
    }
  } catch (e) {
    console.warn('토큰 갱신 실패', e);
    LocalStorage.removeItem(TOKEN_KEY);
    LocalStorage.removeItem(REFRESH_TOKEN_KEY);
    window.location.replace('/login');
    return null;
  }
};
