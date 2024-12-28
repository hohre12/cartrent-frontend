import Button from '@/components/button/Button';
import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import { CUSTOMER_LIST_WATCH_OPTIONS } from '@/constants/customer';
import { dummyCustomerList } from '@/dummy/customer';
import {
  selectedCustomerHideWatchOptionsState,
  selectedCustomerState,
} from '@/state/customer';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { TCustomerList } from '@/types/customer';
import { isColumnsViewHide } from '@/utils/common';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TCustomerListTableProps = {
  data: TCustomerList[];
};

const CustomerListTable = ({ data }: TCustomerListTableProps) => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(
    selectedCustomerState,
  );
  const selectedCustomerHideWatchOptions = useRecoilValue(
    selectedCustomerHideWatchOptionsState,
  );

  const isAllChecked = useMemo(() => {
    return (
      data.every((it) => selectedCustomer.includes(it)) && data.length !== 0
    );
  }, [selectedCustomer, data]);

  const handleAllChecked = useCallback(() => {
    if (selectedCustomer.length > 0) {
      setSelectedCustomer([]);
    } else {
      setSelectedCustomer(data);
    }
  }, [selectedCustomer, data]);

  const handleChecked = useCallback(
    (val: TCheckBoxValue, customer: TCustomerList) => {
      if (val) {
        setSelectedCustomer([...selectedCustomer, customer]);
      } else {
        const newList = selectedCustomer.filter(
          (it) => it.userIdx !== customer.userIdx,
        );
        setSelectedCustomer(newList);
      }
    },
    [selectedCustomer],
  );
  return (
    <CustomerListTableWrapper>
      <thead>
        <TableHeader>
          <th style={{ width: '60px' }}>
            <Checkbox
              value={isAllChecked}
              onCheckedChange={handleAllChecked}
            />
          </th>
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
        {data.map((it, idx) => (
          <TableItem
            key={idx}
            onClick={() => navigate(`${it.userIdx}`)}
          >
            <td>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  value={selectedCustomer.some(
                    (cl) => cl.userIdx === it.userIdx,
                  )}
                  onCheckedChange={(val) => handleChecked(val, it)}
                />
              </div>
            </td>
            <td>
              <Button variant="black">수정</Button>
            </td>
            <td>
              <Button variant="black">삭제</Button>
            </td>
            {!isColumnsViewHide(selectedCustomerHideWatchOptions, 'status') && (
              <td>{it.status ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedCustomerHideWatchOptions, 'name') && (
              <td className="name">{it.name ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'customerGroup',
            ) && <td>{it.customerGroup?.name ?? '-'}</td>}
            {!isColumnsViewHide(selectedCustomerHideWatchOptions, 'phone') && (
              <td>{it.phone ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedCustomerHideWatchOptions, 'email') && (
              <td>{it.email ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'address',
            ) && <td>{it.address ?? '-'}</td>}
            {!isColumnsViewHide(selectedCustomerHideWatchOptions, 'birth') && (
              <td>{it.birth ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedCustomerHideWatchOptions, 'job') && (
              <td>{it.job ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'createdAt',
            ) && <td>{it.createdAt ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCustomerHideWatchOptions,
              'updatedAt',
            ) && <td>{it.updatedAt ?? '-'}</td>}
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
