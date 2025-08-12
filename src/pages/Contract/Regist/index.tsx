import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/input/Input';
import Select from '@/components/select/Select';
import { useToast } from '@/hooks/useToast';
import { useGetBrands } from '@/services/brand';
import { useGetCars } from '@/services/car';
import { useGetCites } from '@/services/city';
import {
  useCreateContract,
  useGetDivisions,
  useGetFinancialCompanies,
  useGetShippingMethods,
} from '@/services/contract';
import { useGetCustomer, useGetCustomers } from '@/services/customer';
import { useGetUsers } from '@/services/user';
import { userState } from '@/state/auth';
import { textM16Medium, titleXl20Bold } from '@/styles/typography';
import {
  Brand,
  Car,
  City,
  CreateContractDto,
  Customer,
  Division,
  FinancialCompany,
  PermissionType,
  ShippingMethod,
  User,
} from '@/types/graphql';
import { numberFormat } from '@/utils/common';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const ContractRegist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customerIdx = Number(id);
  const my = useRecoilValue(userState);
  const { addToast } = useToast();
  const [submit, setSubmit] = useState<boolean>(false);
  const currentDate = moment().format('YYYY-MM-DD');
  const [brand, setBrand] = useState<Brand>();
  const [car, setCar] = useState<Car>();
  const [tempSearchUser, setTempSearchUser] = useState<string>();
  const [searchUser, setSearchUser] = useState<string>();

  const { data: users } = useGetUsers();
  const { data: customers } = useGetCustomers(
    {
      offset: 0,
      limit: 999,
      search: searchUser,
    },
    !!customerIdx || !searchUser,
  );
  const { data: customerDetail } = useGetCustomer(customerIdx);
  const { data: cites } = useGetCites({});
  const { data: financialCompanies } = useGetFinancialCompanies();
  const { data: divisions } = useGetDivisions();
  const { data: shippingMethods } = useGetShippingMethods();
  const { data: brands } = useGetBrands({});
  const { data: cars } = useGetCars({
    brandId: brand?.id ? brand.id : undefined,
  });

  const [createContract, setCreateContract] = useState<CreateContractDto>({
    customerId: 0,
    carId: 0,
    userId: my ? my.id : 0,
    contractAt: currentDate,
  });

  const [customer, setCustomer] = useState<Customer>();
  const [city, setCity] = useState<City>();
  const [user, setUser] = useState<User>();
  const [financialCompany, setFinancialCompany] = useState<FinancialCompany>();
  const [division, setDivision] = useState<Division>();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>();

  const { createContractMutation } = useCreateContract();

  const handleValueChange = (value: string | number | boolean, key: string) => {
    if (
      (key === 'fee' || key === 'feeRate') &&
      createContract?.carPrice &&
      typeof value === 'number'
    ) {
      const feeObject = {
        [key]: value,
        ...(key === 'fee' && {
          feeRate: (value / createContract.carPrice) * 100,
        }),
        ...(key === 'feeRate' && {
          fee: (value * createContract.carPrice) / 100,
        }),
      };

      setCreateContract((prevState) => ({
        ...prevState,
        ...feeObject,
        customerId: customer ? customer.id : customerIdx,
        userId: user ? user.id : my ? my.id : 0,
      }));
    } else {
      setCreateContract((prevState) => ({
        ...prevState,
        [key]: value,
        customerId: customer ? customer.id : customerIdx,
        userId: user ? user.id : my ? my.id : 0,
      }));
    }
  };

  const handleContractRegist = useCallback(async () => {
    setSubmit(true);
    if (!my) return;
    if (!customer) return;
    if (!car) return;
    try {
      const createContractPayload: CreateContractDto = {
        ...createContract,
        userId: user ? user.id : my.id,
        customerId: customer.id,
        // 셀렉
        cityId: city?.id,
        carId: car.id,
        financialCompanyId: financialCompany?.id,
        divisionId: division?.id,
        shippingMethodId: shippingMethod?.id,
        totalFee:
          (createContract?.fee ?? 0) +
          (createContract?.promotion ?? 0) +
          (createContract?.branchFee ?? 0),
        totalExpenditure:
          (createContract?.service1 ?? 0) +
          (createContract?.service2 ?? 0) +
          (createContract?.service3 ?? 0) +
          (createContract?.cashAssistance ?? 0) +
          (createContract?.businessExpenses ?? 0),
        netIncome:
          (createContract?.fee ?? 0) +
          (createContract?.promotion ?? 0) +
          (createContract?.branchFee ?? 0) -
          ((createContract?.service1 ?? 0) +
            (createContract?.service2 ?? 0) +
            (createContract?.service3 ?? 0) +
            (createContract?.cashAssistance ?? 0) +
            (createContract?.businessExpenses ?? 0)),
      };

      const response = await createContractMutation(createContractPayload);
      if (response && response.data.createContract.id) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${customer.name} 고객님의 계약이 등록되었습니다.`,
          type: 'success',
        });
        navigate('/contract');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [
    addToast,
    city?.id,
    car,
    createContract,
    createContractMutation,
    customer,
    division?.id,
    financialCompany?.id,
    my,
    navigate,
    shippingMethod?.id,
    user,
  ]);

  useEffect(() => {
    if (
      car &&
      createContract.carPrice &&
      brand &&
      shippingMethod?.name === '대리점'
    ) {
      const carPrice = createContract.carPrice;
      setCreateContract((prevState) => ({
        ...prevState,
        branchFee: Math.round(
          ((carPrice / (brand.brandFee ?? 0)) *
            0.667 *
            0.7 *
            (car.carFee ?? 0)) /
            100,
        ),
      }));
    } else {
      setCreateContract((prevState) => ({
        ...prevState,
        branchFee: 0,
      }));
    }
  }, [car, brand, createContract.carPrice, shippingMethod]);

  useEffect(() => {
    if (my) {
      setUser(my);
      if (customerIdx && customerDetail) {
        const tempCustomer = customerDetail?.getCustomer;
        if (tempCustomer) {
          setCustomer(tempCustomer);
          setCreateContract((prevState) => ({
            ...prevState,
            customerId: customerIdx,
            userId: my.id,
            company_name_nominee: tempCustomer.company_name_nominee,
            // carName: tempCustomer.carName ?? '', // TODO 이거 carName에서 car로 바뀌었는데 어떻게 할지?
            carOption: tempCustomer.carOption,
            contractPeriod: tempCustomer.contractPeriod,
            agreedMileage: tempCustomer.agreedMileage,
            advancePayment: tempCustomer.advancePayment,
          }));
          setDivision(tempCustomer.customerDivision ?? undefined);
        }
      }
    }
  }, [my, setUser, customerIdx, setCustomer, customerDetail]);

  const handleEnter = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleContractRegist();
      }
    },
    [handleContractRegist],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <DetailWrapper>
      <DetailHeaderWrapper>
        <div className="left">
          <h2>{`계약 등록`}</h2>
        </div>
        <div className="right">
          <Button onClick={handleContractRegist}>등록</Button>
        </div>
      </DetailHeaderWrapper>
      <InfoWrapper>
        <InfoBoxWrapper>
          <h5>계약내용 입력</h5>
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
                  disabled={my?.role?.name === PermissionType.User}
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
                />
              </InputWrapper>
            </InputLine>

            <InputLine>
              <span>계약일</span>
              <InputWrapper>
                <Input
                  type="date"
                  style={{ cursor: 'pointer' }}
                  value={createContract.contractAt ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'contractAt')}
                />
              </InputWrapper>
            </InputLine>
            {!customerIdx && (
              <InputLine>
                <span>
                  고객명 검색
                  <p className="required">*</p>
                </span>
                <InputWrapper>
                  <Input
                    value={tempSearchUser}
                    onTextChange={(text) => setTempSearchUser(text)}
                    errorMessage="최소 2글자이상 검색해야 고객명 선택가능"
                    isError={!searchUser}
                  />
                  <Button
                    variant="primaryInfo"
                    onClick={() => {
                      if (tempSearchUser && tempSearchUser?.length >= 2) {
                        setSearchUser(tempSearchUser);
                      }
                    }}
                  >
                    검색
                  </Button>
                </InputWrapper>
              </InputLine>
            )}
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
                  list={customers?.getCustomers?.data ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="고객을 선택해주세요"
                  disabled={!!customerIdx || (!customerIdx && !searchUser)}
                  isError={submit && !customer}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>회사명/명의자</span>
              <InputWrapper>
                <Input
                  value={createContract?.company_name_nominee ?? ''}
                  onTextChange={(text) =>
                    handleValueChange(text, 'company_name_nominee')
                  }
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>브랜드</span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...brand,
                  }}
                  onChange={(value) => {
                    setBrand(value);
                    setCar(undefined);
                  }}
                  list={brands?.getBrands ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="브랜드를 선택해주세요"
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>
                차종
                <p className="required">*</p>
              </span>
              <InputWrapper>
                <Select
                  size="medium"
                  value={{
                    ...car,
                  }}
                  onChange={(value) => setCar(value)}
                  list={cars?.getCars ?? []}
                  trackBy="id"
                  valueBy="name"
                  placeholder="차종을 선택해주세요"
                  disabled={!brand}
                  isError={submit && !car}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>차량가</span>
              <InputWrapper>
                <Input
                  value={numberFormat(createContract.carPrice)}
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'carPrice',
                    )
                  }
                  isNumber
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>차 옵션</span>
              <InputWrapper>
                <Input
                  value={createContract?.carOption ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'carOption')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>외장색상</span>
              <InputWrapper>
                <Input
                  value={createContract?.outerColor ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'outerColor')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>내장색상</span>
              <InputWrapper>
                <Input
                  value={createContract?.innerColor ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'innerColor')}
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
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>수수료</span>
              <InputWrapper>
                <Input
                  disabled={!createContract?.carPrice}
                  value={numberFormat(createContract.feeRate)}
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'feeRate')
                  }
                  max={100}
                  type="number"
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!createContract?.carPrice}
                  value={numberFormat(createContract.fee)}
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
                  disabled={!createContract?.carPrice}
                  onTextChange={(text) => {
                    if (createContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * createContract.carPrice) / 100,
                        'promotion',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!createContract?.carPrice}
                  value={numberFormat(createContract.promotion)}
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
                  value={numberFormat(createContract.monthlyPayment)}
                  isNumber
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'monthlyPayment',
                    )
                  }
                  postfixNode={'원'}
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
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>대리점명</span>
              <InputWrapper>
                <Input
                  disabled={shippingMethod?.name === '특판'}
                  value={createContract?.branch ?? ''}
                  onTextChange={(text) => handleValueChange(text, 'branch')}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>대리점 수수료</span>
              <InputWrapper>
                <Input
                  disabled={shippingMethod?.name === '특판'}
                  value={numberFormat(createContract.branchFee)}
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'branchFee',
                    )
                  }
                  postfixNode={'원'}
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>선수금</span>
              <InputWrapper>
                <Input
                  disabled={!createContract?.carPrice}
                  onTextChange={(text) => {
                    if (createContract?.carPrice) {
                      handleValueChange(
                        (Number(text) * createContract.carPrice) / 100,
                        'advancePayment',
                      );
                    }
                  }}
                  isNumber
                  postfixNode={'%'}
                />
                <Input
                  disabled={!createContract?.carPrice}
                  value={numberFormat(createContract.advancePayment)}
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
                  value={numberFormat(createContract.contractPeriod)}
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'contractPeriod',
                    )
                  }
                  isNumber
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>약정 거리</span>
              <InputWrapper>
                <Input
                  postfixNode={'km'}
                  value={numberFormat(createContract.agreedMileage)}
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'agreedMileage',
                    )
                  }
                  isNumber
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>보험 연령</span>
              <InputWrapper>
                <Input
                  postfixNode={'세'}
                  value={numberFormat(createContract.insuranceAge)}
                  onTextChange={(text) =>
                    handleValueChange(
                      Number(text.replace(/,/g, '')),
                      'insuranceAge',
                    )
                  }
                  isNumber
                />
              </InputWrapper>
            </InputLine>
            <InputLine>
              <span>대물</span>
              <InputWrapper>
                <Input
                  postfixNode={'억원'}
                  value={numberFormat(createContract.object)}
                  onTextChange={(text) =>
                    handleValueChange(Number(text.replace(/,/g, '')), 'object')
                  }
                  isNumber
                />
              </InputWrapper>
            </InputLine>
          </InfoBox>
        </InfoBoxWrapper>
        {my?.role?.name === PermissionType.Admin && (
          <InfoBoxWrapper>
            <h5>계약내용 추가 입력 (관리자 전용)</h5>
            <InfoBox>
              {shippingMethod?.name === '대리점' && (
                <>
                  <InputLine>
                    <span>대리점 결제일</span>
                    <InputWrapper>
                      <Input
                        type="date"
                        style={{ cursor: 'pointer' }}
                        onTextChange={(text) =>
                          handleValueChange(text, 'agencyPaymentDate')
                        }
                      />
                    </InputWrapper>
                  </InputLine>
                  <InputLine>
                    <span>등록증</span>
                    <InputWrapper>
                      <Checkbox
                        value={
                          createContract.hasRegistrationCertificate ?? false
                        }
                        onCheckedChange={() =>
                          handleValueChange(
                            !createContract.hasRegistrationCertificate,
                            'hasRegistrationCertificate',
                          )
                        }
                      />
                    </InputWrapper>
                  </InputLine>
                  <InputLine>
                    <span>계약사실확인서</span>
                    <InputWrapper>
                      <Checkbox
                        value={
                          createContract.hasContractConfirmationLetter ?? false
                        }
                        onCheckedChange={() =>
                          handleValueChange(
                            !createContract.hasContractConfirmationLetter,
                            'hasContractConfirmationLetter',
                          )
                        }
                      />
                    </InputWrapper>
                  </InputLine>
                  <InputLine>
                    <span>비고</span>
                    <InputWrapper>
                      <Input
                        value={createContract?.note ?? ''}
                        onTextChange={(text) => handleValueChange(text, 'note')}
                      />
                    </InputWrapper>
                  </InputLine>
                </>
              )}
              <InputLine>
                <span>출고일</span>
                <InputWrapper>
                  <Input
                    type="date"
                    style={{ cursor: 'pointer' }}
                    onTextChange={(text) =>
                      handleValueChange(text, 'shippingDate')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>출고여부</span>
                <InputWrapper>
                  <Input
                    value={createContract?.isOrdering ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'isOrdering')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의내용 1</span>
                <InputWrapper>
                  <Input
                    value={createContract?.serviceBody1 ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'serviceBody1')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의금액 1</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(createContract.service1)}
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'service1',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의내용 2</span>
                <InputWrapper>
                  <Input
                    value={createContract?.serviceBody2 ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'serviceBody2')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의금액 2</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(createContract.service2)}
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'service2',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의내용 3</span>
                <InputWrapper>
                  <Input
                    value={createContract?.serviceBody3 ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'serviceBody3')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>품의금액 3</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(createContract.service3)}
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'service3',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>현금 지원</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(createContract.cashAssistance)}
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'cashAssistance',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>소득자</span>
                <InputWrapper>
                  <Input
                    value={createContract?.incomeEarner ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'incomeEarner')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>지원 내용</span>
                <InputWrapper>
                  <Input
                    value={createContract?.supportDetails ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'supportDetails')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>경비</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(createContract.businessExpenses)}
                    onTextChange={(text) =>
                      handleValueChange(
                        Number(text.replace(/,/g, '')),
                        'businessExpenses',
                      )
                    }
                    isNumber
                    postfixNode={'원'}
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>경비내용</span>
                <InputWrapper>
                  <Input
                    value={createContract?.businessExpensesDetail ?? ''}
                    onTextChange={(text) =>
                      handleValueChange(text, 'businessExpensesDetail')
                    }
                  />
                </InputWrapper>
              </InputLine>
              <InputLine>
                <span>매출합계</span>
                <InputWrapper>
                  <Input
                    value={numberFormat(
                      (createContract?.fee ?? 0) +
                        (createContract?.promotion ?? 0) +
                        (createContract?.branchFee ?? 0),
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
                      (createContract?.service1 ?? 0) +
                        (createContract?.service2 ?? 0) +
                        (createContract?.service3 ?? 0) +
                        (createContract?.cashAssistance ?? 0) +
                        (createContract?.businessExpenses ?? 0),
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
                      (createContract?.fee ?? 0) +
                        (createContract?.promotion ?? 0) +
                        (createContract?.branchFee ?? 0) -
                        ((createContract?.service1 ?? 0) +
                          (createContract?.service2 ?? 0) +
                          (createContract?.service3 ?? 0) +
                          (createContract?.cashAssistance ?? 0) +
                          (createContract?.businessExpenses ?? 0)),
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

export default ContractRegist;

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
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
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
