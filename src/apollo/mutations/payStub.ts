import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_PAY_STUB_MUTATION = gql`
  mutation CreatePayStub($createPayStubDto: CreatePayStubDto!) {
    createPayStub(createPayStubDto: $createPayStubDto)
  }
`;
/* Mutation */
