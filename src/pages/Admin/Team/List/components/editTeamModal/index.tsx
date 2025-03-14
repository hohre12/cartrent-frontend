import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetTeam, useGetTeams, useUpdateTeam } from '@/services/team';
import { useGetUsers } from '@/services/user';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Team, User } from '@/types/graphql';
import { flattenTeams } from '@/utils/common';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditTeamModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetTeam(idx);
  const [name, setName] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const [parentTeam, setParentTeam] = useState<Team>();
  const [leaderUser, setLeaderUser] = useState<User>();

  const { data: teams } = useGetTeams();
  const { data: users } = useGetUsers();

  const { updateTeam } = useUpdateTeam();

  const handleTeamEdit = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await updateTeam({
        teamId: idx,
        name,
        leaderUserId: leaderUser?.id,
        parentId: parentTeam?.id,
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
    } catch (e: any) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `${e.message}`,
        type: 'error',
      });
      modalProps.onCancel?.();
    }
  };

  useEffect(() => {
    const detail = data?.getTeam;
    if (detail) {
      setName(detail.name);
      setLeaderUser(detail.leader ?? undefined);
      setParentTeam(detail.parentTeam ?? undefined);
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

export default EditTeamModal;

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
