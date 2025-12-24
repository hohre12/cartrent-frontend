import {
  DELIVERY_LIST_WATCH_OPTIONS,
  DELIVERY_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/delivery';
import { userState } from '@/state/auth';
import { selectedDeliveryHideWatchOptionsState } from '@/state/delivery';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Contract, PermissionType } from '@/types/graphql';
import { isColumnsViewHide, numberFormat } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: Contract[];
};

const DeliveryListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const selectedDeliveryHideWatchOptions = useRecoilValue(
    selectedDeliveryHideWatchOptionsState,
  );
  const my = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return my?.role.name === PermissionType.Admin
      ? false
      : !DELIVERY_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };
  return (
    <DeliveryListTableWrapper>
      <thead>
        <TableHeader>
          {Object.entries(DELIVERY_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(
                selectedDeliveryHideWatchOptions,
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
            onClick={() => console.log(it.id)}
          >
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'companyName',
              isHideColumn('companyName'),
            ) && <td>주식회사 카트</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'contractAt',
              isHideColumn('contractAt'),
            ) && <td>{formatDate(it.contractAt) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'shippingDate',
              isHideColumn('shippingDate'),
            ) && <td>{formatDate(it.shippingDate) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'company_name_nominee',
              isHideColumn('company_name_nominee'),
            ) && <td>{it.company_name_nominee ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'financialCompany',
              isHideColumn('financialCompany'),
            ) && <td>{it.financialCompany?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'divisionName',
              isHideColumn('divisionName'),
            ) && <td>{it.division?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'carName',
              isHideColumn('carName'),
            ) && <td className="textHidden">{it.car?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'carPrice',
              isHideColumn('carPrice'),
            ) && (
              <td>{it.carPrice ? `${numberFormat(it.carPrice)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'agPrice',
              isHideColumn('agPrice'),
            ) && (
              <td>
                {it.fee || it.promotion
                  ? `${numberFormat((it.fee ?? 0) + (it.promotion ?? 0))}원`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedDeliveryHideWatchOptions,
              'shippingMethod',
              isHideColumn('shippingMethod'),
            ) && <td>{it.shippingMethod?.name ?? '-'}</td>}
          </TableItem>
        ))}
      </tbody>
    </DeliveryListTableWrapper>
  );
};

export default DeliveryListTable;

export const DeliveryListTableWrapper = styled.table`
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
