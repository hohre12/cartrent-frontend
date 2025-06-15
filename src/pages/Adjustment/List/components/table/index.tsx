import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import {
  ADJUSTMENT_LIST_WATCH_OPTIONS,
  ADJUSTMENT_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/adjustment';
import { userState } from '@/state/auth';
import {
  adjustmentFiltersState,
  selectedAdjustmentHideWatchOptionsState,
} from '@/state/adjustment';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Adjustment, PermissionType, PositionType } from '@/types/graphql';
import { isColumnsViewHide, numberFormat } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Button from '@/components/button/Button';
import { useState } from 'react';
import RegistAddIncentiveModal from '../registAddIncentiveModal';
import EditAddIncentiveModal from '../editAddIncentiveModal';
import { useCheckSettleContract } from '@/services/payStub';
import RegistBonusModal from '../registBonusModal';
import EditBonusModal from '../editBonusModal';

type TTableProps = {
  data: Adjustment[];
};

const AdjustmentListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const selectedAdjustmentHideWatchOptions = useRecoilValue(
    selectedAdjustmentHideWatchOptionsState,
  );
  const [selectedAdjustment, setSelectedAdjustment] = useState<Adjustment>();
  const [isIncentive, setIsIncentive] = useState<boolean>();
  const [isBonus, setIsBonus] = useState<boolean>();
  // filters
  const filters = useRecoilValue(adjustmentFiltersState);

  const { data: isCheckSettleContract } = useCheckSettleContract({
    year: filters.year,
    month: filters.month,
  });

  const user = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return user?.role.name === PermissionType.Admin
      ? false
      : !ADJUSTMENT_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };

  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            {Object.entries(ADJUSTMENT_LIST_WATCH_OPTIONS).map(
              ([key, value]) => {
                return (
                  !isColumnsViewHide(
                    selectedAdjustmentHideWatchOptions,
                    key,
                    isHideColumn(key),
                  ) && <th key={key}>{value}</th>
                );
              },
            )}
            <th>추가수당 입력</th>
            <th>상여금 입력</th>
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
              ) && <td className="name">{it.year ? `${it.year}년` : '-'}</td>}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'month',
                isHideColumn('month'),
              ) && <td className="name">{it.month ? `${it.month}월` : '-'}</td>}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'userName',
                isHideColumn('userName'),
              ) && <td>{it.user?.name ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalCountContract',
                isHideColumn('totalCountContract'),
              ) && (
                <td>
                  {it.totalCountContract ? `${it.totalCountContract}건` : '0건'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalFeeContract',
                isHideColumn('totalFeeContract'),
              ) && (
                <td className="textHidden">
                  {it.totalFeeContract
                    ? `${numberFormat(it.totalFeeContract)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalExpenditureContract',
                isHideColumn('totalExpenditureContract'),
              ) && (
                <td>
                  {it.totalExpenditureContract
                    ? `${numberFormat(it.totalExpenditureContract)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalNetIncomeContract',
                isHideColumn('totalNetIncomeContract'),
              ) && (
                <td>
                  {it.totalNetIncomeContract
                    ? `${numberFormat(it.totalNetIncomeContract)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalIncentiveContract',
                isHideColumn('totalIncentiveContract'),
              ) && (
                <td>
                  {it.totalIncentiveContract
                    ? `${numberFormat(it.totalIncentiveContract)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalCountDelivery',
                isHideColumn('totalCountDelivery'),
              ) && (
                <td>
                  {it.totalCountDelivery ? `${it.totalCountDelivery}건` : '0건'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalFeeDelivery',
                isHideColumn('totalFeeDelivery'),
              ) && (
                <td>
                  {it.totalFeeDelivery
                    ? `${numberFormat(it.totalFeeDelivery)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalExpenditureDelivery',
                isHideColumn('totalExpenditureDelivery'),
              ) && (
                <td>
                  {it.totalExpenditureDelivery
                    ? `${numberFormat(it.totalExpenditureDelivery)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalNetIncomeDelivery',
                isHideColumn('totalNetIncomeDelivery'),
              ) && (
                <td>
                  {it.totalNetIncomeDelivery
                    ? `${numberFormat(it.totalNetIncomeDelivery)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'totalIncentiveDelivery',
                isHideColumn('totalIncentiveDelivery'),
              ) && (
                <td>
                  {it.totalIncentiveDelivery
                    ? `${numberFormat(it.totalIncentiveDelivery)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'additionalIncentive',
                isHideColumn('additionalIncentive'),
              ) && (
                <td>
                  {it.additionalIncentive?.additionalIncentive
                    ? `${numberFormat(it.additionalIncentive.additionalIncentive)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'bonus',
                isHideColumn('bonus'),
              ) && (
                <td>
                  {it.bonus?.bonus
                    ? `${numberFormat(it.bonus.bonus)}원`
                    : '0원'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedAdjustmentHideWatchOptions,
                'etcIncentive',
                isHideColumn('etcIncentive'),
              ) && (
                <td>
                  {it.etcIncentive
                    ? `${numberFormat(it.etcIncentive)}원`
                    : '0원'}
                </td>
              )}
              <td>
                <Button
                  variant="black"
                  disabled={isCheckSettleContract?.checkSettleContract}
                  onClick={() => {
                    setSelectedAdjustment(it);
                    setIsIncentive(true);
                  }}
                >
                  추가수당{' '}
                  {it.additionalIncentive?.additionalIncentive
                    ? '수정'
                    : '입력'}
                </Button>
              </td>
              <td>
                <Button
                  variant="black"
                  disabled={isCheckSettleContract?.checkSettleContract}
                  onClick={() => {
                    setSelectedAdjustment(it);
                    setIsBonus(true);
                  }}
                >
                  상여금 {it.bonus?.bonus ? '수정' : '입력'}
                </Button>
              </td>
            </TableItem>
          ))}
        </tbody>
      </TableWrapper>
      {selectedAdjustment && isIncentive && (
        <>
          {selectedAdjustment.additionalIncentive?.additionalIncentive ? (
            <EditAddIncentiveModal
              id={selectedAdjustment.additionalIncentive.id}
              addIncentive={
                selectedAdjustment.additionalIncentive.additionalIncentive
              }
              isOpen={!!selectedAdjustment && !!isIncentive}
              onCancel={() => {
                setSelectedAdjustment(undefined);
                setIsIncentive(false);
              }}
              onConfirm={() => {
                setSelectedAdjustment(undefined);
                setIsIncentive(false);
              }}
            />
          ) : (
            <RegistAddIncentiveModal
              userId={selectedAdjustment.user.id}
              year={selectedAdjustment.year}
              month={selectedAdjustment.month}
              isOpen={!!selectedAdjustment && !!isIncentive}
              onCancel={() => {
                setSelectedAdjustment(undefined);
                setIsIncentive(false);
              }}
              onConfirm={() => {
                setSelectedAdjustment(undefined);
                setIsIncentive(false);
              }}
            />
          )}
        </>
      )}
      {selectedAdjustment && isBonus && (
        <>
          {selectedAdjustment.bonus?.bonus ? (
            <EditBonusModal
              id={selectedAdjustment.bonus.id}
              propsBonus={selectedAdjustment.bonus.bonus}
              isOpen={!!selectedAdjustment && !!isBonus}
              onCancel={() => {
                setSelectedAdjustment(undefined);
                setIsBonus(false);
              }}
              onConfirm={() => {
                setSelectedAdjustment(undefined);
                setIsBonus(false);
              }}
            />
          ) : (
            <RegistBonusModal
              userId={selectedAdjustment.user.id}
              year={selectedAdjustment.year}
              month={selectedAdjustment.month}
              isOpen={!!selectedAdjustment && !!isBonus}
              onCancel={() => {
                setSelectedAdjustment(undefined);
                setIsBonus(false);
              }}
              onConfirm={() => {
                setSelectedAdjustment(undefined);
                setIsBonus(false);
              }}
            />
          )}
        </>
      )}
    </>
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
  /* cursor: pointer; */
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
