import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetCites } from '@/services/city';
import {
  useCreateContract,
  useGetDivisions,
  useGetFinancialCompanies,
  useGetShippingMethods,
} from '@/services/contract';
import { useGetCustomers } from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { textM16Medium, titleXl20Bold } from '@/styles/typography';
import {
  City,
  CreateContractDto,
  Customer,
  Division,
  FinancialCompany,
  ShippingMethod,
  User,
} from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const ContractRegist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customerIdx = Number(id);
  const my = useRecoilValue(userState);
  const { addToast } = useToast();
  const [submit, setSubmit] = useState<boolean>(false);

  const { data: users } = useGetUsers();
  const { data: customers } = useGetCustomers({});
  const { data: cites } = useGetCites({});
  const { data: financialCompanies } = useGetFinancialCompanies();
  const { data: divisions } = useGetDivisions();
  const { data: shippingMethods } = useGetShippingMethods();

  const [createContract, setCreateContract] = useState<CreateContractDto>({
    customerId: 0,
    carName: '',
    userId: my ? my.id : 0,
  });

  const [customer, setCustomer] = useState<Customer>();
  const [city, setCity] = useState<City>();
  const [user, setUser] = useState<User>();

  const [financialCompany, setFinancialCompany] = useState<FinancialCompany>();
  const [division, setDivision] = useState<Division>();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>();

  const { createContractMutation } = useCreateContract();

  const handleValueChange = (value: string | number | boolean, key: string) => {
    if (
      (key === 'fee' || key === 'feeRate') &&
      createContract?.carPrice &&
      typeof value === 'number'
    ) {
      const feeObject = {
        [key]: value,
        ...(key === 'fee' && {
          feeRate: (value / createContract.carPrice) * 100,
        }),
        ...(key === 'feeRate' && {
          fee: (value * createContract.carPrice) / 100,
        }),
      };

      setCreateContract((prevState) => ({
        ...prevState,
        ...feeObject,
        customerId: customer ? customer.id : customerIdx,
        userId: user ? user.id : my ? my.id : 0,
      }));
    } else {
      setCreateContract((prevState) => ({
        ...prevState,
        [key]: value,
        customerId: customer ? customer.id : customerIdx,
        userId: user ? user.id : my ? my.id : 0,
      }));
    }
  };

  const handleContractRegist = async () => {
    setSubmit(true);
    if (!my) return;
    if (!customer) return;
    if (!createContract?.carName) return;
    try {
      const createContractPayload: CreateContractDto = {
        ...createContract,
        userId: user ? user.id : my.id,
        customerId: customer.id,
        // 셀렉
        cityId: city?.id,
        financialCompanyId: financialCompany?.id,
        divisionId: division?.id,
        shippingMethodId: shippingMethod?.id,
      };

      console.log(createContractPayload);

      const response = await createContractMutation(createContractPayload);
      if (response && response.data.createContract.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${customer.name} 고객님의 계약이 등록되었습니다.`,
          type: 'success',
        });
        navigate('/contract');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (my) {
      setUser(my);
      if (customerIdx && customers && customers?.getCustomers?.length > 0) {
        setCustomer(customers.getCustomers.find((it) => it.id === customerIdx));
        setCreateContract((prevState) => ({
          ...prevState,
          customerId: customerIdx,
          userId: my.id,
        }));
      }
    }
  }, [my, customerIdx, setCustomer, customers]);

  return (
    <DetailWrapper>
      <DetailHeaderWrapper>
        <div className="left">
          <h2>{`계약 등록`}</h2>
        </div>
        <div className="right">
          <Button onClick={handleContractRegist}>등록</Button>
        </div>
      </DetailHeaderWrapper>
      <InfoWrapper>
        <InfoBoxWrapper>
          <h5>계약내용 입력</h5>
          <InfoBox>
            <InputLine>
              <span>
                담당자 <p className="required">*</p>
              </span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...user,
                  }}
                  onChange={(value) => setUser(value)}
                  list={users?.getUsers ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="담당자를 선택해주세요"
                  disabled={false}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지역</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...city,
                  }}
                  onChange={(value) => setCity(value)}
                  list={cites?.getCities ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="지역을 선택해주세요"
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>계약날짜</span>
              <InputWrapper>
                <Input
                  type="date"
                  style={{ cursor: 'pointer' }}
                  onTextChange={(text) => handleValueChange(text, 'contractAt')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>
                고객명 <p className="required">*</p>
              </span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...customer,
                  }}
                  onChange={(value) => setCustomer(value)}
                  list={customers?.getCustomers ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="고객을 선택해주세요"
                  disabled={!!customerIdx}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>회사명/명의자</span>
              <InputWrapper>
                <Input
                  value={createContract?.company_name_nominee ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'company_name_nominee')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>
                차종 <p className="required">*</p>
              </span>
              <InputWrapper>
                <Input
                  value={createContract?.carName}
                  onTextChange={(text) => handleValueChange(text, 'carName')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>차 옵션</span>
              <InputWrapper>
                <Input
                  value={createContract?.carOption ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'carOption')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>외장색상</span>
              <InputWrapper>
                <Input
                  value={createContract?.outerColor ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'outerColor')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>내장색상</span>
              <InputWrapper>
                <Input
                  value={createContract?.innerColor ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'innerColor')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>총차량가</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.carPrice
                      ? numberFormat(createContract.carPrice)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'carPrice',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>금융사</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...financialCompany,
                  }}
                  onChange={(value) => setFinancialCompany(value)}
                  list={financialCompanies?.getFinancialCompanies ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="금융사를 선택해주세요"
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>구분</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...division,
                  }}
                  onChange={(value) => setDivision(value)}
                  list={divisions?.getDivisions ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="구분을 선택해주세요"
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>수수료</span>
              <InputWrapper>
                <Input
                  disabled={!createContract?.carPrice}
                  value={
                    createContract?.fee ? numberFormat(createContract.fee) : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'fee')
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>수수료 비율</span>
              <InputWrapper>
                <Input
                  disabled={!createContract?.carPrice}
                  value={
                    createContract?.feeRate
                      ? numberFormat(createContract.feeRate)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'feeRate')
                  }
                  max={100}
                  type="number"
                  isNumber
                  postfixNode={'%'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>프로모션</span>
              <InputWrapper>
                <Input
                  disabled={!createContract?.carPrice}
                  onTextChange={(text) => {
                    if (createContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * createContract.carPrice) / 100,
                        'promotion',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!createContract?.carPrice}
                  value={
                    createContract?.promotion
                      ? numberFormat(createContract.promotion)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'promotion',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>월 납입료</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.monthlyPayment
                      ? numberFormat(createContract.monthlyPayment)
                      : 0
                  }
                  isNumber
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'monthlyPayment',
                    )
                  }
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>출고 방식</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...shippingMethod,
                  }}
                  onChange={(value) => setShippingMethod(value)}
                  list={shippingMethods?.getShippingMethods ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="출고방식을 선택해주세요"
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지점명</span>
              <InputWrapper>
                <Input
                  value={createContract?.branch ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'branch')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지점 수수료</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.branchFee
                      ? numberFormat(createContract.branchFee)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'branchFee',
                    )
                  }
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>선납금</span>
              <InputWrapper>
                <Input
                  disabled={
                    !!createContract?.security || !createContract?.carPrice
                  }
                  onTextChange={(text) => {
                    if (createContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * createContract.carPrice) / 100,
                        'advancePayment',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={
                    !!createContract?.security || !createContract?.carPrice
                  }
                  value={
                    createContract?.advancePayment
                      ? numberFormat(createContract.advancePayment)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'advancePayment',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>보증금</span>
              <InputWrapper>
                <Input
                  disabled={
                    !!createContract?.advancePayment ||
                    !createContract?.carPrice
                  }
                  onTextChange={(text) => {
                    if (createContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * createContract.carPrice) / 100,
                        'security',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={
                    !!createContract?.advancePayment ||
                    !createContract?.carPrice
                  }
                  value={
                    createContract?.security
                      ? numberFormat(createContract.security)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'security',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 기간</span>
              <InputWrapper>
                <Input
                  type="date"
                  style={{ cursor: 'pointer' }}
                  onTextChange={(text) =>
                    handleValueChange(text, 'contractPeriodStartAt')
                  }
                />
                <span>~</span>
                <Input
                  type="date"
                  style={{ cursor: 'pointer' }}
                  onTextChange={(text) =>
                    handleValueChange(text, 'contractPeriodEndAt')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 거리</span>
              <InputWrapper>
                <Input
                  postfixNode={'km'}
                  value={
                    createContract?.agreedMileage
                      ? numberFormat(createContract.agreedMileage)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'agreedMileage',
                    )
                  }
                  isNumber
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>보험 연령</span>
              <InputWrapper>
                <Input
                  postfixNode={'세'}
                  value={
                    createContract?.insuranceAge
                      ? numberFormat(createContract.insuranceAge)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'insuranceAge',
                    )
                  }
                  isNumber
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>대물</span>
              <InputWrapper>
                <Input
                  value={createContract?.object ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'object')}
                />
              </InputWrapper>
            </InputLine>
          </InfoBox>
        </InfoBoxWrapper>
        <InfoBoxWrapper>
          <h5>계약내용 추가 입력 (관리자 전용)</h5>
          <InfoBox>
            <InputLine>
              <span>출고 일</span>
              <InputWrapper>
                <Input
                  type="date"
                  style={{ cursor: 'pointer' }}
                  onTextChange={(text) =>
                    handleValueChange(text, 'shippingDate')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>부가세 지원 여부</span>
              <InputWrapper>
                <Checkbox
                  value={createContract?.isVATSupport ?? false}
                  onCheckedChange={(val) => {
                    handleValueChange(val, 'isVATSupport');
                  }}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>출고여부</span>
              <InputWrapper>
                <Checkbox
                  value={createContract?.isOrdering ?? false}
                  onCheckedChange={(val) => {
                    handleValueChange(val, 'isOrdering');
                  }}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>품의내용 1</span>
              <InputWrapper>
                <Input
                  value={createContract?.serviceBody1 ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'serviceBody1')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>품의내용 2</span>
              <InputWrapper>
                <Input
                  value={createContract?.serviceBody2 ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'serviceBody2')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>품의내용 3</span>
              <InputWrapper>
                <Input
                  value={createContract?.serviceBody3 ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'serviceBody3')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>품의금액 1</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.service1
                      ? numberFormat(createContract.service1)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'service1',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>품의금액 2</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.service2
                      ? numberFormat(createContract.service2)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'service2',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>품의금액 3</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.service3
                      ? numberFormat(createContract.service3)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'service3',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>현금 지원</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.cashAssistance
                      ? numberFormat(createContract.cashAssistance)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'cashAssistance',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>소득자</span>
              <InputWrapper>
                <Input
                  value={createContract?.incomeEarner ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'incomeEarner')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지원 내용</span>
              <InputWrapper>
                <Input
                  value={createContract?.supportDetails ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'supportDetails')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>경비</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.businessExpenses
                      ? numberFormat(createContract.businessExpenses)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'businessExpenses',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>경비내용</span>
              <InputWrapper>
                <Input
                  value={createContract?.businessExpensesDetail ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'businessExpensesDetail')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>매출합계</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.totalFee
                      ? numberFormat(createContract.totalFee)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'totalFee',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지출합계</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.totalExpenditure
                      ? numberFormat(createContract.totalExpenditure)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'totalExpenditure',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>순익합계</span>
              <InputWrapper>
                <Input
                  value={
                    createContract?.netIncome
                      ? numberFormat(createContract.netIncome)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'netIncome',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
          </InfoBox>
        </InfoBoxWrapper>
      </InfoWrapper>
    </DetailWrapper>
  );
};

export default ContractRegist;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > h6 {
    font-size: 20px;
  }
`;

const DetailHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 30px;
  border-bottom: 1px solid #eeeeee;
  .left {
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .right {
    font-weight: 700;
    display: flex;
    gap: 10px;
    button {
      width: 100px;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: left;
  padding: 20px 30px;
`;
const InfoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > h5 {
    ${titleXl20Bold}
  }
`;
const InfoBox = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const InputLine = styled.div`
  display: flex;
  min-height: 50px;
  padding: 15px 0;
  align-items: center;
  & > span {
    ${textM16Medium}
    width: 250px;
    display: flex;
    gap: 5px;
  }
`;
const InputWrapper = styled.div`
  width: 400px;
  display: flex;
  gap: 20px;
  align-items: center;
`;
