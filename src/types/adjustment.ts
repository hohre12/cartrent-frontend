export type TAdjustment = {
  name: string; // 이름
  team?: string; // 팀
  rank?: string; // 직급
  salary?: number; // 실수령액
  total_sales?: number; // 매출합계
  total_support?: number; // 지원합계
  total_adjustment?: number; // 정산합계
  total_allowance?: number; // 수당합계
  income_tax?: number; // 소득세
  sales_details?: TSalesDetail[]; // 매출세부내역
  support_details?: TSupportDetail[]; // 지원금세부내역
};

export type TSalesDetail = {
  shipping_date: string; // 출고일
  customer_name: string; // 고객명
  vehicle: string; // 차종
  car_amount: number; // 차량금액
  charge: number; // 수수료
  support_amount?: number; // 지원금액
};
export type TSupportDetail = {
  shipping_date: string; // 출고일
  customer_name: string; // 고객명
  memo?: string; // 내용
};
