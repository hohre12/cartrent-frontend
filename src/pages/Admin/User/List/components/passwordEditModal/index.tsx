import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useUpdateUserPassword } from '@/services/user';
import { TModal } from '@/types/common';
import { UpdatePasswordDto } from '@/types/graphql';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const EditPasswordModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const [password, setPassword] = useState<UpdatePasswordDto['password']>();
  const [checkPassword, setCheckPassword] =
    useState<UpdatePasswordDto['password']>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateUserPassword } = useUpdateUserPassword();

  const handleUserPasswordEdit = useCallback(async () => {
    setSubmit(true);
    if (!password) return;
    if (!checkPassword || password !== checkPassword) return;
    try {
      const response = await updateUserPassword({
        userId: idx,
        password,
      });

      if (response && response.data.updatePassword) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `담당자의 비밀번호가 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e: any) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `${e.message}`,
        type: 'error',
      });
      modalProps.onCancel?.();
    }
  }, [addToast, checkPassword, idx, modalProps, password, updateUserPassword]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleUserPasswordEdit();
      }
    },
    [handleUserPasswordEdit],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <>
      <SModal
        {...modalProps}
        title="담당자 비밀번호 수정"
        size="small"
        onConfirm={handleUserPasswordEdit}
      >
        <RegistCustomerWrapper>
          <div>
            <span>
              새 비밀번호 <p className="required">*</p>
            </span>
            <Input
              type="password"
              placeholder="담당자의 새 비밀번호를 입력해주세요."
              value={password}
              onTextChange={(text) => setPassword(text)}
              isError={submit && !password}
              errorMessage="비밀번호는 필수입니다."
            />
          </div>
          <div>
            <span>
              비밀번호 확인 <p className="required">*</p>
            </span>
            <Input
              type="password"
              placeholder="입력하신 비밀번호를 한번 더 입력해주세요."
              value={checkPassword}
              onTextChange={(text) => setCheckPassword(text)}
              isError={submit && (!checkPassword || password !== checkPassword)}
              errorMessage="입력하신 새 비밀번호와 일치하지 않습니다."
            />
          </div>
        </RegistCustomerWrapper>
      </SModal>
    </>
  );
};

export default EditPasswordModal;

export const SModal = styled(Modal)``;
const RegistCustomerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
