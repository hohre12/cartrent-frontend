import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { UserPositionHangleEnum } from '@/constants/user';
import { useToast } from '@/hooks/useToast';
import { useGetTeams } from '@/services/team';
import { useGetPositions, useGetUser, useUpdateUser } from '@/services/user';
import { TModal } from '@/types/common';
import { Position, Team, UpdateUserDto } from '@/types/graphql';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetUser(idx);
  const [userPosition, setUserPosition] = useState<Position>();
  const [userTeam, setUserTeam] = useState<Team>();

  const [name, setName] = useState<UpdateUserDto['name']>();
  const [email, setEmail] = useState<UpdateUserDto['email']>();
  //   const [password, setPassword] = useState<UpdateUserDto['password']>();

  const { data: positions } = useGetPositions();
  const { data: teams } = useGetTeams();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateUser } = useUpdateUser();

  const handleUserEdit = async () => {
    setSubmit(true);
    if (!name) return;
    if (!email) return;
    // if (!password) return;
    if (!userPosition) return;
    try {
      const response = await updateUser({
        // userId: idx,
        name,
        email,
        // password,
        // positionId: userPosition.id,
        // teamId: userTeam?.id,
      });

      if (response && response.data.updateUser.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `담당자가 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const detail = data?.getUser;
    if (detail) {
      setUserPosition(detail.position);
      setUserTeam(detail.team ?? undefined);
      setName(detail.name);
      setEmail(detail.email);
      //   setPassword(detail.password);
    }
  }, [data, setUserPosition, setUserTeam, setName, setEmail]);

  return (
    <>
      <SModal
        {...modalProps}
        title="담당자수정"
        size="small"
        onConfirm={handleUserEdit}
      >
        <RegistCustomerWrapper>
          {/* 이름, email, 직책, 팀 */}
          <div>
            <span>
              담당자명 <p className="required">*</p>
            </span>
            <Input
              placeholder="담당자명을 입력해 주세요."
              value={name}
              onTextChange={(text) => setName(text)}
              isError={submit && !name}
              errorMessage="담당자명은 필수입니다."
            />
          </div>
          <div>
            <span>
              Email <p className="required">*</p>
            </span>
            <Input
              placeholder="Email을 입력해 주세요."
              value={email ?? ''}
              onTextChange={(text) => setEmail(text)}
            />
          </div>
          {/* <div>
            <span>
              비밀번호 <p className="required">*</p>
            </span>
            <Input
              placeholder="초기 비밀번호를 입력해 주세요."
              value={password ?? ''}
              onTextChange={(text) => setPassword(text)}
            />
          </div> */}
          <div>
            <span>
              직책 <p className="required">*</p>
            </span>
            <Select
              size="medium"
              value={{
                ...(userPosition
                  ? {
                      id: userPosition.id,
                      name: UserPositionHangleEnum[userPosition.name],
                    }
                  : {}),
              }}
              onChange={(value) => setUserPosition(value)}
              list={
                positions?.getPositions
                  ? positions.getPositions.map((it) => ({
                      id: it.id,
                      name: UserPositionHangleEnum[it.name],
                    }))
                  : []
              }
              trackBy="id"
              valueBy="name"
              placeholder="직책을 선택해주세요"
            />
          </div>
          <div>
            <span>팀</span>
            <Select
              size="medium"
              value={{ ...userTeam }}
              onChange={(value) => setUserTeam(value)}
              list={teams?.getTeams ?? []}
              trackBy="id"
              valueBy="name"
              placeholder="팀을 선택해주세요"
            />
          </div>
        </RegistCustomerWrapper>
      </SModal>
    </>
  );
};

export default EditModal;

export const SModal = styled(Modal)``;
const RegistCustomerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SelectWrapper = styled.div`
  .selectBox {
    height: 40px;
  }
`;
