import { gql } from '@apollo/client';

/**
 * 고객목록 쿼리
 * - 고객 목록 호출
 */
export const GET_CUSTOMERS_QUERY = gql`
  query GetCustomers($signInDto: SignInDto!) {
    getCustomers {
      address
      birth
      created_at
      customer_group_id
      deleted_at
      email
      id
      job
      name
      phone
      status
      updated_at
      user_id
    }
  }
`;
