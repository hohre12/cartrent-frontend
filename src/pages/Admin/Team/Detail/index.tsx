import Button from '@/components/button/Button';
import { UserPositionHangleEnum } from '@/constants/user';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteTeam, useGetTeam } from '@/services/team';
import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditTeamModal from '../List/components/editTeamModal';
import { numberFormat } from '@/utils/common';

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
            <h2>{`${detail.name}`}</h2>
          </div>
          <div className="right">
            <Button
              onClick={() =>
                showConfirm({
                  isOpen: true,
                  title: '팀 삭제',
                  content: `${detail?.subTeams && detail?.subTeams?.length > 0 ? `${detail?.name}팀을 삭제할시 ${detail?.name}팀의 모든 하위팀들이 삭제됩니다.\n그래도 삭제하시겠습니까?` : `${detail?.name}팀을 삭제하시겠습니까?`}`,
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
          <TeamBoxWrapper>
            <h3>팀장</h3>
            <div>{detail.leader?.name ?? '-'}</div>
          </TeamBoxWrapper>
          <TeamBoxWrapper>
            <h3>생성일</h3>
            <div>{formatDate(detail.created_at) ?? '-'}</div>
          </TeamBoxWrapper>
          <TeamBoxWrapper>
            <h3>팀원</h3>
            {detail.userList?.length > 0 ? (
              <UserBoxWrapper>
                {detail.userList.map((it, idx) => (
                  <UserBox
                    key={idx}
                    onClick={() => navigate(`/admin/user/${it.id}`)}
                  >
                    <div>
                      <h5>팀원명</h5>
                      <span>{it.name ?? '-'}</span>
                    </div>
                    <div>
                      <h5>직책</h5>
                      <span>
                        {it.position?.name
                          ? UserPositionHangleEnum[it.position.name]
                          : '직책없음'}
                      </span>
                    </div>
                    <div>
                      <h5>Email</h5>
                      <span>{it.email ?? '-'}</span>
                    </div>
                    <div>
                      <h5>직원 생성일</h5>
                      <span>{formatDate(it.created_at) ?? '-'}</span>
                    </div>
                  </UserBox>
                ))}
              </UserBoxWrapper>
            ) : (
              <div>소속된 팀원이 없습니다.</div>
            )}
          </TeamBoxWrapper>
          <TeamBoxWrapper>
            <h3>하위 팀</h3>
            {detail.subTeams && detail.subTeams?.length > 0 ? (
              <UserBoxWrapper>
                {detail.subTeams.map((it, idx) => (
                  <UserBox
                    key={idx}
                    onClick={() => navigate(`/admin/team/${it.id}`)}
                  >
                    <div>
                      <h5>팀명</h5>
                      <span>{it.name ?? '-'}</span>
                    </div>
                    <div>
                      <h5>팀장</h5>
                      <span>{it.leader?.name ?? '-'}</span>
                    </div>
                    <div>
                      <h5>팀 생성일</h5>
                      <span>{formatDate(it.created_at) ?? '-'}</span>
                    </div>
                    <div>
                      <h5>팀원 수</h5>
                      <span>{`${numberFormat(it.userList.length)}명`}</span>
                    </div>
                  </UserBox>
                ))}
              </UserBoxWrapper>
            ) : (
              <div>하위 팀이 없습니다.</div>
            )}
          </TeamBoxWrapper>
        </DetailContentWrapper>
      </DetailWrapper>
      {isOpenTeamEditModal && (
        <EditTeamModal
          idx={teamIdx}
          isOpen={isOpenTeamEditModal}
          onCancel={() => setIsOpenTeamEditModal(false)}
          onConfirm={() => setIsOpenTeamEditModal(false)}
        ></EditTeamModal>
      )}
    </>
  );
};

export default AdminTeamDetail;

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

const TeamBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const UserBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  cursor: pointer;
`;

const UserBox = styled.div`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ddd;
  width: 32%;
  height: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    h5 {
      font-size: 16px;
      font-weight: 700;
    }
  }
`;
