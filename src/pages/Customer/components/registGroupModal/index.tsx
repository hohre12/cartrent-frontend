import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateCustomerGroup } from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistGroupModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createCustomerGroup } = useCreateCustomerGroup();

  const handleCustomerGroupRegist = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await createCustomerGroup({
        name,
      });

      if (response && response.data.createCustomerGroup.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객그룹이 등록되었습니다.`,
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
  };

  return (
    <>
      <Modal
        {...modalProps}
        title="고객그룹등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleCustomerGroupRegist}
      >
        <CounselModalContentWrapper>
          <div className="InputWrapper">
            <span>
              고객그룹명 <p className="required">*</p>
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

export default RegistGroupModal;

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
