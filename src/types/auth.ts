/* Query DTO */
export type GetCitiesDto = {
  search?: string;
};
/* Query DTO */

/* Mutation DTO */
export type SignInDto = {
  email: string;
  password: string;
};
export type SignUpDto = {
  name: string;
  email: string;
  password: string;
  positionId: number;
  teamId?: number;
};
export type CreateCityDto = {
  name: string;
};
export type UpdateCityDto = {
  name: string;
  cityId: number;
};
/* Mutation DTO */

export type TUser = {
  id: number;
  name: string;
  positionId?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type TAuthIdLoginRequest = {
  id: string;
  password: string;
};
