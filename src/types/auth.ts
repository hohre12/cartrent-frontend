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
  created_at: string;
  deleted_at: string;
  email?: string;
  id: number;
  name: string;
  password: string;
  updated_at?: string;
};

export type TCity = {
  id: number;
  name: string;
};
