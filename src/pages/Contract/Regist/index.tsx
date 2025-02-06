import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetCustomers } from '@/services/customer';
import { userState } from '@/state/auth';
import { textM16Medium, titleXl20Bold } from '@/styles/typography';
import { CreateContractDto, Customer } from '@/types/graphql';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const ContractRegist = () => {
  const { id } = useParams();
  const customerIdx = Number(id);
  const user = useRecoilValue(userState);
  const { addToast } = useToast();
  const { data: customers } = useGetCustomers({});

  const [createContract, setCreateContract] = useState<CreateContractDto>();

  const [customer, setCustomer] = useState<Customer>();
  useEffect(() => {
    if (
      user &&
      customerIdx &&
      customers &&
      customers?.getCustomers?.length > 0
    ) {
      setCustomer(customers.getCustomers.find((it) => it.id === customerIdx));
      setCreateContract((prevState) => ({
        ...prevState,
        customerId: customerIdx,
        userId: user.id,
      }));
    }
  }, [user, customerIdx, setCustomer, customers]);

  return (
    <DetailWrapper>
      <DetailHeaderWrapper>
        <div className="left">
          <h2>{`계약 등록`}</h2>
        </div>
        <div className="right">
          <Button>등록</Button>
        </div>
      </DetailHeaderWrapper>
      <InfoWrapper>
        <InfoBoxWrapper>
          <h5>계약내용 입력</h5>
          <InfoBox>
            <InputLine>
              <span>담당자</span>
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
              <span>지역</span>
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
              <span>계약날짜</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>고객명</span>
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
              <span>차종</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>차 옵션</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>외장색상</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>내장색상</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>총차량가</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>금융사</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>구분</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>수수료</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>월 납입료</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>출고 방식</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지점명</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지점 수수료</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>담보율</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 기간</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 거리</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>보험 연령</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>대물</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
          </InfoBox>
        </InfoBoxWrapper>
        <InfoBoxWrapper>
          <h5>계약내용 추가 입력 (관리자 전용)</h5>
          <InfoBox>
            <InputLine>
              <span>계약 내용</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>계약 타입</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>출고 일</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>수수료 비율</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>총 수수료</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>담보 종류</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>순수익</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>발비</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>발비 내용</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>소득자</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>정산 수수료</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>발주 여부</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>상품</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>이외 추가 금액</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>총 지출</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>총 계약 금액</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>은행</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>부가세 지원 여부 - 체크박스</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>부가세</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>프로모션</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>현금 지원</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지원 내용</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>서비스 1</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>서비스 내용 1</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>서비스 2</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>서비스 내용 2</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>서비스 3</span>
              <InputWrapper>
                <Input />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>서비스 내용 3</span>
              <InputWrapper>
                <Input />
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
  }
`;
const InputWrapper = styled.div`
  width: 400px;
`;
