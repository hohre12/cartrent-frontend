import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import {
  COUNSEL_LIST_WATCH_OPTIONS,
  COUNSEL_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/counsel';
import { userState } from '@/state/auth';
import {
  selectedCounselHideWatchOptionsState,
  selectedCounselState,
} from '@/state/counsel';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Counsel, PermissionType } from '@/types/graphql';
import { customerStatusColor, isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: Counsel[];
};

const CounselListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const [selectedCounsel, setSelectedCounsel] =
    useRecoilState(selectedCounselState);
  const selectedCounselHideWatchOptions = useRecoilValue(
    selectedCounselHideWatchOptionsState,
  );

  // Shift 선택 기능을 위한 상태
  const lastClickedIndexRef = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

  const user = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return user?.role.name === PermissionType.Admin
      ? false
      : !COUNSEL_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };

  const isAllChecked = useMemo(() => {
    return (
      data.every((it) => selectedCounsel.includes(it)) && data.length !== 0
    );
  }, [selectedCounsel, data]);

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
    if (selectedCounsel.length > 0) {
      setSelectedCounsel([]);
    } else {
      setSelectedCounsel(data);
    }
    lastClickedIndexRef.current = null;
  }, [selectedCounsel.length, setSelectedCounsel, data]);

  const handleChecked = useCallback(
    (
      val: TCheckBoxValue,
      counsel: Counsel,
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
        const newSelectedItems = [...selectedCounsel];
        rangeItems.forEach((item) => {
          if (!newSelectedItems.some((selected) => selected.id === item.id)) {
            newSelectedItems.push(item);
          }
        });

        setSelectedCounsel(newSelectedItems);
      } else {
        if (val) {
          setSelectedCounsel([...selectedCounsel, counsel]);
        } else {
          const newList = selectedCounsel.filter((it) => it.id !== counsel.id);
          setSelectedCounsel(newList);
        }
      }

      // 마지막 클릭 인덱스 업데이트
      lastClickedIndexRef.current = index;
    },
    [data, selectedCounsel, setSelectedCounsel],
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
    <TableWrapper>
      <thead>
        <TableHeader>
          <th style={{ width: '60px' }}>
            <Checkbox
              value={isAllChecked}
              onCheckedChange={handleAllChecked}
            />
          </th>
          {Object.entries(COUNSEL_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(
                selectedCounselHideWatchOptions,
                key,
                isHideColumn(key),
              ) && <th key={key}>{value}</th>
            );
          })}
        </TableHeader>
      </thead>
      <tbody>
        {data.map((it, idx) => (
          <TableItem
            key={idx}
            onClick={() => navigate(`${it.id}`)}
            onMouseEnter={() => isShiftPressed && setHoveredIndex(idx)}
            className={`
              ${isInShiftRange(idx) ? 'shiftRange' : ''}
            `}
          >
            <td>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  value={selectedCounsel.some((cl) => cl.id === it.id)}
                  onCheckedChange={(val, event) =>
                    handleChecked(val, it, idx, event)
                  }
                />
              </div>
            </td>
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerStatus',
              isHideColumn('customerStatus'),
            ) && (
              <td
                style={{
                  color: `#${customerStatusColor(it.customer?.customerStatus?.status)}`,
                  fontWeight: 700,
                }}
              >
                {it.customer?.customerStatus?.status ?? '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'counselAt',
              isHideColumn('counselAt'),
            ) && <td>{formatDate(it.counselAt, 'YYYY.MM.DD HH:mm') ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerName',
              isHideColumn('customerName'),
            ) && <td>{it.customer?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerPhone',
              isHideColumn('customerPhone'),
            ) && <td>{it.customer?.phone ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'context',
              isHideColumn('context'),
            ) && <td className="textHidden">{it.context ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerGroup',
              isHideColumn('customerGroup'),
            ) && <td>{it.customer.customerGroup?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerGrade',
              isHideColumn('customerGrade'),
            ) && <td>{it.customer.customerGrade?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerDivision',
              isHideColumn('customerDivision'),
            ) && <td className="name">{it.contract?.division?.name ?? '-'}</td>}
          </TableItem>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default CounselListTable;

export const TableWrapper = styled.table`
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
  &.shiftRange {
    background: #e3f2fd;
    transition: background-color 0.1s ease;
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
