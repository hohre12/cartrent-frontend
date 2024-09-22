import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  tokenState,
} from '@/state/auth';
import { useEffect, useState, KeyboardEvent, useCallback } from 'react';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import useValidationState from '@/hooks/useValidationState';
import { validEmpty, validPassword } from '@/utils/validation';
import ImgLogin from './assets/img-login.png';
import HkLogo from './assets/logo.png';
import { authIdLogin } from '@/services/auth';
import LocalStorage from '@/utils/localStorage';
import { TOKEN_KEY } from '@/constants/common';
import { SvgIcon } from '@/components/common/SvgIcon';
import styled from 'styled-components';
import { titleXxl24Bold } from '@/styles/typography';

const Login = () => {
  const navigate = useNavigate();
  const [id, setId, isIdValid] = useValidationState<string>(
    '',
    validEmpty,
  );
  const [password, setPassword, isPasswordValid] = useValidationState<string>(
    '',
    validPassword,
  );
  const [isSubmit, setSubmit] = useState<boolean>(false);
  // const [remember, setRemember] = useState<TCheckBoxValue>(true)
  const [idErrorMsg, setIdErrorMsg] = useState<string>();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>();
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const setToken = useSetRecoilState(tokenState);

  useEffect(() => {
    setToken(null);
    const getId = LocalStorage.getItem('id');
    if (getId) {
      setId(getId);
    }
  }, [setId, setToken]);

  // const handleRemember = (value : TCheckBoxValue) => {
  //     setRemember(value)
  // }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setSubmit(true);
    if (!isIdValid) {
      setIdErrorMsg('계정을 입력해주세요.');
      return false;
    }
    if (!isPasswordValid) {
      setPasswordErrorMsg('유효하지 않은 비밀번호입니다.');
      return false;
    }
    try {
      // if(remember) {
      //     LocalStorage.setItem('authId', authId)
      // } else {
      //     LocalStorage.removeItem('authId')
      // }
      const { data } = await authIdLogin({ id, password });
      if (data.data) {
        LocalStorage.setItem(TOKEN_KEY, data.data.token);
        setToken(data.data.token);
        // const response = await getInstituteList();
        // if (response.data?.data.length > 0) {
        //   LocalStorage.setItem(
        //     'institute',
        //     JSON.stringify(response.data.data[0]),
        //   );
        // }
        navigate('/dashboard');
      } else {
        // status : 200
        // 각종 에러
        if (data.error?.code) {
        //   if (data.error?.code === ERROR_CODE.EA002) {
        //     const confirm: TConfirm = {
        //       isOpen: true,
        //       title: '로그인 실패 알림',
        //       content:
        //         '로그인을 5회 이상 실패하여 접속이 제한되었습니다.\n이메일 인증 후 이용해주세요.',
        //       confirmText: '이메일 인증하기',
        //       confirmVariant: 'primaryInfo',
        //       onClose: () => {
        //         navigate('/resetPassword', { state: { type: 'overFail' } });
        //         hideConfirm();
        //       },
        //       onConfirm: () => {
        //         navigate('/resetPassword', { state: { type: 'overFail' } });
        //         hideConfirm();
        //       },
        //     };
        //     showConfirm(confirm);
        //   } else if (data.error?.code === ERROR_CODE.EA003) {
        //     setChangePasswordInfo({
        //       authId,
        //       password,
        //     });
        //     setChangePasswordType('first');
        //     navigate('/changePassword');
        //   } else if (data.error?.code === ERROR_CODE.EA004) {
        //     setChangePasswordInfo({
        //       authId,
        //       password,
        //     });
        //     setChangePasswordType('longTime');
        //     navigate('/changePassword');
        //   }
        } else {
          setPasswordErrorMsg(data.error?.message);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const onResetPasswordClick = useCallback(() => {
    navigate('/resetPassword');
  }, [navigate]);

  const handlePasswordInputType = useCallback(() => {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  }, [passwordInputType]);

  return (
    <Wrapper>
      <LoginWrapper>
        <LoginInputWrapper>
          {/* <img
            src={HkLogo}
            alt="logo"
          /> */}
          <h1>CartRent Car 로그인</h1>
          <div>
            <Input
              size="large"
              name="id"
              type="text"
              placeholder="계정"
              onKeyDown={handleKeyDown}
              isError={isSubmit && (!isIdValid || !!idErrorMsg)}
              errorMessage={idErrorMsg}
              value={id}
              onTextChange={(text) => setId(text)}
            ></Input>
            <Input
              size="large"
              style={{
                marginTop: '10px',
              }}
              name="password"
              type={passwordInputType}
              placeholder="비밀번호"
              onKeyDown={handleKeyDown}
              isError={isSubmit && (!isPasswordValid || !!passwordErrorMsg)}
              errorMessage={passwordErrorMsg}
              value={password}
              onTextChange={(text) => setPassword(text)}
              postfixNode={
                passwordInputType === 'password' ? (
                  <SvgIcon
                    iconName="icon-password-hide"
                    alt="password"
                    onClick={handlePasswordInputType}
                  />
                ) : (
                  <SvgIcon
                    iconName="icon-password-show"
                    alt="password"
                    onClick={handlePasswordInputType}
                  />
                )
              }
            ></Input>
          </div>
          <Button
            className="title-m16-semibold"
            onClick={handleLogin}
            size="large"
            configuration="fill"
            variant="primaryInfo"
            disabled={id.length <= 0 || password.length <= 0}
          >
            로그인
          </Button>
        </LoginInputWrapper>
        {/* <ImageWrapper>
          <img
            src={ImgLogin}
            alt=""
          />
        </ImageWrapper> */}
      </LoginWrapper>
    </Wrapper>
  );
};

export default Login;


export const Wrapper = styled.div`
  background: url('./assets/login-background.png');
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

export const LoginWrapper = styled.div`
height: 700px;
  width: 600px;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #fff;
`;

export const LoginInputWrapper = styled.div`
width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    padding: 210px 95px;
    position: relative;
    h1 {
    ${titleXxl24Bold}
      color: $text-neutral-primary;
      text-align: left;
    }
`
export const ImageWrapper = styled.div`
 width: 50%;
    padding: 10px;
    img {
      border-radius: 10px;
      width: 100%;
    }
`;
