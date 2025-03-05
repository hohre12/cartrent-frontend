import styled from 'styled-components';

const PayStubDetail = () => {
  return (
    <>
      <DetailWrapper>급여명세서</DetailWrapper>
    </>
  );
};

export default PayStubDetail;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > h6 {
    font-size: 20px;
  }
`;
