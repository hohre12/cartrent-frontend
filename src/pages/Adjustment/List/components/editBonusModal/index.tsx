import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteBonus, useUpdateBonus } from '@/services/adjustment';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { numberFormat } from '@/utils/common';
import { useState } from 'react';
import styled from 'styled-components';

type TBonusModal = {
  id: number;
  propsBonus: number;
};

const EditBonusModal = (props: TModal & TBonusModal) => {
  const { id, propsBonus, ...modalProps } = props;
  const [bonus, setBonus] = useState<number>(propsBonus);
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  const { showConfirm, hideConfirm } = useConfirm();

  const { updateBonus } = useUpdateBonus();
  const { deleteBonus } = useDeleteBonus();

  const handleBonusEdit = async () => {
    setSubmit(true);
    if (!id) return;
    if (!bonus) return;
    try {
      const response = await updateBonus({
        bonusId: id,
        bonus,
      });
      if (response && response.data.updateBonus.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `상여금이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleBonusDelete = async () => {
    if (!id) return;
    try {
      const response = await deleteBonus(id);
      if (response && response.data.deleteBonus) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `상여금이 삭제되었습니다.`,
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
        title="상여금수정"
        size={'small'}
        customFooter={
          <div className="modalFooter right">
            <Button onClick={() => modalProps.onCancel?.()}>취소</Button>
            <Button
              variant="primaryDanger"
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '상여금 삭제',
                  content: `상여금을 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleBonusDelete,
                })
              }
            >
              삭제
            </Button>
            <Button
              variant="primaryInfo"
              onClick={handleBonusEdit}
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
              value={numberFormat(bonus)}
              isNumber
              onTextChange={(text) => setBonus(Number(text.replace(/,/g, '')))}
              postfixNode={'원'}
            />
          </div>
        </AddIncentiveModalContentWrapper>
      </Modal>
    </>
  );
};

export default EditBonusModal;

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
