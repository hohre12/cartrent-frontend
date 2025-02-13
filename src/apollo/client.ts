import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { authLink } from './authLink';
import errorLink from './errorLink';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_BASE_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
