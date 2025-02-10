import { GET_USERS_QUERY } from '@/apollo/queries/user';
import { User } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetUsers = () => {
  return useQuery<{ getUsers: User[] }>(GET_USERS_QUERY);
};
