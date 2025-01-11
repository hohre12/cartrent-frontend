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
import { TContract } from '@/types/contract';
import { isColumnsViewHide } from '@/utils/common';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TTableProps = {
  data: TContract[];
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
    (val: TCheckBoxValue, contract: TContract) => {
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
              'created_at',
            ) && <td>{it.created_at ?? '-'}</td>}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'status') && (
              <td>{it.carModel?.name ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'status') && (
              <td>{it.context ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'status') && (
              <td>{it.contractType ?? '-'}</td>
            )}
            {!isColumnsViewHide(selectedContractHideWatchOptions, 'status') && (
              <td>{it.customer?.name ?? '-'}</td>
            )}
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
