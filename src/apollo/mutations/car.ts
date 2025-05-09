import { gql } from '@apollo/client';

export const CREATE_CAR_MUTATION = gql`
  mutation CreateCar($createCarDto: CreateCarDto!) {
    createCar(createCarDto: $createCarDto) {
      id
    }
  }
`;
export const UPDATE_CAR_MUTATION = gql`
  mutation UpdateCar($updateCarDto: UpdateCarDto!) {
    updateCar(updateCarDto: $updateCarDto) {
      id
      name
    }
  }
`;
export const DELETE_CAR_MUTATION = gql`
  mutation DeleteCar($id: Float!) {
    deleteCar(id: $id)
  }
`;
