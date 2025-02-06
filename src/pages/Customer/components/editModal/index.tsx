import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import {
  useCreateCustomer,
  useGetCustomer,
  useGetCustomerGrades,
  useGetCustomerGroups,
  useGetCustomerStatuses,
  useUpdateCustomer,
} from '@/services/customer';
import { selectedCustomerIdxState } from '@/state/customer';
import { TModal } from '@/types/common';
import {
  CreateCustomerDto,
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  UpdateCustomerDto,
} from '@/types/graphql';
import { autoHypenTel } from '@/utils/common';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const EditModal = (props: TModal) => {
  const { ...modalProps } = props;
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);
  const { data, loading, error } = useGetCustomer(selectedCustomerIdx);

  const [companyNameNominee, setCompanyNameNominee] =
    useState<UpdateCustomerDto['companyNameNominee']>();

  const [customerGrade, setCustomerGrade] = useState<CustomerGrade>();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup>();
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>();

  const [division, setDivision] = useState<UpdateCustomerDto['division']>();
  const [memo, setMemo] = useState<UpdateCustomerDto['memo']>();
  const [name, setName] = useState<UpdateCustomerDto['name']>();
  const [note, setNote] = useState<UpdateCustomerDto['note']>();
  const [phone, setPhone] = useState<UpdateCustomerDto['phone']>();
  const [product, setProduct] = useState<UpdateCustomerDto['product']>();
  const [type, setType] = useState<UpdateCustomerDto['type']>();

  const { data: statuses } = useGetCustomerStatuses();
  const { data: grades } = useGetCustomerGrades();
  const { data: groups } = useGetCustomerGroups();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCustomer } = useUpdateCustomer();

  const handleCustomerEdit = async () => {
    setSubmit(true);
    if (!name) return;
    if (!phone) return;
    try {
      const response = await updateCustomer({
        customerId: selectedCustomerIdx,
        companyNameNominee,
        customerGradeId: customerGrade?.id,
        customerGroupId: customerGroup?.id,
        customerStatusId: customerStatus?.id,
        division,
        memo,
        name,
        note,
        phone,
        product,
        type,
      });

      if (response && response.data.updateCustomer.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${name} 고객이 수정되었습니다.`,
          type: 'success',
        });
      }

      modalProps.onConfirm?.();
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const detail = data?.getCustomer;
    if (detail) {
      setName(detail.name);
      setPhone(detail.phone);
      setMemo(detail.memo);
      setType(detail.type);
      setProduct(detail.product);
      setDivision(detail.division);
      setCompanyNameNominee(detail.company_name_nominee);
      setCustomerStatus(detail.customerStatus ?? undefined);
      setCustomerGrade(detail.customerGrade ?? undefined);
      setCustomerGroup(detail.customerGroup ?? undefined);
      setNote(detail.note);
    }
  }, [
    data,
    setName,
    setPhone,
    setMemo,
    setType,
    setProduct,
    setDivision,
    setCompanyNameNominee,
    setCustomerStatus,
    setCustomerGrade,
    setCustomerGroup,
    setNote,
  ]);

  return (
    <>
      <SModal
        {...modalProps}
        title="고객수정"
        size="small"
        onConfirm={handleCustomerEdit}
      >
        <RegistCustomerWrapper>
          {/* 이름, 전화번호, 메모, 고객유형, 상품, 구분, 회사명/명의자, 상태, 등급, 그룹, 비고 */}
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
            <p>상품</p>
            <Input
              placeholder="상품을 입력해 주세요."
              value={product ?? ''}
              onTextChange={(text) => setProduct(text)}
            />
          </div>
          <div>
            <p>구분</p>
            <Input
              placeholder="구분을 입력해 주세요."
              value={division ?? ''}
              onTextChange={(text) => setDivision(text)}
            />
          </div>
          <div>
            <p>회사명/명의자</p>
            <Input
              placeholder="회사명/명의자를 입력해 주세요."
              value={companyNameNominee ?? ''}
              onTextChange={(text) => setCompanyNameNominee(text)}
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
              trackBy="name"
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
              trackBy="name"
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
