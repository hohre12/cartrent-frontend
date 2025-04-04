import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import {
  useCreateCustomer,
  useGetCustomerGrades,
  useGetCustomerGroups,
  useGetCustomerStatuses,
} from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { TModal } from '@/types/common';
import {
  CreateCustomerDto,
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  PermissionType,
  User,
} from '@/types/graphql';
import { autoHypenTel } from '@/utils/common';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  const my = useRecoilValue(userState);

  const [customerGrade, setCustomerGrade] = useState<CustomerGrade>();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup>();
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>();
  const [user, setUser] = useState<User>();
  const [memo, setMemo] = useState<CreateCustomerDto['memo']>();
  const [name, setName] = useState<CreateCustomerDto['name']>();
  const [note, setNote] = useState<CreateCustomerDto['note']>();
  const [phone, setPhone] = useState<CreateCustomerDto['phone']>();
  const [type, setType] = useState<CreateCustomerDto['type']>();
  const [carName, setCarName] = useState<CreateCustomerDto['carName']>();

  const { data: users } = useGetUsers();
  const { data: statuses } = useGetCustomerStatuses();
  const { data: grades } = useGetCustomerGrades();
  const { data: groups } = useGetCustomerGroups();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createCustomer } = useCreateCustomer();

  const handleCustomerRegist = useCallback(async () => {
    setSubmit(true);
    if (!name) return;
    if (!phone) return;
    if (!user) return;
    try {
      const response = await createCustomer({
        userId: user.id,
        customerGradeId: customerGrade?.id,
        customerGroupId: customerGroup?.id,
        customerStatusId: customerStatus?.id,
        memo,
        name,
        note,
        phone,
        type,
        carName,
      });

      if (response && response.data.createCustomer.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객이 등록되었습니다.`,
          type: 'success',
        });
      }

      modalProps.onConfirm?.();
    } catch (e) {
      console.warn(e);
    }
  }, [
    addToast,
    carName,
    createCustomer,
    customerGrade?.id,
    customerGroup?.id,
    customerStatus?.id,
    memo,
    modalProps,
    name,
    note,
    phone,
    type,
    user,
  ]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCustomerRegist();
      }
    },
    [handleCustomerRegist],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  useEffect(() => {
    if (my) {
      setUser(my);
    }
  }, [my, setUser]);

  return (
    <>
      <SModal
        {...modalProps}
        title="고객등록"
        size="small"
        onConfirm={handleCustomerRegist}
      >
        <RegistCustomerWrapper>
          {/* 담당자, 이름, 연락처, 메모, 고객유형, 구분, 회사명/명의자, 상태, 등급, 그룹, 비고 */}
          <div>
            <span>
              담당자 <p className="required">*</p>
            </span>
            <Select
              size="medium"
              value={{
                ...user,
              }}
              onChange={(value) => setUser(value)}
              list={users?.getUsers ?? []}
              trackBy="id"
              valueBy="name"
              placeholder="담당자를 선택해주세요"
              disabled={my?.role?.name === PermissionType.User}
              isError={submit && !user}
            />
          </div>
          <div>
            <span>
              고객명 <p className="required">*</p>
            </span>
            <Input
              placeholder="고객명을 입력해 주세요."
              value={name}
              onTextChange={(text) => setName(text)}
              isError={submit && !name}
              errorMessage="고객명은 필수입니다."
            />
          </div>
          <div>
            <span>
              연락처 <p className="required">*</p>
            </span>
            <Input
              placeholder="연락처를 입력해 주세요."
              value={phone}
              onTextChange={(text) => setPhone(autoHypenTel(text))}
              isError={submit && !phone}
              errorMessage="연락처는 필수입니다."
            />
          </div>

          <div>
            <span>고객유형</span>
            <Input
              placeholder="고객유형을 입력해 주세요."
              value={type ?? ''}
              onTextChange={(text) => setType(text)}
            />
          </div>
          <div>
            <span>상태</span>
            <Select
              size="medium"
              value={{ ...customerStatus }}
              onChange={(value) => setCustomerStatus(value)}
              list={statuses?.getCustomerStatuses ?? []}
              trackBy="id"
              valueBy="status"
              placeholder="상태를 선택해주세요"
            />
          </div>
          <div>
            <span>등급</span>
            <Select
              size="medium"
              value={{ ...customerGrade }}
              onChange={(value) => setCustomerGrade(value)}
              list={grades?.getCustomerGrades ?? []}
              trackBy="id"
              valueBy="name"
              placeholder="등급을 선택해주세요"
            />
          </div>
          <div>
            <span>그룹</span>
            <Select
              size="medium"
              value={{ ...customerGroup }}
              onChange={(value) => setCustomerGroup(value)}
              list={groups?.getCustomerGroups ?? []}
              trackBy="id"
              valueBy="name"
              placeholder="그룹을 선택해주세요"
            />
          </div>
          <div>
            <span>비고</span>
            <Input
              placeholder="비고를 입력해 주세요."
              value={note ?? ''}
              onTextChange={(text) => setNote(text)}
            />
          </div>
          <div>
            <span>차종</span>
            <Input
              placeholder="차종을 입력해 주세요."
              value={carName ?? ''}
              onTextChange={(text) => setCarName(text)}
            />
          </div>
          <div>
            <span>메모</span>
            <Input
              placeholder="메모를 입력해 주세요."
              value={memo ?? ''}
              onTextChange={(text) => setMemo(text)}
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
  flex-wrap: wrap;
  gap: 20px;
  & > div {
    width: 48%;
  }
`;
