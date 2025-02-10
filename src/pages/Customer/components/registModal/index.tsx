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
import { TModal } from '@/types/common';
import {
  CreateCustomerDto,
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
} from '@/types/graphql';
import { autoHypenTel } from '@/utils/common';
import { useState } from 'react';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;

  const [customerGrade, setCustomerGrade] = useState<CustomerGrade>();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup>();
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>();
  const [memo, setMemo] = useState<CreateCustomerDto['memo']>();
  const [name, setName] = useState<CreateCustomerDto['name']>();
  const [note, setNote] = useState<CreateCustomerDto['note']>();
  const [phone, setPhone] = useState<CreateCustomerDto['phone']>();
  const [type, setType] = useState<CreateCustomerDto['type']>();

  const { data: statuses } = useGetCustomerStatuses();
  const { data: grades } = useGetCustomerGrades();
  const { data: groups } = useGetCustomerGroups();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { createCustomer } = useCreateCustomer();

  const handleCustomerRegist = async () => {
    setSubmit(true);
    if (!name) return;
    if (!phone) return;
    try {
      const response = await createCustomer({
        customerGradeId: customerGrade?.id,
        customerGroupId: customerGroup?.id,
        customerStatusId: customerStatus?.id,
        memo,
        name,
        note,
        phone,
        type,
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
  };

  return (
    <>
      <SModal
        {...modalProps}
        title="고객등록"
        size="small"
        onConfirm={handleCustomerRegist}
      >
        <RegistCustomerWrapper>
          {/* 이름, 전화번호, 메모, 고객유형, 구분, 회사명/명의자, 상태, 등급, 그룹, 비고 */}
          <div>
            <p>고객명</p>
            <Input
              placeholder="고객명을 입력해 주세요."
              value={name}
              onTextChange={(text) => setName(text)}
            />
          </div>
          <div>
            <p>전화번호</p>
            <Input
              placeholder="전화번호를 입력해 주세요."
              value={phone}
              onTextChange={(text) => setPhone(autoHypenTel(text))}
            />
          </div>
          <div>
            <p>메모</p>
            <Input
              placeholder="메모를 입력해 주세요."
              value={memo ?? ''}
              onTextChange={(text) => setMemo(text)}
            />
          </div>
          <div>
            <p>고객유형</p>
            <Input
              placeholder="고객유형을 입력해 주세요."
              value={type ?? ''}
              onTextChange={(text) => setType(text)}
            />
          </div>
          <div>
            <p>상태</p>
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
            <p>등급</p>
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
            <p>그룹</p>
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
            <p>비고</p>
            <Input
              placeholder="비고를 입력해 주세요."
              value={note ?? ''}
              onTextChange={(text) => setNote(text)}
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
