import {
  DELETE_ALL_NOTIFICATION_MUTATION,
  DELETE_NOTIFICATION_MUTATION,
  READ_ALL_NOTIFICATION_MUTATION,
  READ_NOTIFICATION_MUTATION,
} from '@/apollo/mutations/notification';
import { GET_NOTIFICATIONS_QUERY } from '@/apollo/queries/notification';
import { Notification } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

// export const useGetNotifications = (params: GetNotificationsDto) => {
//   return useQuery<
//     { getNotifications: Notification[] },
//     { getNotificationsDto: GetNotificationsDto }
//   >(GET_NOTIFICATIONS_QUERY, {
//     variables: { getNotificationsDto: params },
//     fetchPolicy: 'network-only',
//   });
// };

export const useGetNotifications = () => {
  return useQuery<{
    getNotifications: {
      isNewNotificationCount: number;
      count: number;
      notifications: Notification[];
    };
  }>(GET_NOTIFICATIONS_QUERY, {
    fetchPolicy: 'network-only',
  });
};

export const useGetNotificationIsNew = () => {
  //   const [getNotificationIsNewMutate] = useMutation(
  //     GET_NOTIFICATION_IS_NEW_MUTATION,
  //   );
  //   const getNotificationIsNew = async () => {
  //     return getNotificationIsNewMutate();
  //   };
  //   return { getNotificationIsNew };
};

export const useReadNotification = () => {
  const [readNotificationMutate] = useMutation(READ_NOTIFICATION_MUTATION, {
    refetchQueries: [
      GET_NOTIFICATIONS_QUERY,
      // GET_NOTIFICATION_IS_NEW_MUTATION
    ],
  });
  const readNotification = async (params: Notification['id']) => {
    if (!params) return;
    return readNotificationMutate({
      variables: { readNotificationDto: params },
    });
  };
  return { readNotification };
};

export const useReadAllNotification = () => {
  const [readAllNotificationMutate] = useMutation(
    READ_ALL_NOTIFICATION_MUTATION,
    {
      refetchQueries: [
        GET_NOTIFICATIONS_QUERY,
        // GET_NOTIFICATION_IS_NEW_MUTATION,
      ],
    },
  );
  const readAllNotification = async () => {
    return readAllNotificationMutate();
  };
  return { readAllNotification };
};

export const useDeleteNotification = () => {
  const [deleteNotificationMutate] = useMutation(DELETE_NOTIFICATION_MUTATION, {
    refetchQueries: [
      GET_NOTIFICATIONS_QUERY,
      // GET_NOTIFICATION_IS_NEW_MUTATION
    ],
  });
  const deleteNotification = async (params: Notification['id']) => {
    if (!params) return;
    return deleteNotificationMutate({
      variables: { deleteNotificationDto: params },
    });
  };
  return { deleteNotification };
};

export const useDeleteAllNotification = () => {
  const [deleteAllNotificationMutate] = useMutation(
    DELETE_ALL_NOTIFICATION_MUTATION,
    {
      refetchQueries: [
        GET_NOTIFICATIONS_QUERY,
        // GET_NOTIFICATION_IS_NEW_MUTATION,
      ],
    },
  );
  const deleteAllNotification = async () => {
    return deleteAllNotificationMutate();
  };
  return { deleteAllNotification };
};
