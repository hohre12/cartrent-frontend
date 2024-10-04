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

const SideNavigationBar = () => {
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
      <SideNavigationBarWrapper>
        <SideBarMenu>
          {SIDE_MENU.map((it, idx) => (
            <li
              key={idx}
              onClick={() => navigate(it.path)}
            >
              <div className="title">
                <SvgIcon
                  iconName={it.icon}
                  style={{ fill: '#fff' }}
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
      </SideNavigationBarWrapper>
    </>
  );
};

export default SideNavigationBar;

export const SideNavigationBarWrapper = styled.div`
  width: 150px;
  height: 100vh;
  position: fixed;
  top: 60px;
  background: #212533;
  color: #fff;
`;

export const SideBarMenu = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: calc(100% - 120px);
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    & > div {
      width: 30px;
      height: 30px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
export const UserInfoWrapper = styled.div`
  height: 60px;
`;
