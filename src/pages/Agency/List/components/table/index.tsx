import {
  AGENCY_CONTRACT_LIST_WATCH_OPTIONS,
  AGENCY_CONTRACT_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/agency';
import { selectedAgencyContractHideWatchOptionsState } from '@/state/agency';
import { userState } from '@/state/auth';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Contract, PermissionType } from '@/types/graphql';
import {
  customerStatusColor,
  isColumnsViewHide,
  numberFormat,
} from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: Contract[];
};

const AgencyContractListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const selectedAgencyContractHideWatchOptions = useRecoilValue(
    selectedAgencyContractHideWatchOptionsState,
  );
  const my = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return my?.role.name === PermissionType.Admin
      ? false
      : !AGENCY_CONTRACT_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };
  return (
    <ContractListTableWrapper>
      <thead>
        <TableHeader>
          {Object.entries(AGENCY_CONTRACT_LIST_WATCH_OPTIONS).map(
            ([key, value]) => {
              return (
                !isColumnsViewHide(
                  selectedAgencyContractHideWatchOptions,
                  key,
                  isHideColumn(key),
                ) && <th key={key}>{value}</th>
              );
            },
          )}
        </TableHeader>
      </thead>
      <tbody>
        {data.map((it, idx) => (
          <TableItem
            key={idx}
            onClick={() => navigate(`/contract/${it.id}`)}
          >
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
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
              selectedAgencyContractHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'contractAt',
              isHideColumn('contractAt'),
            ) && <td>{formatDate(it.contractAt) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'shippingDate',
              isHideColumn('shippingDate'),
            ) && <td>{formatDate(it.shippingDate) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'customerName',
              isHideColumn('customerName'),
            ) && <td>{it.customer?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'carName',
              isHideColumn('carName'),
            ) && <td className="textHidden">{it.car?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'carPrice',
              isHideColumn('carPrice'),
            ) && (
              <td>{it.carPrice ? `${numberFormat(it.carPrice)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'financialCompany',
              isHideColumn('financialCompany'),
            ) && <td>{it.financialCompany?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'divisionName',
              isHideColumn('divisionName'),
            ) && <td>{it.division?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'shippingMethod',
              isHideColumn('shippingMethod'),
            ) && <td>{it.shippingMethod?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'isOrdering',
              isHideColumn('isOrdering'),
            ) && <td>{it.isOrdering ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'branch',
              isHideColumn('branch'),
            ) && <td>{it.branch ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'branchFee',
              isHideColumn('branchFee'),
            ) && (
              <td>{it.branchFee ? `${numberFormat(it.branchFee)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'agencyPaymentDate',
              isHideColumn('agencyPaymentDate'),
            ) && <td>{formatDate(it.agencyPaymentDate) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'hasRegistrationCertificate',
              isHideColumn('hasRegistrationCertificate'),
            ) && (
              <td>{it.hasRegistrationCertificate ? '등록됨' : '등록안됨'}</td>
            )}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'hasContractConfirmationLetter',
              isHideColumn('hasContractConfirmationLetter'),
            ) && (
              <td>
                {it.hasContractConfirmationLetter ? '등록됨' : '등록안됨'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedAgencyContractHideWatchOptions,
              'note',
              isHideColumn('note'),
            ) && <td className="textHidden">{it.note ?? '-'}</td>}
          </TableItem>
        ))}
      </tbody>
    </ContractListTableWrapper>
  );
};

export default AgencyContractListTable;

export const ContractListTableWrapper = styled.table`
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
