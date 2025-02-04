import Checkbox from '@/components/checkbox/Checkbox';
import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import { useGetCustomer } from '@/services/customer';
import { selectedCustomerIdxState } from '@/state/customer';
import {
  textM16Regular,
  textS14Medium,
  textS14Regular,
} from '@/styles/typography';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CustomerDetail = () => {
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);
  const { data, loading, error } = useGetCustomer(selectedCustomerIdx);

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
            <span>담당자</span>
            <Input
              disabled
              value={detail.userList.name}
            ></Input>
          </div>
          <div>
            <span>상태</span>
            <Input
              disabled
              value={detail.status}
            ></Input>
          </div>
          <div>
            <span>고객명</span>
            <Input
              disabled
              value={detail.name}
            ></Input>
          </div>
          <div>
            <span>연락처</span>
            <Input
              disabled
              value={detail.phone}
            ></Input>
          </div>
          <div>
            <span>회사명/명의자</span>
            <Input
              disabled
              value={detail.company_name_nominee}
            ></Input>
          </div>
          <div>
            <span>추가연락처</span>
            <Input
              disabled
              value={detail.sub_phone}
            ></Input>
          </div>
          <div>
            <span>구분</span>
            <Input
              disabled
              value={detail.division}
            ></Input>
          </div>
          <div>
            <span>상품</span>
            <Input
              disabled
              value={detail.product}
            ></Input>
          </div>
          <div>
            <span>차종</span>
            <Input
              disabled
              value={detail.contractList.map((it) => it.carName).join(' / ')}
            ></Input>
          </div>
          <div>
            <span>옵션</span>
            <Input
              disabled
              value={detail.contractList.map((it) => it.carOption).join(' / ')}
            ></Input>
          </div>
          <div>
            <span>약정기간</span>
            <Input
              disabled
              value={detail.contractList
                .map((it) => it.contractPeriod)
                .join(' / ')}
            ></Input>
          </div>
          <div>
            <span>약정거리</span>
            <Input
              disabled
              value={detail.contractList
                .map((it) => it.agreedMileage)
                .join(' / ')}
            ></Input>
          </div>
          <div>
            <span>담보율</span>
            <Input
              disabled
              value={detail.contractList
                .map((it) => it.collateralRate)
                .join(' / ')}
            ></Input>
          </div>
          <div>
            <span>고객유형</span>
            <Input
              disabled
              value={detail.type}
            ></Input>
          </div>
          <div>
            <span>등록일</span>
            <Input
              disabled
              value={detail.created_at}
            ></Input>
          </div>
          <div>
            <span>메모</span>
            <Input
              disabled
              value={detail.memo}
            ></Input>
          </div>
          <div>
            <span>고객등급</span>
            <Input
              disabled
              value={detail.customerGrade?.name}
            ></Input>
          </div>
          <div>
            <span>비고</span>
            <Input
              disabled
              value={detail.note}
            ></Input>
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
  width: 600px;
`;

export const InfoWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  gap: 20px;
  /* height: 500px; */
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
      &:nth-child(even) {
        margin-left: auto;
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
