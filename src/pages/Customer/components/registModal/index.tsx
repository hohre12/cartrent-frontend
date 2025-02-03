import { CREATE_CUSTOMER_MUTATION } from '@/apollo/mutations/customer';
import { GET_CUSTOMERS_QUERY } from '@/apollo/queries/customer';
import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { TModal } from '@/types/common';
import { CreateCustomerDto } from '@/types/graphql';
import { useApolloClient, useMutation } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [companyNameNominee, setCompanyNameNominee] =
    useState<CreateCustomerDto['companyNameNominee']>();
  const [customerGradeId, setCustomerGradeId] =
    useState<CreateCustomerDto['customerGradeId']>();
  const [customerGroupId, setCustomerGroupId] =
    useState<CreateCustomerDto['customerGroupId']>();
  const [customerStatusId, setCustomerStatusId] =
    useState<CreateCustomerDto['customerStatusId']>();
  const [division, setDivision] = useState<CreateCustomerDto['division']>();
  const [memo, setMemo] = useState<CreateCustomerDto['memo']>();
  const [name, setName] = useState<CreateCustomerDto['name']>();
  const [note, setNote] = useState<CreateCustomerDto['note']>();
  const [phone, setPhone] = useState<CreateCustomerDto['phone']>();
  const [product, setProduct] = useState<CreateCustomerDto['product']>();
  const [type, setType] = useState<CreateCustomerDto['type']>();

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  //   const { showConfirm, hideConfirm } = useConfirm();
  const [createCustomer] = useMutation(CREATE_CUSTOMER_MUTATION, {
    refetchQueries: [GET_CUSTOMERS_QUERY, 'GetCustomers'],
  });

  const handleCustomerRegist = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      const response = await createCustomer({
        variables: {
          createCustomerDto: {
            companyNameNominee,
            customerGradeId,
            customerGroupId,
            customerStatusId,
            division,
            memo,
            name,
            note,
            phone,
            product,
            type,
          },
        },
      });
      console.log(response);
      if (response.data.createCustomer.id) {
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
              onTextChange={(text) => setPhone(text)}
            />
          </div>
          <div>
            <p>메모</p>
            <Input
              placeholder="이메일을 입력해 주세요."
              value={memo}
              onTextChange={(text) => setMemo(text)}
            />
          </div>
          <div>
            <p>고객유형</p>
            <Input
              placeholder="주소를 입력해 주세요."
              value={type}
              onTextChange={(text) => setType(text)}
            />
          </div>
          <div>
            <p>상품</p>
            <Input
              placeholder="생년월일을 입력해 주세요."
              value={product}
              onTextChange={(text) => setProduct(text)}
            />
          </div>
          <div>
            <p>구분</p>
            <Input
              placeholder="직업을 입력해 주세요."
              value={division}
              onTextChange={(text) => setDivision(text)}
            />
          </div>
          <div>
            <p>회사명/명의자</p>
            <Input
              placeholder="그룹을 입력해 주세요.(셀렉박스 예정)"
              value={companyNameNominee}
              onTextChange={(text) => setCompanyNameNominee(text)}
            />
          </div>
          <div>
            <p>상태</p>
            <Input
              placeholder="직업을 입력해 주세요."
              value={customerStatusId}
              //   onTextChange={(text) => setCustomerStatusId(text)}
            />
          </div>
          <div>
            <p>등급</p>
            <Input
              placeholder="직업을 입력해 주세요."
              value={customerGradeId}
              //   onTextChange={(text) => setCustomerGradeId(text)}
            />
          </div>
          <div>
            <p>그룹</p>
            <Input
              placeholder="직업을 입력해 주세요."
              value={customerGroupId}
              //   onTextChange={(text) => setCustomerGroupId(text)}
            />
          </div>
          <div>
            <p>비고</p>
            <Input
              placeholder="직업을 입력해 주세요."
              value={note}
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
