import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { UserPositionHangleEnum } from '@/constants/user';
import { useToast } from '@/hooks/useToast';
import { useGetTeams } from '@/services/team';
import { useGetPositions, useGetUser, useUpdateUser } from '@/services/user';
import { TModal } from '@/types/common';
import { Position, Team, UpdateUserDto } from '@/types/graphql';
import { autoHypenTel, flattenTeams } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const EditModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetUser(idx);
  const [userPosition, setUserPosition] = useState<Position>();
  const [userTeam, setUserTeam] = useState<Team>();

  const [name, setName] = useState<UpdateUserDto['name']>();
  const [email, setEmail] = useState<UpdateUserDto['email']>();

  const [hireDate, setHireDate] = useState<UpdateUserDto['hireDate']>();
  const [birthDate, setBirthDate] = useState<UpdateUserDto['birthDate']>();
  const [phone, setPhone] = useState<UpdateUserDto['phone']>();
  const [salesPhone, setSalesPhone] = useState<UpdateUserDto['salesPhone']>();
  const [fax, setFax] = useState<UpdateUserDto['fax']>();
  const [englishName, setEnglishName] =
    useState<UpdateUserDto['englishName']>();
  const [salaryAccount, setSalaryAccount] =
    useState<UpdateUserDto['salaryAccount']>();
  const [bank, setBank] = useState<UpdateUserDto['bank']>();

  const { data: positions } = useGetPositions();
  const { data: teams } = useGetTeams();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateUser } = useUpdateUser();

  const handleUserEdit = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    if (!email) return;
    if (!userPosition) return;
    try {
      const response = await updateUser({
        userId: idx,
        name,
        email,
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

      if (response && response.data.updateUser.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `담당자가 수정되었습니다.`,
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
  }, [
    addToast,
    email,
    idx,
    modalProps,
    name,
    updateUser,
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

  useEffect(() => {
    const detail = data?.getUser;
    if (detail) {
      setUserPosition(detail.position);
      setUserTeam(detail.team ?? undefined);
      setName(detail.name);
      setEmail(detail.email);

      setHireDate(detail.hireDate);
      setBirthDate(detail.birthDate);
      setPhone(detail.phone);
      setSalesPhone(detail.salesPhone);
      setFax(detail.fax);
      setEnglishName(detail.englishName);
      setSalaryAccount(detail.salaryAccount);
      setBank(detail.bank);
    }
  }, [data]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleUserEdit();
      }
    },
    [handleUserEdit],
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
        title="담당자수정"
        size="small"
        onConfirm={handleUserEdit}
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
              value={phone}
              onTextChange={(text) => setPhone(autoHypenTel(text))}
            />
          </div>
          <div>
            <span>영업폰 연락처</span>
            <Input
              placeholder="영업폰 연락처를 입력해 주세요."
              value={salesPhone}
              onTextChange={(text) => setSalesPhone(autoHypenTel(text))}
            />
          </div>
          <div>
            <span>팩스번호</span>
            <Input
              placeholder="팩스번호를 입력해 주세요."
              value={fax}
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
