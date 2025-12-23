import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import { useUpdateMyPassword } from '@/services/auth';
import { useToast } from '@/hooks/useToast';
import { useRecoilValue } from 'recoil';
import { userState } from '@/state/auth';

const ChangePassword = () => {
  const navigate = useNavigate();
  const my = useRecoilValue(userState);
  const { addToast } = useToast();
  const { updateMyPassword } = useUpdateMyPassword();

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);

  const handleChangePassword = useCallback(async () => {
    setSubmit(true);

    // 유효성 검사
    if (!currentPassword) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: '현재 비밀번호를 입력해주세요.',
        type: 'error',
      });
      return;
    }

    if (!newPassword) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: '새 비밀번호를 입력해주세요.',
        type: 'error',
      });
      return;
    }

    if (newPassword.length < 8) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: '새 비밀번호는 8자 이상이어야 합니다.',
        type: 'error',
      });
      return;
    }

    if (!confirmPassword || newPassword !== confirmPassword) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: '새 비밀번호가 일치하지 않습니다.',
        type: 'error',
      });
      return;
    }

    if (currentPassword === newPassword) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: '현재 비밀번호와 새 비밀번호가 동일합니다.',
        type: 'error',
      });
      return;
    }

    try {
      const response = await updateMyPassword({
        currentPassword,
        newPassword,
      });

      if (response?.data?.updateMyPassword) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: '비밀번호가 성공적으로 변경되었습니다.',
          type: 'success',
        });
        navigate('/dashboard');
      }
    } catch (e: any) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: e.message || '비밀번호 변경에 실패했습니다.',
        type: 'error',
      });
    }
  }, [
    currentPassword,
    newPassword,
    confirmPassword,
    updateMyPassword,
    addToast,
    navigate,
  ]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleChangePassword();
      }
    },
    [handleChangePassword],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <ChangePasswordWrapper>
      <ChangePasswordContainer>
        <Header>
          <Title>비밀번호 변경</Title>
          <Subtitle>{my?.name}님의 비밀번호를 변경합니다</Subtitle>
        </Header>

        <Form>
          <InputWrapper>
            <Label>
              현재 비밀번호 <Required>*</Required>
            </Label>
            <Input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              value={currentPassword}
              onTextChange={(text) => setCurrentPassword(text)}
              isError={submit && !currentPassword}
              errorMessage="현재 비밀번호는 필수입니다."
            />
          </InputWrapper>

          <InputWrapper>
            <Label>
              새 비밀번호 <Required>*</Required>
            </Label>
            <Input
              type="password"
              placeholder="새 비밀번호를 입력해주세요 (8자 이상)"
              value={newPassword}
              onTextChange={(text) => setNewPassword(text)}
              isError={submit && (!newPassword || newPassword.length < 8)}
              errorMessage={
                !newPassword
                  ? '새 비밀번호는 필수입니다.'
                  : '새 비밀번호는 8자 이상이어야 합니다.'
              }
            />
          </InputWrapper>

          <InputWrapper>
            <Label>
              새 비밀번호 확인 <Required>*</Required>
            </Label>
            <Input
              type="password"
              placeholder="새 비밀번호를 한번 더 입력해주세요"
              value={confirmPassword}
              onTextChange={(text) => setConfirmPassword(text)}
              isError={
                submit && (!confirmPassword || newPassword !== confirmPassword)
              }
              errorMessage="입력하신 새 비밀번호와 일치하지 않습니다."
            />
          </InputWrapper>

          <ButtonGroup>
            <Button
              variant="white"
              style={{ border: '1px solid #111' }}
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
            <Button
              variant="black"
              onClick={handleChangePassword}
            >
              비밀번호 변경
            </Button>
          </ButtonGroup>
        </Form>
      </ChangePasswordContainer>
    </ChangePasswordWrapper>
  );
};

export default ChangePassword;

const ChangePasswordWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const ChangePasswordContainer = styled.div`
  width: 480px;
  padding: 60px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Required = styled.span`
  color: #ff4444;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  button {
    flex: 1;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
  }
`;
