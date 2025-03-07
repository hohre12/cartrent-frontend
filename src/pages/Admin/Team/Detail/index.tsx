import Button from '@/components/button/Button';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteTeam, useGetTeam } from '@/services/team';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const AdminTeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const teamIdx = Number(id);
  const { data, loading, error } = useGetTeam(teamIdx);
  const [isOpenTeamEditModal, setIsOpenTeamEditModal] =
    useState<boolean>(false);
  const { deleteTeam } = useDeleteTeam();

  const handleDeleteTeam = async () => {
    try {
      const response = await deleteTeam(teamIdx);
      if (response && response.data.deleteTeam) {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `팀이 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const detail = data?.getTeam;
  if (!detail) return <></>;
  return (
    <>
      <DetailWrapper>
        <DetailHeaderWrapper>
          <div className="left">
            <h2>{`${detail.name}팀`}</h2>
          </div>
          <div className="right">
            <Button
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '팀 삭제',
                  content: `${detail?.name}팀을 삭제하시겠습니까?`,
                  cancelText: '취소',
                  confirmText: '삭제',
                  confirmVariant: 'primaryDanger',
                  onClose: hideConfirm,
                  onCancel: hideConfirm,
                  onConfirm: handleDeleteTeam,
                })
              }
            >
              삭제
            </Button>
            <Button
              onClick={() => setIsOpenTeamEditModal(!isOpenTeamEditModal)}
            >
              수정
            </Button>
          </div>
        </DetailHeaderWrapper>
        <DetailContentWrapper>
          <div>
            <div>생성일</div>
            <div>{formatDate(detail.created_at) ?? '-'}</div>
          </div>
          <div>
            <div>팀원</div>
            {detail.userList?.length > 0 ? (
              detail.userList.map((it, idx) => <div key={idx}>{it.name}</div>)
            ) : (
              <div>소속된 팀원이 없습니다.</div>
            )}
          </div>
        </DetailContentWrapper>
      </DetailWrapper>
    </>
  );
};

export default AdminTeamDetail;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const DetailContentWrapper = styled.div``;
