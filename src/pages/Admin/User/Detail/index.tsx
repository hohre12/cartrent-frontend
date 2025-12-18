import Button from '@/components/button/Button';
import { UserPositionHangleEnum, UserRoleHangleEnum } from '@/constants/user';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteUser, useGetUser } from '@/services/user';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditModal from '../List/components/editModal';
import { PositionType, User } from '@/types/graphql';
import TargetUserSelectModal from '../List/components/targetUserSelectModal';
import EditPasswordModal from '../List/components/passwordEditModal';

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const userIdx = Number(id);
  const { data, loading, error } = useGetUser(userIdx);
  const [isOpenUserEditModal, setIsOpenUserEditModal] =
    useState<boolean>(false);
  const [isOpenUserPasswordEditModal, setIsOpenUserPasswordEditModal] =
    useState<boolean>(false);
  const [isOpenTargetUserSelectModal, setIsOpenTargetUserSelectModal] =
    useState<boolean>(false);
  const { deleteUser } = useDeleteUser();

  const handleDeleteUser = async (targetUser?: User) => {
    try {
      const response = await deleteUser({
        deleteUserId: userIdx,
        targetUserId: targetUser?.id,
      });
      if (response && response.data.deleteUser) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `직원이 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const detail = data?.getUser;
  if (!detail) return <></>;
  return (
    <>
      <DetailWrapper>
        <DetailHeaderWrapper>
          <div className="left">
            <h2>{`${detail.name} 담당자님`}</h2>
          </div>
          <div className="right">
            {detail.email !== 'admin@admin.com' && (
              <Button
                onClick={() =>
                  setIsOpenUserPasswordEditModal(!isOpenUserPasswordEditModal)
                }
              >
                비밀번호 수정
              </Button>
            )}
            <Button
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '유저 삭제',
                  content: `${detail?.team && (detail?.position.name === PositionType.TeamLeader || detail?.position.name === PositionType.GeneralManager) ? `${detail?.name} 직원은 ${detail?.team?.name}팀의 <${UserPositionHangleEnum[detail.position.name]}>입니다.\n삭제시, ${detail?.team?.name}팀의 <${UserPositionHangleEnum[detail.position.name]}>직책이 사라지게 됩니다.\n그래도 삭제하시겠습니까?` : `${detail?.name} 직원을 삭제하시겠습니까?`} `,
                  cancelText: '취소',
                  confirmText:
                    detail?.customers && detail.customers.length > 0
                      ? '담당자 지정으로 이동'
                      : '삭제',
                  confirmVariant:
                    detail?.customers && detail.customers.length > 0
                      ? 'primaryInfo'
                      : 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: () => {
                    if (detail?.customers && detail.customers.length > 0) {
                      hideConfirm();
                      setIsOpenTargetUserSelectModal(
                        !isOpenTargetUserSelectModal,
                      );
                    } else {
                      handleDeleteUser();
                    }
                  },
                })
              }
            >
              삭제
            </Button>
            <Button
              onClick={() => setIsOpenUserEditModal(!isOpenUserEditModal)}
            >
              수정
            </Button>
          </div>
        </DetailHeaderWrapper>
        <DetailContentWrapper>
          <UserBoxWrapper>
            <h3>이름</h3>
            <div>{detail.name ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>영어이름</h3>
            <div>{detail.englishName ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>생성일</h3>
            <div>{formatDate(detail.created_at) ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>이메일</h3>
            <div>{detail.email ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>팀</h3>
            <div>{detail.team?.name ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>직책</h3>
            <div>
              {detail.position?.name
                ? UserPositionHangleEnum[detail.position.name]
                : '-'}
            </div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>권한</h3>
            <div>
              {detail.role?.name ? UserRoleHangleEnum[detail.role.name] : '-'}
            </div>
          </UserBoxWrapper>

          <UserBoxWrapper>
            <h3>입사일</h3>
            <div>{formatDate(detail.hireDate) ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>생년월일</h3>
            <div>{formatDate(detail.birthDate) ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>연락처</h3>
            <div>{detail.phone ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>영업폰</h3>
            <div>{detail.salesPhone ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>팩스번호</h3>
            <div>{detail.fax ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>급여계좌번호</h3>
            <div>{detail.salaryAccount ?? '-'}</div>
          </UserBoxWrapper>
          <UserBoxWrapper>
            <h3>은행</h3>
            <div>{detail.bank ?? '-'}</div>
          </UserBoxWrapper>
        </DetailContentWrapper>
      </DetailWrapper>
      {isOpenUserEditModal && (
        <EditModal
          idx={userIdx}
          isOpen={isOpenUserEditModal}
          onCancel={() => setIsOpenUserEditModal(false)}
          onConfirm={() => setIsOpenUserEditModal(false)}
        ></EditModal>
      )}
      {isOpenUserPasswordEditModal && (
        <EditPasswordModal
          idx={userIdx}
          isOpen={isOpenUserPasswordEditModal}
          onCancel={() => setIsOpenUserPasswordEditModal(false)}
          onConfirm={() => setIsOpenUserPasswordEditModal(false)}
        ></EditPasswordModal>
      )}
      {isOpenTargetUserSelectModal && (
        <TargetUserSelectModal
          idx={userIdx}
          isOpen={isOpenTargetUserSelectModal}
          onCancel={() => setIsOpenTargetUserSelectModal(false)}
          onConfirm={(targetUser: User) => {
            console.log(targetUser);
            handleDeleteUser(targetUser);
            setIsOpenTargetUserSelectModal(false);
          }}
        ></TargetUserSelectModal>
      )}
    </>
  );
};

export default AdminUserDetail;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
  & > h6 {
    font-size: 20px;
  }
`;

const DetailHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 30px;
  border-bottom: 1px solid #eeeeee;
  .left {
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .right {
    font-weight: 700;
    display: flex;
    gap: 10px;
    button {
      width: 100px;
    }
  }
`;

const DetailContentWrapper = styled.div`
  padding: 20px 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: auto;
  height: calc(100vh - 130px);
`;

const UserBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;

// const UserBoxWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

// const UserBox = styled.div`
//   padding: 20px;
//   border-radius: 16px;
//   border: 1px solid #ddd;
//   width: 32%;
//   height: 250px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   div {
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
//     h5 {
//       font-size: 16px;
//       font-weight: 700;
//     }
//   }
// `;
