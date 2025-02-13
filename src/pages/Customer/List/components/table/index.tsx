import { CUSTOMER_LIST_WATCH_OPTIONS } from '@/constants/customer';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerIdxState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { Customer } from '@/types/graphql';
import { isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

type TCustomerListTableProps = {
  data: Customer[];
};

const CustomerListTable = ({ data }: TCustomerListTableProps) => {
  const selectedCustomerHideWatchOptions = useRecoilValue(
    selectedCustomerHideWatchOptionsState,
  );
  const setSelectedCustomer = useSetRecoilState(selectedCustomerIdxState);

  return (
    <CustomerListTableWrapper>
      <thead>
        <tr>
          <th>번호</th>
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
            {/* <td>{CustomerStatusEnum[it.status]}</td> */}
            <td>{it.customerStatus?.status ?? '-'}</td>
            <td>{formatDate(it.created_at) ?? '-'}</td>
            <td>{it.name ?? '-'}</td>
            <td>{it.phone ?? '-'}</td>
            <td>{it.memo ?? '-'}</td>
            <td>
              {it.contractList.length > 0
                ? it.contractList.map((it) => it.carName).join(' / ')
                : '-'}
            </td>
            <td>{it.note ?? '-'}</td>
            <td>
              {it.counselList.length > 0
                ? formatDate(
                    it.counselList[it.counselList.length - 1].counselAt,
                    'YYYY-MM-DD HH:mm',
                  )
                : '-'}
            </td>
            <td>{it.customerGrade?.name ?? '-'}</td>
            <td>{it.userList?.name ?? '-'}</td>
            <td>
              {it.contractList.length > 0
                ? it.contractList.map((it) => it.division?.name).join(' / ')
                : '-'}
            </td>
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
    background: #fff;
    th {
      height: 40px;
      ${titleS14Semibold}
      width: 100vw;
      border-top: 1px solid #eee;
      white-space: nowrap;
      padding: 0px 25px;
    }
  }
  tbody {
    tr {
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
      td {
        height: 40px;
        overflow: hidden;
        padding: 0px 25px;
        max-width: 180px;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        ${textS14Regular}
      }
    }
  }
`;
