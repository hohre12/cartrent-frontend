import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import { selectedCounselSortState } from '@/state/counsel';
import { CounselSortDirectionType } from '@/types/graphql';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Sort = () => {
  const [selectedSort, setSelectedSort] = useRecoilState(
    selectedCounselSortState,
  );
  return (
    <SortWrapper>
      <div className="header">정렬</div>
      <div className="body">
        <div
          onClick={() =>
            setSelectedSort((prev) => ({
              ...prev,
              sortKey: 'counselAt',
            }))
          }
        >
          <div className="radio">
            <input
              type="radio"
              checked={selectedSort.sortKey === 'counselAt'}
              readOnly
            />
            <span></span>
          </div>
          <span>상담일시</span>
        </div>
      </div>
      <div className="footer">
        <Button
          variant="white"
          className={selectedSort.sortDirection === 'ASC' ? 'active' : ''}
          onClick={() =>
            setSelectedSort((prev) => ({
              ...prev,
              sortDirection: CounselSortDirectionType.Asc,
            }))
          }
        >
          <SvgIcon
            iconName="icon-arrow"
            style={
              selectedSort.sortDirection === 'ASC'
                ? { fill: '#fff' }
                : { fill: '#333' }
            }
          />
          과거순
        </Button>
        <Button
          variant="white"
          className={selectedSort.sortDirection === 'DESC' ? 'active' : ''}
          onClick={() =>
            setSelectedSort((prev) => ({
              ...prev,
              sortDirection: CounselSortDirectionType.Desc,
            }))
          }
        >
          <SvgIcon
            iconName="icon-arrow"
            style={{
              fill: selectedSort.sortDirection === 'DESC' ? '#fff' : '#333',
              transform: 'rotate(180deg)',
            }}
          />
          최신순
        </Button>
      </div>
    </SortWrapper>
  );
};

export default Sort;

export const SortWrapper = styled.div`
  top: 40px;
  position: absolute;
  border-radius: 10px;
  left: 0;
  border: 1px solid #ddd;
  background: #fff;
  width: 200px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
  text-align: left;
  .header {
    @extend .title-s14-semibold;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
  }
  .body {
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #eee;
    & > div {
      @extend .text-s14-regular;
      display: flex;
      gap: 8px;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 5px;
    button {
      @extend .text-s14-regular;
      transition: none;
      justify-content: flex-start;
      padding: 3px 5px;
      svg {
        margin-bottom: 2px;
      }
      &.active {
        @extend .text-s14-medium;
        color: #fff;
        background: #333;
      }
    }
  }
`;
