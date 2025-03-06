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
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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
            // onClick={() => navigate(`${it.id}`)}
          >
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'year',
              isHideColumn('year'),
            ) && <td>{it.year ? `${it.year}년` : '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'month',
              isHideColumn('month'),
            ) && <td>{it.month ? `${it.month}월` : '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalCountContract',
              isHideColumn('totalCountContract'),
            ) && <td>{it.totalCountContract ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalFeeContract',
              isHideColumn('totalFeeContract'),
            ) && <td className="textHidden">{it.totalFeeContract ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalExpenditureContract',
              isHideColumn('totalExpenditureContract'),
            ) && <td>{it.totalExpenditureContract ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalNetIncomeContract',
              isHideColumn('totalNetIncomeContract'),
            ) && <td>{it.totalNetIncomeContract ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalIncentiveContract',
              isHideColumn('totalIncentiveContract'),
            ) && <td>{it.totalIncentiveContract ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalCountDelivery',
              isHideColumn('totalCountDelivery'),
            ) && <td className="name">{it.totalCountDelivery ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalFeeDelivery',
              isHideColumn('totalFeeDelivery'),
            ) && <td>{it.totalFeeDelivery ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalExpenditureDelivery',
              isHideColumn('totalExpenditureDelivery'),
            ) && <td>{it.totalExpenditureDelivery ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalNetIncomeDelivery',
              isHideColumn('totalNetIncomeDelivery'),
            ) && <td>{it.totalNetIncomeDelivery ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'totalIncentiveDelivery',
              isHideColumn('totalIncentiveDelivery'),
            ) && <td>{it.totalIncentiveDelivery ?? '-'}</td>}
            {/* {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'additionalIncentive',
              isHideColumn('additionalIncentive'),
            ) && <td>{it.additionalIncentive ?? '-'}</td>} */}
            {!isColumnsViewHide(
              selectedAdjustmentHideWatchOptions,
              'etcIncentive',
              isHideColumn('etcIncentive'),
            ) && <td>{it.etcIncentive ?? '-'}</td>}
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
