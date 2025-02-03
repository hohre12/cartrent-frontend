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

export type TCity = {
  id: number;
  name: string; // 도시 이름
};
