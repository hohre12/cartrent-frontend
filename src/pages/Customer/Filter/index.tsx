import styled from 'styled-components';
import { textS14Medium } from '@/styles/typography';
import { SvgIcon } from '@/components/common/SvgIcon';
import Checkbox, { TCheckBoxValue } from '@/components/checkbox/Checkbox';
import { useState } from 'react';
import {
  useGetCustomerGrades,
  useGetCustomerGroups,
} from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import { customerFiltersState } from '@/state/customer';
import RegistGradeModal from '../components/registGradeModal';
import RegistGroupModal from '../components/registGroupModal';
import { userState } from '@/state/auth';
import {
  CustomerGrade,
  CustomerGroup,
  PermissionType,
  PositionType,
  User,
} from '@/types/graphql';

type TCustomerFilterProps = {
  users: User[];
  groups: CustomerGroup[];
  grades: CustomerGrade[];
};

const CustomerFilter = ({ users, groups, grades }: TCustomerFilterProps) => {
  //   const { data: groups } = useGetCustomerGroups();
  //   const { data: grades } = useGetCustomerGrades();
  //   const { data: users } = useGetUsers();

  const [isOpenRegistGradeModal, setIsOpenRegistGradeModal] =
    useState<boolean>(false);
  const [isOpenRegistGroupModal, setIsOpenRegistGroupModal] =
    useState<boolean>(false);
  const user = useRecoilValue(userState);

  const [filters, setFilters] = useRecoilState(customerFiltersState);
  const [isOpenFilters, setIsOpenFilters] = useState<string[]>([
    'group',
    'grade',
    'user',
  ]);
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
    <>
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
              {user?.role.name === PermissionType.Admin && (
                <SvgIcon
                  iconName="icon-plus"
                  onClick={() => setIsOpenRegistGroupModal(true)}
                />
              )}
            </div>
          </div>
          {isOpenFilters.some((it) => it === 'group') && (
            <div className="SubMenu">
              {groups?.map((it) => (
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
              {user?.role.name === PermissionType.Admin && (
                <SvgIcon
                  iconName="icon-plus"
                  onClick={() => setIsOpenRegistGradeModal(true)}
                />
              )}
            </div>
          </div>
          {isOpenFilters.some((it) => it === 'grade') && (
            <div className="SubMenu">
              {grades?.map((it) => (
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
        {user?.role.name === PermissionType.Admin ||
          user?.position.name === PositionType.GeneralManager ||
          (user?.position.name === PositionType.TeamLeader && (
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
              </div>
              {isOpenFilters.some((it) => it === 'user') && (
                <div className="SubMenu">
                  {users?.map((it) => (
                    <div key={it.id}>
                      <Checkbox
                        value={filters.users
                          .map((filter) => filter.value)
                          .includes(it.id)}
                        onCheckedChange={(val) =>
                          handleChecked(val, it, 'users')
                        }
                      ></Checkbox>
                      <p>{it.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </Filter>
          ))}
      </FilterWrapper>
      {isOpenRegistGroupModal && (
        <RegistGroupModal
          isOpen={isOpenRegistGroupModal}
          onCancel={() => setIsOpenRegistGroupModal(false)}
          onConfirm={() => setIsOpenRegistGroupModal(false)}
        />
      )}
      {isOpenRegistGradeModal && (
        <RegistGradeModal
          isOpen={isOpenRegistGradeModal}
          onCancel={() => setIsOpenRegistGradeModal(false)}
          onConfirm={() => setIsOpenRegistGradeModal(false)}
        />
      )}
    </>
  );
};

export default CustomerFilter;

export const FilterWrapper = styled.div`
  background: #fff;
  width: 120px;
  padding: 5px;
  border-radius: 5px;
  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const Filter = styled.div`
  ${textS14Medium}
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 33%;
  .Menu {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
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
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    & > div {
      padding: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      & > p {
        width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
      }
    }
  }
`;
