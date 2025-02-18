import {
  CUSTOMER_LIST_WATCH_OPTIONS,
  CUSTOMER_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/customer';
import { userState } from '@/state/auth';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerIdxState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { Customer, PermissionType } from '@/types/graphql';
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
  const my = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return my?.role.name === PermissionType.Admin
      ? false
      : !CUSTOMER_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };
  const setSelectedCustomer = useSetRecoilState(selectedCustomerIdxState);

  return (
    <CustomerListTableWrapper>
      <thead>
        <tr>
          <th>번호</th>
          {Object.entries(CUSTOMER_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(
                selectedCustomerHideWatchOptions,
                key,
                isHideColumn(key),
              ) && <th key={key}>{value}</th>
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
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'customerStatus',
              isHideColumn('customerStatus'),
            ) && <td>{it.customerStatus?.status ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'created_at',
              isHideColumn('created_at'),
            ) && <td>{formatDate(it.created_at) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'name',
              isHideColumn('name'),
            ) && <td>{it.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'phone',
              isHideColumn('phone'),
            ) && <td>{it.phone ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'memo',
              isHideColumn('memo'),
            ) && <td>{it.memo ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'carName',
              isHideColumn('carName'),
            ) && (
              <td>
                {it.contractList.length > 0
                  ? it.contractList.map((it) => it.carName).join(' / ')
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'note',
              isHideColumn('note'),
            ) && <td>{it.note ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'counselAt',
              isHideColumn('counselAt'),
            ) && (
              <td>
                {it.counselList.length > 0
                  ? formatDate(
                      it.counselList[it.counselList.length - 1].counselAt,
                      'YYYY-MM-DD HH:mm',
                    )
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'gradeName',
              isHideColumn('gradeName'),
            ) && <td>{it.customerGrade?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.userList?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'divisionName',
              isHideColumn('divisionName'),
            ) && (
              <td>
                {it.contractList.length > 0
                  ? it.contractList.map((it) => it.division?.name).join(' / ')
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'type',
              isHideColumn('type'),
            ) && <td>{it.type ?? '-'}</td>}
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
        max-width: 140px;
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
