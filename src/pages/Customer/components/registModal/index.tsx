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
              전화번호 <p className="required">*</p>
            </span>
            <Input
              placeholder="전화번호를 입력해 주세요."
              value={phone}
              onTextChange={(text) => setPhone(autoHypenTel(text))}
              isError={submit && !phone}
              errorMessage="전화번호는 필수입니다."
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
