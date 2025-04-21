import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_NOTICE_MUTATION = gql`
  mutation CreateNotice($createNoticeDto: CreateNoticeDto!) {
    createNotice(createNoticeDto: $createNoticeDto) {
      id
    }
  }
`;
export const UPDATE_NOTICE_MUTATION = gql`
  mutation UpdateNotice($updateNoticeDto: UpdateNoticeDto!) {
    updateNotice(updateNoticeDto: $updateNoticeDto) {
      id
    }
  }
`;
export const DELETE_NOTICE_MUTATION = gql`
  mutation DeleteNotice($noticeId: Float!) {
    deleteNotice(noticeId: $noticeId)
  }
`;
/* Mutation */
