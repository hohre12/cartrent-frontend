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
