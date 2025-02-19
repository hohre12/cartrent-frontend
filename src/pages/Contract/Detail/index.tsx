import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import Select from '@/components/select/Select';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useGetCites } from '@/services/city';
import {
  useDeleteContract,
  useGetContract,
  useGetDivisions,
  useGetFinancialCompanies,
  useGetShippingMethods,
  useUpdateContract,
} from '@/services/contract';
import { useGetCustomers } from '@/services/customer';
import { useGetUsers } from '@/services/user';
// import { dummyCustomerList } from '@/dummy/customer';
// import { useGetCustomer } from '@/services/customer';
import { textM16Medium, titleXl20Bold } from '@/styles/typography';
import {
  City,
  Customer,
  Division,
  FinancialCompany,
  PermissionType,
  ShippingMethod,
  UpdateContractDto,
  User,
} from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';
import { userState } from '@/state/auth';
import { useRecoilValue } from 'recoil';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();
  const contractIdx = Number(id);
  const { data, loading, error } = useGetContract(contractIdx);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const my = useRecoilValue(userState);

  const { data: users } = useGetUsers();
  const { data: customers } = useGetCustomers({});
  const { data: cites } = useGetCites({});
  const { data: financialCompanies } = useGetFinancialCompanies();
  const { data: divisions } = useGetDivisions();
  const { data: shippingMethods } = useGetShippingMethods();

  const [updateContract, setUpdateContract] = useState<UpdateContractDto>({
    contractId: contractIdx,
    customerId: data?.getContract?.customer_id ?? 0,
    carName: data?.getContract?.carName ?? '',
    userId: data?.getContract?.user_id ?? 0,
  });

  const [user, setUser] = useState<User>();
  const [customer, setCustomer] = useState<Customer>();
  const [city, setCity] = useState<City>();
  const [financialCompany, setFinancialCompany] = useState<FinancialCompany>();
  const [division, setDivision] = useState<Division>();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>();

  const { updateContractMutation } = useUpdateContract();
  const { deleteContractMutation } = useDeleteContract();

  const handleValueChange = (value: string | number | boolean, key: string) => {
    if (
      (key === 'fee' || key === 'feeRate') &&
      updateContract?.carPrice &&
      typeof value === 'number'
    ) {
      const feeObject = {
        [key]: value,
        ...(key === 'fee' && {
          feeRate: (value / updateContract.carPrice) * 100,
        }),
        ...(key === 'feeRate' && {
          fee: (value * updateContract.carPrice) / 100,
        }),
      };

      setUpdateContract((prevState) => ({
        ...prevState,
        ...feeObject,
        customerId: customer ? customer.id : 0,
        userId: user ? user.id : 0,
      }));
    } else {
      setUpdateContract((prevState) => ({
        ...prevState,
        [key]: value,
        customerId: customer ? customer.id : 0,
        userId: user ? user.id : 0,
      }));
    }
  };

  const handleContractEdit = async () => {
    setSubmit(true);
    if (!user) return;
    if (!customer) return;
    if (!updateContract?.carName) return;
    try {
      const updateContractPayload: UpdateContractDto = {
        ...updateContract,
        userId: user.id,
        customerId: customer.id,
        // 셀렉
        cityId: city?.id,
        financialCompanyId: financialCompany?.id,
        divisionId: division?.id,
        shippingMethodId: shippingMethod?.id,
        totalFee:
          (updateContract?.fee ?? 0) +
          (updateContract?.promotion ?? 0) +
          (updateContract?.branchFee ?? 0),
        totalExpenditure:
          (updateContract?.service1 ?? 0) +
          (updateContract?.service2 ?? 0) +
          (updateContract?.service3 ?? 0) +
          (updateContract?.cashAssistance ?? 0) +
          (updateContract?.businessExpenses ?? 0),
        netIncome:
          (updateContract?.fee ?? 0) +
          (updateContract?.promotion ?? 0) +
          (updateContract?.branchFee ?? 0) -
          ((updateContract?.service1 ?? 0) +
            (updateContract?.service2 ?? 0) +
            (updateContract?.service3 ?? 0) +
            (updateContract?.cashAssistance ?? 0) +
            (updateContract?.businessExpenses ?? 0)),
      };

      console.log(updateContractPayload);

      const response = await updateContractMutation(updateContractPayload);
      if (response && response.data.updateContract.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `계약이 수정되었습니다.`,
          type: 'success',
        });
        setIsEdit(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDeleteContract = async () => {
    try {
      const response = await deleteContractMutation([contractIdx]);
      if (response && response.data.deleteContract === 'success') {
        hideConfirm();
        addToast({
          id: Date.now(),
          isImage: true,
          content: `계약이 삭제되었습니다.`,
          type: 'success',
        });
        navigate(-1);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleInit = () => {
    if (detail) {
      setUser(detail.user);
      setCity(detail.city ?? undefined);
      setCustomer(detail.customer ?? undefined);
      setFinancialCompany(detail.financialCompany ?? undefined);
      setShippingMethod(detail.shippingMethod ?? undefined);
      setDivision(detail.division ?? undefined);
      const newDetail = _.omit(detail, [
        'id',
        'user',
        'city',
        'customer',
        'financialCompany',
        'shippingMethod',
        'division',
        'isVATSupport',
      ]);

      setUpdateContract({
        ...newDetail,
        contractId: contractIdx,
        customerId: detail.customer?.id ?? 0,
        userId: detail.user.id,
      });
    }
  };

  const detail = data?.getContract;

  useEffect(() => {
    if (detail) {
      handleInit();
    }
  }, [detail]);

  if (!detail) return <></>;

  return (
    <DetailWrapper>
      <DetailHeaderWrapper>
        <div className="left">
          <h2>{`${detail.customer?.name} 고객님의 ${detail.carName} 차량 계약`}</h2>
        </div>
        <div className="right">
          {isEdit ? (
            <>
              <Button
                onClick={() => {
                  handleInit();
                  setIsEdit(false);
                }}
              >
                취소
              </Button>
              <Button onClick={handleContractEdit}>저장</Button>
            </>
          ) : (
            <>
              {my?.role.name === PermissionType.Admin && (
                <>
                  <Button
                    onClick={() =>
                      showConfirm({
                        isOpen: true,
                        title: '계약 삭제',
                        content: `${detail?.customer?.name} 고객의 계약을 삭제하시겠습니까?`,
                        cancelText: '취소',
                        confirmText: '삭제',
                        confirmVariant: 'primaryDanger',
                        onClose: hideConfirm,
                        onCancel: hideConfirm,
                        onConfirm: handleDeleteContract,
                      })
                    }
                  >
                    삭제
                  </Button>
                  <Button onClick={() => setIsEdit(!isEdit)}>수정</Button>
                </>
              )}
            </>
          )}
        </div>
      </DetailHeaderWrapper>
      <InfoWrapper>
        <InfoBoxWrapper>
          <h5>{`계약내용 ${isEdit ? '수정' : '상세'}`}</h5>
          <InfoBox>
            <InputLine>
              <span>
                담당자 <p className="required">*</p>
              </span>
              <InputWrapper>
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
                  disabled={!isEdit || my?.role?.name === PermissionType.User}
                  isError={submit && !user}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지역</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...city,
                  }}
                  onChange={(value) => setCity(value)}
                  list={cites?.getCities ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="지역을 선택해주세요"
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>계약일</span>
              <InputWrapper>
                <Input
                  type="date"
                  value={updateContract?.contractAt ?? ''}
                  style={{ cursor: 'pointer' }}
                  onTextChange={(text) => handleValueChange(text, 'contractAt')}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>
                고객명 <p className="required">*</p>
              </span>
              <InputWrapper>
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
                  disabled={!isEdit}
                  isError={submit && !customer}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>회사명/명의자</span>
              <InputWrapper>
                <Input
                  value={updateContract?.company_name_nominee ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'company_name_nominee')
                  }
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>
                차종 <p className="required">*</p>
              </span>
              <InputWrapper>
                <Input
                  value={updateContract?.carName ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'carName')}
                  disabled={!isEdit}
                  isError={submit && !updateContract.carName}
                  errorMessage="차종은 필수입니다."
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>차 옵션</span>
              <InputWrapper>
                <Input
                  value={updateContract?.carOption ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'carOption')}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>외장색상</span>
              <InputWrapper>
                <Input
                  value={updateContract?.outerColor ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'outerColor')}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>내장색상</span>
              <InputWrapper>
                <Input
                  value={updateContract?.innerColor ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'innerColor')}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>차량가</span>
              <InputWrapper>
                <Input
                  value={
                    updateContract?.carPrice
                      ? numberFormat(updateContract.carPrice)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'carPrice',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>금융사</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...financialCompany,
                  }}
                  onChange={(value) => setFinancialCompany(value)}
                  list={financialCompanies?.getFinancialCompanies ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="금융사를 선택해주세요"
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>구분</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...division,
                  }}
                  onChange={(value) => setDivision(value)}
                  list={divisions?.getDivisions ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="구분을 선택해주세요"
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>수수료</span>
              <InputWrapper>
                <Input
                  disabled={!updateContract?.carPrice || !isEdit}
                  value={
                    updateContract?.feeRate
                      ? numberFormat(updateContract.feeRate)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'feeRate')
                  }
                  max={100}
                  type="number"
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!updateContract?.carPrice || !isEdit}
                  value={
                    updateContract?.fee ? numberFormat(updateContract.fee) : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'fee')
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>프로모션</span>
              <InputWrapper>
                <Input
                  disabled={!updateContract?.carPrice || !isEdit}
                  onTextChange={(text) => {
                    if (updateContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * updateContract.carPrice) / 100,
                        'promotion',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!updateContract?.carPrice || !isEdit}
                  value={
                    updateContract?.promotion
                      ? numberFormat(updateContract.promotion)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'promotion',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>월 납입료</span>
              <InputWrapper>
                <Input
                  value={
                    updateContract?.monthlyPayment
                      ? numberFormat(updateContract.monthlyPayment)
                      : 0
                  }
                  isNumber
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'monthlyPayment',
                    )
                  }
                  postfixNode={'원'}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>출고 방식</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...shippingMethod,
                  }}
                  onChange={(value) => setShippingMethod(value)}
                  list={shippingMethods?.getShippingMethods ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="출고방식을 선택해주세요"
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지점명</span>
              <InputWrapper>
                <Input
                  value={updateContract?.branch ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'branch')}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>지점 수수료</span>
              <InputWrapper>
                <Input
                  value={
                    updateContract?.branchFee
                      ? numberFormat(updateContract.branchFee)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'branchFee',
                    )
                  }
                  postfixNode={'원'}
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>선수금</span>
              <InputWrapper>
                <Input
                  disabled={!updateContract?.carPrice || !isEdit}
                  onTextChange={(text) => {
                    if (updateContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * updateContract.carPrice) / 100,
                        'advancePayment',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!updateContract?.carPrice || !isEdit}
                  value={
                    updateContract?.advancePayment
                      ? numberFormat(updateContract.advancePayment)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'advancePayment',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 기간</span>
              <InputWrapper>
                <Input
                  postfixNode={'개월'}
                  value={
                    updateContract?.contractPeriod
                      ? numberFormat(updateContract.contractPeriod)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'contractPeriod',
                    )
                  }
                  isNumber
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 거리</span>
              <InputWrapper>
                <Input
                  postfixNode={'km'}
                  value={
                    updateContract?.agreedMileage
                      ? numberFormat(updateContract.agreedMileage)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'agreedMileage',
                    )
                  }
                  isNumber
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>보험 연령</span>
              <InputWrapper>
                <Input
                  postfixNode={'세'}
                  value={
                    updateContract?.insuranceAge
                      ? numberFormat(updateContract.insuranceAge)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'insuranceAge',
                    )
                  }
                  isNumber
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>대물</span>
              <InputWrapper>
                <Input
                  postfixNode={'억원'}
                  value={
                    updateContract?.object
                      ? numberFormat(updateContract.object)
                      : 0
                  }
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'object')
                  }
                  isNumber
                  disabled={!isEdit}
                />
              </InputWrapper>
            </InputLine>
          </InfoBox>
        </InfoBoxWrapper>
        {my?.role?.name === PermissionType.Admin && (
          <InfoBoxWrapper>
            <h5>{`계약내용 추가 입력 ${isEdit ? '수정' : '상세'}(관리자 전용)`}</h5>
            <InfoBox>
              <InputLine>
                <span>출고일</span>
                <InputWrapper>
                  <Input
                    type="date"
                    value={updateContract?.shippingDate ?? ''}
                    style={{ cursor: 'pointer' }}
                    onTextChange={(text) =>
                      handleValueChange(text, 'shippingDate')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              {!isEdit && (
                <InputLine>
                  <span>부가세 지원 여부</span>
                  <InputWrapper>
                    <Checkbox
                      value={detail?.isVATSupport ?? false}
                      disabled
                    />
                  </InputWrapper>
                </InputLine>
              )}
              <InputLine>
                <span>출고여부</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.isOrdering ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'isOrdering')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의내용 1</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.serviceBody1 ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'serviceBody1')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의금액 1</span>
                <InputWrapper>
                  <Input
                    value={
                      updateContract?.service1
                        ? numberFormat(updateContract.service1)
                        : 0
                    }
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'service1',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의내용 2</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.serviceBody2 ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'serviceBody2')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의금액 2</span>
                <InputWrapper>
                  <Input
                    value={
                      updateContract?.service2
                        ? numberFormat(updateContract.service2)
                        : 0
                    }
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'service2',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의내용 3</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.serviceBody3 ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'serviceBody3')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의금액 3</span>
                <InputWrapper>
                  <Input
                    value={
                      updateContract?.service3
                        ? numberFormat(updateContract.service3)
                        : 0
                    }
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'service3',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>현금 지원</span>
                <InputWrapper>
                  <Input
                    value={
                      updateContract?.cashAssistance
                        ? numberFormat(updateContract.cashAssistance)
                        : 0
                    }
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'cashAssistance',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>소득자</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.incomeEarner ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'incomeEarner')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>지원 내용</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.supportDetails ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'supportDetails')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>경비</span>
                <InputWrapper>
                  <Input
                    value={
                      updateContract?.businessExpenses
                        ? numberFormat(updateContract.businessExpenses)
                        : 0
                    }
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'businessExpenses',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>경비내용</span>
                <InputWrapper>
                  <Input
                    value={updateContract?.businessExpensesDetail ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'businessExpensesDetail')
                    }
                    disabled={!isEdit}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>매출합계</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(
                      (updateContract?.fee ?? 0) +
                        (updateContract?.promotion ?? 0) +
                        (updateContract?.branchFee ?? 0),
                    )}
                    postfixNode={'원'}
                    disabled
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>지출합계</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(
                      (updateContract?.service1 ?? 0) +
                        (updateContract?.service2 ?? 0) +
                        (updateContract?.service3 ?? 0) +
                        (updateContract?.cashAssistance ?? 0) +
                        (updateContract?.businessExpenses ?? 0),
                    )}
                    postfixNode={'원'}
                    disabled
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>순익합계</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(
                      (updateContract?.fee ?? 0) +
                        (updateContract?.promotion ?? 0) +
                        (updateContract?.branchFee ?? 0) -
                        ((updateContract?.service1 ?? 0) +
                          (updateContract?.service2 ?? 0) +
                          (updateContract?.service3 ?? 0) +
                          (updateContract?.cashAssistance ?? 0) +
                          (updateContract?.businessExpenses ?? 0)),
                    )}
                    postfixNode={'원'}
                    disabled
                  />
                </InputWrapper>
              </InputLine>
            </InfoBox>
          </InfoBoxWrapper>
        )}
      </InfoWrapper>
    </DetailWrapper>
  );
};

export default ContractDetail;

export const DetailWrapper = styled.div`
  /* width: 600px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: left;
  padding: 20px 30px;
`;
const InfoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > h5 {
    ${titleXl20Bold}
  }
`;
const InfoBox = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const InputLine = styled.div`
  display: flex;
  min-height: 50px;
  padding: 15px 0;
  align-items: center;
  & > span {
    ${textM16Medium}
    width: 250px;
    display: flex;
    gap: 5px;
  }
`;
const InputWrapper = styled.div`
  width: 400px;
  display: flex;
  gap: 20px;
  align-items: center;
`;
