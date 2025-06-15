import { useGetBrands } from '@/services/brand';
import { textS14Regular, titleXxl24Bold } from '@/styles/typography';
import styled from 'styled-components';
import TaxListTable from './components/table';
import SecondTaxListTable from './components/secondTable';

const TaxList = () => {
  const { data, loading, error } = useGetBrands({});
  return (
    <>
      <ListWrapper>
        <Header>
          <h2>세금계산</h2>
        </Header>
        <TempTableHeader>
          <h2>인건비 내역서</h2>
          <h2>추가 인건비 내역서</h2>
        </TempTableHeader>
        <ListContent>
          {data && data.getBrands?.length > 0 ? (
            <>
              <TaxListTable
                data={data.getBrands.filter((brand) => brand.isDomestic)}
              ></TaxListTable>
              <SecondTaxListTable
                data={data.getBrands.filter((brand) => !brand.isDomestic)}
              ></SecondTaxListTable>
            </>
          ) : (
            <div className="noList">
              <h2>세금 목록 없음</h2>
              <p>생성된 세금목록이 없습니다.</p>
            </div>
          )}
        </ListContent>
      </ListWrapper>
    </>
  );
};

export default TaxList;

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
  padding: 17.5px 20px;
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
const TempTableHeader = styled.div`
  height: 60px;
  display: flex;
  & > h2 {
    width: 50%;
    ${titleXxl24Bold}
  }
`;
export const ListContent = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  gap: 20px;
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
