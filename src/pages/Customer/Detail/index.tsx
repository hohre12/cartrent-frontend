import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteCustomer, useGetCustomer } from '@/services/customer';
import { selectedCustomerIdxState } from '@/state/customer';
import { textS14Medium, textS14Regular } from '@/styles/typography';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import EditModal from '../components/editModal';
import { useNavigate } from 'react-router-dom';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import RegistModal from '@/pages/Counsel/List/components/registModal';
import { numberFormat } from '@/utils/common';

const CustomerDetail = () => {
  const navigate = useNavigate();
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenCounselRegistModal, setIsOpenCounselRegistModal] =
    useState<boolean>(false);
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const { data, loading, error } = useGetCustomer(selectedCustomerIdx);
  const { deleteCustomer } = useDeleteCustomer();
  const user = useRecoilValue(userState);

  const handleDeleteCustomer = useCallback(async () => {
    try {
      const response = await deleteCustomer([selectedCustomerIdx]);
      if (response && response.data.deleteCustomer === 'success') {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `고객이 삭제되었습니다.`,
          type: 'success',
        });
      }
    } catch (e) {
      console.warn(e);
    }
  }, [selectedCustomerIdx, hideConfirm, addToast]);

  const detail = data?.getCustomer;
  if (!detail) return <></>;

  return (
    <>
      <DetailWrapper>
        <InfoWrapper>
          <div className="Info">
            <div>
              <span>담당자</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.userList.name ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>고객그룹</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.customerGroup?.name ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>고객명</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.name ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>연락처</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.phone ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>회사/명의</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) => it.company_name_nominee ?? '-')
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>추가연락처</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.sub_phone ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>구분</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) => it.division?.name ?? '-')
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>출고방식</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) => it.shippingMethod?.name ?? '-')
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>차종</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList.map((it) => it.carName).join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>옵션</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) => it.carOption ?? '-')
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>약정기간</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) =>
                    it.contractPeriod
                      ? `${numberFormat(it.contractPeriod)} 개월`
                      : '-',
                  )
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>약정거리</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) =>
                    it.agreedMileage
                      ? `${numberFormat(it.agreedMileage)} km`
                      : '-',
                  )
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>선수금</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.contractList
                  .map((it) =>
                    it.advancePayment
                      ? `${numberFormat(it.advancePayment)}원`
                      : '-',
                  )
                  .join(' / ')}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>고객유형</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.type ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>등록일</span>
              <Input
                className="inputWrapper"
                disabled
                value={formatDate(detail.created_at) ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>상태</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.customerStatus?.status ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div style={{ width: '100%', height: 'auto', marginLeft: '30px' }}>
              <span>메모</span>
              <Input
                value={detail.memo ?? ''}
                disabled
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>고객등급</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.customerGrade?.name ?? ''}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>비고</span>
              <Input
                className="inputWrapper"
                disabled
                value={detail.note ?? ''}
                placeholder=""
              ></Input>
            </div>
          </div>
          <div className="ControlWrapper">
            <Button
              variant="white"
              configuration="stroke"
              onClick={() =>
                setIsOpenCounselRegistModal(!isOpenCounselRegistModal)
              }
            >
              <p>상담등록</p>
            </Button>
            <Button
              variant="white"
              configuration="stroke"
              onClick={() => setIsOpenEditModal(true)}
            >
              고객 수정
            </Button>
            {detail.customerStatus?.status === '계약완료' && (
              <Button
                variant="white"
                configuration="stroke"
                onClick={() => navigate(`/contract/regist/${detail.id}`)}
              >
                계약 등록
              </Button>
            )}
            {user?.role.name === PermissionType.Admin && (
              <Button
                variant="white"
                configuration="stroke"
                onClick={() =>
                  showConfirm({
                    isOpen: true,
                    title: '고객 삭제',
                    content: `${detail?.name} 고객을 삭제하시겠습니까?`,
                    cancelText: '취소',
                    confirmText: '삭제',
                    confirmVariant: 'primaryDanger',
                    onClose: hideConfirm,
                    onCancel: hideConfirm,
                    onConfirm: handleDeleteCustomer,
                  })
                }
              >
                고객 삭제
              </Button>
            )}
          </div>
        </InfoWrapper>
        <HistoryWrapper>
          {detail.counselList.length > 0 ? (
            <>
              {detail.counselList?.map((it, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/counsel/${it.id}`)}
                >
                  <SvgIcon iconName="icon-edit" />
                  <div className="DateTimeWrapper">
                    <span>{formatDate(it.counselAt)}</span>
                    <p>{`${formatDate(it.counselAt, 'HH:mm')}`}</p>
                  </div>
                  <div className="HistoryText">
                    <p>고객명 : {it.customer?.name}</p>
                    <p>상담사 : {it.user?.name}</p>
                    <p>상담내용 : {it.context}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>상담 기록이 없습니다.</div>
          )}
        </HistoryWrapper>
      </DetailWrapper>
      {isOpenEditModal && (
        <EditModal
          isOpen={isOpenEditModal}
          onCancel={() => setIsOpenEditModal(false)}
          onConfirm={() => setIsOpenEditModal(false)}
        ></EditModal>
      )}
      {isOpenCounselRegistModal && (
        <RegistModal
          propsCustomer={detail}
          isOpen={isOpenCounselRegistModal}
          onCancel={() => setIsOpenCounselRegistModal(false)}
          onConfirm={() => setIsOpenCounselRegistModal(false)}
        ></RegistModal>
      )}
    </>
  );
};

export default CustomerDetail;

export const DetailWrapper = styled.div`
  //   width: calc(100% - 770px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 450px;
  border-radius: 5px;
`;

export const InfoWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .ControlWrapper {
    display: flex;
    gap: 20px;
    & > div {
      border: 1px solid #eee;
      border-radius: 5px;
    }
  }
  .Info {
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    /* width: 700px; */
    & > div {
      ${textS14Regular}
      display: flex;
      align-items: center;
      gap: 5px;
      width: 49%;
      height: 40px;
      span {
        margin-left: auto;
        text-align: right;
        white-space: nowrap;
      }
      &:nth-child(even) {
        /* margin-left: auto; */
      }
      .inputWrapper {
        max-width: 150px;
        input {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  gap: 5px;
  .Box {
    ${textS14Medium}
    font-weight: 600;
    width: 20%;
    height: 70px;
    padding: 5px;
    background: #212533;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      color: #fff;
      text-align: left;
    }
    span {
      color: #1aa18f;
      text-align: right;
    }
  }
`;
export const HistoryWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    .DateTimeWrapper {
      width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      display: flex;
      flex-direction: column;
      & > span {
        font-weight: 600;
        text-align: right;
      }
      & > p {
        ${textS14Regular};
        text-align: right;
        color: #666;
      }
    }
    .HistoryText {
      ${textS14Medium}
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      min-width: 280px;
      padding: 10px;
      text-align: left;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
