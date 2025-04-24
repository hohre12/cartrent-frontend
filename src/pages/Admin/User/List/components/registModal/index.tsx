import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { UserPositionHangleEnum } from '@/constants/user';
import { useToast } from '@/hooks/useToast';
import { useGetTeams } from '@/services/team';
import { useCreateUser, useGetPositions } from '@/services/user';
import { TModal } from '@/types/common';
import { CreateUserDto, Position, Team } from '@/types/graphql';
import { autoHypenTel, flattenTeams } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  //   const my = useRecoilValue(userState);

  const [userPosition, setUserPosition] = useState<Position>();
  const [userTeam, setUserTeam] = useState<Team>();

  const [name, setName] = useState<CreateUserDto['name']>();
  const [email, setEmail] = useState<CreateUserDto['email']>();
  const [password, setPassword] = useState<CreateUserDto['password']>();

  const [hireDate, setHireDate] = useState<CreateUserDto['hireDate']>();
  const [birthDate, setBirthDate] = useState<CreateUserDto['birthDate']>();
  const [phone, setPhone] = useState<CreateUserDto['phone']>();
  const [salesPhone, setSalesPhone] = useState<CreateUserDto['salesPhone']>();
  const [fax, setFax] = useState<CreateUserDto['fax']>();
  const [englishName, setEnglishName] =
    useState<CreateUserDto['englishName']>();
  const [salaryAccount, setSalaryAccount] =
    useState<CreateUserDto['salaryAccount']>();
  const [bank, setBank] = useState<CreateUserDto['bank']>();

  const { data: positions } = useGetPositions();
  const { data: teams } = useGetTeams();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createUser } = useCreateUser();

  const handleUserRegist = useCallback(async () => {
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
        hireDate,
        birthDate,
        phone,
        salesPhone,
        fax,
        englishName,
        salaryAccount,
        bank,
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
  }, [
    addToast,
    createUser,
    email,
    modalProps,
    name,
    password,
    userPosition,
    userTeam?.id,
    hireDate,
    birthDate,
    phone,
    salesPhone,
    fax,
    englishName,
    salaryAccount,
    bank,
  ]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleUserRegist();
      }
    },
    [handleUserRegist],
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
      <SModal
        {...modalProps}
        title="담당자등록"
        size="small"
        onConfirm={handleUserRegist}
      >
        <RegistCustomerWrapper>
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
          <div>
            <span>입사일시</span>
            <Input
              type="date"
              style={{ cursor: 'pointer' }}
              value={hireDate ?? ''}
              onTextChange={(text) => setHireDate(text)}
            />
          </div>
          <div>
            <span>생년월일</span>
            <Input
              type="date"
              style={{ cursor: 'pointer' }}
              value={birthDate ?? ''}
              onTextChange={(text) => setBirthDate(text)}
            />
          </div>
          <div>
            <span>연락처</span>
            <Input
              placeholder="연락처를 입력해 주세요."
              value={phone ?? ''}
              onTextChange={(text) => setPhone(autoHypenTel(text))}
            />
          </div>
          <div>
            <span>영업폰 연락처</span>
            <Input
              placeholder="영업폰 연락처를 입력해 주세요."
              value={salesPhone ?? ''}
              onTextChange={(text) => setSalesPhone(autoHypenTel(text))}
            />
          </div>
          <div>
            <span>팩스번호</span>
            <Input
              placeholder="팩스번호를 입력해 주세요."
              value={fax ?? ''}
              onTextChange={(text) => setFax(text)}
            />
          </div>
          <div>
            <span>영문이름</span>
            <Input
              placeholder="영문이름을 입력해 주세요."
              value={englishName ?? ''}
              onTextChange={(text) => setEnglishName(text)}
            />
          </div>
          <div>
            <span>급여계좌번호</span>
            <Input
              placeholder="급여계좌번호를 입력해 주세요."
              value={salaryAccount ?? ''}
              onTextChange={(text) => setSalaryAccount(text)}
            />
          </div>
          <div>
            <span>은행</span>
            <Input
              placeholder="은행을 입력해 주세요."
              value={bank ?? ''}
              onTextChange={(text) => setBank(text)}
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
