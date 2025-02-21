import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import {
  ADJUSTMENT_LIST_WATCH_OPTIONS,
  ADJUSTMENT_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/adjustment';
import { userState } from '@/state/auth';
import { selectedAdjustmentHideWatchOptionsState } from '@/state/adjustment';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Adjustment, PermissionType } from '@/types/graphql';
import { isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: Adjustment[];
};

const AdjustmentListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const selectedAdjustmentHideWatchOptions = useRecoilValue(
    selectedAdjustmentHideWatchOptionsState,
  );

  const user = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return user?.role.name === PermissionType.Admin
      ? false
      : !ADJUSTMENT_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };

  return (
    <TableWrapper>
      <thead>
        <TableHeader>
          {Object.entries(ADJUSTMENT_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
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
          >
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'customerStatus',
              isHideColumn('customerStatus'),
            ) && <td>{it.customer?.customerStatus?.status ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'adjustmentAt',
              isHideColumn('adjustmentAt'),
            ) && (
              <td>{formatDate(it.adjustmentAt, 'YYYY-MM-DD HH:mm') ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'customerName',
              isHideColumn('customerName'),
            ) && <td>{it.customer?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'customerPhone',
              isHideColumn('customerPhone'),
            ) && <td>{it.customer?.phone ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'context',
              isHideColumn('context'),
            ) && <td className="textHidden">{it.context ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'customerGroup',
              isHideColumn('customerGroup'),
            ) && <td>{it.customer.customerGroup?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'customerGrade',
              isHideColumn('customerGrade'),
            ) && <td>{it.customer.customerGrade?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'customerDivision',
              isHideColumn('customerDivision'),
            ) && <td className="name">{it.contract?.division?.name ?? '-'}</td>}
          </TableItem>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default AdjustmentListTable;

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
