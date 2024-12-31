import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Medium, textS14Regular } from '@/styles/typography';
import styled from 'styled-components';

const CounselDetail = () => {
  return (
    <DetailWrapper>
      <DetailHeaderWrapper>
        <div className="left">
          <h2>상담제목</h2>
        </div>
        <div className="right">
          <Button>삭제</Button>
          <Button>편집</Button>
        </div>
      </DetailHeaderWrapper>
      <InfoWrapper>
        <div>
          <div>
            <p>상담자</p>
            <div>상담자 테스트</div>
          </div>
          <div>
            <p>상담일시</p>
            <div>상담일시 테스트</div>
          </div>
        </div>
        <div>
          <div>
            <p>상담내용</p>
            <div>상담내용 테스트 입니다.</div>
          </div>
        </div>
      </InfoWrapper>
      {/* <h6>상담 기록</h6>
      <HistoryWrapper>
        <div>
          <SvgIcon iconName="icon-edit" />
          <div className="DateTimeWrapper">
            <span>2024-09-27</span>
            <p>14:00 (화)</p>
          </div>
          <div className="HistoryText">
            상담자 : 직원A<br></br>
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
            상담자 : 직원B<br></br>
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
            상담자 : 직원A<br></br>
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
            상담자 : 직원B<br></br>
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
            상담자 : 직원A<br></br>
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
            상담자 : 직원B<br></br>
            상담내용 : 첫번째 테스트입니다.
          </div>
        </div>
      </HistoryWrapper> */}
    </DetailWrapper>
  );
};

export default CounselDetail;

export const DetailWrapper = styled.div`
  /* width: 600px; */
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

export const InfoWrapper = styled.div`
  display: flex;
  padding: 20px;
  text-align: left;
  gap: 10px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    & > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 10px;
      p {
        font-size: 16px;
        border-bottom: 1px solid #ddd;
      }
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
