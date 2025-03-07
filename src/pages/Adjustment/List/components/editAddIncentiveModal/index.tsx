import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import {
  useDeleteAdditionalIncentive,
  useUpdateAdditionalIncentive,
} from '@/services/adjustment';
import { useCreateCustomerGroup } from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { numberFormat } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type TAddIncentiveModal = {
  id: number;
  addIncentive: number;
};

const EditAddIncentiveModal = (props: TModal & TAddIncentiveModal) => {
  const { id, addIncentive, ...modalProps } = props;
  const [additionalIncentive, setAdditionalIncentive] =
    useState<number>(addIncentive);
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  const { showConfirm, hideConfirm } = useConfirm();

  const { updateAdditionalIncentive } = useUpdateAdditionalIncentive();
  const { deleteAdditionalIncentive } = useDeleteAdditionalIncentive();

  const handleAddIncentiveEdit = async () => {
    setSubmit(true);
    if (!id) return;
    if (!additionalIncentive) return;
    try {
      const response = await updateAdditionalIncentive({
        additionalIncentiveId: id,
        additionalIncentive,
      });
      if (response && response.data.updateAdditionalIncentive.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `추가수당이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddIncentiveDelete = async () => {
    if (!id) return;
    try {
      const response = await deleteAdditionalIncentive(id);
      if (response && response.data.deleteAdditionalIncentive) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `추가수당이 삭제되었습니다.`,
          type: 'success',
        });
        hideConfirm();
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <Modal
        {...modalProps}
        title="추가수당수정"
        size={'small'}
        customFooter={
          <div className="modalFooter right">
            <Button onClick={() => modalProps.onCancel?.()}>취소</Button>
            <Button
              variant="primaryDanger"
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '추가수당 삭제',
                  content: `추가수당을 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleAddIncentiveDelete,
                })
              }
            >
              삭제
            </Button>
            <Button
              variant="primaryInfo"
              onClick={handleAddIncentiveEdit}
            >
              수정
            </Button>
          </div>
        }
      >
        <AddIncentiveModalContentWrapper>
          <div className="InputWrapper">
            <span>
              추가수당 <p className="required">*</p>
            </span>
            <Input
              value={numberFormat(additionalIncentive)}
              isNumber
              onTextChange={(text) =>
                setAdditionalIncentive(Number(text.replace(/,/g, '')))
              }
              postfixNode={'원'}
            />
          </div>
        </AddIncentiveModalContentWrapper>
      </Modal>
    </>
  );
};

export default EditAddIncentiveModal;

const AddIncentiveModalContentWrapper = styled.div`
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
