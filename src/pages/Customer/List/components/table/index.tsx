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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  // Shift 선택 기능을 위한 상태
  const lastClickedIndexRef = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

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

  // Shift 키 눌림 상태 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftPressed(false);
        setHoveredIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleAllChecked = useCallback(() => {
    if (selectedCustomer.length > 0) {
      setSelectedCustomer([]);
    } else {
      setSelectedCustomer(data);
    }
    lastClickedIndexRef.current = null;
  }, [data, selectedCustomer.length, setSelectedCustomer]);

  const handleChecked = useCallback(
    (
      val: TCheckBoxValue,
      customer: Customer,
      index: number,
      event?: React.MouseEvent<HTMLDivElement>,
    ) => {
      // Shift 키가 눌린 상태이고 이전 클릭이 있는 경우 범위 선택
      if (event?.shiftKey && lastClickedIndexRef.current !== null) {
        const startIndex = Math.min(lastClickedIndexRef.current, index);
        const endIndex = Math.max(lastClickedIndexRef.current, index);

        // 범위 내의 모든 항목 선택
        const rangeItems = data.slice(startIndex, endIndex + 1);

        // 기존 선택 항목과 범위 내 항목을 합침 (중복 제거)
        const newSelectedItems = [...selectedCustomer];
        rangeItems.forEach((item) => {
          if (!newSelectedItems.some((selected) => selected.id === item.id)) {
            newSelectedItems.push(item);
          }
        });

        setSelectedCustomer(newSelectedItems);
      } else {
        // 일반 클릭
        if (val) {
          setSelectedCustomer([...selectedCustomer, customer]);
        } else {
          const newList = selectedCustomer.filter(
            (it) => it.id !== customer.id,
          );
          setSelectedCustomer(newList);
        }
      }

      // 마지막 클릭 인덱스 업데이트
      lastClickedIndexRef.current = index;
    },
    [data, selectedCustomer, setSelectedCustomer],
  );

  // 범위 하이라이트 체크 함수
  const isInShiftRange = useCallback(
    (index: number) => {
      if (
        !isShiftPressed ||
        hoveredIndex === null ||
        lastClickedIndexRef.current === null
      ) {
        return false;
      }
      const start = Math.min(lastClickedIndexRef.current, hoveredIndex);
      const end = Math.max(lastClickedIndexRef.current, hoveredIndex);
      return index >= start && index <= end;
    },
    [isShiftPressed, hoveredIndex],
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
            onMouseEnter={() => isShiftPressed && setHoveredIndex(idx)}
            className={`
              ${selectedCustomerIdx === it.id ? 'selected' : ''}
              ${isInShiftRange(idx) ? 'shiftRange' : ''}
            `}
          >
            <td>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  value={selectedCustomer.some((cl) => cl.id === it.id)}
                  onCheckedChange={(val, event) =>
                    handleChecked(val, it, idx, event)
                  }
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
      &.shiftRange {
        background: #e3f2fd;
        transition: background-color 0.1s ease;
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
