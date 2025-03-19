import {
  DELETE_ALL_NOTIFICATION_MUTATION,
  DELETE_NOTIFICATION_MUTATION,
  READ_ALL_NOTIFICATION_MUTATION,
  READ_NOTIFICATION_MUTATION,
} from '@/apollo/mutations/notification';
import {
  CHECK_NEW_NOTIFICATIONS_QUERY,
  GET_NOTIFICATIONS_QUERY,
} from '@/apollo/queries/notification';
import { TOKEN_KEY } from '@/constants/common';
import { Notification } from '@/types/graphql';
import LocalStorage from '@/utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';

export const useGetNotifications = (params: {
  offset: number;
  limit: number;
}) => {
  return useQuery<
    {
      getNotifications: {
        isNewNotificationCount: number;
        count: number;
        notifications: Notification[];
      };
    },
    { offset: number; limit: number }
  >(GET_NOTIFICATIONS_QUERY, {
    variables: params,
    fetchPolicy: 'network-only',
  });
};

export const useCheckNewNotifications = () => {
  const token = LocalStorage.getItem(TOKEN_KEY);
  return useQuery<{ checkNewNotifications: boolean; isToken: boolean }>(
    CHECK_NEW_NOTIFICATIONS_QUERY,
    {
      fetchPolicy: 'network-only',
      skip: !token,
    },
  );
};

export const useReadNotification = () => {
  const [readNotificationMutate] = useMutation(READ_NOTIFICATION_MUTATION, {
    refetchQueries: [GET_NOTIFICATIONS_QUERY, CHECK_NEW_NOTIFICATIONS_QUERY],
  });
  const readNotification = async (params: Notification['id']) => {
    if (!params) return;
    return readNotificationMutate({
      variables: { notificationId: params },
    });
  };
  return { readNotification };
};

export const useReadAllNotification = () => {
  const [readAllNotificationMutate] = useMutation(
    READ_ALL_NOTIFICATION_MUTATION,
    {
      refetchQueries: [GET_NOTIFICATIONS_QUERY, CHECK_NEW_NOTIFICATIONS_QUERY],
    },
  );
  const readAllNotification = async () => {
    return readAllNotificationMutate();
  };
  return { readAllNotification };
};

export const useDeleteNotification = () => {
  const [deleteNotificationMutate] = useMutation(DELETE_NOTIFICATION_MUTATION, {
    refetchQueries: [GET_NOTIFICATIONS_QUERY, CHECK_NEW_NOTIFICATIONS_QUERY],
  });
  const deleteNotification = async (params: Notification['id']) => {
    if (!params) return;
    return deleteNotificationMutate({
      variables: { notificationId: params },
    });
  };
  return { deleteNotification };
};

export const useDeleteAllNotification = () => {
  const [deleteAllNotificationMutate] = useMutation(
    DELETE_ALL_NOTIFICATION_MUTATION,
    {
      refetchQueries: [GET_NOTIFICATIONS_QUERY, CHECK_NEW_NOTIFICATIONS_QUERY],
    },
  );
  const deleteAllNotification = async () => {
    return deleteAllNotificationMutate();
  };
  return { deleteAllNotification };
};
