import { gql } from '@apollo/client';

export const GET_CARS_QUERY = gql`
  query GetCars($getCarsDto: GetCarsDto!) {
    getCars(getCarsDto: $getCarsDto) {
      id
      name
      brand {
        id
        name
        isDomestic
        brandFee
      }
      carFee
      created_at
      updated_at
    }
  }
`;

export const GET_CAR_QUERY = gql`
  query GetCar($getCarId: Float!) {
    getCar(id: $getCarId) {
      id
      name
      brand {
        id
        name
        isDomestic
        brandFee
      }
      carFee
      created_at
      updated_at
    }
  }
`;
