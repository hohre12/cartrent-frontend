import Checkbox from '@/components/checkbox/Checkbox';
import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import { dummyCustomerList } from '@/dummy/customer';
import { useGetCustomer } from '@/services/customer';
import { selectedCustomerIdxState } from '@/state/customer';
import {
  textM16Regular,
  textS14Medium,
  textS14Regular,
} from '@/styles/typography';
import { adjustmentForm } from '@/utils/form/adjustmentForm';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CounselDetail = () => {
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);

  //   const { data, isLoading, error } = useGetCustomer({
  //     userIdx: selectedCustomerIdx,
  //   });
  //   if (isLoading) return <div className="loading">Loading...</div>;
  //   if (error) return <div className="error">{String(error)}</div>;

  const data = dummyCustomerList.find(
    (it) => it.userIdx === selectedCustomerIdx,
  );

  const adjustmentRef = useRef<HTMLDivElement>(null);
  const htmlString: string = adjustmentForm();

  const downloadPdf = () => {
    const content = adjustmentRef.current;
    if (content) {
      html2canvas(content, { scale: 1.5 }).then((canvas) => {
        let imgWidth = 210;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${'사람이름'} ${'날짜'}_급여명세서`);
      });
    }
  };

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
            <Input disabled></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객그룹</span>
            <Input disabled></Input>
          </div>
          <div>
            <span>담당자</span>
            <Input disabled></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객번호</span>
            <Input disabled></Input>
          </div>
          <div>
            <span>고객등급</span>
            <Input disabled></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>고객연락처</span>
            <Input disabled></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>주소</span>
            <Input disabled></Input>
            <Input disabled></Input>
          </div>
          <div style={{ width: '100%' }}>
            <span>메모</span>
            <Input disabled></Input>
          </div>
          <div>
            <span>등록일</span>
            <Input disabled></Input>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>문자수신</span>
            <Checkbox></Checkbox>
            <p>거부</p>
          </div>
          <div>
            <span>생년월일</span>
            <Input disabled></Input>
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
      <BoxWrapper>
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
      </BoxWrapper>
      <HistoryWrapper>
        <div onClick={downloadPdf}>
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
      <div
        ref={adjustmentRef}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    </DetailWrapper>
  );
};

export default CounselDetail;

export const DetailWrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
