import { CUSTOMER_LIST_WATCH_OPTIONS } from '@/constants/customer';
import { dummyCustomerList } from '@/dummy/customer';
import { selectedCustomerHideWatchOptionsState } from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { isColumnsViewHide } from '@/utils/common';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CustomerListTable = () => {
  const selectedCustomerHideWatchOptions = useRecoilValue(
    selectedCustomerHideWatchOptionsState,
  );
  return (
    <CustomerListTableWrapper>
      <thead>
        <tr>
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
            onClick={() => console.log(it.userIdx)}
          >
            <td>{idx}</td>
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
    background: #f5f5f5;
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
      &:hover {
        background: #ccf0ff;
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
