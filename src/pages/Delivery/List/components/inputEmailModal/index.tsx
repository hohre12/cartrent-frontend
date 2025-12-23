import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useMakeExcel } from '@/services/adjustment';
import { deliveryFiltersState } from '@/state/delivery';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const InputEmailModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [email, setEmail] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  const filters = useRecoilValue(deliveryFiltersState);

  const [makeExcel] = useMakeExcel();

  const handleMakeExcel = useCallback(async () => {
    setSubmit(true);
    if (!email) return;
    try {
      const response = await makeExcel({
        variables: { year: filters.year, month: filters.month, email: email },
      });
      if (response?.data?.makeExcel) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${email}로 출고목록 엑셀파일이 정상적으로 발송되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setSubmit(false);
    }
  }, [addToast, email, filters.month, filters.year, makeExcel, modalProps]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleMakeExcel();
      }
    },
    [handleMakeExcel],
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
        title="첨부받을 이메일 입력"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '발송',
        }}
        onConfirm={handleMakeExcel}
      >
        {submit ? (
          <div
            className="loader"
            style={{ margin: 'auto' }}
          ></div>
        ) : (
          <RegistTeamModalContentWrapper>
            <div className="InputWrapper">
              <span>
                Email <p className="required">*</p>
              </span>
              <Input
                value={email}
                onTextChange={(text) => setEmail(text)}
              />
            </div>
          </RegistTeamModalContentWrapper>
        )}
      </SModal>
    </>
  );
};

export default InputEmailModal;

const SModal = styled(Modal)`
  .modalWrapper {
    .modalHeader {
      padding: 30px 30px 0px;
    }
  }
`;
const RegistTeamModalContentWrapper = styled.div`
  .InputWrapper {
    display: flex;
    gap: 5px;
    .inputBox {
      height: 48px;
      width: 100%;
      & > input {
        ${textXs12Medium}
      }
    }
  }
`;
