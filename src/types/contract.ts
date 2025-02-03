import { TCity } from './auth';
import { TUser } from './user';
import { TFilterList } from './common';
import { TCustomer } from './customer';

/* Query DTO */
export type GetContractsDto = {
  search?: string;
};
/* Query DTO */

/* Mutation DTO */
export type UpdateContractDto = {
  contractId: number;
  context: string;
  carModelId?: number;
  carOptionIds: number[];
  color?: string;
  cityId?: number;
  userId?: number;
  contractAt?: string;
  shippingAt?: string;
  extraPrice?: number;
  bank?: string;
  contractType?: string;
  isVATSupport?: boolean;
  interChangeFee?: number;
  feeRate?: string;
  fee?: number;
};
export type UpdateContractStatusDto = {
  contractId: number;
  status: string;
};
/* Mutation DTO */

/* list */
export type TContract = {
  agreedMileage?: string; // 약정 거리
  bank?: string; // 은행
  branch?: string; // 지점
  branchFee?: number; // 지점 수수료
  carName?: string; // 차종
  carOption?: string; // 차 옵션
  carPrice?: number; // 차량 가격
  cashAssistance?: string; // 현금 지원
  city: TCity;
  city_id?: number;
  collateralRate?: string; // 담보율
  collateralType?: string; // 담보 종류
  context?: string; // 계약 내용
  contractPeriod?: string; // 약정 기간
  contractType?: string; // 계약 타입
  contract_at?: string; // 계약 일
  created_at?: string;
  customer: TCustomer;
  customer_id?: number;
  deleted_at?: string;
  extraPrice?: number; // 이외 추가 금액
  fee?: number; // 수수료
  feeRate?: string; // 수수료 비율
  financialCompany?: string; // 금융사
  id: number;
  incomeEarner?: string; // 소득자
  innerColor?: string; // 내부 색상
  insuranceAge?: string; // 보험 연령
  interChangeFee?: number; // 정산 수수료
  isOrdering?: boolean; // 발주 여부
  isVATSupport?: boolean; // 부가세 지원 여부
  monthlyPayment?: string; // 월 납입료
  netIncome?: number; // 순수익
  object?: string; // 대물
  outerColor?: string; // 외부 색상
  product?: string; // 상품
  promotion?: string; // 프로모션
  service1?: string; // 서비스 1
  service2?: string; // 서비스 2
  service3?: string; // 서비스 3
  serviceBody1?: string; // 서비스 내용 1
  serviceBody2?: string; // 서비스 내용 2
  serviceBody3?: string; // 서비스 내용 3
  shippingDate?: string; // 출고 일
  shippingMethod?: string; //출고 방식
  status: string; // 계약 상태
  supportAmounts: TSupportAmount;
  supportDetails?: string; // 지원 내용
  surtax?: string; // 부가세
  totalExpenditure?: number; // 총지출
  totalFee?: number; // 총 수수료
  totalPrice?: number; // 총 계약 금액
  updated_at?: string;
  user: TUser;
  user_id?: number;
};

export type TSupportAmount = {
  amount: number; // 지원 금액
  body1: string;
  body2: string;
  body3: string;
  body4: string;
  contract_id: number;
  created_at?: string;
  deleted_at?: string;
  id: number;
  updated_at?: string;
};

/* front handle type */
export type TContractFiltersStateType = {
  status: TFilterList<number>[];
  createdAt:
    | {
        createdAtFrom: string;
        createdAtTo: string;
      }
    | undefined;
};
/* front handle type */
