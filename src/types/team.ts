import { TUser } from './auth';

/* Mutation DTO */
export type CreateTeamDto = {
  name: string;
};
export type UpdateTeamDto = {
  teamId: number;
  name: string;
};
/* Mutation DTO */

export type TTeam = {
  created_at?: string;
  deleted_at?: string;
  id: number;
  name: string;
  updated_at?: string;
  userList: TUser[];
};
