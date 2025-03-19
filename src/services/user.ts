import {
  CREATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  UPDATE_USER_MUTATION,
} from '@/apollo/mutations/user';
import {
  GET_POSITIONS_QUERY,
  GET_TOP_FIVE_DELIVERY_USERS_BY_MONTH,
  GET_TOP_FIVE_TOTAL_FEE_DELIVERY_USERS_BY_MONTH,
  GET_USER_QUERY,
  GET_USERS_QUERY,
} from '@/apollo/queries/user';
import {
  CreateUserDto,
  GetDashBoardByUsersDto,
  MonthlyTopFiveUser,
  Position,
  UpdateUserDto,
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

  const deleteUser = async (params: {
    deleteUserId: User['id'];
    targetUserId: User['id'];
  }) => {
    if (!params) return;
    return deleteUserMutate({
      variables: {
        deleteUserId: params.deleteUserId,
        targetUserId: params.targetUserId,
      },
    });
  };
  return { deleteUser };
};

export const useGetPositions = () => {
  return useQuery<{ getPositions: Position[] }>(GET_POSITIONS_QUERY);
};

export const useGetTopFiveDeliveryUsersByMonth = (
  params: GetDashBoardByUsersDto,
) => {
  return useQuery<
    { getTopFiveDeliveryUsersByMonth: MonthlyTopFiveUser[] },
    { getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto }
  >(GET_TOP_FIVE_DELIVERY_USERS_BY_MONTH, {
    variables: { getTopFiveDeliveryUsersByMonthDto: params },
    fetchPolicy: 'network-only',
  });
};

export const useGetTopFiveTotalFeeDeliveryUsersByMonth = (
  params: GetDashBoardByUsersDto,
) => {
  return useQuery<
    { getTopFiveTotalFeeDeliveryUsersByMonth: MonthlyTopFiveUser[] },
    { getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto }
  >(GET_TOP_FIVE_TOTAL_FEE_DELIVERY_USERS_BY_MONTH, {
    variables: { getTopFiveTotalFeeDeliveryUsersByMonthDto: params },
    fetchPolicy: 'network-only',
  });
};
