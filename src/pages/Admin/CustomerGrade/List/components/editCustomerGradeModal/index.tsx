import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import {
  useCreateCustomerGroup,
  useGetCustomerGrade,
  useGetCustomerGroup,
  useUpdateCustomerGrade,
  useUpdateCustomerGroup,
} from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const EditCustomerGradeModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetCustomerGrade(idx);
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCustomerGrade } = useUpdateCustomerGrade();

  const handleCustomerGradeEdit = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await updateCustomerGrade({
        customerGradeId: idx,
        name,
      });
      if (response && response.data.updateCustomerGrade.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객등급이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [addToast, idx, modalProps, name, updateCustomerGrade]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCustomerGradeEdit();
      }
    },
    [handleCustomerGradeEdit],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  useEffect(() => {
    const detail = data?.getCustomerGrade;
    if (detail) {
      setName(detail.name);
    }
  }, [data, setName]);

  return (
    <>
      <SModal
        {...modalProps}
        title="고객등급수정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '수정',
        }}
        onConfirm={handleCustomerGradeEdit}
      >
        <RegistTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              고객등급명 <p className="required">*</p>
            </span>
            <Input
              value={name}
              onTextChange={(text) => setName(text)}
            />
          </div>
        </RegistTeamModalContentWrapper>
      </SModal>
    </>
  );
};

export default EditCustomerGradeModal;

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
