import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateCity } from '@/services/city';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { useState } from 'react';
import styled from 'styled-components';

const RegistCityModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createCity } = useCreateCity();

  const handleCityRegist = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await createCity({
        name,
      });
      if (response && response.data.createCity.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `지역이 등록되었습니다.`,
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
        title="지역등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleCityRegist}
      >
        <RegistTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              지역명 <p className="required">*</p>
            </span>
            <Input
              value={name}
              onTextChange={(text) => setName(text)}
            />
          </div>
        </RegistTeamModalContentWrapper>
      </Modal>
    </>
  );
};

export default RegistCityModal;

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
