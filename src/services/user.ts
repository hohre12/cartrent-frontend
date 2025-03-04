import {
  GET_FIRST_CONTRACT_USER_BY_MONTH,
  GET_FIRST_REVENUE_USER_BY_MONTH,
  GET_USERS_QUERY,
} from '@/apollo/queries/user';
import { GetRevenuesByUsersDto, User } from '@/types/graphql';
import { useQuery } from '@apollo/client';

export const useGetUsers = () => {
  return useQuery<{ getUsers: User[] }>(GET_USERS_QUERY);
};

export const useGetFirstContractUserByMonth = (
  params: GetRevenuesByUsersDto,
) => {
  return useQuery<
    { getFirstContractUserByMonth: User },
    { getFirstContractUserByMonthDto: GetRevenuesByUsersDto }
  >(GET_FIRST_CONTRACT_USER_BY_MONTH, {
    variables: { getFirstContractUserByMonthDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useGetFirstRevenueUserByMonth = (
  params: GetRevenuesByUsersDto,
) => {
  return useQuery<
    { getFirstRevenueUserByMonth: User },
    { getFirstRevenueUserByMonthDto: GetRevenuesByUsersDto }
  >(GET_FIRST_REVENUE_USER_BY_MONTH, {
    variables: { getFirstRevenueUserByMonthDto: params },
    fetchPolicy: 'network-only',
  });
};
