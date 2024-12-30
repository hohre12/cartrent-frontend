import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { TModal } from '@/types/common';
import { useState } from 'react';
import styled from 'styled-components';

const RegistModal = (props: TModal) => {
  const { ...modalProps } = props;
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [birth, setBirth] = useState<string>();
  const [job, setJob] = useState<string>();
  const [group, setGroup] = useState<string>();
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  //   const { showConfirm, hideConfirm } = useConfirm();

  const handleCustomerRegist = async () => {
    setSubmit(true);
    if (!name) return;
    try {
      //   const { data } = await postMemberTemp({
      //     userName: userName,
      //     empNo: empNo,
      //     authId: authId,
      //     email: email,
      //     teamIdxs: teams?.map((it) => it.teamIdx),
      //     institutePermIdx: permission?.institutePermIdx,
      //   });
      addToast({
        id: Date.now(),
        isImage: true,
        content: `고객이 등록되었습니다.`,
        type: 'success',
      });
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
          {/* 이름, 전화번호, 이메일, 주소, 생년월일, 직업, 그룹 */}
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
            <p>이메일</p>
            <Input
              placeholder="이메일을 입력해 주세요."
              value={email}
              onTextChange={(text) => setEmail(text)}
            />
          </div>
          <div>
            <p>주소</p>
            <Input
              placeholder="주소를 입력해 주세요."
              value={address}
              onTextChange={(text) => setAddress(text)}
            />
          </div>
          <div>
            <p>생년월일</p>
            <Input
              placeholder="생년월일을 입력해 주세요."
              value={birth}
              onTextChange={(text) => setBirth(text)}
            />
          </div>
          <div>
            <p>직업</p>
            <Input
              placeholder="직업을 입력해 주세요."
              value={job}
              onTextChange={(text) => setJob(text)}
            />
          </div>
          <div>
            <p>그룹</p>
            <Input
              placeholder="그룹을 입력해 주세요.(셀렉박스 예정)"
              value={group}
              onTextChange={(text) => setGroup(text)}
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
