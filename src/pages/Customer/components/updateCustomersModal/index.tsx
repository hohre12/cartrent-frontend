import Input from '@/components/input/Input';
import { Modal } from '@/components/modal/Modal';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetDivisions } from '@/services/contract';
import {
  useGetCustomerGrades,
  useGetCustomerGroups,
  useGetCustomerStatuses,
  useUpdateCustomers,
} from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { selectedCustomerState } from '@/state/customer';
import { TModal } from '@/types/common';
import {
  CustomerGrade,
  CustomerGroup,
  CustomerStatus,
  Division,
  PermissionType,
  PositionType,
  UpdateCustomersDto,
  User,
} from '@/types/graphql';
import { autoHypenTel, numberFormat } from '@/utils/common';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

const UpdateCustomersModal = (props: TModal) => {
  const { ...modalProps } = props;
  const selectedCustomer = useRecoilValue(selectedCustomerState);
  const my = useRecoilValue(userState);
  const [user, setUser] = useState<User>();
  const [customerGrade, setCustomerGrade] = useState<CustomerGrade>();
  const [customerGroup, setCustomerGroup] = useState<CustomerGroup>();
  const [customerStatus, setCustomerStatus] = useState<CustomerStatus>();

  const { data: users } = useGetUsers();
  const { data: statuses } = useGetCustomerStatuses();
  const { data: grades } = useGetCustomerGrades();
  const { data: groups } = useGetCustomerGroups();
  const { data: divisions } = useGetDivisions();

  const [name, setName] = useState<UpdateCustomersDto['name']>();
  const [phone, setPhone] = useState<UpdateCustomersDto['phone']>();
  const [companyNameNominee, setCompanyNameNominee] =
    useState<UpdateCustomersDto['company_name_nominee']>();
  const [subPhone, setSubPhone] = useState<UpdateCustomersDto['sub_phone']>();
  const [origin, setOrigin] = useState<UpdateCustomersDto['origin']>();
  const [carName, setCarName] = useState<UpdateCustomersDto['carName']>();
  const [carOption, setCarOption] = useState<UpdateCustomersDto['carOption']>();
  const [contractPeriod, setContractPeriod] =
    useState<UpdateCustomersDto['contractPeriod']>();
  const [agreedMileage, setAgreedMileage] =
    useState<UpdateCustomersDto['agreedMileage']>();
  const [advancePayment, setAdvancePayment] =
    useState<UpdateCustomersDto['advancePayment']>();
  const [type, setType] = useState<UpdateCustomersDto['type']>();
  const [memo, setMemo] = useState<UpdateCustomersDto['memo']>();
  const [note, setNote] = useState<UpdateCustomersDto['note']>();
  const [division, setDivision] = useState<Division>();
  const resetSelectedCustomer = useResetRecoilState(selectedCustomerState);

  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();

  const { updateCustomers } = useUpdateCustomers();

  const handleUpdateCustomers = useCallback(async () => {
    if (!user && !customerStatus && !customerGrade && !customerGroup) return;
    try {
      const response = await updateCustomers({
        customerIds: selectedCustomer.map((it) => it.id),
        userId: user?.id,
        customerGroupId: customerGroup?.id,
        name,
        phone,
        company_name_nominee: companyNameNominee,
        sub_phone: subPhone,
        divisionId: division?.id,
        origin,
        carName,
        carOption,
        contractPeriod,
        agreedMileage,
        advancePayment,
        type,
        customerStatusId: customerStatus?.id,
        memo,
        customerGradeId: customerGrade?.id,
        note,
      });
      if (response && response.data.updateCustomers) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${selectedCustomer.length}명의 고객정보가 수정되었습니다.`,
          type: 'success',
        });
        resetSelectedCustomer();
        modalProps.onConfirm?.();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [
    addToast,
    customerGrade,
    customerGroup,
    customerStatus,
    modalProps,
    selectedCustomer,
    updateCustomers,
    user,
    advancePayment,
    agreedMileage,
    carName,
    carOption,
    companyNameNominee,
    contractPeriod,
    division,
    memo,
    name,
    note,
    origin,
    phone,
    subPhone,
    type,
    resetSelectedCustomer,
  ]);

  return (
    <>
      <SModal
        {...modalProps}
        title="고객일괄수정"
        size="small"
        onConfirm={handleUpdateCustomers}
      >
        <RegistCustomerWrapper>
          {/* 담당자, 이름, 연락처, 메모, 고객유형, 구분, 회사명/명의자, 상태, 등급, 그룹, 비고 */}
          <div>
            <span>
              담당자 <p className="required">*</p>
            </span>
            <Select
              size="medium"
              value={{
                ...user,
              }}
              onChange={(value) => setUser(value)}
              list={users?.getUsers ?? []}
              trackBy="id"
              valueBy="name"
              placeholder="담당자를 선택해주세요"
              disabled={
                my?.position?.name === PositionType.SeniorManager ||
                my?.position?.name === PositionType.Manager ||
                my?.position?.name === PositionType.AssistantManager ||
                my?.position?.name === PositionType.Staff
              }
              isError={submit && !user}
            />
          </div>
          <div>
            <span>고객그룹</span>
            <Select
              value={{ ...customerGroup }}
              list={groups?.getCustomerGroups ?? []}
              size="medium"
              trackBy="id"
              valueBy="name"
              placeholder="고객그룹을 선택해주세요"
              onChange={(value) => setCustomerGroup(value)}
            />
          </div>
          <div>
            <span>
              고객명 <p className="required">*</p>
            </span>
            <Input
              className="inputWrapper"
              value={name ?? ''}
              onTextChange={(text) => setName(text)}
              placeholder="고객명을 입력해주세요"
            />
          </div>
          <div>
            <span>
              연락처 <p className="required">*</p>
            </span>
            <Input
              className="inputWrapper"
              value={phone ?? ''}
              onTextChange={(text) => setPhone(autoHypenTel(text))}
              placeholder=""
            />
          </div>
          <div>
            <span>회사/명의</span>
            <Input
              className="inputWrapper"
              value={companyNameNominee ?? ''}
              onTextChange={(text) => setCompanyNameNominee(text)}
              placeholder="회사/명의를 입력해주세요"
            ></Input>
          </div>
          <div>
            <span>부연락처</span>
            <Input
              className="inputWrapper"
              value={subPhone ?? ''}
              onTextChange={(text) => setSubPhone(autoHypenTel(text))}
              placeholder=""
            ></Input>
          </div>
          <div>
            <span>구분</span>
            <Select
              value={{ ...division }}
              list={divisions?.getDivisions ?? []}
              size="small"
              trackBy="id"
              valueBy="name"
              onChange={(value) => setDivision(value)}
              placeholder="구분을 선택해주세요"
            />
          </div>
          <div>
            <span>국산/수입</span>
            <Input
              className="inputWrapper"
              value={origin ?? ''}
              onTextChange={(text) => setOrigin(text)}
              placeholder=""
            ></Input>
          </div>
          <div>
            <span>차종</span>
            <Input
              className="inputWrapper"
              value={carName ?? ''}
              onTextChange={(text) => setCarName(text)}
              placeholder="차종을 입력해주세요"
            ></Input>
          </div>
          <div>
            <span>옵션</span>
            <Input
              className="inputWrapper"
              value={carOption ?? ''}
              onTextChange={(text) => setCarOption(text)}
              placeholder="옵션을 입력해주세요"
            ></Input>
          </div>
          <div>
            <span>약정기간</span>
            <Input
              className="inputWrapper"
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
              placeholder="고객유형을 입력해주세요."
              value={type ?? ''}
              onTextChange={(text) => setType(text)}
            />
          </div>
          <div>
            <span>등록일</span>
            <Input
              className="inputWrapper"
              disabled
              value={'일괄수정불가'}
              placeholder=""
            ></Input>
          </div>
          <div>
            <span>상태</span>
            <Select
              size="medium"
              value={{ ...customerStatus }}
              onChange={(value) => setCustomerStatus(value)}
              list={statuses?.getCustomerStatuses ?? []}
              trackBy="id"
              valueBy="status"
              placeholder="상태를 선택해주세요"
            />
          </div>
          <div style={{ width: '100%', height: 'auto' }}>
            <span>메모</span>
            <Input
              value={memo ?? ''}
              onTextChange={(text) => setMemo(text)}
              placeholder="메모를 입력해주세요"
            ></Input>
          </div>
          <div>
            <span>고객등급</span>
            <Select
              size="medium"
              value={{ ...customerGrade }}
              onChange={(value) => setCustomerGrade(value)}
              list={grades?.getCustomerGrades ?? []}
              trackBy="id"
              valueBy="name"
              placeholder="등급을 선택해주세요"
            />
          </div>
          <div>
            <span>비고</span>
            <Input
              placeholder="비고를 입력해 주세요."
              value={note ?? ''}
              onTextChange={(text) => setNote(text)}
            />
          </div>
        </RegistCustomerWrapper>
      </SModal>
    </>
  );
};

export default UpdateCustomersModal;

export const SModal = styled(Modal)``;
const RegistCustomerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  & > div {
    width: 48%;
  }
`;
