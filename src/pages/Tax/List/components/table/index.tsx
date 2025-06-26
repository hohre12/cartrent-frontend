import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { UserIncentiveDeliveryTax } from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TTableProps = {
  data: UserIncentiveDeliveryTax[];
};

const TaxListTable = ({ data }: TTableProps) => {
  const handleCalcTax = (
    it: UserIncentiveDeliveryTax,
    type: 'before' | 'after',
  ) => {
    let tax =
      (it.totalIncentiveDelivery ?? 0) +
      (it.additionalIncentive?.additionalIncentive ?? 0) +
      (it.etcIncentive ?? 0) +
      (it.bonus?.bonus ?? 0) +
      (it.totalBusinessExpenses ?? 0);
    if (type === 'after') {
      tax *= 0.967;
    }
    return `${numberFormat(tax)}원`;
  };
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            <th>이름</th>
            <th>세전</th>
            <th>상여금</th>
            <th>세후</th>
          </TableHeader>
        </thead>
        <tbody>
          {data.map((it, idx) => (
            <TableItem key={idx}>
              <td className="name">{it.user.name}</td>
              <td className="name">{handleCalcTax(it, 'before')}</td>
              <td>{it.bonus ? `${numberFormat(it.bonus.bonus)}원` : '-'}</td>
              <td>{handleCalcTax(it, 'after')}</td>
            </TableItem>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default TaxListTable;

export const TableWrapper = styled.table`
  position: relative;
  height: 100%;
  width: 50%;
  text-align: left;
  display: block;
  overflow: overlay;
  white-space: nowrap;
  border-spacing: 0;
  border-collapse: separate;
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
