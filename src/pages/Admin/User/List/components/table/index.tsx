import {
  USER_LIST_WATCH_OPTIONS,
  USER_LIST_WATCH_REQUIRED_OPTIONS,
  UserPositionHangleEnum,
  UserRoleHangleEnum,
} from '@/constants/user';
import { userState } from '@/state/auth';
import { selectedUserHideWatchOptionsState } from '@/state/user';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { PermissionType, User } from '@/types/graphql';
import { isColumnsViewHide } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: User[];
};

const UserListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const my = useRecoilValue(userState);
  const selectedUserHideWatchOptions = useRecoilValue(
    selectedUserHideWatchOptionsState,
  );
  const isHideColumn = (columeKey: string) => {
    return my?.role.name === PermissionType.Admin
      ? false
      : !USER_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };
  return (
    <>
      <TableWrapper>
        <thead>
          <TableHeader>
            {Object.entries(USER_LIST_WATCH_OPTIONS).map(([key, value]) => {
              return (
                !isColumnsViewHide(
                  selectedUserHideWatchOptions,
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
                selectedUserHideWatchOptions,
                'userName',
                isHideColumn('userName'),
              ) && <td className="name">{it.name}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'englishName',
                isHideColumn('englishName'),
              ) && <td>{it.englishName ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'userEmail',
                isHideColumn('userEmail'),
              ) && <td>{it.email}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'userPosition',
                isHideColumn('userPosition'),
              ) && (
                <td>
                  {it.position?.name
                    ? UserPositionHangleEnum[it.position.name]
                    : '-'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'userRole',
                isHideColumn('userRole'),
              ) && (
                <td>
                  {it.role?.name ? UserRoleHangleEnum[it.role.name] : '-'}
                </td>
              )}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'hireDate',
                isHideColumn('hireDate'),
              ) && <td>{formatDate(it.hireDate) ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'birthDate',
                isHideColumn('birthDate'),
              ) && <td>{formatDate(it.birthDate) ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'phone',
                isHideColumn('phone'),
              ) && <td>{it.phone ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'salesPhone',
                isHideColumn('salesPhone'),
              ) && <td>{it.salesPhone ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'fax',
                isHideColumn('fax'),
              ) && <td>{it.fax ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'salaryAccount',
                isHideColumn('salaryAccount'),
              ) && <td>{it.salaryAccount ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'bank',
                isHideColumn('bank'),
              ) && <td>{it.bank ?? '-'}</td>}
              {!isColumnsViewHide(
                selectedUserHideWatchOptions,
                'userCreatedAt',
                isHideColumn('userCreatedAt'),
              ) && <td>{formatDate(it.created_at) ?? '-'}</td>}
            </TableItem>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
};

export default UserListTable;

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
