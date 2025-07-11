import { gql } from '@apollo/client';

/* Query */
/**
 * 상담 목록 쿼리
 * - 상담 목록 호출
 */
export const GET_COUNSELS_QUERY = gql`
  query GetCounsels($getCounselsDto: GetCounselsDto!) {
    getCounsels(getCounselsDto: $getCounselsDto) {
      data {
        id
        status
        counselAt
        context
        customer {
          id
          name
          phone
          customerGroup {
            id
            name
          }
          customerGrade {
            id
            name
          }
          customerStatus {
            id
            status
          }
        }
        contract {
          id
          car {
            id
            name
            brand {
              id
              name
            }
          }
          division {
            id
            name
          }
        }
        user {
          id
          name
        }
      }
      totalCount
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
      status
      counselAt
      context
      customer {
        id
        name
        phone
        customerGroup {
          id
          name
        }
        customerGrade {
          id
          name
        }
        customerStatus {
          id
          status
        }
      }
      contract {
        id
        car {
          id
          name
          brand {
            id
            name
          }
        }
        division {
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
/* Query */
