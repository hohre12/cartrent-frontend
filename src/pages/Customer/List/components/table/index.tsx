import { CUSTOMER_LIST_WATCH_OPTIONS } from '@/constants/customer';
// import { dummyCustomerList } from '@/dummy/customer';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerIdxState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { Customer } from '@/types/graphql';
import { isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TCustomerListTableProps = {
  data: Customer[];
};

const CustomerListTable = ({ data }: TCustomerListTableProps) => {
  const selectedCustomerHideWatchOptions = useRecoilValue(
    selectedCustomerHideWatchOptionsState,
  );
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(
    selectedCustomerIdxState,
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
        {data.map((it, idx) => (
          <tr
            key={idx}
            onClick={() => setSelectedCustomer(it.id)}
          >
            <td>{idx}</td>
            <td>{it.status}</td>
            <td>{formatDate(it.created_at) ?? '-'}</td>
            <td>{it.name ?? '-'}</td>
            <td>{it.phone ?? '-'}</td>
            <td>{it.memo ?? '-'}</td>
            <td>
              {it.contractList.length > 0
                ? it.contractList[it.contractList.length - 1].carName
                : '-'}
            </td>
            <td>{it.note ?? '-'}</td>
            <td>
              {it.counselList.length > 0
                ? it.counselList[it.counselList.length - 1].updated_at
                : '-'}
            </td>
            <td>{it.customerGrade?.name ?? '-'}</td>
            <td>{it.userList?.name ?? '-'}</td>
            <td>{it.product ?? '-'}</td>
            <td>{it.division ?? '-'}</td>
            <td>{it.type ?? '-'}</td>
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
      white-space: nowrap;
      padding: 0px 15px;
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
