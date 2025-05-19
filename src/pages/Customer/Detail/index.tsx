import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import Input from '@/components/input/Input';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import {
  useDeleteCustomer,
  useGetCustomer,
  useUpdateCustomer,
} from '@/services/customer';
import { selectedCustomerIdxState } from '@/state/customer';
import { textS14Medium, textS14Regular } from '@/styles/typography';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
// import EditModal from '../components/editModal';
import { useNavigate } from 'react-router-dom';
import { userState } from '@/state/auth';
import {
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  Division,
  PermissionType,
  PositionType,
  UpdateCustomerDto,
  User,
} from '@/types/graphql';
import RegistModal from '@/pages/Counsel/List/components/registModal';
import { autoHypenTel, numberFormat } from '@/utils/common';
import Select from '@/components/select/Select';
import EditModal from '@/pages/Counsel/List/components/editModal';

type TCustomerDetailProps = {
  users: User[];
  groups: CustomerGroup[];
  grades: CustomerGrade[];
  statuses: CustomerStatus[];
  divisions: Division[];
};

const CustomerDetail = ({
  users,
  groups,
  grades,
  statuses,
  divisions,
}: TCustomerDetailProps) => {
  const navigate = useNavigate();
  const selectedCustomerIdx = useRecoilValue(selectedCustomerIdxState);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenCounselRegistModal, setIsOpenCounselRegistModal] =
    useState<boolean>(false);
  const [selectedCounselIdx, setSelectedCounselIdx] = useState<number>();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const { data, loading, error } = useGetCustomer(selectedCustomerIdx);
  const { deleteCustomer } = useDeleteCustomer();
  const my = useRecoilValue(userState);

  const [user, setUser] = useState<User>();
  const [division, setDivision] = useState<Division>();
  const [customerGrade, setCustomerGrade] = useState<CustomerGrade>();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup>();
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>();
  const [name, setName] = useState<UpdateCustomerDto['name']>();
  const [phone, setPhone] = useState<UpdateCustomerDto['phone']>();
  const [companyNameNominee, setCompanyNameNominee] =
    useState<UpdateCustomerDto['company_name_nominee']>();
  const [subPhone, setSubPhone] = useState<UpdateCustomerDto['sub_phone']>();
  const [origin, setOrigin] = useState<UpdateCustomerDto['origin']>();
  const [carName, setCarName] = useState<UpdateCustomerDto['carName']>();
  const [carOption, setCarOption] = useState<UpdateCustomerDto['carOption']>();
  const [contractPeriod, setContractPeriod] =
    useState<UpdateCustomerDto['contractPeriod']>();
  const [agreedMileage, setAgreedMileage] =
    useState<UpdateCustomerDto['agreedMileage']>();
  const [advancePayment, setAdvancePayment] =
    useState<UpdateCustomerDto['advancePayment']>();
  const [type, setType] = useState<UpdateCustomerDto['type']>();
  const [memo, setMemo] = useState<UpdateCustomerDto['memo']>();
  const [note, setNote] = useState<UpdateCustomerDto['note']>();

  const { updateCustomer } = useUpdateCustomer();

  const handleUpdateCustomer = useCallback(async () => {
    if (!name) return;
    if (!phone) return;
    if (!user) return;
    try {
      const response = await updateCustomer({
        customerId: selectedCustomerIdx,
        userId: user.id,
        customerGroupId: customerGroup?.id,
        name,
        phone,
        company_name_nominee: companyNameNominee,
        sub_phone: subPhone,
        divisionId: division?.id,
        origin: origin,
        carName: carName,
        carOption: carOption,
        contractPeriod: contractPeriod,
        agreedMileage: agreedMileage,
        advancePayment: advancePayment,
        type,
        customerStatusId: customerStatus?.id,
        memo,
        customerGradeId: customerGrade?.id,
        note,
      });
      if (response && response.data.updateCustomer.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${name} 고객이 수정되었습니다.`,
          type: 'success',
        });
        setIsEdit(false);
      }
    } catch (e) {
      console.warn(e);
    }
  }, [
    addToast,
    advancePayment,
    agreedMileage,
    carName,
    carOption,
    companyNameNominee,
    contractPeriod,
    customerGrade?.id,
    customerGroup?.id,
    customerStatus?.id,
    division?.id,
    memo,
    name,
    note,
    origin,
    phone,
    selectedCustomerIdx,
    subPhone,
    type,
    updateCustomer,
    user,
  ]);

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
  }, [deleteCustomer, selectedCustomerIdx, hideConfirm, addToast]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleUpdateCustomer();
      }
    },
    [handleUpdateCustomer],
  );

  const detail = data?.getCustomer;

  const handleInit = useCallback(() => {
    if (detail) {
      setIsEdit(false);
      setName(detail.name);
      setPhone(detail.phone);
      setCompanyNameNominee(detail.company_name_nominee);
      setSubPhone(detail.sub_phone);
      setOrigin(detail.origin);
      setCarName(detail.carName);
      setCarOption(detail.carOption);
      setContractPeriod(detail.contractPeriod);
      setAgreedMileage(detail.agreedMileage);
      setAdvancePayment(detail.advancePayment);
      setType(detail.type);
      setMemo(detail.memo);
      setNote(detail.note);
      setUser(detail.userList);
      setDivision(detail.customerDivision ?? undefined);
      setCustomerGrade(detail.customerGrade ?? undefined);
      setCustomerGroup(detail.customerGroup ?? undefined);
      setCustomerStatus(detail.customerStatus ?? undefined);
    }
  }, [detail]);
  useEffect(() => {
    handleInit();
  }, [handleInit]);

  useEffect(() => {
    if (isEdit) {
      window.addEventListener('keydown', handleEnter);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter, handleUpdateCustomer, isEdit]);

  if (!detail) return <></>;

  return (
    <>
      <DetailWrapper>
        <InfoWrapper>
          <div className="Info">
            <div>
              <span>담당자</span>
              <Select
                value={{ ...user }}
                list={users}
                size="small"
                trackBy="id"
                valueBy="name"
                onChange={(value) => setUser(value)}
                disabled={
                  !isEdit ||
                  my?.position?.name === PositionType.SeniorManager ||
                  my?.position?.name === PositionType.Manager ||
                  my?.position?.name === PositionType.AssistantManager ||
                  my?.position?.name === PositionType.Staff
                }
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <span>고객그룹</span>
              <Select
                value={{ ...customerGroup }}
                list={groups}
                size="small"
                trackBy="id"
                valueBy="name"
                onChange={(value) => setCustomerGroup(value)}
                disabled={!isEdit}
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <span>고객명</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={name ?? ''}
                onTextChange={(text) => setName(text)}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>연락처</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={phone ?? ''}
                onTextChange={(text) => setPhone(autoHypenTel(text))}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>회사/명의</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={companyNameNominee ?? ''}
                onTextChange={(text) => setCompanyNameNominee(text)}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>부연락처</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={subPhone ?? ''}
                onTextChange={(text) => setSubPhone(autoHypenTel(text))}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>구분</span>
              <Select
                value={{ ...division }}
                list={divisions}
                size="small"
                trackBy="id"
                valueBy="name"
                onChange={(value) => setDivision(value)}
                disabled={!isEdit}
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <span>국산/수입</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={origin ?? ''}
                onTextChange={(text) => setOrigin(text)}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>차종</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={carName ?? ''}
                onTextChange={(text) => setCarName(text)}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>옵션</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={carOption ?? ''}
                onTextChange={(text) => setCarOption(text)}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>약정기간</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={contractPeriod ? numberFormat(contractPeriod) : 0}
                onTextChange={(text) =>
                  setContractPeriod(Number(text.replace(/,/g, '')))
                }
                placeholder=""
                postfixNode="개월"
              ></Input>
            </div>
            <div>
              <span>약정거리</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={agreedMileage ? numberFormat(agreedMileage) : 0}
                onTextChange={(text) =>
                  setAgreedMileage(Number(text.replace(/,/g, '')))
                }
                placeholder=""
                postfixNode="km"
              ></Input>
            </div>
            <div>
              <span>선수금</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={advancePayment ? numberFormat(advancePayment) : 0}
                onTextChange={(text) =>
                  setAdvancePayment(Number(text.replace(/,/g, '')))
                }
                placeholder=""
                postfixNode="원"
              ></Input>
            </div>
            <div>
              <span>고객유형</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={type ?? ''}
                onTextChange={(text) => setType(text)}
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
              <Select
                value={{ ...customerStatus }}
                list={statuses}
                size="small"
                trackBy="id"
                valueBy="status"
                onChange={(value) => setCustomerStatus(value)}
                disabled={!isEdit}
                style={{ width: '150px' }}
              />
            </div>
            <div style={{ width: '100%', height: 'auto', marginLeft: '30px' }}>
              <span>메모</span>
              <Input
                value={memo ?? ''}
                onTextChange={(text) => setMemo(text)}
                disabled={!isEdit}
                placeholder=""
              ></Input>
            </div>
            <div>
              <span>고객등급</span>
              <Select
                value={{ ...customerGrade }}
                list={grades}
                size="small"
                trackBy="id"
                valueBy="name"
                onChange={(value) => setCustomerGrade(value)}
                disabled={!isEdit}
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <span>비고</span>
              <Input
                className="inputWrapper"
                disabled={!isEdit}
                value={note ?? ''}
                onTextChange={(text) => setNote(text)}
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
            {isEdit ? (
              <>
                <Button
                  variant="secondaryDanger"
                  onClick={() => {
                    setIsEdit(false);
                    handleInit();
                  }}
                >
                  취소
                </Button>
                <Button
                  variant="primaryInfo"
                  onClick={handleUpdateCustomer}
                >
                  저장
                </Button>
              </>
            ) : (
              <Button
                variant="white"
                configuration="stroke"
                onClick={() => setIsEdit(true)}
              >
                고객 수정
              </Button>
            )}
            {detail.customerStatus?.status === '계약완료' && (
              <Button
                variant="white"
                configuration="stroke"
                onClick={() => navigate(`/contract/regist/${detail.id}`)}
              >
                계약 등록
              </Button>
            )}
            {my?.role.name === PermissionType.Admin && (
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
                  onClick={() => setSelectedCounselIdx(it.id)}
                >
                  <SvgIcon iconName="icon-edit" />
                  <div className="DateTimeWrapper">
                    <span>{formatDate(it.counselAt)}</span>
                    <p>{`${formatDate(it.counselAt, 'HH:mm')}`}</p>
                  </div>
                  <div className="HistoryText">
                    {/* <p>고객명 : {it.customer?.name}</p>
                    <p>상담사 : {it.user?.name}</p> */}
                    <p>{it.context}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>상담 기록이 없습니다.</div>
          )}
        </HistoryWrapper>
      </DetailWrapper>
      {!!selectedCounselIdx && (
        <EditModal
          idx={selectedCounselIdx}
          isOpen={!!selectedCounselIdx}
          onCancel={() => setSelectedCounselIdx(undefined)}
          onConfirm={() => setSelectedCounselIdx(undefined)}
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
