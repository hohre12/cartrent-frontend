import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useGetUsers } from '@/services/user';
import { textXs12Medium } from '@/styles/typography';
import { TModal } from '@/types/common';
import { User } from '@/types/graphql';
import { useState } from 'react';
import styled from 'styled-components';

const TargetUserSelectModal = (props: TModal) => {
  const { ...modalProps } = props;

  const [submit, setSubmit] = useState<boolean>(false);
  const [targetUser, setTargetUser] = useState<User>();
  const { data: users } = useGetUsers();

  return (
    <>
      <SModal
        {...modalProps}
        title="담당자 지정"
        size={'small'}
        footerOption={{
          cancelText: '취소',
          confirmText: '담당자 삭제',
          confirmVariant: 'primaryDanger',
        }}
        onConfirm={() => {
          setSubmit(true);
          if (!targetUser) return;
          modalProps.onConfirm?.(targetUser);
        }}
      >
        <TargetUserSelectModalContentWrapper>
          <div className="InputWrapper">
            <span>
              담당자 지정 <p className="required">*</p>
            </span>
            <Select
              size="medium"
              value={{ ...targetUser }}
              onChange={(value) => setTargetUser(value)}
              list={users?.getUsers ?? []}
              trackBy="id"
              valueBy="name"
              placeholder={'고객데이터 인계받을 담당자를 선택해주세요.'}
              isError={submit && !targetUser}
            />
          </div>
        </TargetUserSelectModalContentWrapper>
      </SModal>
    </>
  );
};

export default TargetUserSelectModal;

const SModal = styled(Modal)`
  .modalWrapper {
    .modalHeader {
      padding: 30px 30px 0px;
    }
  }
`;
const TargetUserSelectModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .InputWrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .inputBox {
      height: 48px;
      width: 100%;
      & > input {
        ${textXs12Medium}
      }
    }
  }
`;
