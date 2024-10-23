import styled from 'styled-components';

const AdjustmentListTable = () => {
  return (
    <AdjustmentListTableWrapper>
      <thead>
        <tr>
          <th>정산일</th>
          <th>고객명</th>
          <th>차종</th>
          <th>종류</th>
          <th>차량금액</th>
          <th>수수료</th>
          <th>지원금액</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2024-10-01</td>
          <td>홍길동맨</td>
          <td>셀토스</td>
          <td>렌탈 / 판매</td>
          <td>23,620,000</td>
          <td>2,362,000</td>
          <td>700,000</td>
        </tr>
      </tbody>
    </AdjustmentListTableWrapper>
  );
};

export default AdjustmentListTable;

const AdjustmentListTableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  th,
  td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #ecf0f1;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
  tbody {
    td {
      cursor: pointer;
    }
  }
`;
