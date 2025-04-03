import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import {
  CUSTOMER_LIST_WATCH_OPTIONS,
  CUSTOMER_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/customer';
import { userState } from '@/state/auth';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerIdxState,
  selectedCustomerState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import { Customer, PermissionType } from '@/types/graphql';
import { customerStatusColor, isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useMemo } from 'react';
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
    selectedCustomerState,
  );
  const [selectedCustomerIdx, setSelectedCustomerIdx] = useRecoilState(
    selectedCustomerIdxState,
  );

  const my = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return my?.role.name === PermissionType.Admin
      ? false
      : !CUSTOMER_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };
  const isAllChecked = useMemo(() => {
    return (
      data.every((it) => selectedCustomer.includes(it)) && data.length !== 0
    );
  }, [data, selectedCustomer]);

  const handleAllChecked = useCallback(() => {
    if (selectedCustomer.length > 0) {
      setSelectedCustomer([]);
    } else {
      setSelectedCustomer(data);
    }
  }, [data, selectedCustomer.length, setSelectedCustomer]);

  const handleChecked = useCallback(
    (val: TCheckBoxValue, customer: Customer) => {
      if (val) {
        setSelectedCustomer([...selectedCustomer, customer]);
      } else {
        const newList = selectedCustomer.filter((it) => it.id !== customer.id);
        setSelectedCustomer(newList);
      }
    },
    [selectedCustomer, setSelectedCustomer],
  );

  return (
    <CustomerListTableWrapper>
      <thead>
        <tr>
          <th>
            <Checkbox
              value={isAllChecked}
              onCheckedChange={handleAllChecked}
            />
          </th>
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
            onClick={() => setSelectedCustomerIdx(it.id)}
            className={selectedCustomerIdx === it.id ? 'selected' : ''}
          >
            <td>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  value={selectedCustomer.some((cl) => cl.id === it.id)}
                  onCheckedChange={(val) => handleChecked(val, it)}
                />
              </div>
            </td>
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'customerStatus',
              isHideColumn('customerStatus'),
            ) && (
              <td
                style={{
                  color: `#${customerStatusColor(it.customerStatus?.status)}`,
                  fontWeight: 700,
                }}
              >
                {it.customerStatus?.status ?? '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'created_at',
              isHideColumn('created_at'),
            ) && (
              <td style={{ maxWidth: '200px' }}>
                {formatDate(it.created_at) ?? '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'name',
              isHideColumn('name'),
            ) && <td>{it.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'phone',
              isHideColumn('phone'),
            ) && <td style={{ maxWidth: '200px' }}>{it.phone ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'memo',
              isHideColumn('memo'),
            ) && <td style={{ maxWidth: '200px' }}>{it.memo ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'carName',
              isHideColumn('carName'),
            ) && <td>{it.carName ?? '-'}</td>}
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
              <td style={{ maxWidth: '200px' }}>
                {it.counselList.length > 0
                  ? formatDate(it.counselList[0].counselAt, 'YYYY.MM.DD HH:mm')
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
            ) && <td>{it.customerDivision?.name ?? '-'}</td>}
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
      padding: 0px 5px;
    }
  }
  tbody {
    tr {
      cursor: pointer;
      &.selected {
        background: #eee;
      }
      &:hover {
        background: #f5f5f5;
      }
      td {
        height: 40px;
        overflow: hidden;
        padding: 0px 5px;
        max-width: 60px;
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
