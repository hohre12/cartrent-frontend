import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { tokenState, userState } from '@/state/auth';
import { useEffect, useState, KeyboardEvent, useCallback } from 'react';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import useValidationState from '@/hooks/useValidationState';
import { validEmpty, validPassword } from '@/utils/validation';
import LocalStorage from '@/utils/localStorage';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/constants/common';
import { SvgIcon } from '@/components/common/SvgIcon';
import styled from 'styled-components';
import { titleXxl24Bold } from '@/styles/typography';
import styles from './index.module.scss';
import { useSignIn } from '@/services/auth';
const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const [id, setId, isIdValid] = useValidationState<string>('', validEmpty);
  const [password, setPassword, isPasswordValid] = useValidationState<string>(
    '',
    validPassword,
  );
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [idErrorMsg, setIdErrorMsg] = useState<string>();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>();
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setToken(null);
  }, [setToken]);

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
      const response = await signIn({ email: id, password });
      if (response && response.data.signIn) {
        const { accessToken, refreshToken, user } = response.data.signIn;
        setToken(accessToken);
        setUser(user);
        LocalStorage.setItem(TOKEN_KEY, accessToken);
        LocalStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        navigate('/dashboard');
      }
    } catch (e: any) {
      setPasswordErrorMsg(e.message);
    }
  };

  const handlePasswordInputType = useCallback(() => {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  }, [passwordInputType]);

  return (
    <Wrapper className={styles.wrapper}>
      <LoginWrapper>
        <LoginInputWrapper>
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
      </LoginWrapper>
    </Wrapper>
  );
};

export default Login;

export const Wrapper = styled.div`
  /* background: url('./assets/login-background.png');
  background-size: cover; */
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
`;
export const ImageWrapper = styled.div`
  width: 50%;
  padding: 10px;
  img {
    border-radius: 10px;
    width: 100%;
  }
`;
