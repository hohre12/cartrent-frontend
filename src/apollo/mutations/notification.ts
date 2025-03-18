import { gql } from '@apollo/client';

/* Mutation */
export const READ_NOTIFICATION_MUTATION = gql`
  mutation ReadNotification($notificationId: Float!) {
    readNotification(notificationId: $notificationId) {
      id
    }
  }
`;

export const DELETE_NOTIFICATION_MUTATION = gql`
  mutation DeleteNotification($notificationId: Float!) {
    deleteNotification(notificationId: $notificationId)
  }
`;

export const READ_ALL_NOTIFICATION_MUTATION = gql`
  mutation ReadAllNotification {
    readAllNotification
  }
`;

export const DELETE_ALL_NOTIFICATION_MUTATION = gql`
  mutation DeleteAllNotification {
    deleteAllNotification
  }
`;
/* Mutation */
