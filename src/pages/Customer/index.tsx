import styled from 'styled-components';
import CustomerList from './List';
import CustomerDetail from './Detail';
import CustomerFilter from './Filter';

const Customer = () => {
  return (
    <CustomerWrapper>
      <CustomerFilter></CustomerFilter>
      <CustomerList></CustomerList>
      <CustomerDetail></CustomerDetail>
    </CustomerWrapper>
  );
};

export default Customer;

export const CustomerWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 5px;
  background: #eee;
`;
