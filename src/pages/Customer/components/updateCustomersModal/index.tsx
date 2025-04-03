import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import {
  useGetCustomerGrades,
  useGetCustomerGroups,
  useGetCustomerStatuses,
  useUpdateCustomers,
} from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { selectedCustomerState } from '@/state/customer';
import { TModal } from '@/types/common';
import {
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  PositionType,
  User,
} from '@/types/graphql';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const UpdateCustomersModal = (props: TModal) => {
  const { ...modalProps } = props;
  const selectedCustomer = useRecoilValue(selectedCustomerState);
  const my = useRecoilValue(userState);
  const [user, setUser] = useState<User>();
  const [customerGrade, setCustomerGrade] = useState<CustomerGrade>();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup>();
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>();

  const { data: users } = useGetUsers();
  const { data: statuses } = useGetCustomerStatuses();
  const { data: grades } = useGetCustomerGrades();
  const { data: groups } = useGetCustomerGroups();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCustomers } = useUpdateCustomers();

  const handleUpdateCustomers = useCallback(async () => {
    if (!user && !customerStatus && !customerGrade && !customerGroup) return;
    try {
      const response = await updateCustomers({
        customerIds: selectedCustomer.map((it) => it.id),
        userId: user?.id,
        customerStatusId: customerStatus?.id,
        customerGradeId: customerGrade?.id,
        customerGroupId: customerGroup?.id,
      });
      if (response && response.data.updateCustomers) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${selectedCustomer.length}명의 고객정보가 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [
    addToast,
    customerGrade,
    customerGroup,
    customerStatus,
    modalProps,
    selectedCustomer,
    updateCustomers,
    user,
  ]);

  return (
    <>
      <SModal
        {...modalProps}
        title="고객일괄수정"
        size="small"
        onConfirm={handleUpdateCustomers}
      >
        <RegistCustomerWrapper>
          <div>
            <span>담당자</span>
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
              disabled={
                my?.position?.name === PositionType.SeniorManager ||
                my?.position?.name === PositionType.Manager ||
                my?.position?.name === PositionType.AssistantManager ||
                my?.position?.name === PositionType.Staff
              }
              isError={submit && !user}
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
        </RegistCustomerWrapper>
      </SModal>
    </>
  );
};

export default UpdateCustomersModal;

export const SModal = styled(Modal)``;
const RegistCustomerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
