import { gql } from '@apollo/client';

/**
 * 알림 목록 쿼리
 * - 알림 목록 호출
 */
export const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications {
    getNotifications {
      isNewNotificationCount
      notifications {
        id
        title
        content
        isRead
        type
        created_at
      }
    }
  }
`;
