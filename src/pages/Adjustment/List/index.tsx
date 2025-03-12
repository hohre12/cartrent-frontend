import styled from 'styled-components';
import { SvgIcon } from '@/components/common/SvgIcon';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import Button from '@/components/button/Button';
import { useCallback, useEffect, useState } from 'react';
import WatchOptionModal from './components/watchOptionModal';
import SearchBox from '@/components/searchBox/SearchBox';
import useClickOutside from '@/hooks/useClickOutside';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { TFilterList } from '@/types/common';
import { Circle, FilterContent, FilterWrapper } from '@/styles/common';
import AdjustmentListTable from './components/table';
import { adjustmentFiltersState } from '@/state/adjustment';
import { useGetAdjustments } from '@/services/adjustment';
import FilterUser from './components/filter/user';
import { userState } from '@/state/auth';
import { PermissionType } from '@/types/graphql';
import { useNavigationType } from 'react-router-dom';
import Select from '@/components/select/Select';
import moment from 'moment';
import { useCreatePayStub } from '@/services/payStub';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';

const AdjustmentList = () => {
  const navigationType = useNavigationType();
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isOpenWatchOptionModal, setIsOpenWatchOptionModal] =
    useState<boolean>(false);
  const user = useRecoilValue(userState);
  const currentYear = moment().format('YYYY');
  const currentMonth = moment().format('M');
  const [months, setMonths] = useState<string[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const { addToast } = useToast();
  const { showConfirm, hideConfirm } = useConfirm();

  const { createPayStub } = useCreatePayStub();

  // filters
  const [filters, setFilters] = useRecoilState(adjustmentFiltersState);
  const resetFilters = useResetRecoilState(adjustmentFiltersState);

  const { data, loading, error } = useGetAdjustments({
    search: searchText ? searchText : null,
    userIds:
      filters?.users?.length > 0 ? filters.users.map((it) => it.value) : null,
    year: filters.year,
    month: filters.month,
  });

  // filter - user
  const [isFilterUserOpen, setIsFilterUserOpen] = useState<boolean>(false);
  const filterUserRef = useClickOutside(() => setIsFilterUserOpen(false));

  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
    },
    [setSearchText],
  );

  const handleSetFilterUser = useCallback(
    (selectedFilters: TFilterList<number>[]) => {
      setFilters({ ...filters, users: selectedFilters });
      setIsFilterUserOpen(false);
    },
    [filters, setFilters, setIsFilterUserOpen],
  );

  const handlePayStubRegist = async () => {
    setSubmit(true);
    if (!filters.year) return;
    if (!filters.month) return;
    try {
      const response = await createPayStub({
        year: filters.year,
        month: filters.month,
      });
      if (response && response.data.createPayStub) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${filters.year}년 ${filters.month}월 급여명세서가 발행되었습니다.`,
          type: 'success',
        });
        hideConfirm();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (navigationType !== 'POP') {
      resetFilters();
    }
  }, [navigationType, resetFilters]);

  useEffect(() => {
    const allMonths = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    if (filters.year === currentYear) {
      setMonths(allMonths.slice(0, Number(currentMonth)).reverse());
    } else {
      setMonths(allMonths.reverse());
    }
  }, [filters, setMonths, currentYear, currentMonth]);

  return (
    <>
      <ListWrapper>
        <Header>
          <h2>정산목록</h2>
          <ControlWrapper>
            <SearchBoxWrapper>
              <SearchBox
                value={text}
                placeholder="검색"
                recentKey="adjustmentRecent"
                onTextChange={(text) => setText(text)}
                onRemoveClick={handleSearchTextDelete}
                onKeyDown={handleSearch}
                onRecentClick={handleSearch}
                keyword="담당자"
              ></SearchBox>
              <FilterWrapper>
                {user?.role.name === PermissionType.Admin && (
                  <FilterContent ref={filterUserRef}>
                    <Button
                      variant="white"
                      configuration="stroke"
                      style={{
                        borderColor: filters.users.length > 0 ? '#333' : '#ddd',
                      }}
                      onClick={() => setIsFilterUserOpen(!isFilterUserOpen)}
                    >
                      담당자
                      {filters.users.length > 0 && (
                        <Circle>{filters.users.length}</Circle>
                      )}
                      <SvgIcon
                        iconName="icon-arrowButton"
                        style={{ fill: '#333' }}
                      />
                    </Button>
                    {isFilterUserOpen && (
                      <FilterUser
                        handleApply={handleSetFilterUser}
                      ></FilterUser>
                    )}
                  </FilterContent>
                )}
                <FilterContent>
                  <Select
                    size="medium"
                    value={`${filters.year}년`}
                    onChange={(value) => {
                      setFilters({
                        ...filters,
                        year: value.value.replace('년', ''),
                      });
                    }}
                    list={[
                      `${currentYear}년`,
                      `${Number(currentYear) - 1}년`,
                      `${Number(currentYear) - 2}년`,
                    ]}
                    placeholder="정산년도를 선택해주세요"
                  />
                </FilterContent>
                <FilterContent>
                  <Select
                    size="medium"
                    value={`${filters.month}월`}
                    onChange={(value) => {
                      setFilters({
                        ...filters,
                        month: value.value.replace('월', ''),
                      });
                    }}
                    list={months}
                    placeholder="정산년도를 선택해주세요"
                  />
                </FilterContent>
              </FilterWrapper>
            </SearchBoxWrapper>
            <FunctionWrapper>
              {user?.role.name === PermissionType.Admin && (
                <>
                  <Button
                    onClick={() =>
                      showConfirm({
                        isOpen: true,
                        title: '급여명세서 발행',
                        content: `정말로 급여명세서를 발행하시겠습니까?\n한번 발행한 급여명세서는 취소 또는 삭제가 불가능합니다.`,
                        cancelText: '취소',
                        confirmText: '발행',
                        confirmVariant: 'primaryInfo',
                        onClose: hideConfirm,
                        onCancel: hideConfirm,
                        onConfirm: handlePayStubRegist,
                      })
                    }
                  >
                    <SvgIcon iconName="icon-expense" />
                    <p>급여명세서 발행</p>
                  </Button>
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
          {data && data.getAdjustments?.length > 0 ? (
            <>
              <AdjustmentListTable
                data={data.getAdjustments}
              ></AdjustmentListTable>
            </>
          ) : searchText ? (
            <div className="noList">
              <h2>검색결과 없음</h2>
              <p>담당자로 검색해주세요.</p>
            </div>
          ) : (
            <div className="noList">
              <h2>정산내용 없음</h2>
              <p>해당년월에 정산된 내용이 없습니다.</p>
            </div>
          )}
        </ListContent>
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

export default AdjustmentList;

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
