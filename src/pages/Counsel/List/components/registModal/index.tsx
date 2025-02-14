import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import TextArea from '@/components/textArea/TextArea';
import { useToast } from '@/hooks/useToast';
import { useGetContracts } from '@/services/contract';
import { useCreateCounsel } from '@/services/counsel';
import { useGetCustomers } from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import {
  Contract,
  CreateCounselDto,
  Customer,
  PermissionType,
  User,
} from '@/types/graphql';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [customer, setCustomer] = useState<Customer>();
  const [user, setUser] = useState<User>();
  const my = useRecoilValue(userState);
  const [contract, setContract] = useState<Contract>();

  const [counselAt, setCounselAt] = useState<CreateCounselDto['counselAt']>();
  const [context, setContext] = useState<CreateCounselDto['context']>();

  const [submit, setSubmit] = useState<boolean>(false);

  const { addToast } = useToast();
  const { data: customers } = useGetCustomers({});
  const { data: users } = useGetUsers();

  const { data: contracts } = useGetContracts({
    customerId: customer?.id ? [customer?.id] : [],
  });
  const isContracts =
    contracts && contracts?.getContracts?.length > 0 ? true : false;

  const { createCounsel } = useCreateCounsel();

  const handleCounselRegist = async () => {
    setSubmit(true);
    if (!customer) return;
    if (!counselAt) return;
    if (!context) return;
    try {
      const response = await createCounsel({
        customer_id: customer.id,
        counselAt,
        user_id: user?.id,
        contract_id: contract?.id,
        context,
      });

      if (response && response.data.createCounsel.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `상담이 등록되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (customers && customers?.getCustomers?.length > 0) {
      setCustomer(customers?.getCustomers[0]);
    }
  }, [customers, setCustomer]);

  useEffect(() => {
    setContract(undefined);
  }, [customer]);

  useEffect(() => {
    if (my) {
      setUser(my);
    }
  }, [my, setUser]);

  return (
    <>
      <Modal
        {...modalProps}
        title="상담정보등록"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '등록',
        }}
        onConfirm={handleCounselRegist}
      >
        <CounselModalContentWrapper>
          <div className="InputWrapper">
            <div>
              <span>
                고객명 <p className="required">*</p>
              </span>
              <Select
                size="medium"
                value={{
                  ...customer,
                }}
                onChange={(value) => setCustomer(value)}
                list={customers?.getCustomers ?? []}
                trackBy="id"
                valueBy="name"
                placeholder="고객을 선택해주세요"
                isError={submit && !customer}
              />
            </div>
            <div>
              <span>
                상담일시 <p className="required">*</p>
              </span>
              <Input
                type="datetime-local"
                style={{ cursor: 'pointer' }}
                onTextChange={(text) => setCounselAt(text)}
                isError={submit && !counselAt}
                errorMessage="상담일시는 필수입니다."
              />
            </div>
            <div>
              <span>상담자</span>
              <Select
                size="medium"
                value={{
                  ...user,
                }}
                onChange={(value) => setUser(value)}
                list={users?.getUsers ?? []}
                trackBy="id"
                valueBy="name"
                disabled={my?.role?.name === PermissionType.User}
              />
            </div>
            <div>
              <span>계약</span>
              <Select
                size="medium"
                value={{ ...contract }}
                onChange={(value) => setContract(value)}
                list={contracts?.getContracts ?? []}
                trackBy="id"
                valueBy="carName"
                placeholder={
                  !isContracts ? '계약이 없습니다.' : '계약을 선택해주세요.'
                }
                disabled={!isContracts}
              />
            </div>
          </div>
          <div className="TextAreaWrapper">
            <span>
              상담내용 <p className="required">*</p>
            </span>
            <TextArea
              value={context ?? ''}
              onTextChange={(value) => setContext(value)}
              style={{ width: '500px' }}
              isError={submit && !context}
              errorMessage="상담내용은 필수입니다."
            ></TextArea>
          </div>
        </CounselModalContentWrapper>
      </Modal>
    </>
  );
};

export default RegistModal;

const CounselModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .InputWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    & > div {
      display: flex;
      width: 49%;
      gap: 5px;
      & > span {
        min-width: 50px;
      }
      .inputBox {
        height: 48px;
        width: 100%;
        & > input {
          ${textXs12Medium}
        }
      }
    }
  }
  .TextAreaWrapper {
    display: flex;
    gap: 5px;
    & > span {
      min-width: 40px;
    }
  }
`;
