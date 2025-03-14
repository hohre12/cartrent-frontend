import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { UserPositionHangleEnum } from '@/constants/user';
import { useToast } from '@/hooks/useToast';
import { useGetTeams } from '@/services/team';
import { useCreateUser, useGetPositions } from '@/services/user';
import { userState } from '@/state/auth';
import { TModal } from '@/types/common';
import {
  CreateCustomerDto,
  CreateUserDto,
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  PermissionType,
  Position,
  Team,
  User,
} from '@/types/graphql';
import { autoHypenTel, flattenTeams } from '@/utils/common';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  //   const my = useRecoilValue(userState);

  const [userPosition, setUserPosition] = useState<Position>();
  const [userTeam, setUserTeam] = useState<Team>();
  //   const [user, setUser] = useState<User>();
  //   const [memo, setMemo] = useState<CreateCustomerDto['memo']>();
  const [name, setName] = useState<CreateUserDto['name']>();
  const [email, setEmail] = useState<CreateUserDto['email']>();
  const [password, setPassword] = useState<CreateUserDto['password']>();

  const { data: positions } = useGetPositions();
  const { data: teams } = useGetTeams();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createUser } = useCreateUser();

  const handleUserRegist = async () => {
    setSubmit(true);
    if (!name) return;
    if (!email) return;
    if (!password) return;
    if (!userPosition) return;
    try {
      const response = await createUser({
        name,
        email,
        password,
        positionId: userPosition.id,
        teamId: userTeam?.id,
      });

      if (response && response.data.createUser.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `담당자가 등록되었습니다.`,
          type: 'success',
        });
      }

      modalProps.onConfirm?.();
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

  return (
    <>
      <SModal
        {...modalProps}
        title="담당자등록"
        size="small"
        onConfirm={handleUserRegist}
      >
        <RegistCustomerWrapper>
          {/* 이름, email, 비밀번호, 직책, 팀 */}
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
          <div>
            <span>
              비밀번호 <p className="required">*</p>
            </span>
            <Input
              placeholder="초기 비밀번호를 입력해 주세요."
              value={password ?? ''}
              onTextChange={(text) => setPassword(text)}
            />
          </div>
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
              list={teams?.getTeams ? flattenTeams(teams.getTeams) : []}
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

export default RegistModal;

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
