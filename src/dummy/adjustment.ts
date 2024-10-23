import { TAdjustment } from '@/types/adjustment';

export const dummyAdjustment: TAdjustment = {
  name: '테스터',
  team: '영업팀',
  rank: '과장',
  salary: 4671915,
  total_sales: 11262700,
  total_support: 1600000,
  total_adjustment: 9662700,
  total_allowance: 4831350,
  income_tax: 159435,
  sales_details: [
    {
      shipping_date: '2024-07-06',
      customer_name: '임진영',
      vehicle: '카니발 HEV',
      car_amount: 48850000,
      charge: 5373500,
      support_amount: 1600000,
    },
  ],
  support_details: [
    {
      shipping_date: '2024-07-06',
      customer_name: '임진영',
      memo: '소개비',
    },
  ],
};
