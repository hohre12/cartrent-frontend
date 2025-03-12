import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useToast } from '@/hooks/useToast';
import { useCreateAdditionalIncentive } from '@/services/adjustment';
import { useCreateTeam, useGetTeam, useUpdateTeam } from '@/services/team';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { numberFormat } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditTeamModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetTeam(idx);
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateTeam } = useUpdateTeam();

  const handleTeamEdit = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await updateTeam({
        teamId: idx,
        name,
      });
      if (response && response.data.updateTeam.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `팀이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const detail = data?.getTeam;
    if (detail) {
      setName(detail.name);
    }
  }, [data, setName]);

  return (
    <>
      <Modal
        {...modalProps}
        title="팀수정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleTeamEdit}
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

export default EditTeamModal;

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
