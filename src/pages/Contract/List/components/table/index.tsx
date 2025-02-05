import Button from '@/components/button/Button';
import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import { CONTRACT_LIST_WATCH_OPTIONS } from '@/constants/contract';
// import { dummyContractList } from '@/dummy/contract';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import {
  selectedContractHideWatchOptionsState,
  selectedContractState,
} from '@/state/contract';
import { textS14Regular, titleS14Semibold } from '@/styles/typography';
import palette from '@/styles/variables';
import { Contract } from '@/types/graphql';
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
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const [selectedContract, setSelectedContract] = useRecoilState(
    selectedContractState,
  );
  const selectedContractHideWatchOptions = useRecoilValue(
    selectedContractHideWatchOptionsState,
  );

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
  const handleContractDelete = () => {
    try {
      hideConfirm();
      addToast({
        id: Date.now(),
        isImage: true,
        content: `삭제되었습니다`,
        type: 'success',
      });
      setSelectedContract([]);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <ContractListTableWrapper>
      <thead>
        <TableHeader>
          <th style={{ width: '60px' }}>
            <Checkbox
              value={isAllChecked}
              onCheckedChange={handleAllChecked}
            />
          </th>
          {Object.entries(CONTRACT_LIST_WATCH_OPTIONS).map(([key, value]) => {
            return (
              !isColumnsViewHide(selectedContractHideWatchOptions, key) && (
                <th key={key}>{value}</th>
              )
            );
          })}
          <th>계약삭제</th>
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
                  value={selectedContract.some((cl) => cl.id === it.id)}
                  onCheckedChange={(val) => handleChecked(val, it)}
                />
              </div>
            </td>
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'status') && (
              <td>{it.status ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'userName',
            ) && <td>{it.user.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'cityName',
            ) && <td>{it.city.name ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'contractAt',
            ) && <td>{formatDate(it.contractAt) ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'shippingDate',
            ) && <td>{formatDate(it.shippingDate) ?? '-'}</td>}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'name') && (
              <td>{it.customer.name ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'phone') && (
              <td>{it.customer.phone ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'carName',
            ) && <td>{it.carName ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'carOption',
            ) && <td>{it.carOption ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'innerColor',
            ) && <td>{it.innerColor ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'outerColor',
            ) && <td>{it.outerColor ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'carPrice',
            ) && (
              <td>{it.carPrice ? `${numberFormat(it.carPrice)}원` : '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'financialCompany',
            ) && <td>{it.financialCompany ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'product',
            ) && <td>{it.product ?? '-'}</td>}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'surtax') && (
              <td>{it.surtax ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'feeRate',
            ) && <td>{it.feeRate ?? '-'}</td>}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'fee') && (
              <td>{it.fee ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'promotion',
            ) && <td>{it.promotion ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'interChangeFee',
            ) && <td>{it.interChangeFee ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'monthlyPayment',
            ) && <td>{it.monthlyPayment ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'shippingMethod',
            ) && <td>{it.shippingMethod ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'isOrdering',
            ) && <td>{it.isOrdering ?? '-'}</td>}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'branch') && (
              <td>{it.branch ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'branchFee',
            ) && <td>{it.branchFee ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'collateralType',
            ) && <td>{it.collateralType ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'collateralRate',
            ) && <td>{it.collateralRate ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'contractPeriod',
            ) && <td>{it.contractPeriod ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'agreedMileage',
            ) && <td>{it.agreedMileage ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'insuranceAge',
            ) && <td>{it.insuranceAge ?? '-'}</td>}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'object') && (
              <td>{it.object ?? '-'}</td>
            )}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'service1',
            ) && <td>{it.service1 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'serviceBody1',
            ) && <td>{it.serviceBody1 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'service2',
            ) && <td>{it.service2 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'serviceBody2',
            ) && <td>{it.serviceBody2 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'service3',
            ) && <td>{it.service3 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'serviceBody3',
            ) && <td>{it.serviceBody3 ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'incomeEarner',
            ) && <td>{it.incomeEarner ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'cashAssistance',
            ) && <td>{it.cashAssistance ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'supportDetail',
            ) && <td>{it.supportDetails ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'businessExpenses',
            ) && <td>{it.businessExpenses ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'businessExpensesDetail',
            ) && <td>{it.businessExpensesDetail ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'totalExpenditure',
            ) && <td>{it.totalExpenditure ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'totalFee',
            ) && <td>{it.totalFee ?? '-'}</td>}
            {!isColumnsViewHide(
              selectedContractHideWatchOptions,
              'netIncome',
            ) && <td>{it.netIncome ?? '-'}</td>}
            <td>
              <div onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="black"
                  onClick={() =>
                    showConfirm({
                      isOpen: true,
                      title: '계약 삭제',
                      content: `계약을 삭제하시겠습니까?`,
                      cancelText: '취소',
                      confirmText: '삭제',
                      confirmVariant: 'primaryInfo',
                      onClose: () => hideConfirm(),
                      onCancel: () => hideConfirm(),
                      onConfirm: handleContractDelete,
                    })
                  }
                >
                  삭제
                </Button>
              </div>
            </td>
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
  }
`;
