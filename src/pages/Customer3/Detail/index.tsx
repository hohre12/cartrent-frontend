import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import TextArea from '@/components/textArea/TextArea';
// import { dummyCustomerList } from '@/dummy/customer';
// import { useGetCustomer } from '@/services/customer';
import {
  textM16Regular,
  textS14Medium,
  textS14Regular,
} from '@/styles/typography';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CustomerDetail = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <DetailWrapper>
      <DetailHeaderWrapper>
        <div className="left">
          <h2>고객명</h2>
        </div>
        <div className="right">
          <Button>삭제</Button>
          <Button onClick={() => setIsEdit(!isEdit)}>편집</Button>
        </div>
      </DetailHeaderWrapper>
      <InfoWrapper>
        <div className="ProfileWrapper">
          <SvgIcon
            iconName="icon-member"
            style={{ background: '#eee' }}
          />
        </div>
        <div className="Info">
          <div>
            <span>고객명</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객그룹</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div>
            <span>담당자</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객번호</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div>
            <span>고객등급</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객연락처</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>주소</span>
            <Input disabled={!isEdit}></Input>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>메모</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div>
            <span>등록일</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>문자수신</span>
            <Checkbox disabled={!isEdit}></Checkbox>
            <p>거부</p>
          </div>
          <div>
            <span>생년월일</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>초기포인트</span>
            <Input disabled={!isEdit}></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>파일첨부</span>
            <Input disabled={!isEdit}></Input>
          </div>
        </div>
        <div className="memo">
          <span>계약내용</span>
          <TextArea
            value=""
            height="100%"
            disabled={!isEdit}
          ></TextArea>
        </div>
      </InfoWrapper>
      <BoxWrapper>
        <div className="Box">
          <p>상담</p>
          <span>2건</span>
        </div>
      </BoxWrapper>
      <HistoryWrapper>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-27</span>
            <p>14:00 (화)</p>
          </div>
          <div className="HistoryText">
            상담사 : 직원A<br></br>
            상담내용 : 테스트입니다.
          </div>
        </div>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-26</span>
            <p>11:00 (월)</p>
          </div>
          <div className="HistoryText">
            상담사 : 직원B<br></br>
            상담내용 : 첫번째 테스트입니다.
          </div>
        </div>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-27</span>
            <p>14:00 (화)</p>
          </div>
          <div className="HistoryText">
            상담사 : 직원A<br></br>
            상담내용 : 테스트입니다.
          </div>
        </div>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-26</span>
            <p>11:00 (월)</p>
          </div>
          <div className="HistoryText">
            상담사 : 직원B<br></br>
            상담내용 : 첫번째 테스트입니다.
          </div>
        </div>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-27</span>
            <p>14:00 (화)</p>
          </div>
          <div className="HistoryText">
            상담사 : 직원A<br></br>
            상담내용 : 테스트입니다.
          </div>
        </div>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-26</span>
            <p>11:00 (월)</p>
          </div>
          <div className="HistoryText">
            상담사 : 직원B<br></br>
            상담내용 : 첫번째 테스트입니다.
          </div>
        </div>
      </HistoryWrapper>
    </DetailWrapper>
  );
};

export default CustomerDetail;

export const DetailWrapper = styled.div`
  /* width: 600px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const InfoWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  gap: 20px;
  height: 400px;
  /* .ControlWrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    & > div {
      border: 1px solid #eee;
      border-radius: 5px;
    }
  } */
  .memo {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-right: auto;
    width: 400px;
    & > span {
      font-size: 14px;
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
    margin-right: auto;
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
    width: 100%;
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
    cursor: pointer;
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
