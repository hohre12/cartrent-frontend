import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import TextArea from '@/components/textArea/TextArea';
import { useToast } from '@/hooks/useToast';
import { useGetContracts } from '@/services/contract';
import { useGetCounsel, useUpdateCounsel } from '@/services/counsel';
import { useGetCustomers } from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import {
  Contract,
  Customer,
  PermissionType,
  UpdateCounselDto,
  User,
} from '@/types/graphql';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const EditModal = (props: TModal & { idx: number }) => {
  const { idx, ...modalProps } = props;

  const { data } = useGetCounsel(idx);
  const my = useRecoilValue(userState);
  const [customer, setCustomer] = useState<Customer>();
  const [user, setUser] = useState<User>();
  const [contract, setContract] = useState<Contract>();

  const [counselAt, setCounselAt] = useState<UpdateCounselDto['counselAt']>();
  const [context, setContext] = useState<UpdateCounselDto['context']>();

  const { data: customers } = useGetCustomers(
    {
      offset: 0,
      limit: 1,
    },
    true,
  );
  const { data: users } = useGetUsers();
  const { data: contracts } = useGetContracts(
    {
      customerId: customer?.id ? [customer?.id] : [],
      offset: 0,
      limit: 100,
    },
    !customer?.id,
  );
  const isContracts =
    contracts && contracts?.getContracts?.data.length > 0 ? true : false;

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCounsel } = useUpdateCounsel();

  const handleCounselEdit = useCallback(async () => {
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
  }, [
    addToast,
    context,
    contract?.id,
    counselAt,
    customer,
    idx,
    modalProps,
    updateCounsel,
    user?.id,
  ]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCounselEdit();
      }
    },
    [handleCounselEdit],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (e.key === 'Enter') {
        // TextArea에 포커스가 있는 경우 handleEnter 실행 안 함
        if (activeElement && activeElement.tagName === 'TEXTAREA') {
          return;
        }
        handleEnter(e);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleEnter]);

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
                list={customers?.getCustomers.data ?? []}
                trackBy="id"
                valueBy="name"
                placeholder="고객을 선택해주세요"
                isError={submit && !customer}
                disabled
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
                list={contracts?.getContracts.data ?? []}
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
              isError={submit && !context}
              errorMessage="상담내용은 필수입니다."
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
