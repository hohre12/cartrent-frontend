import { useNavigate } from 'react-router-dom';
import { SIDE_MENU } from '@/constants/menu';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import TempProfile from './assets/profile.png';
import { tokenState, userState } from '@/state/auth';
import { authSignout } from '@/services/auth';
import { SvgIcon } from '../common/SvgIcon';
import LocalStorage from '@/utils/localStorage';
import styled from 'styled-components';

const SideMenuBar = () => {
  const navigate = useNavigate();
  const resetToken = useResetRecoilState(tokenState);
  const user = useRecoilValue(userState);

  const handleLogout = async () => {
    try {
      const { data } = await authSignout();
      if (data.data) {
        resetToken();
        LocalStorage.removeItem('institute');
      }
    } catch (e) {
      console.warn('로그아웃 에러', e);
    }
  };

  return (
    <>
      <SideBarWrapper>
        <InstituteWrapper>
          <div className="logo">Cart</div>
          <div className="instituteName">카트렌트카</div>
        </InstituteWrapper>
        <SideBarMenu>
          {SIDE_MENU.map((it, idx) => (
            <li key={idx}>
              <div
                className="title"
                onClick={() => navigate(it.path)}
              >
                <SvgIcon
                  iconName={it.icon}
                  alt={it.icon}
                />
                <p>{it.title}</p>
              </div>
            </li>
          ))}
        </SideBarMenu>
        <UserInfoWrapper>
          <div
            className="userInfo"
            onClick={handleLogout}
          >
            {/* <img
              src={TempProfile}
              alt="profile"
            /> */}
            <div className="userInfoText">
              <h3>{user?.name ?? '-'}</h3>
            </div>
          </div>
          {/* <SvgIcon
            iconName="icon-noti"
            alt="noti"
          /> */}
        </UserInfoWrapper>
      </SideBarWrapper>
    </>
  );
};

export default SideMenuBar;

export const SideBarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  background: #333;
  color: #fff;
`;

export const InstituteWrapper = styled.div`
  background: #fec741;
  height: 60px;
  .logo {
  }
  .instituteName {
  }
`;
export const SideBarMenu = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: calc(100% - 120px);
`;
export const UserInfoWrapper = styled.div`
  height: 60px;
`;
