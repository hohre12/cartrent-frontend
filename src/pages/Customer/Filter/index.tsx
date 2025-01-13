import styled from 'styled-components';
import { textM16Regular, textS14Medium } from '@/styles/typography';
import { SvgIcon } from '@/components/common/SvgIcon';
import Checkbox from '@/components/checkbox/Checkbox';
import { useState } from 'react';

const CustomerFilter = () => {
  const [isOpenFilters, setIsOpenFilters] = useState<string[]>([]);
  const handleOpenFilters = (key: string) => {
    if (isOpenFilters.some((it) => it === key)) {
      const newValue = isOpenFilters.filter((it) => it !== key);
      setIsOpenFilters(newValue);
    } else {
      setIsOpenFilters([...isOpenFilters, key]);
    }
  };
  return (
    <FilterWrapper>
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
            <p>고객그룹</p>
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
      <Filter>
        <div
          className="Menu"
          onClick={() => handleOpenFilters('grade')}
        >
          <div>
            <SvgIcon
              iconName="icon-arrow_up_s"
              style={{
                width: '20px',
                transform: isOpenFilters.some((it) => it === 'grade')
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
        {isOpenFilters.some((it) => it === 'grade') && (
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
      <Filter>
        <div
          className="Menu"
          onClick={() => handleOpenFilters('manager')}
        >
          <div>
            <SvgIcon
              iconName="icon-arrow_up_s"
              style={{
                width: '20px',
                transform: isOpenFilters.some((it) => it === 'manager')
                  ? 'rotate(90deg)'
                  : '',
              }}
            />
            <p>담당자</p>
          </div>
          <div>
            <SvgIcon iconName="icon-search" />
            <SvgIcon iconName="icon-plus" />
          </div>
        </div>
        {isOpenFilters.some((it) => it === 'manager') && (
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
    </FilterWrapper>
  );
};

export default CustomerFilter;

export const FilterWrapper = styled.div`
  background: #fff;
  min-width: 300px;
  padding: 5px;
  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const Filter = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 270px;
  ${textS14Medium}
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
