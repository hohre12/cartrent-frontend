import {
  PAYSTUB_LIST_WATCH_OPTIONS,
  PAYSTUB_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/payStub';
import { UserPositionHangleEnum } from '@/constants/user';
import { userState } from '@/state/auth';
import { selectedPayStubHideWatchOptionsState } from '@/state/payStub';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { PayStub, PermissionType } from '@/types/graphql';
import { isColumnsViewHide } from '@/utils/common';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: PayStub[];
};

const PayStubListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const selectedPayStubHideWatchOptions = useRecoilValue(
    selectedPayStubHideWatchOptionsState,
  );

  const user = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return user?.role.name === PermissionType.Admin
      ? false
      : !PAYSTUB_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };

  return (
    <TableWrapper>
      <thead>
        <TableHeader>
          {Object.entries(PAYSTUB_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(
                selectedPayStubHideWatchOptions,
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
              selectedPayStubHideWatchOptions,
              'year',
              isHideColumn('year'),
            ) && <td className="name">{it.year ? `${it.year}년` : '-'}</td>}
            {!isColumnsViewHide(
              selectedPayStubHideWatchOptions,
              'month',
              isHideColumn('month'),
            ) && <td className="name">{it.month ? `${it.month}월` : '-'}</td>}
            {!isColumnsViewHide(
              selectedPayStubHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedPayStubHideWatchOptions,
              'teamName',
              isHideColumn('teamName'),
            ) && <td>{it.user?.team?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedPayStubHideWatchOptions,
              'position',
              isHideColumn('position'),
            ) && (
              <td>
                {it.user?.position?.name
                  ? UserPositionHangleEnum[it.user.position.name]
                  : '-'}
              </td>
            )}
          </TableItem>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default PayStubListTable;

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
