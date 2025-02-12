import styled from 'styled-components';
import { textM16Regular, textS14Medium } from '@/styles/typography';
import { SvgIcon } from '@/components/common/SvgIcon';
import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import { useState } from 'react';
import {
  useGetCustomerGrades,
  useGetCustomerGroups,
  useGetCustomerStatuses,
} from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { useRecoilState } from 'recoil';
import { customerFiltersState } from '@/state/customer';

const CustomerFilter = () => {
  const { data: groups } = useGetCustomerGroups();
  const { data: grades } = useGetCustomerGrades();
  const { data: statuses } = useGetCustomerStatuses();
  const { data: users } = useGetUsers();

  const [filters, setFilters] = useRecoilState(customerFiltersState);
  const [isOpenFilters, setIsOpenFilters] = useState<string[]>([]);
  const handleOpenFilters = (key: string) => {
    if (isOpenFilters.some((it) => it === key)) {
      const newValue = isOpenFilters.filter((it) => it !== key);
      setIsOpenFilters(newValue);
    } else {
      setIsOpenFilters([...isOpenFilters, key]);
    }
  };
  const handleChecked = (
    val: TCheckBoxValue,
    item: any,
    key: 'groups' | 'grades' | 'users',
  ) => {
    if (val) {
      setFilters((prevState) => ({
        ...prevState,
        [key]: [...filters[key], { value: item.id, name: item.name }],
      }));
    } else {
      const newList = filters[key].filter((it) => it.value !== item.id);
      setFilters((prevState) => ({
        ...prevState,
        [key]: newList,
      }));
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
          <div onClick={(e) => e.stopPropagation()}>
            {/* <SvgIcon iconName="icon-search" /> */}
            <SvgIcon iconName="icon-plus" />
          </div>
        </div>
        {isOpenFilters.some((it) => it === 'group') && (
          <div className="SubMenu">
            {groups?.getCustomerGroups.map((it) => (
              <div key={it.id}>
                <Checkbox
                  value={filters.groups
                    .map((filter) => filter.value)
                    .includes(it.id)}
                  onCheckedChange={(val) => handleChecked(val, it, 'groups')}
                ></Checkbox>
                <p>{it.name}</p>
              </div>
            ))}
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
          <div onClick={(e) => e.stopPropagation()}>
            {/* <SvgIcon iconName="icon-search" /> */}
            <SvgIcon iconName="icon-plus" />
          </div>
        </div>
        {isOpenFilters.some((it) => it === 'grade') && (
          <div className="SubMenu">
            {grades?.getCustomerGrades.map((it) => (
              <div key={it.id}>
                <Checkbox
                  value={filters.grades
                    .map((filter) => filter.value)
                    .includes(it.id)}
                  onCheckedChange={(val) => handleChecked(val, it, 'grades')}
                ></Checkbox>
                <p>{it.name}</p>
              </div>
            ))}
          </div>
        )}
      </Filter>
      <Filter>
        <div
          className="Menu"
          onClick={() => handleOpenFilters('user')}
        >
          <div>
            <SvgIcon
              iconName="icon-arrow_up_s"
              style={{
                width: '20px',
                transform: isOpenFilters.some((it) => it === 'user')
                  ? 'rotate(90deg)'
                  : '',
              }}
            />
            <p>담당자</p>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {/* <SvgIcon iconName="icon-search" /> */}
            {/* <SvgIcon iconName="icon-plus" /> */}
          </div>
        </div>
        {isOpenFilters.some((it) => it === 'user') && (
          <div className="SubMenu">
            {users?.getUsers.map((it) => (
              <div key={it.id}>
                <Checkbox
                  value={filters.users
                    .map((filter) => filter.value)
                    .includes(it.id)}
                  onCheckedChange={(val) => handleChecked(val, it, 'users')}
                ></Checkbox>
                <p>{it.name}</p>
              </div>
            ))}
          </div>
        )}
      </Filter>
    </FilterWrapper>
  );
};

export default CustomerFilter;

export const FilterWrapper = styled.div`
  background: #fff;
  min-width: 200px;
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
