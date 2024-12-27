import { TCustomerList } from '@/types/customer';

export const dummyCustomerList: TCustomerList[] = [
  {
    userIdx: 1,
    status: '정상',
    name: '테스트1',
    customerGroup: {
      id: 1,
      name: '고객그룹',
      createdAt: '생성',
      updatedAt: '수정',
      deletedAt: '삭제',
    },
    phone: '010-4405-1001',
    email: '이메일',
    address: '주소',
    birth: '생년월일',
    job: '직업',
    createdAt: '고객 생성일시',
    updatedAt: '고객 마지막 수정일시',
  },
];
