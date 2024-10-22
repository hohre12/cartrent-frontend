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
import TextArea from '@/components/textArea/TextArea';

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
        <div className="InputAreaWrapper">
          <div className="InputWrapper">
            <div>
              <span>고객명</span>
              <Input></Input>
            </div>
            <div>
              <span style={{ color: '#ff3261' }}>상담일</span>
              <Input></Input>
            </div>
            <div>
              <span>상담자</span>
              <Input></Input>
            </div>
          </div>
          <div className="TextAreaWrapper">
            <span style={{ color: '#ff3261' }}>상담내용</span>
            <TextArea
              value={''}
              style={{ width: '500px' }}
            ></TextArea>
          </div>
        </div>
      </InfoWrapper>
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
  height: 100%;

  .ControlWrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    & > div {
      border: 1px solid #eee;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .InputAreaWrapper {
    width: 510px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .InputWrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      & > div {
        display: flex;
        width: 49%;
        gap: 5px;
        & > span {
          width: 50px;
        }
      }
    }
    .TextAreaWrapper {
      display: flex;
      gap: 5px;
      & > span {
        width: 50px;
      }
    }
  }
`;
