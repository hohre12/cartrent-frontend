import { useNavigate } from 'react-router-dom';
import { SIDE_MENU } from '@/constants/menu';
import { useLocation } from 'react-router-dom';
import { SvgIcon } from '../common/SvgIcon';
import styled from 'styled-components';
import { titleL18Bold, titleM16Semibold } from '@/styles/typography';
import { userState } from '@/state/auth';
import { useRecoilValue } from 'recoil';
import { PermissionType } from '@/types/graphql';
import Logo from '@/assets/pngs/logo.png';

const SideNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const my = useRecoilValue(userState);

  return (
    <>
      <SideNavigationBarWrapper>
        <InstituteWrapper onClick={() => navigate('/dashboard')}>
          <img src={Logo} />
        </InstituteWrapper>
        <SideBarMenu>
          {SIDE_MENU.map(
            (it, idx) =>
              (my?.role?.name === PermissionType.Admin ||
                it.engTitle !== 'auth') && (
                <li
                  key={idx}
                  onClick={() => {
                    if (
                      it.engTitle === 'specification' ||
                      it.engTitle === 'adjustment' ||
                      it.engTitle === 'delivery' ||
                      it.engTitle === 'auth'
                    ) {
                      alert('페이지 준비중입니다.');
                    } else {
                      navigate(it.path);
                    }
                  }}
                >
                  <div
                    className={`title ${location.pathname.includes(it.path) ? 'active' : ''}`}
                  >
                    <SvgIcon
                      iconName={it.icon}
                      style={{ fill: '#000' }}
                      alt={it.icon}
                    />
                    <p>{it.title}</p>
                  </div>
                </li>
              ),
          )}
        </SideBarMenu>
      </SideNavigationBarWrapper>
    </>
  );
};

export default SideNavigationBar;

export const SideNavigationBarWrapper = styled.div`
  width: 100px;
  height: 100vh;
  background: #f7f6f3;
  color: #000;
  /* background: #212533;
  color: #fff; */
`;

export const InstituteWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  height: 60px;
  padding: 1rem;
  border-bottom: 1px solid #e1e0dd;
  cursor: pointer;
  .logo {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #666666;
    color: #fff;
    ${titleL18Bold}
  }
  .instituteName {
    /* margin: auto; */
    height: 36px;
    display: flex;
    align-items: center;
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
      p {
        line-height: 24px;
      }
      &.active {
        p {
          font-weight: 700;
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
