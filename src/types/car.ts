/* Query DTO */
export type GetCarsDto = {
  search?: string;
};
export type GetCarModelsDto = {
  carId?: number;
  search: string;
};
export type GetCarOptionsDto = {
  carModelId?: number;
  search?: string;
};
/* Query DTO */
/* Mutation DTO */
export type CreateCarDto = {
  name: string;
};
export type UpdateCarDto = {
  carId: number;
  name: string;
};
export type CreateCarModelDto = {
  carId: number;
  name: string;
  basePrice: number;
};
export type UpdateCarModelDto = {
  carModelId: number;
  carId: number;
  name: string;
  basePrice: number;
};
export type CreateCarOptionDto = {
  carModelId: number;
  name: string;
  price: number;
};
export type UpdateCarOptionDto = {
  carOptionId: number;
  carModelId: number;
  name: string;
  price: number;
};
/* Mutation DTO */

export type TCar = {
  id: number;
  name: string;
};
export type TCarModel = {
  car: TCar;
  car_id?: number;
  id: number;
  name: string;
  price: number;
};
export type TCarOption = {
  car_model_id?: number;
  id: number;
  name: string;
  price: number;
};
