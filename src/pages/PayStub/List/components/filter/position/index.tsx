import Button from '@/components/button/Button';
import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import { UserPositionHangleEnum } from '@/constants/user';
import { useGetPositions } from '@/services/user';
import { payStubFiltersState } from '@/state/payStub';
import { TFilterList } from '@/types/common';
import { PositionType } from '@/types/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

type TFilterProps = {
  handleApply: (selectedList: TFilterList<number>[]) => void;
};

const FilterPosition = ({ handleApply }: TFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<TFilterList<number>[]>(
    [],
  );
  const filters = useRecoilValue(payStubFiltersState);
  const { data: positions } = useGetPositions();

  const [list, setList] = useState([] as TFilterList<number>[]);

  const isAllChecked = useMemo(() => {
    return (
      list.every((it) =>
        selectedFilters.map((filter) => filter.value).includes(it.value),
      ) && list.length !== 0
    );
  }, [selectedFilters, list]);

  const handleAllChecked = useCallback(() => {
    if (selectedFilters.length === list.length) {
      setSelectedFilters([]);
    } else {
      setSelectedFilters(list);
    }
  }, [selectedFilters, setSelectedFilters, list]);

  const handleChecked = useCallback(
    (val: TCheckBoxValue, filter: TFilterList<number>) => {
      if (val) {
        setSelectedFilters([...selectedFilters, filter]);
      } else {
        const newList = selectedFilters.filter(
          (it) => it.value !== filter.value,
        );
        setSelectedFilters(newList);
      }
    },
    [selectedFilters, setSelectedFilters],
  );

  useEffect(() => {
    if (filters.positionIds.length > 0) {
      setSelectedFilters(filters.positionIds);
    }
  }, [filters, setSelectedFilters]);

  useEffect(() => {
    if (positions?.getPositions) {
      const newList = positions.getPositions.map((it) => ({
        name: it.name,
        value: it.id,
      }));
      setList(newList);
    } else {
      setList([]);
    }
  }, [positions, setList]);
  return (
    <Filter>
      <FilterList>
        <li>
          <span>전체선택</span>
          <Checkbox
            value={isAllChecked}
            onCheckedChange={handleAllChecked}
          />
        </li>
        {list.map((it, idx) => (
          <li key={idx}>
            <span>{UserPositionHangleEnum[it.name as PositionType]}</span>
            <Checkbox
              value={selectedFilters
                .map((filter) => filter.value)
                .includes(it.value)}
              onCheckedChange={(val) => handleChecked(val, it)}
            />
          </li>
        ))}
      </FilterList>
      <Footer>
        <Button onClick={() => setSelectedFilters([])}>초기화</Button>
        <Button
          variant="primaryBrandcolor"
          style={{ width: '100%' }}
          onClick={() => handleApply(selectedFilters)}
        >
          적용
        </Button>
      </Footer>
    </Filter>
  );
};

export default FilterPosition;

export const Filter = styled.div`
  top: 40px;
  width: 300px;
  cursor: initial;
  position: absolute;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  left: 0;
  .searchBox {
    background: #fff;
    border: none;
    padding: 10px;
    & > input {
      background: #fff;
    }
  }
`;

export const SortWrapper = styled.div`
  display: flex;
  gap: 5px;
  height: 40px;
  padding: 0px 10px;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: default;
`;

export const FilterList = styled.ul`
  user-select: none;
  max-height: 260px;
  overflow-y: auto;
  padding: 10px;
  li {
    & > span {
      @extend .text-s14-regular;
    }
    display: flex;
    justify-content: space-between;
    padding: 2px;
  }
`;

export const Footer = styled.div`
  border-top: 1px solid #eee;
  display: flex;
  padding: 10px;
  gap: 8px;
  button {
    @extend .title-s14-semibold;
    white-space: nowrap;
  }
`;
