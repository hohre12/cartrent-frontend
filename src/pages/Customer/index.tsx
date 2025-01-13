import styled from 'styled-components';
import CustomerList from './List';
import CustomerDetail from './Detail';
import CustomerFilter from './Filter';
import { useRecoilValue } from 'recoil';
import { selectedCustomerIdxState } from '@/state/customer';

const Customer = () => {
  const selectedCustomer = useRecoilValue(selectedCustomerIdxState);
  return (
    <CustomerWrapper>
      <CustomerFilter></CustomerFilter>
      <CustomerList></CustomerList>
      {selectedCustomer && <CustomerDetail></CustomerDetail>}
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
