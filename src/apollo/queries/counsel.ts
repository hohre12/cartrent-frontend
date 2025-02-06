import { gql } from '@apollo/client';

/* Query */
/**
 * 상담 목록 쿼리
 * - 상담 목록 호출
 */
export const GET_COUNSELS_QUERY = gql`
  query GetCounsels($getCounselsDto: GetCounselsDto!) {
    getCounsels(getCounselsDto: $getCounselsDto) {
      id
      context
      status
      counselAt
      customer {
        id
        name
        phone
        product
        division
        customerGrade {
          id
          name
        }
        customerGroup {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`;

/**
 * 상담 상세 쿼리
 * - 상담 상세 호출
 */
export const GET_COUNSEL_QUERY = gql`
  query GetCounsel($counselId: Float!) {
    getCounsel(counselId: $counselId) {
      id
      context
      status
      image_url
      user_id
      customer_id
      created_at
      updated_at
      deleted_at
      customer {
        id
        name
      }
      customerGroup {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;
/* Query */
