import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateAdditionalIncentive } from '@/services/adjustment';
import { useCreateTeam } from '@/services/team';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { numberFormat } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistTeamModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createTeam } = useCreateTeam();

  const handleTeamRegist = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await createTeam({
        name,
      });
      if (response && response.data.createTeam.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `팀이 등록되었습니다.`,
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
        title="팀등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleTeamRegist}
      >
        <RegistTeamModalContentWrapper>
          <div className="InputWrapper">
            <span>
              팀명 <p className="required">*</p>
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

export default RegistTeamModal;

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
