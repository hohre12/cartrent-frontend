import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import {
  useCreateCustomerGroup,
  useGetCustomerGroup,
  useUpdateCustomerGroup,
} from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditCustomerGroupModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetCustomerGroup(idx);
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCustomerGroup } = useUpdateCustomerGroup();

  const handleCustomerGroupEdit = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await updateCustomerGroup({
        customerGroupId: idx,
        name,
      });
      if (response && response.data.updateCustomerGroup.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객그룹이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const detail = data?.getCustomerGroup;
    if (detail) {
      setName(detail.name);
    }
  }, [data, setName]);

  return (
    <>
      <SModal
        {...modalProps}
        title="고객그룹수정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '수정',
        }}
        onConfirm={handleCustomerGroupEdit}
      >
        <RegistTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              고객그룹명 <p className="required">*</p>
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

export default EditCustomerGroupModal;

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
