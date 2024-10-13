import styled from 'styled-components';
import FilterType from './type';
import FilterResult from './result';

const CounselFilter = () => {
  return (
    <FilterWrapper>
      <FilterType></FilterType>
      <FilterResult></FilterResult>
    </FilterWrapper>
  );
};

export default CounselFilter;

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
