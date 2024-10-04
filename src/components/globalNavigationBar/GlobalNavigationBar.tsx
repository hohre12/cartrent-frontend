import { titleL18Bold } from '@/styles/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  return (
    <GlobalNavigationBarWrapper>
      <InstituteWrapper onClick={() => navigate('/dashboard')}>
        <div className="logo">카트렌트카</div>
        <div className="instituteName">SMART 고객관리</div>
      </InstituteWrapper>
      <GlobalFunctionWrapper>
        <span>고객등록</span>
        <span>상담등록</span>
      </GlobalFunctionWrapper>
    </GlobalNavigationBarWrapper>
  );
};

export default GlobalNavigationBar;

export const GlobalNavigationBarWrapper = styled.div`
  width: 100vw;
  height: 60px;
  padding: 3cqb;
  background: #1aa18f;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InstituteWrapper = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  .logo {
    ${titleL18Bold}
  }
  .instituteName {
    ${titleL18Bold}
  }
`;

export const GlobalFunctionWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
