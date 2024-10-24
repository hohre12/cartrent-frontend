/* list */
export type TCustomerListRequest = {
  keyword?: string;
  offset: number;
  length: number;
};
export type TCustomerListResponse = {
  list: TCustomerList[];
  count: number;
};
export type TCustomerList = {
  userIdx: number;
  status: string;
  name: string;
  groupIdx: number;
  groupName: string;
  phone: string;
};
/* list */

/* detail */
export type TCustomerRequest = {
  userIdx: number;
};

export type TCustomerResponse = {
  address: string;
  birth: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  job: string;
  name: string;
  phone: string;
  status: string;
  updated_at: string;
};
/* detail */
