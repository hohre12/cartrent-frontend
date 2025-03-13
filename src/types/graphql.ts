import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AdditionalIncentive = {
  /** 추가 수당 */
  additionalIncentive: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 추가 수당 받은 월 */
  month: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  /** 추가 수당 받은 년도 */
  year: Scalars['String']['output'];
};

export type Adjustment = {
  additionalIncentive?: Maybe<AdditionalIncentive>;
  additionalIncentiveId?: Maybe<Scalars['Int']['output']>;
  /** 기타 수당 / 팀장급 이상 팀 전체 매출의 인센티브 */
  etcIncentive: Scalars['Int']['output'];
  /** 달 */
  month: Scalars['String']['output'];
  /** 계약 총 건수 */
  totalCountContract: Scalars['Int']['output'];
  /** 출고 총 건수 */
  totalCountDelivery: Scalars['Int']['output'];
  /** 계약 총 지출 */
  totalExpenditureContract: Scalars['Int']['output'];
  /** 출고 총 지출 */
  totalExpenditureDelivery: Scalars['Int']['output'];
  /** 계약 총 매출 */
  totalFeeContract: Scalars['Int']['output'];
  /** 출고 총 매출 */
  totalFeeDelivery: Scalars['Int']['output'];
  /** 계약 수당 / 직급별 인센티브 */
  totalIncentiveContract: Scalars['Float']['output'];
  /** 출고 수당 / 직급별 인센티브 */
  totalIncentiveDelivery: Scalars['Float']['output'];
  /** 계약 총 순매출 */
  totalNetIncomeContract: Scalars['Int']['output'];
  /** 출고 총 순매출 */
  totalNetIncomeDelivery: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  /** 년 */
  year: Scalars['String']['output'];
};

