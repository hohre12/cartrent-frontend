import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import { COUNSEL_LIST_WATCH_OPTIONS } from '@/constants/counsel';
import {
  selectedCounselHideWatchOptionsState,
  selectedCounselState,
} from '@/state/counsel';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Counsel } from '@/types/graphql';
import { isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useMemo } from 'react';
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

  const isAllChecked = useMemo(() => {
    return (
      data.every((it) => selectedCounsel.includes(it)) && data.length !== 0
    );
  }, [selectedCounsel, data]);

  const handleAllChecked = useCallback(() => {
    if (selectedCounsel.length > 0) {
      setSelectedCounsel([]);
    } else {
      setSelectedCounsel(data);
    }
  }, [selectedCounsel, data]);

  const handleChecked = useCallback(
    (val: TCheckBoxValue, counsel: Counsel) => {
      if (val) {
        setSelectedCounsel([...selectedCounsel, counsel]);
      } else {
        const newList = selectedCounsel.filter((it) => it.id !== counsel.id);
        setSelectedCounsel(newList);
      }
    },
    [selectedCounsel],
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
              !isColumnsViewHide(selectedCounselHideWatchOptions, key) && (
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
            onClick={() => navigate(`${it.id}`)}
          >
            <td>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  value={selectedCounsel.some((cl) => cl.id === it.id)}
                  onCheckedChange={(val) => handleChecked(val, it)}
                />
              </div>
            </td>
            {!isColumnsViewHide(selectedCounselHideWatchOptions, 'status') && (
              <td>{it.status ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'counselAt',
            ) && <td>{formatDate(it.counselAt, 'YYYY-MM-DD HH:mm') ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerName',
            ) && <td>{it.customer?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerPhone',
            ) && <td>{it.customer?.phone ?? '-'}</td>}
            {!isColumnsViewHide(selectedCounselHideWatchOptions, 'context') && (
              <td className="textHidden">{it.context ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'userName',
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerGroup',
            ) && <td>{it.customer.customerGroup?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerGrade',
            ) && <td>{it.customer.customerGrade?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedCounselHideWatchOptions,
              'customerDivision',
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
