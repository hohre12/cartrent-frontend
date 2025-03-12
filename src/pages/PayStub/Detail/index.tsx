import { UserPositionHangleEnum } from '@/constants/user';
import { useGetPayStub } from '@/services/payStub';
import { numberFormat } from '@/utils/common';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const PayStubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const payStubIdx = Number(id);
  const { data, loading, error } = useGetPayStub(payStubIdx);
  const detail = data?.getPayStub;
  if (!detail) return <></>;
  return (
    <>
      <DetailWrapper>
        <DetailHeaderWrapper>
          <div className="left">
            <h2>{`${detail.user.name} 님의 ${detail.year}년 ${detail.month}월 급여명세서`}</h2>
          </div>
        </DetailHeaderWrapper>
        <PayStubForm>
          <Title>급여명세서</Title>
          <FlexContainer>
            <LeftSection>
              <b style={{ fontSize: '48px', marginTop: '20px' }}>
                {detail.user?.name ? `${detail.user.name}` : '-'}
              </b>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '24px', lineHeight: '24px' }}>
                  {detail.user?.team?.name ?? '팀 없음'}
                </p>
                <p style={{ fontSize: '24px', lineHeight: '24px' }}>
                  {detail.user?.position
                    ? UserPositionHangleEnum[detail.user.position.name]
                    : '-'}
                </p>
              </div>
            </LeftSection>
            <RightSection>
              <AmountInfo>
                <span style={{ fontSize: '36px', lineHeight: '36px' }}>
                  실수령액
                </span>
                <p style={{ fontSize: '36px', lineHeight: '36px' }}>
                  {detail.actualSalary
                    ? `${numberFormat(detail.actualSalary)}원`
                    : '없음'}
                </p>
              </AmountInfo>
              <AmountInfo>
                <span
                  style={{
                    color: '#999',
                    fontSize: '24px',
                    lineHeight: '24px',
                  }}
                >
                  매출합계
                </span>
                <p
                  style={{ fontSize: '24px', width: '20%', lineHeight: '24px' }}
                >
                  {detail.totalFeeDelivery
                    ? `${numberFormat(detail.totalFeeDelivery)}원`
                    : '없음'}
                </p>
              </AmountInfo>
              <AmountInfo>
                <span
                  style={{
                    color: '#999',
                    fontSize: '24px',
                    lineHeight: '24px',
                  }}
                >
                  지원합계
                </span>
                <p
                  style={{ fontSize: '24px', width: '20%', lineHeight: '24px' }}
                >
                  {detail.totalExpenditureDelivery
                    ? `${numberFormat(detail.totalExpenditureDelivery)}원`
                    : '없음'}
                </p>
              </AmountInfo>
              <AmountInfo>
                <span
                  style={{
                    color: '#999',
                    fontSize: '24px',
                    lineHeight: '24px',
                  }}
                >
                  정산합계
                </span>
                <p
                  style={{ fontSize: '24px', width: '20%', lineHeight: '24px' }}
                >
                  {detail.totalNetIncomeDelivery
                    ? `${numberFormat(detail.totalNetIncomeDelivery)}원`
                    : '없음'}
                </p>
              </AmountInfo>
              <AmountInfo>
                <span
                  style={{
                    color: '#999',
                    fontSize: '24px',
                    lineHeight: '24px',
                  }}
                >
                  수당합계
                </span>
                <p
                  style={{ fontSize: '24px', width: '20%', lineHeight: '24px' }}
                >
                  {detail.totalAllowance
                    ? `${numberFormat(detail.totalAllowance)}원`
                    : '없음'}
                </p>
              </AmountInfo>
              <AmountInfo>
                <span
                  style={{
                    color: '#999',
                    fontSize: '24px',
                    lineHeight: '24px',
                  }}
                >
                  소득세
                </span>
                <p
                  style={{ fontSize: '24px', width: '20%', lineHeight: '24px' }}
                >
                  {detail.income_tax
                    ? `${numberFormat(detail.income_tax)}원`
                    : '없음'}
                </p>
              </AmountInfo>
            </RightSection>
          </FlexContainer>

          <SectionTitle>매출세부내역</SectionTitle>
          <Divider />
          <Table>
            <thead>
              <tr>
                <Th>출고일</Th>
                <Th>고객명</Th>
                <Th>차종</Th>
                <Th>차량금액</Th>
                <Th>수수료</Th>
                <Th>지원금액</Th>
              </tr>
            </thead>
            <tbody>
              {detail.contracts?.map((it, idx) => (
                <tr key={idx}>
                  <Td>{it.shippingDate}</Td>
                  <Td>{it.customer?.name ?? '-'}</Td>
                  <Td>{it.carName ?? '-'}</Td>
                  <Td>{numberFormat(it.carPrice)}</Td>
                  <Td>{numberFormat(it.totalFee)}</Td>
                  <Td>
                    {numberFormat(
                      (it.cashAssistance ?? 0) + (it.businessExpenses ?? 0),
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <SectionTitle style={{ marginTop: '150px' }}>
            지원금세부내역
          </SectionTitle>
          <Divider />
          <Table>
            <thead>
              <tr>
                <Th>출고일</Th>
                <Th>고객명</Th>
                <Th>내용1</Th>
                <Th>내용2</Th>
                <Th>내용3</Th>
              </tr>
            </thead>
            <tbody>
              {detail.contracts?.map((it, idx) => (
                <tr key={idx}>
                  <Td>{it.shippingDate}</Td>
                  <Td>{it.customer?.name ?? '-'}</Td>
                  <Td>{it.serviceBody1 ?? '-'}</Td>
                  <Td>{it.serviceBody2 ?? '-'}</Td>
                  <Td>{it.serviceBody3 ?? '-'}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Footer>
            <div>
              <p style={{ fontSize: '36px', lineHeight: '36px' }}>
                위 금액을 지불하였음을 증명함.
              </p>
              <p style={{ fontSize: '36px', lineHeight: '36px' }}>
                {`${detail.year}년 ${detail.month}월 ${'몇'}일`}
              </p>
            </div>
            <p style={{ fontSize: '36px', lineHeight: '36px' }}>
              귀하의 노고에 감사드립니다.
            </p>
            <b style={{ fontSize: '48px', lineHeight: '48px' }}>
              주식회사 카트 대표 박근환
            </b>
          </Footer>
        </PayStubForm>
        {/* <div dangerouslySetInnerHTML={{ __html: adjustmentForm() }}></div> */}
      </DetailWrapper>
    </>
  );
};

export default PayStubDetail;

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

export const PayStubForm = styled.div`
  position: relative;
  /* height: 1500px; */
  width: 100%;
  margin: 0 auto;
  padding: 100px 50px;
  box-sizing: border-box;
  background: #fff;
`;

export const Title = styled.div`
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 40px;
  border-bottom: 2px solid #111;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

export const LeftSection = styled.div`
  width: 48%;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

export const RightSection = styled.div`
  width: 48%;
  text-align: right;
`;

export const AmountInfo = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
`;

export const SectionTitle = styled.h3`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 28px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const Th = styled.th`
  font-size: 24px;
  padding: 8px;
`;

export const Td = styled.td`
  font-size: 20px;
  padding: 8px;
`;

export const Footer = styled.div`
  margin-top: 180px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;
