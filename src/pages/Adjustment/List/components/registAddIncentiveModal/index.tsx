import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateAdditionalIncentive } from '@/services/adjustment';
import { useCreateCustomerGroup } from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { numberFormat } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type TAddIncentiveModal = {
  userId: number;
  year: string;
  month: string;
};

const RegistAddIncentiveModal = (props: TModal & TAddIncentiveModal) => {
  const { userId, year, month, ...modalProps } = props;
  const [additionalIncentive, setAdditionalIncentive] = useState<number>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createAdditionalIncentive } = useCreateAdditionalIncentive();

  const handleAddIncentiveRegist = async () => {
    setSubmit(true);
    if (!additionalIncentive) return;
    if (!month) return;
    if (!userId) return;
    if (!year) return;
    try {
      const response = await createAdditionalIncentive({
        additionalIncentive,
        month,
        userId,
        year,
      });
      if (response && response.data.createAdditionalIncentive.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `추가수당이 등록되었습니다.`,
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
        title="추가수당등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleAddIncentiveRegist}
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

export default RegistAddIncentiveModal;

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
