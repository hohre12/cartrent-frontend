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
  userIdx: number;
  status: string;
  name: string;
  groupIdx: number;
  groupName: string;
  phone: string;
};
/* list */

/* detail */
export type TCounselRequest = {
  userIdx: number;
};

export type TCounselResponse = {
  userIdx: number;
  status: string;
  name: string;
  groupIdx: number;
  groupName: string;
  phone: string;
};
/* detail */
