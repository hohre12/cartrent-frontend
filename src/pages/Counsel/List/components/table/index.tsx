import { CUSTOMER_LIST_WATCH_OPTIONS } from '@/constants/customer';
import { dummyCustomerList } from '@/dummy/customer';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerIdxState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { isColumnsViewHide } from '@/utils/common';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CustomerListTable = () => {
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
        <tr>
          <th></th>
          <th></th>
          <th></th>
          {Object.entries(CUSTOMER_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(selectedCustomerHideWatchOptions, key) && (
                <th key={key}>{value}</th>
              )
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dummyCustomerList.map((it, idx) => (
          <tr
            key={idx}
            className={selectedCustomerIdx === it.userIdx ? 'active' : ''}
            onClick={() => handleCustomerClick(it.userIdx)}
          >
            <td>{idx}</td>
            <td>수정</td>
            <td>삭제</td>
            <td>{it.status}</td>
            <td>{it.name}</td>
            <td>{it.groupName}</td>
            <td>{it.phone}</td>
          </tr>
        ))}
      </tbody>
    </CustomerListTableWrapper>
  );
};

export default CustomerListTable;

export const CustomerListTableWrapper = styled.table`
  height: calc(100% - 40px);
  display: block;
  text-align: center;
  thead {
    position: sticky;
    top: -1px;
    z-index: 10;
    background: #ddd;
    th {
      height: 40px;
      ${titleS14Semibold}
      width: 100vw;
      border: 1px solid #eee;
    }
  }
  tbody {
    tr {
      cursor: pointer;
      &.active {
        background: #ccf0ff;
      }
      &:hover {
        background: #f5f5f5;
      }
      td {
        height: 40px;
        overflow: hidden;
        padding: 0px 15px;
        max-width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        border: 1px solid #eee;
        ${textS14Regular}
      }
    }
  }
`;
