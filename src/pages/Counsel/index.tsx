import styled from 'styled-components';
import CounselList from './List';
import CounselDetail from './Detail';
import CounselFilter from './Filter';

const Counsel = () => {
  return (
    <CounselWrapper>
      <CounselFilter></CounselFilter>
      <CounselList></CounselList>
      <CounselDetail></CounselDetail>
    </CounselWrapper>
  );
};

export default Counsel;

export const CounselWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 5px;
  background: #eee;
`;
