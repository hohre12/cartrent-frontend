import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from '@/apollo/mutations/user';
import {
  GET_FIRST_CONTRACT_USER_BY_MONTH,
  GET_FIRST_REVENUE_USER_BY_MONTH,
  GET_POSITIONS_QUERY,
  GET_USER_QUERY,
  GET_USERS_QUERY,
} from '@/apollo/queries/user';
import {
  CreateUserDto,
  GetRevenuesByUsersDto,
  Position,
  UpdateUserDto,
  UpdateUserInfoDto,
  User,
} from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetUsers = () => {
  return useQuery<{ getUsers: User[] }>(GET_USERS_QUERY, {
    fetchPolicy: 'network-only',
  });
};

export const useGetUser = (params: User['id']) => {
  return useQuery<{ getUser: User }, { userId: User['id'] }>(GET_USER_QUERY, {
    variables: { userId: params },
    skip: !params,
    fetchPolicy: 'network-only',
  });
};

export const useCreateUser = () => {
  const [createUserMutate] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [GET_USERS_QUERY, GET_USER_QUERY],
  });

  const createUser = async (params: CreateUserDto) => {
    if (!params) return;
    return createUserMutate({
      variables: { createUserDto: params },
    });
  };
  return { createUser };
};

export const useUpdateUser = () => {
  const [updateUserMutate] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [GET_USERS_QUERY, GET_USER_QUERY],
  });

  const updateUser = async (params: UpdateUserDto) => {
    if (!params) return;
    return updateUserMutate({
      variables: { updateUserDto: params },
    });
  };
  return { updateUser };
};

export const useDeleteUser = () => {
  const [deleteUserMutate] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [GET_USERS_QUERY],
  });

  const deleteUser = async (params: User['id']) => {
    if (!params) return;
    return deleteUserMutate({
      variables: { userId: params },
    });
  };
  return { deleteUser };
};

export const useGetPositions = () => {
  return useQuery<{ getPositions: Position[] }>(GET_POSITIONS_QUERY);
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
