import { gql } from '@apollo/client';

/**
 * 알림 목록 쿼리
 * - 알림 목록 호출
 */
export const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications($offset: Float!, $limit: Float!) {
    getNotifications(offset: $offset, limit: $limit) {
      count
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

/**
 * 신규 알림 체크 쿼리
 * - 신규 알림 체크
 */
export const CHECK_NEW_NOTIFICATIONS_QUERY = gql`
  query CheckNewNotifications {
    checkNewNotifications
  }
`;
