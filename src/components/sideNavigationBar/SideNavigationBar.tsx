import { useNavigate } from 'react-router-dom';
import { SIDE_MENU } from '@/constants/menu';
import { useLocation } from 'react-router-dom';
import { SvgIcon } from '../common/SvgIcon';
import styled from 'styled-components';
import { titleL18Bold, titleM16Semibold } from '@/styles/typography';

const SideNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <SideNavigationBarWrapper>
        <InstituteWrapper onClick={() => navigate('/dashboard')}>
          <div className="instituteName">카트렌트카</div>
        </InstituteWrapper>
        <SideBarMenu>
          {SIDE_MENU.map((it, idx) => (
            <li
              key={idx}
              onClick={() => navigate(it.path)}
            >
              <div
                className={`title ${location.pathname.includes(it.path) ? 'active' : ''}`}
              >
                <div>
                  <SvgIcon
                    iconName={it.icon}
                    style={{ fill: '#000' }}
                    alt={it.icon}
                  />
                </div>
                <p>{it.title}</p>
              </div>
            </li>
          ))}
        </SideBarMenu>
      </SideNavigationBarWrapper>
    </>
  );
};

export default SideNavigationBar;

export const SideNavigationBarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  background: #f7f6f3;
  color: #000;
  /* background: #212533;
  color: #fff; */
`;

export const InstituteWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 1rem;
  border-bottom: 1px solid #e1e0dd;
  cursor: pointer;
  .logo {
    ${titleL18Bold}
  }
  .instituteName {
    margin: auto;
    ${titleM16Semibold}
  }
`;

export const SideBarMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  li {
    border-bottom: 1px solid #e1e0dd;
    padding: 15px;
    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      &.active {
        p {
          font-weight: 700;
        }
        & > div {
          background: #1aa18f;
        }
      }
      & > div {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`;
export const UserInfoWrapper = styled.div`
  height: 60px;
  .userInfo {
    cursor: pointer;
  }
`;
