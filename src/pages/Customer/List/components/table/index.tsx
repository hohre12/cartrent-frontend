import Button from '@/components/button/Button';
import { CUSTOMER_LIST_WATCH_OPTIONS } from '@/constants/customer';
import { dummyCustomerList } from '@/dummy/customer';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerIdxState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { isColumnsViewHide } from '@/utils/common';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CustomerListTable = () => {
  const navigate = useNavigate();
  const selectedCustomerHideWatchOptions = useRecoilValue(
    selectedCustomerHideWatchOptionsState,
  );
  const [selectedCustomerIdx, setSelectedCustomerIdx] = useRecoilState(
    selectedCustomerIdxState,
  );
  const handleCustomerClick = useCallback(
    (idx: number) => {
      setSelectedCustomerIdx(idx);
    },
    [setSelectedCustomerIdx],
  );
  return (
    <CustomerListTableWrapper>
      <thead>
        <TableHeader>
          <th style={{ width: '80px' }}></th>
          <th style={{ width: '80px' }}></th>
          {Object.entries(CUSTOMER_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(selectedCustomerHideWatchOptions, key) && (
                <th key={key}>{value}</th>
              )
            );
          })}
        </TableHeader>
      </thead>
      <tbody>
        {dummyCustomerList.map((it, idx) => (
          <TableItem
            key={idx}
            className={selectedCustomerIdx === it.userIdx ? 'active' : ''}
            onClick={() => navigate(`${it.userIdx}`)}
          >
            <td>
              <Button variant="black">수정</Button>
            </td>
            <td>
              <Button variant="black">삭제</Button>
            </td>
            <td>{it.status}</td>
            <td className="name">{it.name}</td>
            <td>{it.groupName}</td>
            <td>{it.phone}</td>
          </TableItem>
        ))}
      </tbody>
    </CustomerListTableWrapper>
  );
};

export default CustomerListTable;

export const CustomerListTableWrapper = styled.table`
  position: relative;
  height: 100%;
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
  }
`;
