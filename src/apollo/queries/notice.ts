import { gql } from '@apollo/client';

export const GET_NOTICES_QUERY = gql`
  query GetNotices {
    getNotices {
      id
      title
      body
      author {
        id
        name
      }
      created_at
      deleted_at
      updated_at
    }
  }
`;

export const GET_NOTICE_QUERY = gql`
  query GetNotice($noticeId: Float!) {
    getNotice(noticeId: $noticeId) {
      id
      title
      author {
        id
        name
      }
      body
      created_at
      deleted_at
      updated_at
    }
  }
`;

export const GET_LATEST_NOTICE_QUERY = gql`
  query GetLatestNotice {
    getLatestNotice {
      id
      title
      body
      author {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;
