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
