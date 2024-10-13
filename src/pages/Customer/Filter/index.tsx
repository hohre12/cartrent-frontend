import styled from 'styled-components';
import FilterGroup from './group';
import FilterGrade from './grade';

const CustomerFilter = () => {
  return (
    <FilterWrapper>
      <FilterGroup></FilterGroup>
      <FilterGrade></FilterGrade>
    </FilterWrapper>
  );
};

export default CustomerFilter;

export const FilterWrapper = styled.div`
  background: #fff;
  width: 250px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  // 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
