import { TFilterList } from './common';
import { TCustomerGroup, TCustomerResponse } from './customer';

/* list */
export type TCounselListRequest = {
  search?: string;
  offset: number;
  length: number;
};
export type TCounselListResponse = {
  list: TCounselList[];
  count: number;
};
export type TCounselList = {
  context?: string; // 내용
  created_at?: string; // 상담일시
  customer?: TCustomerResponse; // 고객명
  customerGroup?: TCustomerGroup; // 고객그룹
  customer_id?: TCustomerResponse['id'];
  deleted_at?: string;
  id: number; // 상담 id
  image_url?: string; // 상담 image
  status?: string; // 상담 상태
  type?: string; // 상담 유형
  updated_at?: string; // 마지막 업데이트 일시
  user_id?: number; // 고객 id
};
// export type TCounselList = {
//   created_at: string;
//   name: string;
//   phone: string;
//   counselType: string;
//   result: string;
//   counselCustomer: string;
//   counselName: string;
//   counselContent: string;
//   address: string;
//   id: number;
//   customerGroup: string;
//   product: string;
//   anotherPhone: string;
//   carType: string;
//   type: string;
//   date: string;
//   percent: string;
//   customerType: string;
//   option: string;
//   isIng: string;
//   etc: string;
//   company: string;
// };
/* list */

/* detail */
export type TCounselRequest = {
  userIdx: number;
};

export type TCounselResponse = {
  context?: string; // 내용
  created_at?: string; // 상담일시
  customer?: TCustomerResponse; // 고객명
  customerGroup?: TCustomerGroup; // 고객그룹
  customer_id?: TCustomerResponse['id'];
  deleted_at?: string;
  id: number; // 상담 id
  image_url?: string; // 상담 image
  status?: string; // 상담 상태
  type?: string; // 상담 유형
  updated_at?: string; // 마지막 업데이트 일시
  user_id?: number; // 고객 id
};
/* detail */

/* front handle type */
export type TCounselFiltersStateType = {
  // 상담자
  type: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
