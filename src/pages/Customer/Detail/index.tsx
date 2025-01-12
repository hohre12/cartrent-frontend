import { GET_CUSTOMER_QUERY } from '@/apollo/queries/customer';
import Checkbox from '@/components/checkbox/Checkbox';
import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import { selectedCustomerIdxState } from '@/state/customer';
import {
  textM16Regular,
  textS14Medium,
  textS14Regular,
} from '@/styles/typography';
import { TCustomer } from '@/types/customer';
import { useQuery } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CustomerDetail = () => {
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);
  const { data, loading, error } = useQuery<
    { getCustomer: TCustomer },
    { customerId: number }
  >(GET_CUSTOMER_QUERY, {
    variables: { customerId: selectedCustomerIdx },
  });

  const detail = data?.getCustomer;
  if (!detail) return <></>;

  return (
    <DetailWrapper>
      <InfoWrapper>
        <div className="ControlWrapper">
          <div>
            <SvgIcon iconName="icon-setting" />
          </div>
          <div>
            <SvgIcon iconName="icon-trash" />
          </div>
        </div>
        <div className="ProfileWrapper">
          <SvgIcon
            iconName="icon-member"
            style={{ background: '#eee' }}
          />
        </div>
        <div className="Info">
          <div>
            <span>고객명</span>
            <Input
              disabled
              value={detail.name}
            ></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객그룹</span>
            <Input
              disabled
              value={detail.customerGroup?.name}
            ></Input>
          </div>
          <div>
            <span>담당자</span>
            <Input
              disabled
              value={detail.userList.name}
            ></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객번호</span>
            <Input
              disabled
              value={detail.id}
            ></Input>
          </div>
          <div>
            <span>고객등급</span>
            <Input
              disabled
              value={detail.customerGrade?.name}
            ></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객연락처</span>
            <Input
              disabled
              value={detail.phone}
            ></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>주소</span>
            <Input
              disabled
              value={detail.address}
            ></Input>
            <Input
              disabled
              value={detail.address}
            ></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>메모</span>
            <Input
              disabled
              value={detail.memo}
            ></Input>
          </div>
          <div>
            <span>등록일</span>
            <Input
              disabled
              value={detail.created_at}
            ></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>문자수신</span>
            <Checkbox></Checkbox>
            <p>거부</p>
          </div>
          <div>
            <span>생년월일</span>
            <Input
              disabled
              value={detail.birth}
            ></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>초기포인트</span>
            <Input disabled></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>파일첨부</span>
            <Input disabled></Input>
          </div>
        </div>
      </InfoWrapper>
      {/* <BoxWrapper>
        <div className="Box">
          <p>고객요청</p>
          <span>고객1</span>
        </div>
        <div className="Box">
          <p>예약</p>
          <span>9건</span>
        </div>
        <div className="Box">
          <p>상담</p>
          <span>2건</span>
        </div>
        <div className="Box">
          <p>판매</p>
          <span>160,000원</span>
        </div>
        <div className="Box">
          <p>정액/쿠폰</p>
          <span>10회</span>
        </div>
      </BoxWrapper> */}
      <HistoryWrapper>
        {detail.counselList?.map((it, idx) => (
          <div key={idx}>
            <SvgIcon iconName="icon-edit" />
            <div className="DateTimeWrapper">
              <span>{it.created_at}</span>
              <p>{it.created_at}</p>
            </div>
            <div className="HistoryText">
              고객명 : {it.customer?.name}
              <br></br>
              상담사 : {it.user?.name}
              <br></br>
              상담내용 : {it.context}
            </div>
          </div>
        ))}
      </HistoryWrapper>
    </DetailWrapper>
  );
};

export default CustomerDetail;

export const DetailWrapper = styled.div`
  //   width: calc(100% - 770px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 800px;
`;

export const InfoWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  gap: 20px;
  height: 400px;
  .ControlWrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    & > div {
      border: 1px solid #eee;
      border-radius: 5px;
    }
  }
  .ProfileWrapper {
    width: 150px;
    height: 150px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .Info {
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: 700px;
    & > div {
      ${textS14Regular}
      display: flex;
      align-items: center;
      gap: 5px;
      width: 45%;
      height: 40px;
      span {
        text-align: right;
      }
    }
  }
`;
export const BoxWrapper = styled.div`
  display: flex;
  gap: 5px;
  .Box {
    ${textS14Medium}
    font-weight: 600;
    width: 20%;
    height: 70px;
    padding: 5px;
    background: #212533;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      color: #fff;
      text-align: left;
    }
    span {
      color: #1aa18f;
      text-align: right;
    }
  }
`;
export const HistoryWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
    .DateTimeWrapper {
      text-align: right;
      width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      span {
        font-weight: 600;
      }
      p {
        ${textS14Regular}
        color: #666;
      }
    }
    .HistoryText {
      ${textS14Medium}
      background: #eee;
      width: 100%;
      padding: 10px;
      text-align: left;
    }
  }
`;
