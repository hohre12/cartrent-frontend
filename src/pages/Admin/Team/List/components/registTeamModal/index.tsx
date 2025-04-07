import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useCreateAdditionalIncentive } from '@/services/adjustment';
import { useCreateTeam, useGetTeams } from '@/services/team';
import { useGetUsers } from '@/services/user';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Team, User } from '@/types/graphql';
import { flattenTeams, numberFormat } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistTeamModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const [parentTeam, setParentTeam] = useState<Team>();
  const [leaderUser, setLeaderUser] = useState<User>();

  const { data: teams } = useGetTeams();
  const { data: users } = useGetUsers();

  const { createTeam } = useCreateTeam();

  const handleTeamRegist = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await createTeam({
        name,
        leaderUserId: leaderUser?.id,
        parentId: parentTeam?.id,
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
    } catch (e: any) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `${e.message}`,
        type: 'error',
      });
      modalProps.onCancel?.();
    }
  }, [addToast, createTeam, leaderUser?.id, modalProps, name, parentTeam?.id]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTeamRegist();
      }
    },
    [handleTeamRegist],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

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
          <div className="InputWrapper">
            <span>팀장</span>
            <Select
              size="medium"
              value={{ ...leaderUser }}
              onChange={(value) => setLeaderUser(value)}
              list={users?.getUsers ?? []}
              trackBy="id"
              valueBy="name"
              placeholder={'팀장을 선택해주세요.'}
            />
          </div>
          <div className="InputWrapper">
            <span>상위조직</span>
            <Select
              size="medium"
              value={{ ...parentTeam }}
              onChange={(value) => setParentTeam(value)}
              list={teams?.getTeams ? flattenTeams(teams.getTeams) : []}
              trackBy="id"
              valueBy="name"
              placeholder={'상위조직을 선택해주세요.'}
            />
          </div>
        </RegistTeamModalContentWrapper>
      </Modal>
    </>
  );
};

export default RegistTeamModal;

const RegistTeamModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .InputWrapper {
    /* display: flex;
    gap: 5px; */
    .inputBox {
      height: 48px;
      width: 100%;
      & > input {
        ${textXs12Medium}
      }
    }
  }
`;
