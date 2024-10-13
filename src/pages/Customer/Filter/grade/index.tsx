import Checkbox from '@/components/checkbox/Checkbox';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Medium } from '@/styles/typography';
import { useState } from 'react';
import styled from 'styled-components';

const FilterGrade = () => {
  const [isOpenFilters, setIsOpenFilters] = useState<string[]>([]);
  const handleOpenFilters = (key: string) => {
    if (isOpenFilters.some((it) => it === key)) {
      const newValue = isOpenFilters.filter((it) => it !== key);
      setIsOpenFilters(newValue);
    } else {
      setIsOpenFilters([...isOpenFilters, 'group']);
    }
  };
  return (
    <Filter>
      <div
        className="Menu"
        onClick={() => handleOpenFilters('group')}
      >
        <div>
          <SvgIcon
            iconName="icon-arrow_up_s"
            style={{
              width: '20px',
              transform: isOpenFilters.some((it) => it === 'group')
                ? 'rotate(90deg)'
                : '',
            }}
          />
          <p>고객등급</p>
        </div>
        <div>
          <SvgIcon iconName="icon-search" />
          <SvgIcon iconName="icon-plus" />
        </div>
      </div>
      {isOpenFilters.some((it) => it === 'group') && (
        <div className="SubMenu">
          <div>
            <Checkbox></Checkbox>
            <p>A그룹</p>
          </div>
          <div>
            <Checkbox></Checkbox>
            <p>B그룹</p>
          </div>
          <div>
            <Checkbox></Checkbox>
            <p>C그룹</p>
          </div>
        </div>
      )}
    </Filter>
  );
};

export default FilterGrade;

export const Filter = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 270px;
  .Menu {
    background: #eee;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  .SubMenu {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    & > div {
      padding: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;
