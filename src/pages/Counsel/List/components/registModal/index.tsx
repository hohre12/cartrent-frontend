import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import TextArea from '@/components/textArea/TextArea';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useGetContracts } from '@/services/contract';
import { useCreateCounsel } from '@/services/counsel';
import { useGetCustomers } from '@/services/customer';
import { userState } from '@/state/auth';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { Contract, Customer } from '@/types/graphql';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ReactDatePicker from 'react-datepicker';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [customer, setCustomer] = useState<Customer>();
  const [counselAt, setCounselAt] = useState<string>();
  const user = useRecoilValue(userState);
  const [contract, setContract] = useState<Contract>();
  const [context, setContext] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);

  const { addToast } = useToast();
  const { data: customers } = useGetCustomers({});

  const { data: contracts } = useGetContracts({ customerId: customer?.id });
  const hasContracts = (contracts?.getContracts ?? []).length > 0;
  const isContracts = !contract || !hasContracts;

  const { createCounsel } = useCreateCounsel();

  const handleCounselRegist = async () => {
    setSubmit(true);
    if (!customer) return;
    if (!context) return;
    if (!counselAt) return;
    try {
      const response = await createCounsel({
        customer_id: customer.id,
        counselAt,
        // user_id: user?.id,
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
              <span>고객명</span>
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
              />
            </div>
            <div>
              <span>상담일시</span>
              <Input
                type="datetime-local"
                style={{ cursor: 'pointer' }}
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
                onChange={(value) => console.log('선택', value)}
                list={contracts?.getContracts ?? []}
                trackBy="id"
                valueBy="name"
                placeholder="계약을 선택해주세요"
                disabled={isContracts}
              />
            </div>
          </div>
          <div className="TextAreaWrapper">
            <span>상담내용</span>
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
        min-width: 40px;
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