export type AuthPayload = {
  accessToken: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CheckSettleContractDto = {
  contractId?: InputMaybe<Scalars['Int']['input']>;
  month?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

/** 도시 */
export type City = {
  id: Scalars['Int']['output'];
  /** 도시 이름 */
  name: Scalars['String']['output'];
};

/** 계약 */
export type Contract = {
  /** 선수금 */
  advancePayment?: Maybe<Scalars['Int']['output']>;
  /** 약정 거리 */
  agreedMileage?: Maybe<Scalars['Int']['output']>;
  /** 지점 */
  branch?: Maybe<Scalars['String']['output']>;
  /** 지점 수수료 */
  branchFee?: Maybe<Scalars['Int']['output']>;
  /** 경비 */
  businessExpenses?: Maybe<Scalars['Int']['output']>;
  /** 경비 내용 */
  businessExpensesDetail?: Maybe<Scalars['String']['output']>;
  /** 차종 */
  carName?: Maybe<Scalars['String']['output']>;
  /** 차 옵션 */
  carOption?: Maybe<Scalars['String']['output']>;
  /** 차량 가격 */
  carPrice?: Maybe<Scalars['Int']['output']>;
  /** 현금 지원 */
  cashAssistance?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<City>;
  city_id?: Maybe<Scalars['Int']['output']>;
  /** 담보율 */
  collateralRate?: Maybe<Scalars['Int']['output']>;
  /** 회사명/명의자 */
  company_name_nominee?: Maybe<Scalars['String']['output']>;
  /** 계약 일 */
  contractAt?: Maybe<Scalars['String']['output']>;
  /** 약정 기간 */
  contractPeriod?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customer: Customer;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  division?: Maybe<Division>;
  divisionId?: Maybe<Scalars['Int']['output']>;
  /** 수수료 */
  fee?: Maybe<Scalars['Int']['output']>;
  /** 수수료 비율 */
  feeRate?: Maybe<Scalars['Int']['output']>;
  financialCompany?: Maybe<FinancialCompany>;
  financialCompanyId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** 소득자 */
  incomeEarner?: Maybe<Scalars['String']['output']>;
  /** 내부 색상 */
  innerColor?: Maybe<Scalars['String']['output']>;
  /** 보험 연령 */
  insuranceAge?: Maybe<Scalars['Int']['output']>;
  /** 출고 여부 */
  isOrdering?: Maybe<Scalars['String']['output']>;
  /** 부가세 지원 여부 */
  isVATSupport?: Maybe<Scalars['Boolean']['output']>;
  /** 월 납입료 */
  monthlyPayment?: Maybe<Scalars['Int']['output']>;
  /** 수익합계 */
  netIncome?: Maybe<Scalars['Int']['output']>;
  /** 대물 */
  object?: Maybe<Scalars['Int']['output']>;
  /** 외부 색상 */
  outerColor?: Maybe<Scalars['String']['output']>;
  /** 프로모션 */
  promotion?: Maybe<Scalars['Int']['output']>;
  /** 품의 금액 1 */
  service1?: Maybe<Scalars['Int']['output']>;
  /** 품의 금액 2 */
  service2?: Maybe<Scalars['Int']['output']>;
  /** 품의 금액 3 */
  service3?: Maybe<Scalars['Int']['output']>;
  /** 품의 내용 1 */
  serviceBody1?: Maybe<Scalars['String']['output']>;
  /** 품의 내용 2 */
  serviceBody2?: Maybe<Scalars['String']['output']>;
  /** 품의 내용 3 */
  serviceBody3?: Maybe<Scalars['String']['output']>;
  /** 출고 일 */
  shippingDate?: Maybe<Scalars['String']['output']>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethodId?: Maybe<Scalars['Int']['output']>;
  /** 계약 상태 */
  status: Status;
  supportAmounts?: Maybe<Array<SupportAmount>>;
  /** 지원 내용 */
  supportDetails?: Maybe<Scalars['String']['output']>;
  /** 지출합계 */
  totalExpenditure?: Maybe<Scalars['Int']['output']>;
  /** 매출 합계 */
  totalFee?: Maybe<Scalars['Int']['output']>;
  /** 총 계약 금액 */
  totalPrice?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** 계약 검색 타입 Enum Type */
export enum ContractSearchType {
  /** 차종 */
  CarName = 'CAR_NAME',
  /** 고객명 */
  CustomerName = 'CUSTOMER_NAME',
  /** 금융사 */
  FinancialCompany = 'FINANCIAL_COMPANY',
  /** 고객 연락처 */
  Phone = 'PHONE',
  /** 상담자 이름 */
  UserName = 'USER_NAME'
}

/** 상담 */
export type Counsel = {
  /** 상담 내용 */
  context: Scalars['String']['output'];
  contract?: Maybe<Contract>;
  contract_id?: Maybe<Scalars['Int']['output']>;
  /** 상담 일시 */
  counselAt: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customer: Customer;
  customerGroup?: Maybe<CustomerGroup>;
  customer_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 이미지 파일 */
  image_url?: Maybe<Scalars['String']['output']>;
  /** 상담 상태 */
  status?: Maybe<Status>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** 상담 검색 타입 Enum Type */
export enum CounselSearchType {
  /** 차종 */
  CarName = 'CAR_NAME',
  /** 상담 내용 */
  Context = 'CONTEXT',
  /** 고객등급 */
  CustomerGrade = 'CUSTOMER_GRADE',
  /** 고객명 */
  CustomerName = 'CUSTOMER_NAME',
  /** 비고 */
  Note = 'NOTE',
  /** 연락처 */
  Phone = 'PHONE',
  /** 상담자 이름 */
  UserName = 'USER_NAME'
}

export type CreateAdditionalIncentiveDto = {
  /** 추가 수당 */
  additionalIncentive: Scalars['Int']['input'];
  /** 월 */
  month: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
  /** 년도 */
  year: Scalars['String']['input'];
};

export type CreateCityDto = {
  name: Scalars['String']['input'];
};

export type CreateContractDto = {
  /** 선수금 */
  advancePayment?: InputMaybe<Scalars['Int']['input']>;
  /** 약정 거리 */
  agreedMileage?: InputMaybe<Scalars['Int']['input']>;
  /** 지점 */
  branch?: InputMaybe<Scalars['String']['input']>;
  /** 지점 수수료 */
  branchFee?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 */
  businessExpenses?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 내용 */
  businessExpensesDetail?: InputMaybe<Scalars['String']['input']>;
  /** 차종 */
  carName: Scalars['String']['input'];
  /** 차 옵션 */
  carOption?: InputMaybe<Scalars['String']['input']>;
  /** 차량 가격 */
  carPrice?: InputMaybe<Scalars['Int']['input']>;
  /** 현금 지원 */
  cashAssistance?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  /** 담보율 */
  collateralRate?: InputMaybe<Scalars['Int']['input']>;
  /** 회사명/명의자 */
  company_name_nominee?: InputMaybe<Scalars['String']['input']>;
  /** 계약 일 */
  contractAt?: InputMaybe<Scalars['String']['input']>;
  /** 약정 기간 */
  contractPeriod?: InputMaybe<Scalars['Int']['input']>;
  customerId: Scalars['Int']['input'];
  /** 구분 */
  divisionId?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 */
  fee?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 비율 */
  feeRate?: InputMaybe<Scalars['Int']['input']>;
  /** 금융사 id */
  financialCompanyId?: InputMaybe<Scalars['Int']['input']>;
  /** 소득자 */
  incomeEarner?: InputMaybe<Scalars['String']['input']>;
  /** 내부 색상 */
  innerColor?: InputMaybe<Scalars['String']['input']>;
  /** 보험 연령 */
  insuranceAge?: InputMaybe<Scalars['Int']['input']>;
  /** 발주 여부 */
  isOrdering?: InputMaybe<Scalars['String']['input']>;
  /** 월 납입료 */
  monthlyPayment?: InputMaybe<Scalars['Int']['input']>;
  /** 순수익 */
  netIncome?: InputMaybe<Scalars['Int']['input']>;
  /** 대물 */
  object?: InputMaybe<Scalars['Int']['input']>;
  /** 외부 색상 */
  outerColor?: InputMaybe<Scalars['String']['input']>;
  /** 프로모션 */
  promotion?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 1 */
  service1?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 2 */
  service2?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 3 */
  service3?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 내용 1 */
  serviceBody1?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 2 */
  serviceBody2?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 3 */
  serviceBody3?: InputMaybe<Scalars['String']['input']>;
  /** 출고 일 */
  shippingDate?: InputMaybe<Scalars['String']['input']>;
  /** 출고 방식 id */
  shippingMethodId?: InputMaybe<Scalars['Int']['input']>;
  /** 지원 내용 */
  supportDetails?: InputMaybe<Scalars['String']['input']>;
  /** 총지출 */
  totalExpenditure?: InputMaybe<Scalars['Int']['input']>;
  /** 총 수수료 */
  totalFee?: InputMaybe<Scalars['Int']['input']>;
  /** 총 계약 금액 */
  totalPrice?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateCounselDto = {
  context: Scalars['String']['input'];
  contract_id?: InputMaybe<Scalars['Int']['input']>;
  /** 상담 일시 */
  counselAt: Scalars['String']['input'];
  customer_id: Scalars['Int']['input'];
  image_url?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCustomerDto = {
  customerGradeId?: InputMaybe<Scalars['Int']['input']>;
  customerGroupId?: InputMaybe<Scalars['Int']['input']>;
  customerStatusId?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  /** 고객 유형 */
  type?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type CreateCustomerGradeDto = {
  name: Scalars['String']['input'];
};

export type CreateCustomerGroupDto = {
  name: Scalars['String']['input'];
};

export type CreateCustomerStatusDto = {
  /** 고객 상태 이름 */
  status: Scalars['String']['input'];
};

export type CreatePayStubDto = {
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

/** 지원금 생성 */
export type CreateSupportAmountDto = {
  /** 지원금액 */
  amount: Scalars['Int']['input'];
  /** 내용1 */
  body1?: InputMaybe<Scalars['String']['input']>;
  /** 내용2 */
  body2?: InputMaybe<Scalars['String']['input']>;
  /** 내용3 */
  body3?: InputMaybe<Scalars['String']['input']>;
  /** 내용4 */
  body4?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
};

export type CreateTeamDto = {
  name: Scalars['String']['input'];
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  positionId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** 고객 */
export type Customer = {
  contractList: Array<Contract>;
  counselList: Array<Counsel>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  customerGrade?: Maybe<CustomerGrade>;
  customerGroup?: Maybe<CustomerGroup>;
  customerStatus?: Maybe<CustomerStatus>;
  customer_grade_id?: Maybe<Scalars['Int']['output']>;
  customer_group_id?: Maybe<Scalars['Int']['output']>;
  customer_status_id?: Maybe<Scalars['Int']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 고객 메모 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 고객 이름 */
  name: Scalars['String']['output'];
  /** 비고 */
  note?: Maybe<Scalars['String']['output']>;
  /** 핸드폰 번호 */
  phone: Scalars['String']['output'];
  /** 상태 */
  status: Scalars['String']['output'];
  /** 추가 연락처 */
  sub_phone?: Maybe<Scalars['String']['output']>;
  /** 고객 유형 */
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userList: User;
  user_id: Scalars['Int']['output'];
};

/** 고객 등급 */
export type CustomerGrade = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 등급 이름 */
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 고객 그룹 */
export type CustomerGroup = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  /** 그룹 이름 */
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 검색 타입 Enum Type */
export enum CustomerSearchType {
  /** 차종 */
  CarName = 'CAR_NAME',
  /** 고객등급 */
  CustomerGrade = 'CUSTOMER_GRADE',
  /** 고객명 */
  CustomerName = 'CUSTOMER_NAME',
  /** 상태 */
  CustomerStatus = 'CUSTOMER_STATUS',
  /** 구분 */
  Division = 'DIVISION',
  /** 메모 */
  Memo = 'MEMO',
  /** 비고 */
  Note = 'NOTE',
  /** 연락처 */
  Phone = 'PHONE',
  /** 고객유형 */
  Type = 'TYPE'
}

/** 고객 상태 */
export type CustomerStatus = {
  /** id */
  id: Scalars['Int']['output'];
  /** 고객 상태 이름 */
  status: Scalars['String']['output'];
};

/** 구분 */
export type Division = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/** 금융사 */
export type FinancialCompany = {
  id: Scalars['Int']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
};

export type GetAdjustmentsDto = {
  month: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** 담당자 Ids */
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  year: Scalars['String']['input'];
};

export type GetCitiesDto = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GetContractsDto = {
  customerId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 계약일자 년월 */
  endContractAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  searchType?: InputMaybe<ContractSearchType>;
  /** 출고방식 ids */
  shippingMethodIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 계약일자 년월 시작일 */
  startContractAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetCounselsDto = {
  customerGroupId?: InputMaybe<Array<Scalars['Int']['input']>>;
  customerStatusId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 검색 내용 */
  search?: InputMaybe<Scalars['String']['input']>;
  /** 검색 타입 */
  searchType?: InputMaybe<CounselSearchType>;
  userId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetCustomersDto = {
  /** 고객 등급 Id */
  customerGradeId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 고객 그룹 Id */
  customerGroupId?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 고객 상태 Id */
  customerStatusId?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** 검색 타입 */
  searchType?: InputMaybe<CustomerSearchType>;
  /** 유저 Id */
  userId?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetDashBoardByUsersDto = {
  month: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type GetDeliveriesDto = {
  /** 구분 Ids */
  divisionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 출고일 마지막일 */
  endDeliveryAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  /** 금융사 Ids */
  financialCompanyIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** 출고일 시작일 */
  startDeliveryAtYearMonth?: InputMaybe<Scalars['String']['input']>;
  /** 유저 Ids */
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetPayStubDto = {
  /** 월 */
  month?: InputMaybe<Scalars['String']['input']>;
  /** 직책 ids */
  positionIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 년 */
  year?: InputMaybe<Scalars['String']['input']>;
};

/** 월별 top5 유저 */
export type MonthlyTopFiveUser = {
  month: Scalars['String']['output'];
  /** 출고건수 */
  totalCountDelivery?: Maybe<Scalars['Int']['output']>;
  /** 매출 합계 */
  totalFeeDelivery?: Maybe<Scalars['Int']['output']>;
  user: User;
  userId?: Maybe<Scalars['Int']['output']>;
  year: Scalars['String']['output'];
};

export type Mutation = {
  /** 추가 수당 생성 */
  createAdditionalIncentive: AdditionalIncentive;
  /** 도시 생성 */
  createCity: City;
  /** 계약 생성 */
  createContract: Contract;
  /** 상담 생성 */
  createCounsel: Counsel;
  /** 어드민 고객 생성 */
  createCustomer: Customer;
  /** 고객 등급 생성 */
  createCustomerGrade: CustomerGrade;
  /** 고객 그룹 생성 */
  createCustomerGroup: CustomerGroup;
  /** 고객 상태 생성 */
  createCustomerStatus: CustomerStatus;
  /** 급여 명세서 생성 */
  createPayStub: Scalars['Boolean']['output'];
  /** 지원금 생성 */
  createSupportAmount: SupportAmount;
  /** 팀 생성 */
  createTeam: Team;
  /** 유저 생성 */
  createUser: User;
  /** 추가 수당 삭제 */
  deleteAdditionalIncentive: Scalars['Boolean']['output'];
  /** 도시 삭제 */
  deleteCity: Scalars['String']['output'];
  /** 계약 삭제 */
  deleteContract: Scalars['String']['output'];
  /** 상담 삭제 */
  deleteCounsel: Scalars['String']['output'];
  /** 고객 삭제 */
  deleteCustomer: Scalars['String']['output'];
  /** 고객 그룹 삭제 */
  deleteCustomerGrade: Scalars['String']['output'];
  /** 고객 그룹 삭제 */
  deleteCustomerGroup: Scalars['String']['output'];
  /** 고객 상태 삭제 */
  deleteCustomerStatus: Scalars['String']['output'];
  /** 지원금 삭제 */
  deleteSupportAmount: Scalars['Boolean']['output'];
  /** 팀 삭제 */
  deleteTeam: Scalars['Boolean']['output'];
  /** 유저 삭제 */
  deleteUser: Scalars['Boolean']['output'];
  /** 토큰 재발급 */
  refresh: AuthPayload;
  /** 로그인 */
  signIn: AuthPayload;
  /** 로그아웃 */
  signOut: Scalars['String']['output'];
  /** 유저 생성 */
  signUp: User;
  /** 테스트 계정 생성 */
  testSignUp: User;
  /** 추가 수당 수정 */
  updateAdditionalIncentive: AdditionalIncentive;
  /** 도시 수정 */
  updateCity: City;
  /** 계약 수정 */
  updateContract: Contract;
  /** 상담 수정 */
  updateCounsel: Counsel;
  /** 고객 정보 수정 */
  updateCustomer: Customer;
  /** 고객 등급 수정 */
  updateCustomerGrade: CustomerGrade;
  /** 고객 그룹 수정 */
  updateCustomerGroup: CustomerGroup;
  /** 고객 담당자 수정 */
  updateCustomerOfUser: Customer;
  /** 고객 상태 수정 */
  updateCustomerStatus: CustomerStatus;
  /** 내 정보 수정 */
  updateMyInfo: AuthPayload;
  /** 지원금 수정 */
  updateSupportAmount: SupportAmount;
  /** 팀 수정 */
  updateTeam: Team;
  /** 유저 정보 수정 / 관리자 */
  updateUser: User;
};


export type MutationCreateAdditionalIncentiveArgs = {
  createAdditionalIncentiveDto: CreateAdditionalIncentiveDto;
};


export type MutationCreateCityArgs = {
  createCityDto: CreateCityDto;
};


export type MutationCreateContractArgs = {
  createContractDto: CreateContractDto;
};


export type MutationCreateCounselArgs = {
  createCounselDto: CreateCounselDto;
};


export type MutationCreateCustomerArgs = {
  createCustomerDto: CreateCustomerDto;
};


export type MutationCreateCustomerGradeArgs = {
  CreateCustomerGradeDto: CreateCustomerGradeDto;
};


export type MutationCreateCustomerGroupArgs = {
  CreateCustomerGroupDto: CreateCustomerGroupDto;
};


export type MutationCreateCustomerStatusArgs = {
  CreateCustomerStatusDto: CreateCustomerStatusDto;
};


export type MutationCreatePayStubArgs = {
  createPayStubDto: CreatePayStubDto;
};


export type MutationCreateSupportAmountArgs = {
  createSupportAmountDto: CreateSupportAmountDto;
};


export type MutationCreateTeamArgs = {
  createTeamDto: CreateTeamDto;
};


export type MutationCreateUserArgs = {
  createUserDto: CreateUserDto;
};


export type MutationDeleteAdditionalIncentiveArgs = {
  additionalIncentiveId: Scalars['Float']['input'];
};


export type MutationDeleteCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type MutationDeleteContractArgs = {
  contractIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCounselArgs = {
  counselIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCustomerArgs = {
  customerIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteCustomerGradeArgs = {
  customerGradeId: Scalars['Float']['input'];
};


export type MutationDeleteCustomerGroupArgs = {
  customerGroupId: Scalars['Float']['input'];
};


export type MutationDeleteCustomerStatusArgs = {
  customerStatusId: Scalars['Float']['input'];
};


export type MutationDeleteSupportAmountArgs = {
  supportAmountId: Scalars['Float']['input'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['Float']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  signInDto: SignInDto;
};


export type MutationSignUpArgs = {
  signUpDto: SignUpDto;
};


export type MutationTestSignUpArgs = {
  signUpDto: SignUpDto;
};


export type MutationUpdateAdditionalIncentiveArgs = {
  updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto;
};


export type MutationUpdateCityArgs = {
  updateCityDto: UpdateCityDto;
};


export type MutationUpdateContractArgs = {
  updateContractDto: UpdateContractDto;
};


export type MutationUpdateCounselArgs = {
  updateCounselDto: UpdateCounselDto;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerDto: UpdateCustomerDto;
};


export type MutationUpdateCustomerGradeArgs = {
  UpdateCustomerGradeDto: UpdateCustomerGradeDto;
};


export type MutationUpdateCustomerGroupArgs = {
  UpdateCustomerGroupDto: UpdateCustomerGroupDto;
};


export type MutationUpdateCustomerOfUserArgs = {
  updateCustomerOfUserDto: UpdateCustomerOfUserDto;
};


export type MutationUpdateCustomerStatusArgs = {
  UpdateCustomerStatusDto: UpdateCustomerStatusDto;
};


export type MutationUpdateMyInfoArgs = {
  updateUserMyInfoDto: UpdateUserMyInfoDto;
};


export type MutationUpdateSupportAmountArgs = {
  updateSupportAmountDto: UpdateSupportAmountDto;
};


export type MutationUpdateTeamArgs = {
  updateTeamDto: UpdateTeamDto;
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};

/** 알림 */
export type Notification = {
  /** 알림 내용 */
  body: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  from_user_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  target_user_id: Scalars['Int']['output'];
};

/** 급여명세서 */
export type PayStub = {
  /** 실수령액 - 수당합계 - 소득세 */
  actualSalary: Scalars['Int']['output'];
  contracts?: Maybe<Array<Contract>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  day?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  /** 기타수당 */
  etcIncentive?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** 소득세 - 수당합계 * 0.033 */
  incomeTax: Scalars['Int']['output'];
  /** 월 */
  month: Scalars['String']['output'];
  /** 수당합계 - 출고수당 합계 + 추가수당 합계 + 기타수당 합계 */
  totalAllowance?: Maybe<Scalars['Int']['output']>;
  /** 지원합계 - 출고지출 합계 */
  totalExpenditureDelivery: Scalars['Int']['output'];
  /** 매출합계 - 출고매출 합계 */
  totalFeeDelivery: Scalars['Int']['output'];
  /** 출고 수당의 직급별 인센티브 */
  totalIncentiveDelivery?: Maybe<Scalars['Int']['output']>;
  /** 정산합계 - 출고순익 합계 */
  totalNetIncomeDelivery: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId?: Maybe<Scalars['Int']['output']>;
  /** 년도 */
  year: Scalars['String']['output'];
};

/** 권한 Enum Type */
export enum PermissionType {
  /** ADMIN */
  Admin = 'ADMIN',
  /** USER */
  User = 'USER'
}

/** 직책 */
export type Position = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: PositionType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 직책 EnumType */
export enum PositionType {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 대리 */
  AssistantManager = 'ASSISTANT_MANAGER',
  /** 과장 */
  Manager = 'MANAGER',
  /** 차장 */
  SeniorManager = 'SENIOR_MANAGER',
  /** 사원 */
  Staff = 'STAFF',
  /** 팀장 */
  TeamLeader = 'TEAM_LEADER'
}

export type Query = {
  /** 계약 정산 유무 */
  checkSettleContract: Scalars['Boolean']['output'];
  /** 정산 리스트 조회 */
  getAdjustments: Array<Adjustment>;
  /** 도시 리스트 조회 */
  getCities: Array<City>;
  /** 도시 상세 조회 */
  getCity: City;
  /** 계약 조회 */
  getContract: Contract;
  /** 계약 리스트 조회 */
  getContracts: Array<Contract>;
  /** 상담 정보 조회 */
  getCounsel: Counsel;
  /** 상담 리스트 조회 */
  getCounsels: Array<Counsel>;
  /** 고객 정보 조회 */
  getCustomer: Customer;
  /** 고객 등급 리스트 */
  getCustomerGrades: Array<CustomerGrade>;
  /** 고객 그룹 리스트 */
  getCustomerGroups: Array<CustomerGroup>;
  /** 고객 상태 리스트 */
  getCustomerStatuses: Array<CustomerStatus>;
  /** 고객 리스트 조회 */
  getCustomers: Array<Customer>;
  /** 출고 내역 리스트 조회 */
  getDeliveries: Array<Contract>;
  /** 구분 리스트 */
  getDivisions: Array<Division>;
  /** 금융사 리스트 */
  getFinancialCompanies: Array<FinancialCompany>;
  /** 내 정보 조회 */
  getMyInfo: User;
  /** 알림 리스트 */
  getNotifications: Array<Notification>;
  /** 급여 명세서 상세페이지 */
  getPayStub: PayStub;
  /** 급여명세서 리스트 */
  getPayStubs: Array<PayStub>;
  /** 직책 리스트 */
  getPositions: Array<Position>;
  /** 출고방식 리스트 */
  getShippingMethods: Array<ShippingMethod>;
  /** 지원금 조회 */
  getSupportAmount: SupportAmount;
  /** 지원금 리스트 조회 */
  getSupportAmounts: Array<SupportAmount>;
  /** 팀 조회 */
  getTeam: Team;
  /** 팀 리스트 조회 */
  getTeams: Array<Team>;
  /** 월별 출고건수 top5 유저 */
  getTopFiveDeliveryUsersByMonth: Array<MonthlyTopFiveUser>;
  /** 월별 매출 top5 유저 */
  getTopFiveTotalFeeDeliveryUsersByMonth: Array<MonthlyTopFiveUser>;
  /** 담당자 상세 페이지 조회 */
  getUser: User;
  /** 담당자 리스트 */
  getUsers: Array<User>;
  userInfo: Scalars['String']['output'];
};


export type QueryCheckSettleContractArgs = {
  checkSettleContractDto: CheckSettleContractDto;
};


export type QueryGetAdjustmentsArgs = {
  getAdjustmentsDto: GetAdjustmentsDto;
};


export type QueryGetCitiesArgs = {
  getCitiesDto: GetCitiesDto;
};


export type QueryGetCityArgs = {
  cityId: Scalars['Float']['input'];
};


export type QueryGetContractArgs = {
  contractId: Scalars['Float']['input'];
};


export type QueryGetContractsArgs = {
  getContractsDto: GetContractsDto;
};


export type QueryGetCounselArgs = {
  counselId: Scalars['Float']['input'];
};


export type QueryGetCounselsArgs = {
  getCounselsDto: GetCounselsDto;
};


export type QueryGetCustomerArgs = {
  customerId: Scalars['Float']['input'];
};


export type QueryGetCustomersArgs = {
  getCustomersDto: GetCustomersDto;
};


export type QueryGetDeliveriesArgs = {
  getDeliveriesDto: GetDeliveriesDto;
};


export type QueryGetPayStubArgs = {
  payStubId: Scalars['Float']['input'];
};


export type QueryGetPayStubsArgs = {
  getPayStubDto: GetPayStubDto;
};


export type QueryGetSupportAmountArgs = {
  supportAmountId: Scalars['Float']['input'];
};


export type QueryGetSupportAmountsArgs = {
  contractId: Scalars['Float']['input'];
};


export type QueryGetTeamArgs = {
  teamId: Scalars['Float']['input'];
};


export type QueryGetTopFiveDeliveryUsersByMonthArgs = {
  getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
};


export type QueryGetTopFiveTotalFeeDeliveryUsersByMonthArgs = {
  getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
};


export type QueryGetUserArgs = {
  userId: Scalars['Float']['input'];
};

export type Role = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: PermissionType;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

/** 출고방식 */
export type ShippingMethod = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SignInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  positionId: Scalars['Int']['input'];
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

/** status Enum Type */
export enum Status {
  /** 활성화 */
  Active = 'ACTIVE',
  /** 삭제 */
  Deleted = 'DELETED'
}

/** 지원금액 */
export type SupportAmount = {
  /** 지원 금액 */
  amount: Scalars['Int']['output'];
  body1: Scalars['String']['output'];
  body2: Scalars['String']['output'];
  body3: Scalars['String']['output'];
  body4: Scalars['String']['output'];
  contract_id: Scalars['Int']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Team = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  userList: Array<User>;
};

export type UpdateAdditionalIncentiveDto = {
  /** 추가 수당 */
  additionalIncentive?: InputMaybe<Scalars['Int']['input']>;
  /** 추가 수당 Id */
  additionalIncentiveId: Scalars['Int']['input'];
};

export type UpdateCityDto = {
  cityId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateContractDto = {
  /** 선수금 */
  advancePayment?: InputMaybe<Scalars['Int']['input']>;
  /** 약정 거리 */
  agreedMileage?: InputMaybe<Scalars['Int']['input']>;
  /** 지점 */
  branch?: InputMaybe<Scalars['String']['input']>;
  /** 지점 수수료 */
  branchFee?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 */
  businessExpenses?: InputMaybe<Scalars['Int']['input']>;
  /** 발비 내용 */
  businessExpensesDetail?: InputMaybe<Scalars['String']['input']>;
  /** 차종 */
  carName?: InputMaybe<Scalars['String']['input']>;
  /** 차 옵션 */
  carOption?: InputMaybe<Scalars['String']['input']>;
  /** 차량 가격 */
  carPrice?: InputMaybe<Scalars['Int']['input']>;
  /** 현금 지원 */
  cashAssistance?: InputMaybe<Scalars['Int']['input']>;
  cityId?: InputMaybe<Scalars['Int']['input']>;
  /** 담보율 */
  collateralRate?: InputMaybe<Scalars['Int']['input']>;
  /** 회사명/명의자 */
  company_name_nominee?: InputMaybe<Scalars['String']['input']>;
  /** 계약 일 */
  contractAt?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
  /** 약정 기간 */
  contractPeriod?: InputMaybe<Scalars['Int']['input']>;
  customerId: Scalars['Int']['input'];
  /** 구분 id */
  divisionId?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 */
  fee?: InputMaybe<Scalars['Int']['input']>;
  /** 수수료 비율 */
  feeRate?: InputMaybe<Scalars['Int']['input']>;
  /** 금융사 id */
  financialCompanyId?: InputMaybe<Scalars['Int']['input']>;
  /** 소득자 */
  incomeEarner?: InputMaybe<Scalars['String']['input']>;
  /** 내부 색상 */
  innerColor?: InputMaybe<Scalars['String']['input']>;
  /** 보험 연령 */
  insuranceAge?: InputMaybe<Scalars['Int']['input']>;
  /** 정산 수수료 */
  interChangeFee?: InputMaybe<Scalars['Int']['input']>;
  /** 출고 여부 */
  isOrdering?: InputMaybe<Scalars['String']['input']>;
  /** 월 납입료 */
  monthlyPayment?: InputMaybe<Scalars['Int']['input']>;
  /** 순수익 */
  netIncome?: InputMaybe<Scalars['Int']['input']>;
  /** 대물 */
  object?: InputMaybe<Scalars['Int']['input']>;
  /** 외부 색상 */
  outerColor?: InputMaybe<Scalars['String']['input']>;
  /** 프로모션 */
  promotion?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 1 */
  service1?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 2 */
  service2?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 3 */
  service3?: InputMaybe<Scalars['Int']['input']>;
  /** 서비스 내용 1 */
  serviceBody1?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 2 */
  serviceBody2?: InputMaybe<Scalars['String']['input']>;
  /** 서비스 내용 3 */
  serviceBody3?: InputMaybe<Scalars['String']['input']>;
  /** 출고 일 */
  shippingDate?: InputMaybe<Scalars['String']['input']>;
  /** 출고 방식 id */
  shippingMethodId?: InputMaybe<Scalars['Int']['input']>;
  /** 계약 삭제 여부 */
  status?: Status;
  /** 지원 내용 */
  supportDetails?: InputMaybe<Scalars['String']['input']>;
  /** 총지출 */
  totalExpenditure?: InputMaybe<Scalars['Int']['input']>;
  /** 총 수수료 */
  totalFee?: InputMaybe<Scalars['Int']['input']>;
  /** 총 계약 금액 */
  totalPrice?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type UpdateCounselDto = {
  context: Scalars['String']['input'];
  contractId?: InputMaybe<Scalars['Int']['input']>;
  /** 상담 일시 */
  counselAt: Scalars['String']['input'];
  counselId: Scalars['Int']['input'];
  customerId?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCustomerDto = {
  customerGradeId?: InputMaybe<Scalars['Int']['input']>;
  customerGroupId?: InputMaybe<Scalars['Int']['input']>;
  customerId: Scalars['Int']['input'];
  customerStatusId?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** 비고 */
  note?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  /** 고객 삭제 상태 */
  status?: InputMaybe<Scalars['String']['input']>;
  /** 고객 유형 */
  type?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCustomerGradeDto = {
  customerGradeId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCustomerGroupDto = {
  customerGroupId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCustomerOfUserDto = {
  customerId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type UpdateCustomerStatusDto = {
  customerStatusId: Scalars['Int']['input'];
  /** 고객 상태 이름 */
  status: Scalars['String']['input'];
};

/** 지원금 수정 */
export type UpdateSupportAmountDto = {
  /** 지원금액 */
  amount: Scalars['Int']['input'];
  /** 내용1 */
  body1?: InputMaybe<Scalars['String']['input']>;
  /** 내용2 */
  body2?: InputMaybe<Scalars['String']['input']>;
  /** 내용3 */
  body3?: InputMaybe<Scalars['String']['input']>;
  /** 내용4 */
  body4?: InputMaybe<Scalars['String']['input']>;
  contractId: Scalars['Int']['input'];
  supportAmountId: Scalars['Int']['input'];
};

export type UpdateTeamDto = {
  name: Scalars['String']['input'];
  teamId: Scalars['Int']['input'];
};

export type UpdateUserDto = {
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 이름 */
  name: Scalars['String']['input'];
  positionId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type UpdateUserMyInfoDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  created_at?: Maybe<Scalars['DateTime']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  position: Position;
  role: Role;
  team?: Maybe<Team>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateAdditionalIncentiveMutationVariables = Exact<{
  createAdditionalIncentiveDto: CreateAdditionalIncentiveDto;
}>;


export type CreateAdditionalIncentiveMutation = { createAdditionalIncentive: { id: number } };

export type UpdateAdditionalIncentiveMutationVariables = Exact<{
  updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto;
}>;


export type UpdateAdditionalIncentiveMutation = { updateAdditionalIncentive: { id: number } };

export type DeleteAdditionalIncentiveMutationVariables = Exact<{
  additionalIncentiveId: Scalars['Float']['input'];
}>;


export type DeleteAdditionalIncentiveMutation = { deleteAdditionalIncentive: boolean };

export type SignInMutationVariables = Exact<{
  signInDto: SignInDto;
}>;


export type SignInMutation = { signIn: { accessToken: string, refreshToken?: string | null, user?: { name: string, id: number, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType } } | null } };

export type SignUpMutationVariables = Exact<{
  signUpDto: SignUpDto;
}>;


export type SignUpMutation = { signUp: { created_at?: string | null, deleted_at?: string | null, email: string, id: number, name: string, password: string, updated_at?: string | null } };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { signOut: string };

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshMutation = { refresh: { accessToken: string, refreshToken?: string | null, user?: { id: number, name: string, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType } } | null } };

export type UpdateMyInfoMutationVariables = Exact<{
  updateUserMyInfoDto: UpdateUserMyInfoDto;
}>;


export type UpdateMyInfoMutation = { updateMyInfo: { user?: { name: string, id: number } | null } };

export type CreateCityMutationVariables = Exact<{
  createCityDto: CreateCityDto;
}>;


export type CreateCityMutation = { createCity: { id: number, name: string } };

export type UpdateCityMutationVariables = Exact<{
  updateCityDto: UpdateCityDto;
}>;


export type UpdateCityMutation = { updateCity: { id: number, name: string } };

export type DeleteCityMutationVariables = Exact<{
  cityId: Scalars['Float']['input'];
}>;


export type DeleteCityMutation = { deleteCity: string };

export type CreateContractMutationVariables = Exact<{
  createContractDto: CreateContractDto;
}>;


export type CreateContractMutation = { createContract: { id: number } };

export type UpdateContractMutationVariables = Exact<{
  updateContractDto: UpdateContractDto;
}>;


export type UpdateContractMutation = { updateContract: { id: number } };

export type DeleteContractMutationVariables = Exact<{
  contractIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteContractMutation = { deleteContract: string };

export type CreateCounselMutationVariables = Exact<{
  createCounselDto: CreateCounselDto;
}>;


export type CreateCounselMutation = { createCounsel: { id: number } };

export type UpdateCounselMutationVariables = Exact<{
  updateCounselDto: UpdateCounselDto;
}>;


export type UpdateCounselMutation = { updateCounsel: { id: number } };

export type DeleteCounselMutationVariables = Exact<{
  counselIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCounselMutation = { deleteCounsel: string };

export type CreateCustomerMutationVariables = Exact<{
  createCustomerDto: CreateCustomerDto;
}>;


export type CreateCustomerMutation = { createCustomer: { id: number } };

export type UpdateCustomerMutationVariables = Exact<{
  updateCustomerDto: UpdateCustomerDto;
}>;


export type UpdateCustomerMutation = { updateCustomer: { id: number } };

export type DeleteCustomerMutationVariables = Exact<{
  customerIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type DeleteCustomerMutation = { deleteCustomer: string };

export type UpdateCustomerOfUserMutationVariables = Exact<{
  updateCustomerOfUserDto: UpdateCustomerOfUserDto;
}>;


export type UpdateCustomerOfUserMutation = { updateCustomerOfUser: { id: number } };

export type CreateCustomerGroupMutationVariables = Exact<{
  createCustomerGroupDto: CreateCustomerGroupDto;
}>;


export type CreateCustomerGroupMutation = { createCustomerGroup: { id: number } };

export type CreateCustomerGradeMutationVariables = Exact<{
  createCustomerGradeDto: CreateCustomerGradeDto;
}>;


export type CreateCustomerGradeMutation = { createCustomerGrade: { id: number } };

export type CreatePayStubMutationVariables = Exact<{
  createPayStubDto: CreatePayStubDto;
}>;


export type CreatePayStubMutation = { createPayStub: boolean };

export type CreateTeamMutationVariables = Exact<{
  createTeamDto: CreateTeamDto;
}>;


export type CreateTeamMutation = { createTeam: { id: number } };

export type UpdateTeamMutationVariables = Exact<{
  updateTeamDto: UpdateTeamDto;
}>;


export type UpdateTeamMutation = { updateTeam: { id: number } };

export type DeleteTeamMutationVariables = Exact<{
  teamId: Scalars['Float']['input'];
}>;


export type DeleteTeamMutation = { deleteTeam: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserDto: CreateUserDto;
}>;


export type CreateUserMutation = { createUser: { id: number } };

export type UpdateUserMutationVariables = Exact<{
  updateUserDto: UpdateUserDto;
}>;


export type UpdateUserMutation = { updateUser: { id: number } };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type DeleteUserMutation = { deleteUser: boolean };

export type GetAdjustmentsQueryVariables = Exact<{
  getAdjustmentsDto: GetAdjustmentsDto;
}>;


export type GetAdjustmentsQuery = { getAdjustments: Array<{ year: string, month: string, totalCountContract: number, totalFeeContract: number, totalExpenditureContract: number, totalNetIncomeContract: number, totalIncentiveContract: number, totalCountDelivery: number, totalFeeDelivery: number, totalExpenditureDelivery: number, totalNetIncomeDelivery: number, totalIncentiveDelivery: number, etcIncentive: number, user: { id: number, name: string, position: { id: number, name: PositionType } }, additionalIncentive?: { id: number, additionalIncentive: number } | null }> };

export type GetCitiesQueryVariables = Exact<{
  getCitiesDto: GetCitiesDto;
}>;


export type GetCitiesQuery = { getCities: Array<{ id: number, name: string }> };

export type GetCityQueryVariables = Exact<{
  cityId: Scalars['Float']['input'];
}>;


export type GetCityQuery = { getCity: { id: number, name: string } };

export type GetContractsQueryVariables = Exact<{
  getContractsDto: GetContractsDto;
}>;


export type GetContractsQuery = { getContracts: Array<{ id: number, status: Status, contractAt?: string | null, shippingDate?: string | null, carName?: string | null, carOption?: string | null, innerColor?: string | null, outerColor?: string | null, carPrice?: number | null, feeRate?: number | null, fee?: number | null, promotion?: number | null, monthlyPayment?: number | null, isOrdering?: string | null, isVATSupport?: boolean | null, branch?: string | null, branchFee?: number | null, collateralRate?: number | null, contractPeriod?: number | null, agreedMileage?: number | null, insuranceAge?: number | null, object?: number | null, service1?: number | null, serviceBody1?: string | null, service2?: number | null, serviceBody2?: string | null, service3?: number | null, serviceBody3?: string | null, incomeEarner?: string | null, cashAssistance?: number | null, supportDetails?: string | null, businessExpenses?: number | null, businessExpensesDetail?: string | null, totalExpenditure?: number | null, totalFee?: number | null, netIncome?: number | null, company_name_nominee?: string | null, advancePayment?: number | null, user: { id: number, name: string }, city?: { id: number, name: string } | null, customer: { id: number, name: string, phone: string, customerStatus?: { id: number, status: string } | null }, financialCompany?: { id: number, name: string } | null, shippingMethod?: { id: number, name: string } | null, division?: { id: number, name: string } | null }> };

export type GetContractQueryVariables = Exact<{
  contractId: Scalars['Float']['input'];
}>;


export type GetContractQuery = { getContract: { id: number, status: Status, contractAt?: string | null, shippingDate?: string | null, carName?: string | null, carOption?: string | null, innerColor?: string | null, outerColor?: string | null, carPrice?: number | null, feeRate?: number | null, fee?: number | null, promotion?: number | null, monthlyPayment?: number | null, isOrdering?: string | null, isVATSupport?: boolean | null, branch?: string | null, branchFee?: number | null, collateralRate?: number | null, contractPeriod?: number | null, agreedMileage?: number | null, insuranceAge?: number | null, object?: number | null, service1?: number | null, serviceBody1?: string | null, service2?: number | null, serviceBody2?: string | null, service3?: number | null, serviceBody3?: string | null, incomeEarner?: string | null, cashAssistance?: number | null, supportDetails?: string | null, businessExpenses?: number | null, businessExpensesDetail?: string | null, totalExpenditure?: number | null, totalFee?: number | null, netIncome?: number | null, company_name_nominee?: string | null, advancePayment?: number | null, user: { id: number, name: string }, city?: { id: number, name: string } | null, customer: { id: number, name: string, phone: string }, financialCompany?: { id: number, name: string } | null, shippingMethod?: { id: number, name: string } | null, division?: { id: number, name: string } | null } };

export type GetFinancialCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFinancialCompaniesQuery = { getFinancialCompanies: Array<{ id: number, name: string }> };

export type GetDivisionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDivisionsQuery = { getDivisions: Array<{ id: number, name: string }> };

export type GetShippingMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShippingMethodsQuery = { getShippingMethods: Array<{ id: number, name: string }> };

export type GetCounselsQueryVariables = Exact<{
  getCounselsDto: GetCounselsDto;
}>;


export type GetCounselsQuery = { getCounsels: Array<{ id: number, status?: Status | null, counselAt: string, context: string, customer: { id: number, name: string, phone: string, customerGroup?: { id: number, name: string } | null, customerGrade?: { id: number, name: string } | null, customerStatus?: { id: number, status: string } | null }, contract?: { id: number, carName?: string | null, division?: { id: number, name: string } | null } | null, user: { id: number, name: string } }> };

export type GetCounselQueryVariables = Exact<{
  counselId: Scalars['Float']['input'];
}>;


export type GetCounselQuery = { getCounsel: { id: number, status?: Status | null, counselAt: string, context: string, customer: { id: number, name: string, phone: string, customerGroup?: { id: number, name: string } | null, customerGrade?: { id: number, name: string } | null, customerStatus?: { id: number, status: string } | null }, contract?: { id: number, carName?: string | null, division?: { id: number, name: string } | null } | null, user: { id: number, name: string } } };

export type GetCustomersQueryVariables = Exact<{
  getCustomersDto: GetCustomersDto;
}>;


export type GetCustomersQuery = { getCustomers: Array<{ id: number, created_at?: string | null, name: string, phone: string, memo?: string | null, note?: string | null, type?: string | null, contractList: Array<{ carName?: string | null, division?: { name: string } | null }>, counselList: Array<{ counselAt: string }>, customerGrade?: { name: string } | null, userList: { name: string }, customerStatus?: { status: string } | null }> };

export type GetCustomerQueryVariables = Exact<{
  customerId: Scalars['Float']['input'];
}>;


export type GetCustomerQuery = { getCustomer: { id: number, name: string, phone: string, sub_phone?: string | null, type?: string | null, created_at?: string | null, memo?: string | null, note?: string | null, userList: { id: number, name: string }, customerGroup?: { id: number, name: string } | null, customerStatus?: { id: number, status: string } | null, contractList: Array<{ id: number, company_name_nominee?: string | null, carName?: string | null, carOption?: string | null, contractPeriod?: number | null, agreedMileage?: number | null, division?: { name: string } | null }>, customerGrade?: { id: number, name: string } | null, counselList: Array<{ id: number, counselAt: string, context: string, customer: { name: string }, user: { name: string } }> } };

export type GetCustomerGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerGroupsQuery = { getCustomerGroups: Array<{ id: number, name: string, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type GetCustomerGradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerGradesQuery = { getCustomerGrades: Array<{ id: number, name: string, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type GetCustomerStatusesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerStatusesQuery = { getCustomerStatuses: Array<{ id: number, status: string }> };

export type GetDeliveriesQueryVariables = Exact<{
  getDeliveriesDto: GetDeliveriesDto;
}>;


export type GetDeliveriesQuery = { getDeliveries: Array<{ id: number, contractAt?: string | null, shippingDate?: string | null, carName?: string | null, carPrice?: number | null, fee?: number | null, promotion?: number | null, customer: { id: number, name: string }, user: { id: number, name: string }, financialCompany?: { id: number, name: string } | null, division?: { id: number, name: string } | null, shippingMethod?: { id: number, name: string } | null }> };

export type GetPayStubsQueryVariables = Exact<{
  getPayStubDto: GetPayStubDto;
}>;


export type GetPayStubsQuery = { getPayStubs: Array<{ id: number, year: string, month: string, day?: string | null, totalFeeDelivery: number, totalExpenditureDelivery: number, totalNetIncomeDelivery: number, totalAllowance?: number | null, etcIncentive?: number | null, incomeTax: number, actualSalary: number, user: { id: number, name: string, team?: { id: number, name: string } | null, position: { id: number, name: PositionType } }, contracts?: Array<{ id: number, shippingDate?: string | null, carName?: string | null, carPrice?: number | null, fee?: number | null, promotion?: number | null, cashAssistance?: number | null, businessExpenses?: number | null, service1?: number | null, service2?: number | null, service3?: number | null, serviceBody1?: string | null, serviceBody2?: string | null, serviceBody3?: string | null, netIncome?: number | null, totalFee?: number | null, customer: { id: number, name: string } }> | null }> };

export type GetPayStubQueryVariables = Exact<{
  payStubId: Scalars['Float']['input'];
}>;


export type GetPayStubQuery = { getPayStub: { id: number, year: string, month: string, day?: string | null, totalFeeDelivery: number, totalExpenditureDelivery: number, totalNetIncomeDelivery: number, totalAllowance?: number | null, etcIncentive?: number | null, incomeTax: number, actualSalary: number, user: { id: number, name: string, team?: { id: number, name: string } | null, position: { id: number, name: PositionType } }, contracts?: Array<{ id: number, shippingDate?: string | null, carName?: string | null, carPrice?: number | null, fee?: number | null, promotion?: number | null, cashAssistance?: number | null, businessExpenses?: number | null, service1?: number | null, service2?: number | null, service3?: number | null, serviceBody1?: string | null, serviceBody2?: string | null, serviceBody3?: string | null, netIncome?: number | null, totalFee?: number | null, customer: { id: number, name: string } }> | null } };

export type CheckSettleContractQueryVariables = Exact<{
  checkSettleContractDto: CheckSettleContractDto;
}>;


export type CheckSettleContractQuery = { checkSettleContract: boolean };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { getTeams: Array<{ id: number, name: string, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, userList: Array<{ id: number, name: string }> }> };

export type GetTeamQueryVariables = Exact<{
  teamId: Scalars['Float']['input'];
}>;


export type GetTeamQuery = { getTeam: { id: number, name: string, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, userList: Array<{ id: number, name: string, email: string, created_at?: string | null, position: { id: number, name: PositionType } }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { getUsers: Array<{ id: number, name: string, email: string, password: string, created_at?: string | null, updated_at?: string | null, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType } }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserQuery = { getUser: { id: number, name: string, email: string, password: string, created_at?: string | null, updated_at?: string | null, position: { id: number, name: PositionType }, role: { id: number, name: PermissionType }, team?: { id: number, name: string } | null } };

export type GetPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPositionsQuery = { getPositions: Array<{ id: number, name: PositionType, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type GetTopFiveDeliveryUsersByMonthQueryVariables = Exact<{
  getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
}>;


export type GetTopFiveDeliveryUsersByMonthQuery = { getTopFiveDeliveryUsersByMonth: Array<{ year: string, month: string, totalCountDelivery?: number | null, totalFeeDelivery?: number | null, user: { id: number, name: string } }> };

export type GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables = Exact<{
  getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto;
}>;


export type GetTopFiveTotalFeeDeliveryUsersByMonthQuery = { getTopFiveTotalFeeDeliveryUsersByMonth: Array<{ year: string, month: string, totalFeeDelivery?: number | null, totalCountDelivery?: number | null, user: { id: number, name: string } }> };


export const CreateAdditionalIncentiveDocument = gql`
    mutation CreateAdditionalIncentive($createAdditionalIncentiveDto: CreateAdditionalIncentiveDto!) {
  createAdditionalIncentive(
    createAdditionalIncentiveDto: $createAdditionalIncentiveDto
  ) {
    id
  }
}
    `;
export type CreateAdditionalIncentiveMutationFn = Apollo.MutationFunction<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>;

/**
 * __useCreateAdditionalIncentiveMutation__
 *
 * To run a mutation, you first call `useCreateAdditionalIncentiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdditionalIncentiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdditionalIncentiveMutation, { data, loading, error }] = useCreateAdditionalIncentiveMutation({
 *   variables: {
 *      createAdditionalIncentiveDto: // value for 'createAdditionalIncentiveDto'
 *   },
 * });
 */
export function useCreateAdditionalIncentiveMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>(CreateAdditionalIncentiveDocument, options);
      }
export type CreateAdditionalIncentiveMutationHookResult = ReturnType<typeof useCreateAdditionalIncentiveMutation>;
export type CreateAdditionalIncentiveMutationResult = Apollo.MutationResult<CreateAdditionalIncentiveMutation>;
export type CreateAdditionalIncentiveMutationOptions = Apollo.BaseMutationOptions<CreateAdditionalIncentiveMutation, CreateAdditionalIncentiveMutationVariables>;
export const UpdateAdditionalIncentiveDocument = gql`
    mutation UpdateAdditionalIncentive($updateAdditionalIncentiveDto: UpdateAdditionalIncentiveDto!) {
  updateAdditionalIncentive(
    updateAdditionalIncentiveDto: $updateAdditionalIncentiveDto
  ) {
    id
  }
}
    `;
export type UpdateAdditionalIncentiveMutationFn = Apollo.MutationFunction<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>;

/**
 * __useUpdateAdditionalIncentiveMutation__
 *
 * To run a mutation, you first call `useUpdateAdditionalIncentiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdditionalIncentiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdditionalIncentiveMutation, { data, loading, error }] = useUpdateAdditionalIncentiveMutation({
 *   variables: {
 *      updateAdditionalIncentiveDto: // value for 'updateAdditionalIncentiveDto'
 *   },
 * });
 */
export function useUpdateAdditionalIncentiveMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>(UpdateAdditionalIncentiveDocument, options);
      }
export type UpdateAdditionalIncentiveMutationHookResult = ReturnType<typeof useUpdateAdditionalIncentiveMutation>;
export type UpdateAdditionalIncentiveMutationResult = Apollo.MutationResult<UpdateAdditionalIncentiveMutation>;
export type UpdateAdditionalIncentiveMutationOptions = Apollo.BaseMutationOptions<UpdateAdditionalIncentiveMutation, UpdateAdditionalIncentiveMutationVariables>;
export const DeleteAdditionalIncentiveDocument = gql`
    mutation DeleteAdditionalIncentive($additionalIncentiveId: Float!) {
  deleteAdditionalIncentive(additionalIncentiveId: $additionalIncentiveId)
}
    `;
export type DeleteAdditionalIncentiveMutationFn = Apollo.MutationFunction<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>;

/**
 * __useDeleteAdditionalIncentiveMutation__
 *
 * To run a mutation, you first call `useDeleteAdditionalIncentiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdditionalIncentiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdditionalIncentiveMutation, { data, loading, error }] = useDeleteAdditionalIncentiveMutation({
 *   variables: {
 *      additionalIncentiveId: // value for 'additionalIncentiveId'
 *   },
 * });
 */
export function useDeleteAdditionalIncentiveMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>(DeleteAdditionalIncentiveDocument, options);
      }
export type DeleteAdditionalIncentiveMutationHookResult = ReturnType<typeof useDeleteAdditionalIncentiveMutation>;
export type DeleteAdditionalIncentiveMutationResult = Apollo.MutationResult<DeleteAdditionalIncentiveMutation>;
export type DeleteAdditionalIncentiveMutationOptions = Apollo.BaseMutationOptions<DeleteAdditionalIncentiveMutation, DeleteAdditionalIncentiveMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($signInDto: SignInDto!) {
  signIn(signInDto: $signInDto) {
    accessToken
    refreshToken
    user {
      name
      id
      position {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      signInDto: // value for 'signInDto'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($signUpDto: SignUpDto!) {
  signUp(signUpDto: $signUpDto) {
    created_at
    deleted_at
    email
    id
    name
    password
    updated_at
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpDto: // value for 'signUpDto'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation {
  signOut
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const RefreshDocument = gql`
    mutation Refresh($refreshToken: String!) {
  refresh(refreshToken: $refreshToken) {
    accessToken
    refreshToken
    user {
      id
      name
      position {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const UpdateMyInfoDocument = gql`
    mutation UpdateMyInfo($updateUserMyInfoDto: UpdateUserMyInfoDto!) {
  updateMyInfo(updateUserMyInfoDto: $updateUserMyInfoDto) {
    user {
      name
      id
    }
  }
}
    `;
export type UpdateMyInfoMutationFn = Apollo.MutationFunction<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>;

/**
 * __useUpdateMyInfoMutation__
 *
 * To run a mutation, you first call `useUpdateMyInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyInfoMutation, { data, loading, error }] = useUpdateMyInfoMutation({
 *   variables: {
 *      updateUserMyInfoDto: // value for 'updateUserMyInfoDto'
 *   },
 * });
 */
export function useUpdateMyInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>(UpdateMyInfoDocument, options);
      }
export type UpdateMyInfoMutationHookResult = ReturnType<typeof useUpdateMyInfoMutation>;
export type UpdateMyInfoMutationResult = Apollo.MutationResult<UpdateMyInfoMutation>;
export type UpdateMyInfoMutationOptions = Apollo.BaseMutationOptions<UpdateMyInfoMutation, UpdateMyInfoMutationVariables>;
export const CreateCityDocument = gql`
    mutation CreateCity($createCityDto: CreateCityDto!) {
  createCity(createCityDto: $createCityDto) {
    id
    name
  }
}
    `;
export type CreateCityMutationFn = Apollo.MutationFunction<CreateCityMutation, CreateCityMutationVariables>;

/**
 * __useCreateCityMutation__
 *
 * To run a mutation, you first call `useCreateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCityMutation, { data, loading, error }] = useCreateCityMutation({
 *   variables: {
 *      createCityDto: // value for 'createCityDto'
 *   },
 * });
 */
export function useCreateCityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCityMutation, CreateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCityMutation, CreateCityMutationVariables>(CreateCityDocument, options);
      }
export type CreateCityMutationHookResult = ReturnType<typeof useCreateCityMutation>;
export type CreateCityMutationResult = Apollo.MutationResult<CreateCityMutation>;
export type CreateCityMutationOptions = Apollo.BaseMutationOptions<CreateCityMutation, CreateCityMutationVariables>;
export const UpdateCityDocument = gql`
    mutation UpdateCity($updateCityDto: UpdateCityDto!) {
  updateCity(updateCityDto: $updateCityDto) {
    id
    name
  }
}
    `;
export type UpdateCityMutationFn = Apollo.MutationFunction<UpdateCityMutation, UpdateCityMutationVariables>;

/**
 * __useUpdateCityMutation__
 *
 * To run a mutation, you first call `useUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCityMutation, { data, loading, error }] = useUpdateCityMutation({
 *   variables: {
 *      updateCityDto: // value for 'updateCityDto'
 *   },
 * });
 */
export function useUpdateCityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCityMutation, UpdateCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCityMutation, UpdateCityMutationVariables>(UpdateCityDocument, options);
      }
export type UpdateCityMutationHookResult = ReturnType<typeof useUpdateCityMutation>;
export type UpdateCityMutationResult = Apollo.MutationResult<UpdateCityMutation>;
export type UpdateCityMutationOptions = Apollo.BaseMutationOptions<UpdateCityMutation, UpdateCityMutationVariables>;
export const DeleteCityDocument = gql`
    mutation DeleteCity($cityId: Float!) {
  deleteCity(cityId: $cityId)
}
    `;
export type DeleteCityMutationFn = Apollo.MutationFunction<DeleteCityMutation, DeleteCityMutationVariables>;

/**
 * __useDeleteCityMutation__
 *
 * To run a mutation, you first call `useDeleteCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCityMutation, { data, loading, error }] = useDeleteCityMutation({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useDeleteCityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCityMutation, DeleteCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCityMutation, DeleteCityMutationVariables>(DeleteCityDocument, options);
      }
export type DeleteCityMutationHookResult = ReturnType<typeof useDeleteCityMutation>;
export type DeleteCityMutationResult = Apollo.MutationResult<DeleteCityMutation>;
export type DeleteCityMutationOptions = Apollo.BaseMutationOptions<DeleteCityMutation, DeleteCityMutationVariables>;
export const CreateContractDocument = gql`
    mutation CreateContract($createContractDto: CreateContractDto!) {
  createContract(createContractDto: $createContractDto) {
    id
  }
}
    `;
export type CreateContractMutationFn = Apollo.MutationFunction<CreateContractMutation, CreateContractMutationVariables>;

/**
 * __useCreateContractMutation__
 *
 * To run a mutation, you first call `useCreateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContractMutation, { data, loading, error }] = useCreateContractMutation({
 *   variables: {
 *      createContractDto: // value for 'createContractDto'
 *   },
 * });
 */
export function useCreateContractMutation(baseOptions?: Apollo.MutationHookOptions<CreateContractMutation, CreateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContractMutation, CreateContractMutationVariables>(CreateContractDocument, options);
      }
export type CreateContractMutationHookResult = ReturnType<typeof useCreateContractMutation>;
export type CreateContractMutationResult = Apollo.MutationResult<CreateContractMutation>;
export type CreateContractMutationOptions = Apollo.BaseMutationOptions<CreateContractMutation, CreateContractMutationVariables>;
export const UpdateContractDocument = gql`
    mutation UpdateContract($updateContractDto: UpdateContractDto!) {
  updateContract(updateContractDto: $updateContractDto) {
    id
  }
}
    `;
export type UpdateContractMutationFn = Apollo.MutationFunction<UpdateContractMutation, UpdateContractMutationVariables>;

/**
 * __useUpdateContractMutation__
 *
 * To run a mutation, you first call `useUpdateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractMutation, { data, loading, error }] = useUpdateContractMutation({
 *   variables: {
 *      updateContractDto: // value for 'updateContractDto'
 *   },
 * });
 */
export function useUpdateContractMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContractMutation, UpdateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContractMutation, UpdateContractMutationVariables>(UpdateContractDocument, options);
      }
export type UpdateContractMutationHookResult = ReturnType<typeof useUpdateContractMutation>;
export type UpdateContractMutationResult = Apollo.MutationResult<UpdateContractMutation>;
export type UpdateContractMutationOptions = Apollo.BaseMutationOptions<UpdateContractMutation, UpdateContractMutationVariables>;
export const DeleteContractDocument = gql`
    mutation DeleteContract($contractIds: [Int!]!) {
  deleteContract(contractIds: $contractIds)
}
    `;
export type DeleteContractMutationFn = Apollo.MutationFunction<DeleteContractMutation, DeleteContractMutationVariables>;

/**
 * __useDeleteContractMutation__
 *
 * To run a mutation, you first call `useDeleteContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContractMutation, { data, loading, error }] = useDeleteContractMutation({
 *   variables: {
 *      contractIds: // value for 'contractIds'
 *   },
 * });
 */
export function useDeleteContractMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContractMutation, DeleteContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContractMutation, DeleteContractMutationVariables>(DeleteContractDocument, options);
      }
export type DeleteContractMutationHookResult = ReturnType<typeof useDeleteContractMutation>;
export type DeleteContractMutationResult = Apollo.MutationResult<DeleteContractMutation>;
export type DeleteContractMutationOptions = Apollo.BaseMutationOptions<DeleteContractMutation, DeleteContractMutationVariables>;
export const CreateCounselDocument = gql`
    mutation CreateCounsel($createCounselDto: CreateCounselDto!) {
  createCounsel(createCounselDto: $createCounselDto) {
    id
  }
}
    `;
export type CreateCounselMutationFn = Apollo.MutationFunction<CreateCounselMutation, CreateCounselMutationVariables>;

/**
 * __useCreateCounselMutation__
 *
 * To run a mutation, you first call `useCreateCounselMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCounselMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCounselMutation, { data, loading, error }] = useCreateCounselMutation({
 *   variables: {
 *      createCounselDto: // value for 'createCounselDto'
 *   },
 * });
 */
export function useCreateCounselMutation(baseOptions?: Apollo.MutationHookOptions<CreateCounselMutation, CreateCounselMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCounselMutation, CreateCounselMutationVariables>(CreateCounselDocument, options);
      }
export type CreateCounselMutationHookResult = ReturnType<typeof useCreateCounselMutation>;
export type CreateCounselMutationResult = Apollo.MutationResult<CreateCounselMutation>;
export type CreateCounselMutationOptions = Apollo.BaseMutationOptions<CreateCounselMutation, CreateCounselMutationVariables>;
export const UpdateCounselDocument = gql`
    mutation UpdateCounsel($updateCounselDto: UpdateCounselDto!) {
  updateCounsel(updateCounselDto: $updateCounselDto) {
    id
  }
}
    `;
export type UpdateCounselMutationFn = Apollo.MutationFunction<UpdateCounselMutation, UpdateCounselMutationVariables>;

/**
 * __useUpdateCounselMutation__
 *
 * To run a mutation, you first call `useUpdateCounselMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCounselMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCounselMutation, { data, loading, error }] = useUpdateCounselMutation({
 *   variables: {
 *      updateCounselDto: // value for 'updateCounselDto'
 *   },
 * });
 */
export function useUpdateCounselMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCounselMutation, UpdateCounselMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCounselMutation, UpdateCounselMutationVariables>(UpdateCounselDocument, options);
      }
export type UpdateCounselMutationHookResult = ReturnType<typeof useUpdateCounselMutation>;
export type UpdateCounselMutationResult = Apollo.MutationResult<UpdateCounselMutation>;
export type UpdateCounselMutationOptions = Apollo.BaseMutationOptions<UpdateCounselMutation, UpdateCounselMutationVariables>;
export const DeleteCounselDocument = gql`
    mutation DeleteCounsel($counselIds: [Int!]!) {
  deleteCounsel(counselIds: $counselIds)
}
    `;
export type DeleteCounselMutationFn = Apollo.MutationFunction<DeleteCounselMutation, DeleteCounselMutationVariables>;

/**
 * __useDeleteCounselMutation__
 *
 * To run a mutation, you first call `useDeleteCounselMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCounselMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCounselMutation, { data, loading, error }] = useDeleteCounselMutation({
 *   variables: {
 *      counselIds: // value for 'counselIds'
 *   },
 * });
 */
export function useDeleteCounselMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCounselMutation, DeleteCounselMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCounselMutation, DeleteCounselMutationVariables>(DeleteCounselDocument, options);
      }
export type DeleteCounselMutationHookResult = ReturnType<typeof useDeleteCounselMutation>;
export type DeleteCounselMutationResult = Apollo.MutationResult<DeleteCounselMutation>;
export type DeleteCounselMutationOptions = Apollo.BaseMutationOptions<DeleteCounselMutation, DeleteCounselMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($createCustomerDto: CreateCustomerDto!) {
  createCustomer(createCustomerDto: $createCustomerDto) {
    id
  }
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      createCustomerDto: // value for 'createCustomerDto'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($updateCustomerDto: UpdateCustomerDto!) {
  updateCustomer(updateCustomerDto: $updateCustomerDto) {
    id
  }
}
    `;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      updateCustomerDto: // value for 'updateCustomerDto'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const DeleteCustomerDocument = gql`
    mutation DeleteCustomer($customerIds: [Int!]!) {
  deleteCustomer(customerIds: $customerIds)
}
    `;
export type DeleteCustomerMutationFn = Apollo.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      customerIds: // value for 'customerIds'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, options);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = Apollo.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const UpdateCustomerOfUserDocument = gql`
    mutation UpdateCustomerOfUser($updateCustomerOfUserDto: UpdateCustomerOfUserDto!) {
  updateCustomerOfUser(updateCustomerOfUserDto: $updateCustomerOfUserDto) {
    id
  }
}
    `;
export type UpdateCustomerOfUserMutationFn = Apollo.MutationFunction<UpdateCustomerOfUserMutation, UpdateCustomerOfUserMutationVariables>;

/**
 * __useUpdateCustomerOfUserMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerOfUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerOfUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerOfUserMutation, { data, loading, error }] = useUpdateCustomerOfUserMutation({
 *   variables: {
 *      updateCustomerOfUserDto: // value for 'updateCustomerOfUserDto'
 *   },
 * });
 */
export function useUpdateCustomerOfUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerOfUserMutation, UpdateCustomerOfUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerOfUserMutation, UpdateCustomerOfUserMutationVariables>(UpdateCustomerOfUserDocument, options);
      }
export type UpdateCustomerOfUserMutationHookResult = ReturnType<typeof useUpdateCustomerOfUserMutation>;
export type UpdateCustomerOfUserMutationResult = Apollo.MutationResult<UpdateCustomerOfUserMutation>;
export type UpdateCustomerOfUserMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerOfUserMutation, UpdateCustomerOfUserMutationVariables>;
export const CreateCustomerGroupDocument = gql`
    mutation CreateCustomerGroup($createCustomerGroupDto: CreateCustomerGroupDto!) {
  createCustomerGroup(CreateCustomerGroupDto: $createCustomerGroupDto) {
    id
  }
}
    `;
export type CreateCustomerGroupMutationFn = Apollo.MutationFunction<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>;

/**
 * __useCreateCustomerGroupMutation__
 *
 * To run a mutation, you first call `useCreateCustomerGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerGroupMutation, { data, loading, error }] = useCreateCustomerGroupMutation({
 *   variables: {
 *      createCustomerGroupDto: // value for 'createCustomerGroupDto'
 *   },
 * });
 */
export function useCreateCustomerGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>(CreateCustomerGroupDocument, options);
      }
export type CreateCustomerGroupMutationHookResult = ReturnType<typeof useCreateCustomerGroupMutation>;
export type CreateCustomerGroupMutationResult = Apollo.MutationResult<CreateCustomerGroupMutation>;
export type CreateCustomerGroupMutationOptions = Apollo.BaseMutationOptions<CreateCustomerGroupMutation, CreateCustomerGroupMutationVariables>;
export const CreateCustomerGradeDocument = gql`
    mutation CreateCustomerGrade($createCustomerGradeDto: CreateCustomerGradeDto!) {
  createCustomerGrade(CreateCustomerGradeDto: $createCustomerGradeDto) {
    id
  }
}
    `;
export type CreateCustomerGradeMutationFn = Apollo.MutationFunction<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>;

/**
 * __useCreateCustomerGradeMutation__
 *
 * To run a mutation, you first call `useCreateCustomerGradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerGradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerGradeMutation, { data, loading, error }] = useCreateCustomerGradeMutation({
 *   variables: {
 *      createCustomerGradeDto: // value for 'createCustomerGradeDto'
 *   },
 * });
 */
export function useCreateCustomerGradeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>(CreateCustomerGradeDocument, options);
      }
export type CreateCustomerGradeMutationHookResult = ReturnType<typeof useCreateCustomerGradeMutation>;
export type CreateCustomerGradeMutationResult = Apollo.MutationResult<CreateCustomerGradeMutation>;
export type CreateCustomerGradeMutationOptions = Apollo.BaseMutationOptions<CreateCustomerGradeMutation, CreateCustomerGradeMutationVariables>;
export const CreatePayStubDocument = gql`
    mutation CreatePayStub($createPayStubDto: CreatePayStubDto!) {
  createPayStub(createPayStubDto: $createPayStubDto)
}
    `;
export type CreatePayStubMutationFn = Apollo.MutationFunction<CreatePayStubMutation, CreatePayStubMutationVariables>;

/**
 * __useCreatePayStubMutation__
 *
 * To run a mutation, you first call `useCreatePayStubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePayStubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPayStubMutation, { data, loading, error }] = useCreatePayStubMutation({
 *   variables: {
 *      createPayStubDto: // value for 'createPayStubDto'
 *   },
 * });
 */
export function useCreatePayStubMutation(baseOptions?: Apollo.MutationHookOptions<CreatePayStubMutation, CreatePayStubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePayStubMutation, CreatePayStubMutationVariables>(CreatePayStubDocument, options);
      }
export type CreatePayStubMutationHookResult = ReturnType<typeof useCreatePayStubMutation>;
export type CreatePayStubMutationResult = Apollo.MutationResult<CreatePayStubMutation>;
export type CreatePayStubMutationOptions = Apollo.BaseMutationOptions<CreatePayStubMutation, CreatePayStubMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($createTeamDto: CreateTeamDto!) {
  createTeam(createTeamDto: $createTeamDto) {
    id
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      createTeamDto: // value for 'createTeamDto'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($updateTeamDto: UpdateTeamDto!) {
  updateTeam(updateTeamDto: $updateTeamDto) {
    id
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      updateTeamDto: // value for 'updateTeamDto'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($teamId: Float!) {
  deleteTeam(teamId: $teamId)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserDto: CreateUserDto!) {
  createUser(createUserDto: $createUserDto) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserDto: // value for 'createUserDto'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserDto: UpdateUserDto!) {
  updateUser(updateUserDto: $updateUserDto) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserDto: // value for 'updateUserDto'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: Float!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetAdjustmentsDocument = gql`
    query GetAdjustments($getAdjustmentsDto: GetAdjustmentsDto!) {
  getAdjustments(getAdjustmentsDto: $getAdjustmentsDto) {
    year
    month
    user {
      id
      name
      position {
        id
        name
      }
    }
    totalCountContract
    totalFeeContract
    totalExpenditureContract
    totalNetIncomeContract
    totalIncentiveContract
    totalCountDelivery
    totalFeeDelivery
    totalExpenditureDelivery
    totalNetIncomeDelivery
    totalIncentiveDelivery
    etcIncentive
    additionalIncentive {
      id
      additionalIncentive
    }
  }
}
    `;

/**
 * __useGetAdjustmentsQuery__
 *
 * To run a query within a React component, call `useGetAdjustmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdjustmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdjustmentsQuery({
 *   variables: {
 *      getAdjustmentsDto: // value for 'getAdjustmentsDto'
 *   },
 * });
 */
export function useGetAdjustmentsQuery(baseOptions: Apollo.QueryHookOptions<GetAdjustmentsQuery, GetAdjustmentsQueryVariables> & ({ variables: GetAdjustmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>(GetAdjustmentsDocument, options);
      }
export function useGetAdjustmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>(GetAdjustmentsDocument, options);
        }
export function useGetAdjustmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>(GetAdjustmentsDocument, options);
        }
export type GetAdjustmentsQueryHookResult = ReturnType<typeof useGetAdjustmentsQuery>;
export type GetAdjustmentsLazyQueryHookResult = ReturnType<typeof useGetAdjustmentsLazyQuery>;
export type GetAdjustmentsSuspenseQueryHookResult = ReturnType<typeof useGetAdjustmentsSuspenseQuery>;
export type GetAdjustmentsQueryResult = Apollo.QueryResult<GetAdjustmentsQuery, GetAdjustmentsQueryVariables>;
export const GetCitiesDocument = gql`
    query GetCities($getCitiesDto: GetCitiesDto!) {
  getCities(getCitiesDto: $getCitiesDto) {
    id
    name
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *      getCitiesDto: // value for 'getCitiesDto'
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables> & ({ variables: GetCitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export function useGetCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<typeof useGetCitiesSuspenseQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetCityDocument = gql`
    query GetCity($cityId: Float!) {
  getCity(cityId: $cityId) {
    id
    name
  }
}
    `;

/**
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGetCityQuery(baseOptions: Apollo.QueryHookOptions<GetCityQuery, GetCityQueryVariables> & ({ variables: GetCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
      }
export function useGetCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export function useGetCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCitySuspenseQueryHookResult = ReturnType<typeof useGetCitySuspenseQuery>;
export type GetCityQueryResult = Apollo.QueryResult<GetCityQuery, GetCityQueryVariables>;
export const GetContractsDocument = gql`
    query GetContracts($getContractsDto: GetContractsDto!) {
  getContracts(getContractsDto: $getContractsDto) {
    id
    status
    user {
      id
      name
    }
    city {
      id
      name
    }
    contractAt
    shippingDate
    customer {
      id
      name
      phone
      customerStatus {
        id
        status
      }
    }
    carName
    carOption
    innerColor
    outerColor
    carPrice
    financialCompany {
      id
      name
    }
    feeRate
    fee
    promotion
    monthlyPayment
    shippingMethod {
      id
      name
    }
    isOrdering
    isVATSupport
    branch
    branchFee
    collateralRate
    contractPeriod
    agreedMileage
    insuranceAge
    object
    service1
    serviceBody1
    service2
    serviceBody2
    service3
    serviceBody3
    incomeEarner
    cashAssistance
    supportDetails
    businessExpenses
    businessExpensesDetail
    totalExpenditure
    totalFee
    netIncome
    company_name_nominee
    division {
      id
      name
    }
    advancePayment
  }
}
    `;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      getContractsDto: // value for 'getContractsDto'
 *   },
 * });
 */
export function useGetContractsQuery(baseOptions: Apollo.QueryHookOptions<GetContractsQuery, GetContractsQueryVariables> & ({ variables: GetContractsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
      }
export function useGetContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export function useGetContractsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export type GetContractsQueryHookResult = ReturnType<typeof useGetContractsQuery>;
export type GetContractsLazyQueryHookResult = ReturnType<typeof useGetContractsLazyQuery>;
export type GetContractsSuspenseQueryHookResult = ReturnType<typeof useGetContractsSuspenseQuery>;
export type GetContractsQueryResult = Apollo.QueryResult<GetContractsQuery, GetContractsQueryVariables>;
export const GetContractDocument = gql`
    query GetContract($contractId: Float!) {
  getContract(contractId: $contractId) {
    id
    status
    user {
      id
      name
    }
    city {
      id
      name
    }
    contractAt
    shippingDate
    customer {
      id
      name
      phone
    }
    carName
    carOption
    innerColor
    outerColor
    carPrice
    financialCompany {
      id
      name
    }
    feeRate
    fee
    promotion
    monthlyPayment
    shippingMethod {
      id
      name
    }
    isOrdering
    isVATSupport
    branch
    branchFee
    collateralRate
    contractPeriod
    agreedMileage
    insuranceAge
    object
    service1
    serviceBody1
    service2
    serviceBody2
    service3
    serviceBody3
    incomeEarner
    cashAssistance
    supportDetails
    businessExpenses
    businessExpensesDetail
    totalExpenditure
    totalFee
    netIncome
    company_name_nominee
    division {
      id
      name
    }
    advancePayment
  }
}
    `;

/**
 * __useGetContractQuery__
 *
 * To run a query within a React component, call `useGetContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetContractQuery(baseOptions: Apollo.QueryHookOptions<GetContractQuery, GetContractQueryVariables> & ({ variables: GetContractQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
      }
export function useGetContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export function useGetContractSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export type GetContractQueryHookResult = ReturnType<typeof useGetContractQuery>;
export type GetContractLazyQueryHookResult = ReturnType<typeof useGetContractLazyQuery>;
export type GetContractSuspenseQueryHookResult = ReturnType<typeof useGetContractSuspenseQuery>;
export type GetContractQueryResult = Apollo.QueryResult<GetContractQuery, GetContractQueryVariables>;
export const GetFinancialCompaniesDocument = gql`
    query GetFinancialCompanies {
  getFinancialCompanies {
    id
    name
  }
}
    `;

/**
 * __useGetFinancialCompaniesQuery__
 *
 * To run a query within a React component, call `useGetFinancialCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFinancialCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFinancialCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFinancialCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>(GetFinancialCompaniesDocument, options);
      }
export function useGetFinancialCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>(GetFinancialCompaniesDocument, options);
        }
export function useGetFinancialCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>(GetFinancialCompaniesDocument, options);
        }
export type GetFinancialCompaniesQueryHookResult = ReturnType<typeof useGetFinancialCompaniesQuery>;
export type GetFinancialCompaniesLazyQueryHookResult = ReturnType<typeof useGetFinancialCompaniesLazyQuery>;
export type GetFinancialCompaniesSuspenseQueryHookResult = ReturnType<typeof useGetFinancialCompaniesSuspenseQuery>;
export type GetFinancialCompaniesQueryResult = Apollo.QueryResult<GetFinancialCompaniesQuery, GetFinancialCompaniesQueryVariables>;
export const GetDivisionsDocument = gql`
    query GetDivisions {
  getDivisions {
    id
    name
  }
}
    `;

/**
 * __useGetDivisionsQuery__
 *
 * To run a query within a React component, call `useGetDivisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDivisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDivisionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDivisionsQuery(baseOptions?: Apollo.QueryHookOptions<GetDivisionsQuery, GetDivisionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDivisionsQuery, GetDivisionsQueryVariables>(GetDivisionsDocument, options);
      }
export function useGetDivisionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDivisionsQuery, GetDivisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDivisionsQuery, GetDivisionsQueryVariables>(GetDivisionsDocument, options);
        }
export function useGetDivisionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDivisionsQuery, GetDivisionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDivisionsQuery, GetDivisionsQueryVariables>(GetDivisionsDocument, options);
        }
export type GetDivisionsQueryHookResult = ReturnType<typeof useGetDivisionsQuery>;
export type GetDivisionsLazyQueryHookResult = ReturnType<typeof useGetDivisionsLazyQuery>;
export type GetDivisionsSuspenseQueryHookResult = ReturnType<typeof useGetDivisionsSuspenseQuery>;
export type GetDivisionsQueryResult = Apollo.QueryResult<GetDivisionsQuery, GetDivisionsQueryVariables>;
export const GetShippingMethodsDocument = gql`
    query GetShippingMethods {
  getShippingMethods {
    id
    name
  }
}
    `;

/**
 * __useGetShippingMethodsQuery__
 *
 * To run a query within a React component, call `useGetShippingMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShippingMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShippingMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShippingMethodsQuery(baseOptions?: Apollo.QueryHookOptions<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>(GetShippingMethodsDocument, options);
      }
export function useGetShippingMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>(GetShippingMethodsDocument, options);
        }
export function useGetShippingMethodsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>(GetShippingMethodsDocument, options);
        }
export type GetShippingMethodsQueryHookResult = ReturnType<typeof useGetShippingMethodsQuery>;
export type GetShippingMethodsLazyQueryHookResult = ReturnType<typeof useGetShippingMethodsLazyQuery>;
export type GetShippingMethodsSuspenseQueryHookResult = ReturnType<typeof useGetShippingMethodsSuspenseQuery>;
export type GetShippingMethodsQueryResult = Apollo.QueryResult<GetShippingMethodsQuery, GetShippingMethodsQueryVariables>;
export const GetCounselsDocument = gql`
    query GetCounsels($getCounselsDto: GetCounselsDto!) {
  getCounsels(getCounselsDto: $getCounselsDto) {
    id
    status
    counselAt
    context
    customer {
      id
      name
      phone
      customerGroup {
        id
        name
      }
      customerGrade {
        id
        name
      }
      customerStatus {
        id
        status
      }
    }
    contract {
      id
      carName
      division {
        id
        name
      }
    }
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCounselsQuery__
 *
 * To run a query within a React component, call `useGetCounselsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCounselsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCounselsQuery({
 *   variables: {
 *      getCounselsDto: // value for 'getCounselsDto'
 *   },
 * });
 */
export function useGetCounselsQuery(baseOptions: Apollo.QueryHookOptions<GetCounselsQuery, GetCounselsQueryVariables> & ({ variables: GetCounselsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCounselsQuery, GetCounselsQueryVariables>(GetCounselsDocument, options);
      }
export function useGetCounselsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCounselsQuery, GetCounselsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCounselsQuery, GetCounselsQueryVariables>(GetCounselsDocument, options);
        }
export function useGetCounselsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCounselsQuery, GetCounselsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCounselsQuery, GetCounselsQueryVariables>(GetCounselsDocument, options);
        }
export type GetCounselsQueryHookResult = ReturnType<typeof useGetCounselsQuery>;
export type GetCounselsLazyQueryHookResult = ReturnType<typeof useGetCounselsLazyQuery>;
export type GetCounselsSuspenseQueryHookResult = ReturnType<typeof useGetCounselsSuspenseQuery>;
export type GetCounselsQueryResult = Apollo.QueryResult<GetCounselsQuery, GetCounselsQueryVariables>;
export const GetCounselDocument = gql`
    query GetCounsel($counselId: Float!) {
  getCounsel(counselId: $counselId) {
    id
    status
    counselAt
    context
    customer {
      id
      name
      phone
      customerGroup {
        id
        name
      }
      customerGrade {
        id
        name
      }
      customerStatus {
        id
        status
      }
    }
    contract {
      id
      carName
      division {
        id
        name
      }
    }
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCounselQuery__
 *
 * To run a query within a React component, call `useGetCounselQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCounselQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCounselQuery({
 *   variables: {
 *      counselId: // value for 'counselId'
 *   },
 * });
 */
export function useGetCounselQuery(baseOptions: Apollo.QueryHookOptions<GetCounselQuery, GetCounselQueryVariables> & ({ variables: GetCounselQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCounselQuery, GetCounselQueryVariables>(GetCounselDocument, options);
      }
export function useGetCounselLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCounselQuery, GetCounselQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCounselQuery, GetCounselQueryVariables>(GetCounselDocument, options);
        }
export function useGetCounselSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCounselQuery, GetCounselQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCounselQuery, GetCounselQueryVariables>(GetCounselDocument, options);
        }
export type GetCounselQueryHookResult = ReturnType<typeof useGetCounselQuery>;
export type GetCounselLazyQueryHookResult = ReturnType<typeof useGetCounselLazyQuery>;
export type GetCounselSuspenseQueryHookResult = ReturnType<typeof useGetCounselSuspenseQuery>;
export type GetCounselQueryResult = Apollo.QueryResult<GetCounselQuery, GetCounselQueryVariables>;
export const GetCustomersDocument = gql`
    query GetCustomers($getCustomersDto: GetCustomersDto!) {
  getCustomers(getCustomersDto: $getCustomersDto) {
    id
    created_at
    name
    phone
    memo
    note
    type
    contractList {
      carName
      division {
        name
      }
    }
    counselList {
      counselAt
    }
    customerGrade {
      name
    }
    userList {
      name
    }
    customerStatus {
      status
    }
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *      getCustomersDto: // value for 'getCustomersDto'
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables> & ({ variables: GetCustomersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetCustomerDocument = gql`
    query GetCustomer($customerId: Float!) {
  getCustomer(customerId: $customerId) {
    id
    name
    phone
    sub_phone
    type
    created_at
    memo
    note
    userList {
      id
      name
    }
    customerGroup {
      id
      name
    }
    customerStatus {
      id
      status
    }
    contractList {
      id
      company_name_nominee
      division {
        name
      }
      carName
      carOption
      contractPeriod
      agreedMileage
    }
    customerGrade {
      id
      name
    }
    counselList {
      id
      counselAt
      customer {
        name
      }
      user {
        name
      }
      context
    }
  }
}
    `;

/**
 * __useGetCustomerQuery__
 *
 * To run a query within a React component, call `useGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetCustomerQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables> & ({ variables: GetCustomerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
      }
export function useGetCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export function useGetCustomerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export type GetCustomerQueryHookResult = ReturnType<typeof useGetCustomerQuery>;
export type GetCustomerLazyQueryHookResult = ReturnType<typeof useGetCustomerLazyQuery>;
export type GetCustomerSuspenseQueryHookResult = ReturnType<typeof useGetCustomerSuspenseQuery>;
export type GetCustomerQueryResult = Apollo.QueryResult<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetCustomerGroupsDocument = gql`
    query GetCustomerGroups {
  getCustomerGroups {
    id
    name
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useGetCustomerGroupsQuery__
 *
 * To run a query within a React component, call `useGetCustomerGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>(GetCustomerGroupsDocument, options);
      }
export function useGetCustomerGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>(GetCustomerGroupsDocument, options);
        }
export function useGetCustomerGroupsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>(GetCustomerGroupsDocument, options);
        }
export type GetCustomerGroupsQueryHookResult = ReturnType<typeof useGetCustomerGroupsQuery>;
export type GetCustomerGroupsLazyQueryHookResult = ReturnType<typeof useGetCustomerGroupsLazyQuery>;
export type GetCustomerGroupsSuspenseQueryHookResult = ReturnType<typeof useGetCustomerGroupsSuspenseQuery>;
export type GetCustomerGroupsQueryResult = Apollo.QueryResult<GetCustomerGroupsQuery, GetCustomerGroupsQueryVariables>;
export const GetCustomerGradesDocument = gql`
    query GetCustomerGrades {
  getCustomerGrades {
    id
    name
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useGetCustomerGradesQuery__
 *
 * To run a query within a React component, call `useGetCustomerGradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerGradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerGradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerGradesQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>(GetCustomerGradesDocument, options);
      }
export function useGetCustomerGradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>(GetCustomerGradesDocument, options);
        }
export function useGetCustomerGradesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>(GetCustomerGradesDocument, options);
        }
export type GetCustomerGradesQueryHookResult = ReturnType<typeof useGetCustomerGradesQuery>;
export type GetCustomerGradesLazyQueryHookResult = ReturnType<typeof useGetCustomerGradesLazyQuery>;
export type GetCustomerGradesSuspenseQueryHookResult = ReturnType<typeof useGetCustomerGradesSuspenseQuery>;
export type GetCustomerGradesQueryResult = Apollo.QueryResult<GetCustomerGradesQuery, GetCustomerGradesQueryVariables>;
export const GetCustomerStatusesDocument = gql`
    query GetCustomerStatuses {
  getCustomerStatuses {
    id
    status
  }
}
    `;

/**
 * __useGetCustomerStatusesQuery__
 *
 * To run a query within a React component, call `useGetCustomerStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>(GetCustomerStatusesDocument, options);
      }
export function useGetCustomerStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>(GetCustomerStatusesDocument, options);
        }
export function useGetCustomerStatusesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>(GetCustomerStatusesDocument, options);
        }
export type GetCustomerStatusesQueryHookResult = ReturnType<typeof useGetCustomerStatusesQuery>;
export type GetCustomerStatusesLazyQueryHookResult = ReturnType<typeof useGetCustomerStatusesLazyQuery>;
export type GetCustomerStatusesSuspenseQueryHookResult = ReturnType<typeof useGetCustomerStatusesSuspenseQuery>;
export type GetCustomerStatusesQueryResult = Apollo.QueryResult<GetCustomerStatusesQuery, GetCustomerStatusesQueryVariables>;
export const GetDeliveriesDocument = gql`
    query GetDeliveries($getDeliveriesDto: GetDeliveriesDto!) {
  getDeliveries(getDeliveriesDto: $getDeliveriesDto) {
    id
    contractAt
    shippingDate
    customer {
      id
      name
    }
    user {
      id
      name
    }
    financialCompany {
      id
      name
    }
    division {
      id
      name
    }
    carName
    carPrice
    fee
    promotion
    shippingMethod {
      id
      name
    }
  }
}
    `;

/**
 * __useGetDeliveriesQuery__
 *
 * To run a query within a React component, call `useGetDeliveriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveriesQuery({
 *   variables: {
 *      getDeliveriesDto: // value for 'getDeliveriesDto'
 *   },
 * });
 */
export function useGetDeliveriesQuery(baseOptions: Apollo.QueryHookOptions<GetDeliveriesQuery, GetDeliveriesQueryVariables> & ({ variables: GetDeliveriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeliveriesQuery, GetDeliveriesQueryVariables>(GetDeliveriesDocument, options);
      }
export function useGetDeliveriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeliveriesQuery, GetDeliveriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeliveriesQuery, GetDeliveriesQueryVariables>(GetDeliveriesDocument, options);
        }
export function useGetDeliveriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeliveriesQuery, GetDeliveriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeliveriesQuery, GetDeliveriesQueryVariables>(GetDeliveriesDocument, options);
        }
export type GetDeliveriesQueryHookResult = ReturnType<typeof useGetDeliveriesQuery>;
export type GetDeliveriesLazyQueryHookResult = ReturnType<typeof useGetDeliveriesLazyQuery>;
export type GetDeliveriesSuspenseQueryHookResult = ReturnType<typeof useGetDeliveriesSuspenseQuery>;
export type GetDeliveriesQueryResult = Apollo.QueryResult<GetDeliveriesQuery, GetDeliveriesQueryVariables>;
export const GetPayStubsDocument = gql`
    query GetPayStubs($getPayStubDto: GetPayStubDto!) {
  getPayStubs(getPayStubDto: $getPayStubDto) {
    id
    year
    month
    day
    user {
      id
      name
      team {
        id
        name
      }
      position {
        id
        name
      }
    }
    contracts {
      id
      shippingDate
      customer {
        id
        name
      }
      carName
      carPrice
      fee
      promotion
      cashAssistance
      businessExpenses
      service1
      service2
      service3
      serviceBody1
      serviceBody2
      serviceBody3
      netIncome
      totalFee
    }
    totalFeeDelivery
    totalExpenditureDelivery
    totalNetIncomeDelivery
    totalAllowance
    etcIncentive
    incomeTax
    actualSalary
  }
}
    `;

/**
 * __useGetPayStubsQuery__
 *
 * To run a query within a React component, call `useGetPayStubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayStubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayStubsQuery({
 *   variables: {
 *      getPayStubDto: // value for 'getPayStubDto'
 *   },
 * });
 */
export function useGetPayStubsQuery(baseOptions: Apollo.QueryHookOptions<GetPayStubsQuery, GetPayStubsQueryVariables> & ({ variables: GetPayStubsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPayStubsQuery, GetPayStubsQueryVariables>(GetPayStubsDocument, options);
      }
export function useGetPayStubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPayStubsQuery, GetPayStubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPayStubsQuery, GetPayStubsQueryVariables>(GetPayStubsDocument, options);
        }
export function useGetPayStubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPayStubsQuery, GetPayStubsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPayStubsQuery, GetPayStubsQueryVariables>(GetPayStubsDocument, options);
        }
export type GetPayStubsQueryHookResult = ReturnType<typeof useGetPayStubsQuery>;
export type GetPayStubsLazyQueryHookResult = ReturnType<typeof useGetPayStubsLazyQuery>;
export type GetPayStubsSuspenseQueryHookResult = ReturnType<typeof useGetPayStubsSuspenseQuery>;
export type GetPayStubsQueryResult = Apollo.QueryResult<GetPayStubsQuery, GetPayStubsQueryVariables>;
export const GetPayStubDocument = gql`
    query GetPayStub($payStubId: Float!) {
  getPayStub(payStubId: $payStubId) {
    id
    year
    month
    day
    user {
      id
      name
      team {
        id
        name
      }
      position {
        id
        name
      }
    }
    contracts {
      id
      shippingDate
      customer {
        id
        name
      }
      carName
      carPrice
      fee
      promotion
      cashAssistance
      businessExpenses
      service1
      service2
      service3
      serviceBody1
      serviceBody2
      serviceBody3
      netIncome
      totalFee
    }
    totalFeeDelivery
    totalExpenditureDelivery
    totalNetIncomeDelivery
    totalAllowance
    etcIncentive
    incomeTax
    actualSalary
  }
}
    `;

/**
 * __useGetPayStubQuery__
 *
 * To run a query within a React component, call `useGetPayStubQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayStubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayStubQuery({
 *   variables: {
 *      payStubId: // value for 'payStubId'
 *   },
 * });
 */
export function useGetPayStubQuery(baseOptions: Apollo.QueryHookOptions<GetPayStubQuery, GetPayStubQueryVariables> & ({ variables: GetPayStubQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPayStubQuery, GetPayStubQueryVariables>(GetPayStubDocument, options);
      }
export function useGetPayStubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPayStubQuery, GetPayStubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPayStubQuery, GetPayStubQueryVariables>(GetPayStubDocument, options);
        }
export function useGetPayStubSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPayStubQuery, GetPayStubQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPayStubQuery, GetPayStubQueryVariables>(GetPayStubDocument, options);
        }
export type GetPayStubQueryHookResult = ReturnType<typeof useGetPayStubQuery>;
export type GetPayStubLazyQueryHookResult = ReturnType<typeof useGetPayStubLazyQuery>;
export type GetPayStubSuspenseQueryHookResult = ReturnType<typeof useGetPayStubSuspenseQuery>;
export type GetPayStubQueryResult = Apollo.QueryResult<GetPayStubQuery, GetPayStubQueryVariables>;
export const CheckSettleContractDocument = gql`
    query CheckSettleContract($checkSettleContractDto: CheckSettleContractDto!) {
  checkSettleContract(checkSettleContractDto: $checkSettleContractDto)
}
    `;

/**
 * __useCheckSettleContractQuery__
 *
 * To run a query within a React component, call `useCheckSettleContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckSettleContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckSettleContractQuery({
 *   variables: {
 *      checkSettleContractDto: // value for 'checkSettleContractDto'
 *   },
 * });
 */
export function useCheckSettleContractQuery(baseOptions: Apollo.QueryHookOptions<CheckSettleContractQuery, CheckSettleContractQueryVariables> & ({ variables: CheckSettleContractQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckSettleContractQuery, CheckSettleContractQueryVariables>(CheckSettleContractDocument, options);
      }
export function useCheckSettleContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckSettleContractQuery, CheckSettleContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckSettleContractQuery, CheckSettleContractQueryVariables>(CheckSettleContractDocument, options);
        }
export function useCheckSettleContractSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckSettleContractQuery, CheckSettleContractQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckSettleContractQuery, CheckSettleContractQueryVariables>(CheckSettleContractDocument, options);
        }
export type CheckSettleContractQueryHookResult = ReturnType<typeof useCheckSettleContractQuery>;
export type CheckSettleContractLazyQueryHookResult = ReturnType<typeof useCheckSettleContractLazyQuery>;
export type CheckSettleContractSuspenseQueryHookResult = ReturnType<typeof useCheckSettleContractSuspenseQuery>;
export type CheckSettleContractQueryResult = Apollo.QueryResult<CheckSettleContractQuery, CheckSettleContractQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  getTeams {
    id
    name
    created_at
    updated_at
    deleted_at
    userList {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export function useGetTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsSuspenseQueryHookResult = ReturnType<typeof useGetTeamsSuspenseQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const GetTeamDocument = gql`
    query GetTeam($teamId: Float!) {
  getTeam(teamId: $teamId) {
    id
    name
    created_at
    updated_at
    deleted_at
    userList {
      id
      name
      email
      created_at
      position {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables> & ({ variables: GetTeamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export function useGetTeamSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamSuspenseQueryHookResult = ReturnType<typeof useGetTeamSuspenseQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    email
    password
    position {
      id
      name
    }
    role {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: Float!) {
  getUser(userId: $userId) {
    id
    name
    email
    password
    position {
      id
      name
    }
    role {
      id
      name
    }
    team {
      id
      name
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetPositionsDocument = gql`
    query GetPositions {
  getPositions {
    id
    name
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useGetPositionsQuery__
 *
 * To run a query within a React component, call `useGetPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPositionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
      }
export function useGetPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export function useGetPositionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPositionsQuery, GetPositionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPositionsQuery, GetPositionsQueryVariables>(GetPositionsDocument, options);
        }
export type GetPositionsQueryHookResult = ReturnType<typeof useGetPositionsQuery>;
export type GetPositionsLazyQueryHookResult = ReturnType<typeof useGetPositionsLazyQuery>;
export type GetPositionsSuspenseQueryHookResult = ReturnType<typeof useGetPositionsSuspenseQuery>;
export type GetPositionsQueryResult = Apollo.QueryResult<GetPositionsQuery, GetPositionsQueryVariables>;
export const GetTopFiveDeliveryUsersByMonthDocument = gql`
    query GetTopFiveDeliveryUsersByMonth($getTopFiveDeliveryUsersByMonthDto: GetDashBoardByUsersDto!) {
  getTopFiveDeliveryUsersByMonth(
    getTopFiveDeliveryUsersByMonthDto: $getTopFiveDeliveryUsersByMonthDto
  ) {
    user {
      id
      name
    }
    year
    month
    totalCountDelivery
    totalFeeDelivery
  }
}
    `;

/**
 * __useGetTopFiveDeliveryUsersByMonthQuery__
 *
 * To run a query within a React component, call `useGetTopFiveDeliveryUsersByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopFiveDeliveryUsersByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopFiveDeliveryUsersByMonthQuery({
 *   variables: {
 *      getTopFiveDeliveryUsersByMonthDto: // value for 'getTopFiveDeliveryUsersByMonthDto'
 *   },
 * });
 */
export function useGetTopFiveDeliveryUsersByMonthQuery(baseOptions: Apollo.QueryHookOptions<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables> & ({ variables: GetTopFiveDeliveryUsersByMonthQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>(GetTopFiveDeliveryUsersByMonthDocument, options);
      }
export function useGetTopFiveDeliveryUsersByMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>(GetTopFiveDeliveryUsersByMonthDocument, options);
        }
export function useGetTopFiveDeliveryUsersByMonthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>(GetTopFiveDeliveryUsersByMonthDocument, options);
        }
export type GetTopFiveDeliveryUsersByMonthQueryHookResult = ReturnType<typeof useGetTopFiveDeliveryUsersByMonthQuery>;
export type GetTopFiveDeliveryUsersByMonthLazyQueryHookResult = ReturnType<typeof useGetTopFiveDeliveryUsersByMonthLazyQuery>;
export type GetTopFiveDeliveryUsersByMonthSuspenseQueryHookResult = ReturnType<typeof useGetTopFiveDeliveryUsersByMonthSuspenseQuery>;
export type GetTopFiveDeliveryUsersByMonthQueryResult = Apollo.QueryResult<GetTopFiveDeliveryUsersByMonthQuery, GetTopFiveDeliveryUsersByMonthQueryVariables>;
export const GetTopFiveTotalFeeDeliveryUsersByMonthDocument = gql`
    query GetTopFiveTotalFeeDeliveryUsersByMonth($getTopFiveTotalFeeDeliveryUsersByMonthDto: GetDashBoardByUsersDto!) {
  getTopFiveTotalFeeDeliveryUsersByMonth(
    getTopFiveTotalFeeDeliveryUsersByMonthDto: $getTopFiveTotalFeeDeliveryUsersByMonthDto
  ) {
    user {
      id
      name
    }
    year
    month
    totalFeeDelivery
    totalCountDelivery
  }
}
    `;

/**
 * __useGetTopFiveTotalFeeDeliveryUsersByMonthQuery__
 *
 * To run a query within a React component, call `useGetTopFiveTotalFeeDeliveryUsersByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopFiveTotalFeeDeliveryUsersByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopFiveTotalFeeDeliveryUsersByMonthQuery({
 *   variables: {
 *      getTopFiveTotalFeeDeliveryUsersByMonthDto: // value for 'getTopFiveTotalFeeDeliveryUsersByMonthDto'
 *   },
 * });
 */
export function useGetTopFiveTotalFeeDeliveryUsersByMonthQuery(baseOptions: Apollo.QueryHookOptions<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables> & ({ variables: GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>(GetTopFiveTotalFeeDeliveryUsersByMonthDocument, options);
      }
export function useGetTopFiveTotalFeeDeliveryUsersByMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>(GetTopFiveTotalFeeDeliveryUsersByMonthDocument, options);
        }
export function useGetTopFiveTotalFeeDeliveryUsersByMonthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>(GetTopFiveTotalFeeDeliveryUsersByMonthDocument, options);
        }
export type GetTopFiveTotalFeeDeliveryUsersByMonthQueryHookResult = ReturnType<typeof useGetTopFiveTotalFeeDeliveryUsersByMonthQuery>;
export type GetTopFiveTotalFeeDeliveryUsersByMonthLazyQueryHookResult = ReturnType<typeof useGetTopFiveTotalFeeDeliveryUsersByMonthLazyQuery>;
export type GetTopFiveTotalFeeDeliveryUsersByMonthSuspenseQueryHookResult = ReturnType<typeof useGetTopFiveTotalFeeDeliveryUsersByMonthSuspenseQuery>;
export type GetTopFiveTotalFeeDeliveryUsersByMonthQueryResult = Apollo.QueryResult<GetTopFiveTotalFeeDeliveryUsersByMonthQuery, GetTopFiveTotalFeeDeliveryUsersByMonthQueryVariables>;