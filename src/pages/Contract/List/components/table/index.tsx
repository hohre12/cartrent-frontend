import Button from '@/components/button/Button';
import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import {
  CONTRACT_LIST_WATCH_OPTIONS,
  CONTRACT_LIST_WATCH_REQUIRED_OPTIONS,
} from '@/constants/contract';
// import { dummyContractList } from '@/dummy/contract';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { userState } from '@/state/auth';
import {
  selectedContractHideWatchOptionsState,
  selectedContractState,
} from '@/state/contract';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Contract, PermissionType } from '@/types/graphql';
import { isColumnsViewHide, numberFormat } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: Contract[];
};

const ContractListTable = ({ data }: TTableProps) => {
  const navigate = useNavigate();
  const [selectedContract, setSelectedContract] = useRecoilState(
    selectedContractState,
  );
  const selectedContractHideWatchOptions = useRecoilValue(
    selectedContractHideWatchOptionsState,
  );
  const my = useRecoilValue(userState);
  const isHideColumn = (columeKey: string) => {
    return my?.role.name === PermissionType.Admin
      ? false
      : !CONTRACT_LIST_WATCH_REQUIRED_OPTIONS.includes(columeKey);
  };

  const isAllChecked = useMemo(() => {
    return (
      data.every((it) => selectedContract.includes(it)) && data.length !== 0
    );
  }, [selectedContract, data]);

  const handleAllChecked = useCallback(() => {
    if (selectedContract.length > 0) {
      setSelectedContract([]);
    } else {
      setSelectedContract(data);
    }
  }, [selectedContract, data]);

  const handleChecked = useCallback(
    (val: TCheckBoxValue, contract: Contract) => {
      if (val) {
        setSelectedContract([...selectedContract, contract]);
      } else {
        const newList = selectedContract.filter((it) => it.id !== contract.id);
        setSelectedContract(newList);
      }
    },
    [selectedContract],
  );
  return (
    <ContractListTableWrapper>
      <thead>
        <TableHeader>
          {my?.role.name === PermissionType.Admin && (
            <th style={{ width: '60px' }}>
              <Checkbox
                value={isAllChecked}
                onCheckedChange={handleAllChecked}
              />
            </th>
          )}
          {Object.entries(CONTRACT_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(
                selectedContractHideWatchOptions,
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
            {my?.role.name === PermissionType.Admin && (
              <td>
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    value={selectedContract.some((cl) => cl.id === it.id)}
                    onCheckedChange={(val) => handleChecked(val, it)}
                  />
                </div>
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'customerStatus',
              isHideColumn('customerStatus'),
            ) && <td>{it.customer?.customerStatus?.status ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'userName',
              isHideColumn('userName'),
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'cityName',
              isHideColumn('cityName'),
            ) && <td>{it.city?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'contractAt',
              isHideColumn('contractAt'),
            ) && <td>{formatDate(it.contractAt) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'shippingDate',
              isHideColumn('shippingDate'),
            ) && <td>{formatDate(it.shippingDate) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'customerName',
              isHideColumn('customerName'),
            ) && <td>{it.customer?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'customerPhone',
              isHideColumn('customerPhone'),
            ) && <td>{it.customer?.phone ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'carName',
              isHideColumn('carName'),
            ) && <td className="textHidden">{it.carName ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'carOption',
              isHideColumn('carOption'),
            ) && <td className="textHidden">{it.carOption ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'innerColor',
              isHideColumn('innerColor'),
            ) && <td>{it.innerColor ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'outerColor',
              isHideColumn('outerColor'),
            ) && <td>{it.outerColor ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'carPrice',
              isHideColumn('carPrice'),
            ) && (
              <td>{it.carPrice ? `${numberFormat(it.carPrice)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'financialCompany',
              isHideColumn('financialCompany'),
            ) && <td>{it.financialCompany?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'feeRate',
              isHideColumn('feeRate'),
            ) && <td>{it.feeRate ? `${it.feeRate}%` : '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'fee',
              isHideColumn('fee'),
            ) && <td>{it.fee ? `${numberFormat(it.fee)}원` : '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'promotion',
              isHideColumn('promotion'),
            ) && (
              <td>{it.promotion ? `${numberFormat(it.promotion)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'monthlyPayment',
              isHideColumn('monthlyPayment'),
            ) && (
              <td>
                {it.monthlyPayment
                  ? `${numberFormat(it.monthlyPayment)}원`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'shippingMethod',
              isHideColumn('shippingMethod'),
            ) && <td>{it.shippingMethod?.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'isOrdering',
              isHideColumn('isOrdering'),
            ) && <td>{it.isOrdering ? '출고' : '미출고'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'branch',
              isHideColumn('branch'),
            ) && <td>{it.branch ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'branchFee',
              isHideColumn('branchFee'),
            ) && (
              <td>{it.branchFee ? `${numberFormat(it.branchFee)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'advancePayment',
              isHideColumn('advancePayment'),
            ) && (
              <td>
                {it.advancePayment
                  ? `${numberFormat(it.advancePayment)}원`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'security',
              isHideColumn('security'),
            ) && (
              <td>{it.security ? `${numberFormat(it.security)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'contractPeriod',
              isHideColumn('contractPeriod'),
            ) && (
              <td>
                {it.contractPeriodStartAt && it.contractPeriodEndAt
                  ? `${it.contractPeriodStartAt} ~ ${it.contractPeriodEndAt}`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'agreedMileage',
              isHideColumn('agreedMileage'),
            ) && (
              <td>
                {it.agreedMileage
                  ? `${numberFormat(it.agreedMileage)} km`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'insuranceAge',
              isHideColumn('insuranceAge'),
            ) && <td>{it.insuranceAge ? `${it.insuranceAge} 세` : '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'object',
              isHideColumn('object'),
            ) && <td>{it.object ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'service1',
              isHideColumn('service1'),
            ) && (
              <td>{it.service1 ? `${numberFormat(it.service1)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'serviceBody1',
              isHideColumn('serviceBody1'),
            ) && <td>{it.serviceBody1 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'service2',
              isHideColumn('service2'),
            ) && (
              <td>{it.service2 ? `${numberFormat(it.service2)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'serviceBody2',
              isHideColumn('serviceBody2'),
            ) && <td>{it.serviceBody2 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'service3',
              isHideColumn('service3'),
            ) && (
              <td>{it.service3 ? `${numberFormat(it.service3)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'serviceBody3',
              isHideColumn('serviceBody3'),
            ) && <td>{it.serviceBody3 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'incomeEarner',
              isHideColumn('incomeEarner'),
            ) && <td>{it.incomeEarner ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'cashAssistance',
              isHideColumn('cashAssistance'),
            ) && (
              <td>
                {it.cashAssistance
                  ? `${numberFormat(it.cashAssistance)}원`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'supportDetail',
              isHideColumn('supportDetail'),
            ) && <td>{it.supportDetails ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'businessExpenses',
              isHideColumn('businessExpenses'),
            ) && (
              <td>
                {it.businessExpenses
                  ? `${numberFormat(it.businessExpenses)}원`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'businessExpensesDetail',
              isHideColumn('businessExpensesDetail'),
            ) && <td>{it.businessExpensesDetail ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'totalExpenditure',
              isHideColumn('totalExpenditure'),
            ) && (
              <td>
                {it.totalExpenditure
                  ? `${numberFormat(it.totalExpenditure)}원`
                  : '-'}
              </td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'totalFee',
              isHideColumn('totalFee'),
            ) && (
              <td>{it.totalFee ? `${numberFormat(it.totalFee)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'netIncome',
              isHideColumn('netIncome'),
            ) && (
              <td>{it.netIncome ? `${numberFormat(it.netIncome)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'company_name_nominee',
              isHideColumn('company_name_nominee'),
            ) && <td>{it.company_name_nominee ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'divisionName',
              isHideColumn('divisionName'),
            ) && <td>{it.division?.name ?? '-'}</td>}
          </TableItem>
        ))}
      </tbody>
    </ContractListTableWrapper>
  );
};

export default ContractListTable;

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
