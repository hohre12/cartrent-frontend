import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';
import LocalStorage from '@/utils/localStorage';
import { onError } from '@apollo/client/link/error';
import { refreshAccessToken } from './auth';
import { fromPromise } from '@apollo/client';

// GraphQL 요청 에러 처리용 errorLink
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          case 'NEED_LOGIN':
          case 'EXPIRESED_REFRESH_TOKEN':
            LocalStorage.removeItem(TOKEN_KEY);
            LocalStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.replace('/login');
            break;
          case 'EXPIRESED_ACCESS_TOKEN':
            return fromPromise(
              refreshAccessToken().then((accessToken) => {
                if (!accessToken) throw new Error('토큰 갱신 실패');
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    authorization: `Bearer ${accessToken}`,
                  },
                }));
                return forward(operation);
              }),
            ).flatMap((observable) => observable);
          default:
            console.error(`[GraphQL error]: ${err.message}`);
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError.message}`);
      // if (networkError.message.includes('Failed to fetch')) {
      //   alert('서버 연결이 원활하지 않습니다. 네트워크를 확인해주세요.');
      // }
    }
  },
);

// 기존 authLink와 httpLink를 연결할 수 있도록 ApolloLink.concat 사용 가능
export default errorLink;
