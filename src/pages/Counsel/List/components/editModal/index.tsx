import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import TextArea from '@/components/textArea/TextArea';
import { useToast } from '@/hooks/useToast';
import { useGetContracts } from '@/services/contract';
import { useGetCounsel, useUpdateCounsel } from '@/services/counsel';
import { useGetCustomers } from '@/services/customer';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Contract, Customer, UpdateCounselDto, User } from '@/types/graphql';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const EditModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetCounsel(idx);

  const [customer, setCustomer] = useState<Customer>();
  const [user, setUser] = useState<User>();
  const [contract, setContract] = useState<Contract>();

  const [counselAt, setCounselAt] = useState<UpdateCounselDto['counselAt']>();
  const [context, setContext] = useState<UpdateCounselDto['context']>();

  const { data: customers } = useGetCustomers({});
  const { data: contracts } = useGetContracts({
    customerId: customer?.id ? [customer?.id] : [],
  });
  const isContracts =
    contracts && contracts?.getContracts?.length > 0 ? true : false;

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCounsel } = useUpdateCounsel();

  const handleCounselEdit = async () => {
    setSubmit(true);
    if (!customer) return;
    if (!context) return;
    if (!counselAt) return;
    try {
      const response = await updateCounsel({
        counselId: idx,
        customerId: customer.id,
        counselAt,
        userId: user?.id,
        contractId: contract?.id,
        context,
      });

      if (response && response.data.updateCounsel.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `상담이 수정되었습니다.`,
          type: 'success',
        });
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const detail = data?.getCounsel;
    if (detail) {
      setCustomer(detail.customer);
      setCounselAt(detail.counselAt);
      setUser(detail.user);
      setContract(detail.contract ?? undefined);
      setContext(detail.context);
    }
  }, [data, setCustomer, setCounselAt, setContract, setContext]);

  return (
    <>
      <Modal
        {...modalProps}
        title="상담정보수정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '수정',
        }}
        onConfirm={handleCounselEdit}
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
                onChange={(value) => {
                  setCustomer(value);
                  setContract(undefined);
                }}
                list={customers?.getCustomers ?? []}
                trackBy="id"
                valueBy="name"
                placeholder="고객을 선택해주세요"
              />
            </div>
            <div>
              <span>
                상담일시 <p className="required">*</p>
              </span>
              <Input
                type="datetime-local"
                style={{ cursor: 'pointer' }}
                value={counselAt}
                onTextChange={(text) => setCounselAt(text)}
              />
            </div>
            <div>
              <span>상담자</span>
              <Input
                value={user?.name}
                size="medium"
                disabled
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
                placeholder="계약을 선택해주세요"
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
            ></TextArea>
          </div>
        </CounselModalContentWrapper>
      </Modal>
    </>
  );
};

export default EditModal;

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
