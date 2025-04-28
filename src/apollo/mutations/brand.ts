import { gql } from '@apollo/client';

export const CREATE_BRAND_MUTATION = gql`
  mutation CreateBrand($createBrandDto: CreateBrandDto!) {
    createBrand(createBrandDto: $createBrandDto) {
      id
    }
  }
`;
export const UPDATE_BRAND_MUTATION = gql`
  mutation UpdateBrand($updateBrandDto: UpdateBrandDto!) {
    updateBrand(updateBrandDto: $updateBrandDto) {
      id
      name
    }
  }
`;
export const DELETE_BRAND_MUTATION = gql`
  mutation DeleteBrand($id: Float!) {
    deleteBrand(id: $id)
  }
`;
