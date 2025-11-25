import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Contract } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import styled from 'styled-components';

type TTableProps = {
  data: Contract[];
};

const SecondTaxListTable = ({ data }: TTableProps) => {
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            {/* <th>직원명</th> */}
            <th>소득자</th>
            <th>세전</th>
            <th>세후</th>
            <th>출고일</th>
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <TableItem key={idx}>
              {/* <td className="name">{it.user.name}</td> */}
              <td className="name">{it.incomeEarner ?? '-'}</td>
              <td>
                {it.cashAssistance
                  ? `${numberFormat(Math.floor(it.cashAssistance))}원`
                  : '-'}
              </td>
              <td>
                {it.cashAssistance
                  ? `${numberFormat(Math.floor(it.cashAssistance * 0.967))}원`
                  : '-'}
              </td>
              <td>{formatDate(it.shippingDate) ?? '-'}</td>
            </TableItem>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default SecondTaxListTable;

export const TableWrapper = styled.table`
  position: relative;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const TableHeader = styled.tr`
  height: 40px;
  position: sticky;
  top: 0;
  background-color: ${palette['$white']};
  z-index: 10;
  th {
    ${titleS14Semibold}
    color: ${palette['$gray-700']};
    text-align: left;
    padding: 0px 15px;
    border-bottom: 1px solid ${palette['$gray-200']};
    width: 100vw;
  }
`;

export const TableItem = styled.tr`
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  td {
    ${textS14Regular}
    border-bottom: 1px solid ${'gray-200'};
    height: 60px;
    text-align: left;
    padding: 0px 15px;
    max-width: 220px;
    border-bottom: 1px solid #eee;
    &.name {
      font-weight: 600;
    }
    &.textHidden {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;
