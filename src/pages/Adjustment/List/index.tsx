import styled from 'styled-components';
import AdjustmentListTable from './components/table';
import { useRef } from 'react';
import { adjustmentForm } from '@/utils/form/adjustmentForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { dummyAdjustment } from '@/dummy/adjustment';

const AdjustmentList = () => {
  const adjustmentRef = useRef<HTMLDivElement>(null);
  const htmlString: string = adjustmentForm(dummyAdjustment);
  const downloadPdf = async () => {
    const content = adjustmentRef.current;
    if (content) {
      html2canvas(content, { scale: 3 }).then((canvas) => {
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
    <ListWrapper>
      <Header>
        <DateFilter>
          <input type="date" />
          <span>~</span>
          <input type="date" />
        </DateFilter>
        <PrintButton onClick={downloadPdf}>정산내역 PDF 출력</PrintButton>
      </Header>
      <AdjustmentListTable></AdjustmentListTable>
      <div
        ref={adjustmentRef}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    </ListWrapper>
  );
};

export default AdjustmentList;

const ListWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const DateFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
`;

export const PrintButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;
