import styled from 'styled-components';
import AdjustmentListTable from './components/table';

const AdjustmentList = () => {
  return (
    <ListWrapper>
      <Header>
        <DateFilter>
          <input type="date" />
          <span>~</span>
          <input type="date" />
        </DateFilter>
        <PrintButton>정산내역 PDF 출력</PrintButton>
      </Header>
      <AdjustmentListTable></AdjustmentListTable>
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
