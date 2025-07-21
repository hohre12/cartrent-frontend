import {
  CREATE_CAR_MUTATION,
  DELETE_CAR_MUTATION,
  UPDATE_CAR_MUTATION,
} from '@/apollo/mutations/car';
import { GET_CARS_QUERY, GET_CAR_QUERY } from '@/apollo/queries/car';
import { Car, CreateCarDto, GetCarsDto, UpdateCarDto } from '@/types/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const useGetCars = (params: GetCarsDto) => {
  return useQuery<{ getCars: Car[] }, { getCarsDto: GetCarsDto }>(
    GET_CARS_QUERY,
    {
      variables: { getCarsDto: params },
      fetchPolicy: 'network-only',
      skip: !params.brandId,
    },
  );
};

export const useGetCar = (params: Car['id']) => {
  return useQuery<{ getCar: Car }, { getCarId: Car['id'] }>(GET_CAR_QUERY, {
    variables: { getCarId: params },
    skip: !params,
    fetchPolicy: 'network-only',
  });
};

export const useCreateCar = () => {
  const [createCarMutate] = useMutation(CREATE_CAR_MUTATION, {
    refetchQueries: [GET_CARS_QUERY, 'GetCars'],
  });

  const createCar = async (params: CreateCarDto) => {
    if (!params) return;
    return createCarMutate({
      variables: { createCarDto: params },
    });
  };
  return { createCar };
};

export const useUpdateCar = () => {
  const [updateCarMutate] = useMutation(UPDATE_CAR_MUTATION, {
    refetchQueries: [GET_CARS_QUERY, GET_CAR_QUERY],
  });

  const updateCar = async (params: UpdateCarDto) => {
    if (!params) return;
    return updateCarMutate({
      variables: { updateCarDto: params },
    });
  };
  return { updateCar };
};

export const useDeleteCar = () => {
  const [deleteCarMutate] = useMutation(DELETE_CAR_MUTATION, {
    refetchQueries: [GET_CARS_QUERY],
  });

  const deleteCar = async (params: Car['id']) => {
    if (!params) return;
    return deleteCarMutate({
      variables: { id: params },
    });
  };
  return { deleteCar };
};
