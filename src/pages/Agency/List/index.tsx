import styled from 'styled-components';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import { useCallback, useEffect, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { agencyContractFiltersState } from '@/state/agency';
import { FilterWrapper } from '@/styles/common';
import { useNavigate, useNavigationType } from 'react-router-dom';
import Input from '@/components/input/Input';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import { useGetAgencyContracts } from '@/services/agency';
import AgencyContractListTable from './components/table';
import Pagination from '@/components/pagination/Pagination';

const AgencyList = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const my = useRecoilValue(userState);

  // pagination
  const [length, setLength] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);

  // filters
  const [filters, setFilters] = useRecoilState(agencyContractFiltersState);
  const resetFilters = useResetRecoilState(agencyContractFiltersState);

  const { data, loading, error } = useGetAgencyContracts({
    search: searchText ? searchText : null,
    startShippingDate: filters?.startShippingDate
      ? filters.startShippingDate
      : null,
    endShippingDate: filters?.endShippingDate ? filters.endShippingDate : null,
    startAgencyPaymentDate: filters?.startAgencyPaymentDate
      ? filters.startAgencyPaymentDate
      : null,
    endAgencyPaymentDate: filters?.endAgencyPaymentDate
      ? filters.endAgencyPaymentDate
      : null,
    limit: length,
    offset,
  });

  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
    },
    [setSearchText],
  );

  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
    }
  }, [navigationType, resetFilters]);

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>대리점 계약 목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="agencyRecent"
                onTextChange={(text) => setText(text)}
                onRemoveClick={handleSearchTextDelete}
                onKeyDown={handleSearch}
                onRecentClick={handleSearch}
                keyword="고객명, 담당자, 연락처, 차종, 금융사, 지점"
              ></SearchBox>
              <FilterWrapper>
                <DateWrapper>
                  {!filters?.startShippingDate && (
                    <label htmlFor="startDate">출고일(언제부터)</label>
                  )}
                  <Input
                    type="date"
                    inputId="startDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.startShippingDate ?? ''}
                    onTextChange={(text) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        startShippingDate: text,
                      }))
                    }
                  />
                </DateWrapper>
                ~
                <DateWrapper>
                  {!filters?.endShippingDate && (
                    <label htmlFor="endDate">출고일(언제까지)</label>
                  )}
                  <Input
                    type="date"
                    inputId="endDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.endShippingDate ?? ''}
                    onTextChange={(text) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        endShippingDate: text,
                      }))
                    }
                  />
                </DateWrapper>
                <div className="verticalLine"></div>
                <DateWrapper>
                  {!filters?.startAgencyPaymentDate && (
                    <label htmlFor="startDate">결제일(언제부터)</label>
                  )}
                  <Input
                    type="date"
                    inputId="startDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.startAgencyPaymentDate ?? ''}
                    onTextChange={(text) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        startAgencyPaymentDate: text,
                      }))
                    }
                  />
                </DateWrapper>
                ~
                <DateWrapper>
                  {!filters?.endAgencyPaymentDate && (
                    <label htmlFor="endDate">결제일(언제까지)</label>
                  )}
                  <Input
                    type="date"
                    inputId="endDate"
                    style={{ cursor: 'pointer' }}
                    value={filters?.endAgencyPaymentDate ?? ''}
                    onTextChange={(text) =>
                      setFilters((prevState) => ({
                        ...prevState,
                        endAgencyPaymentDate: text,
                      }))
                    }
                  />
                </DateWrapper>
              </FilterWrapper>
            </SearchBoxWrapper>
            <FunctionWrapper>
              {my?.role?.name === PermissionType.Admin && (
                <>
                  <Button
                    onClick={() =>
                      setIsOpenWatchOptionModal(!isOpenWatchOptionModal)
                    }
                  >
                    <SvgIcon iconName="icon-eye-show" />
                    <p>보기옵션</p>
                  </Button>
                </>
              )}
            </FunctionWrapper>
          </ControlWrapper>
        </Header>
        <ListContent>
          {data && data.getAgencyContracts?.length > 0 ? (
            <>
              <AgencyContractListTable
                data={data.getAgencyContracts}
              ></AgencyContractListTable>
            </>
          ) : searchText ? (
            <div className="noList">
              <h2>검색결과 없음</h2>
              <p>고객명, 담당자, 연락처, 차종, 금융사로 검색해주세요.</p>
            </div>
          ) : (
            <div className="noList">
              <h2>대리점 계약 없음</h2>
              <p>등록된 대리점 계약이 없습니다.</p>
            </div>
          )}
        </ListContent>
        {data && data.getAgencyContracts?.length > 0 && (
          <Pagination
            // totalCount={data.count}
            totalCount={100}
            length={length}
            getPage={(offset, length) => {
              setOffset(offset);
              setLength(length);
            }}
          ></Pagination>
        )}
      </ListWrapper>
      {isOpenWatchOptionModal && (
        <WatchOptionModal
          isOpen={isOpenWatchOptionModal}
          onCancel={() => setIsOpenWatchOptionModal(false)}
          onConfirm={() => {
            setIsOpenWatchOptionModal(false);
          }}
        />
      )}
    </>
  );
};

export default AgencyList;

const ListWrapper = styled.div`
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 20px;
  border-bottom: 1px solid #eee;
  & > h2 {
    text-align: left;
    font-weight: 700;
    font-size: 24px;
  }
`;
const ControlWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    p {
      line-height: 15px;
      font-weight: 700;
    }
  }
`;

const SearchBoxWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ListContent = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  .noList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    h2 {
      ${titleXxl24Bold}
    }
    p {
      ${textS14Regular}
    }
  }
`;

export const DateWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  border: 1px solid #ddd;
  & > label {
    z-index: 1;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: #111;
    pointer-events: none;
    transition: 0.2s ease-out;
    background: #fff;
    width: 75%;
    height: 100%;
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inputBox {
    border: none;
  }
`;
