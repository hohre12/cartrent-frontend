import { gql } from '@apollo/client';

/* Query */
/**
 * 상담 목록 쿼리
 * - 상담 목록 호출
 */
export const GET_COUNSELS_QUERY = gql`
  query GetCounsels($getCounselsDto: GetCounselsDto!) {
    getCounsels(getCounselsDto: $getCounselsDto) {
      context
      created_at
      customer {
        name
        phone
      }
      type
      status
      user {
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
  query GetCounsels($counselId: Float!) {
    getCounsel(counselId: $counselId) {
      id
      context
      status
      type
      image_url
      user_id
      customer_id
      created_at
      updated_at
      deleted_at
      customer {
        id
      }
      customerGroup {
        id
      }
      user {
        id
      }
    }
  }
`;
/* Query */
/* Mutation */
export const CREATE_COUNSEL_MUTATION = gql`
  mutation CreateCounsel($createCounselDto: CreateCounselDto!) {
    createCounsel(createCounselDto: $createCounselDto) {
      id
    }
  }
`;
/* Mutation */
