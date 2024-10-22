/* list */
export type TCounselListRequest = {
  keyword?: string;
  offset: number;
  length: number;
};
export type TCounselListResponse = {
  list: TCounselList[];
  count: number;
};
export type TCounselList = {
  created_at: string;
  name: string;
  phone: string;
  counselType: string;
  result: string;
  counselCustomer: string;
  counselName: string;
  counselContent: string;
  address: string;
  id: number;
  customerGroup: string;
  product: string;
  anotherPhone: string;
  carType: string;
  type: string;
  date: string;
  percent: string;
  customerType: string;
  option: string;
  isIng: string;
  etc: string;
  company: string;
};
/* list */

/* detail */
export type TCounselRequest = {
  userIdx: number;
};

export type TCounselResponse = {
  created_at: string;
  name: string;
  phone: string;
  counselType: string;
  result: string;
  counselCustomer: string;
  counselName: string;
  counselContent: string;
  address: string;
  id: number;
  customerGroup: string;
  product: string;
  anotherPhone: string;
  carType: string;
  type: string;
  date: string;
  percent: string;
  customerType: string;
  option: string;
  isIng: string;
  etc: string;
  company: string;
};
/* detail */
