import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateCustomerGrade } from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistGradeModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createCustomerGrade } = useCreateCustomerGrade();

  const handleCustomerGradeRegist = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await createCustomerGrade({
        name,
      });

      if (response && response.data.createCustomerGrade.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객등급이 등록되었습니다.`,
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
    }
  }, [addToast, createCustomerGrade, modalProps, name]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCustomerGradeRegist();
      }
    },
    [handleCustomerGradeRegist],
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
      <Modal
        {...modalProps}
        title="고객등급등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleCustomerGradeRegist}
      >
        <CounselModalContentWrapper>
          <div className="InputWrapper">
            <span>
              고객등급명 <p className="required">*</p>
            </span>
            <Input
              value={name ?? ''}
              onTextChange={(text) => setName(text)}
            />
          </div>
        </CounselModalContentWrapper>
      </Modal>
    </>
  );
};

export default RegistGradeModal;

const CounselModalContentWrapper = styled.div`
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
