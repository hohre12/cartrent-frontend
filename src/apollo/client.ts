import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { authLink } from './authLink';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_BASE_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
