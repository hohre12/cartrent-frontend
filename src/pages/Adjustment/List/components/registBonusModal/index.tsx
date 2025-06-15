import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import {
  useCreateAdditionalIncentive,
  useCreateBonus,
} from '@/services/adjustment';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { numberFormat } from '@/utils/common';
import { useState } from 'react';
import styled from 'styled-components';

type TAddIncentiveModal = {
  userId: number;
  year: string;
  month: string;
};

const RegistBonusModal = (props: TModal & TAddIncentiveModal) => {
  const { userId, year, month, ...modalProps } = props;
  const [bonus, setBonus] = useState<number>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createBonus } = useCreateBonus();

  const handleBonusRegist = async () => {
    setSubmit(true);
    if (!bonus) return;
    if (!month) return;
    if (!userId) return;
    if (!year) return;
    try {
      const response = await createBonus({
        bonus,
        month,
        userId,
        year,
      });
      if (response && response.data.createBonus.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `상여금이 등록되었습니다.`,
          type: 'success',
        });
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
        title="상여금등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleBonusRegist}
      >
        <AddIncentiveModalContentWrapper>
          <div className="InputWrapper">
            <span>
              상여금 <p className="required">*</p>
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

export default RegistBonusModal;

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
