import styled from 'styled-components';
import CustomerList from './List';
import CustomerDetail from './Detail';
import CustomerFilter from './Filter';
import { useRecoilValue } from 'recoil';
import { selectedCustomerIdxState } from '@/state/customer';
import { useGetDivisions } from '@/services/contract';
import {
  useGetCustomerGrades,
  useGetCustomerGroups,
  useGetCustomerStatuses,
} from '@/services/customer';
import { useGetUsers } from '@/services/user';

const Customer = () => {
  const selectedCustomer = useRecoilValue(selectedCustomerIdxState);
  const { data: users } = useGetUsers();
  const { data: groups } = useGetCustomerGroups();
  const { data: grades } = useGetCustomerGrades();
  const { data: divisions } = useGetDivisions();
  const { data: statuses } = useGetCustomerStatuses();

  return (
    <CustomerWrapper>
      <CustomerFilter
        users={users?.getUsers ?? []}
        groups={groups?.getCustomerGroups ?? []}
        grades={grades?.getCustomerGrades ?? []}
      ></CustomerFilter>
      <CustomerList></CustomerList>
      {selectedCustomer && (
        <CustomerDetail
          users={users?.getUsers ?? []}
          groups={groups?.getCustomerGroups ?? []}
          grades={grades?.getCustomerGrades ?? []}
          statuses={statuses?.getCustomerStatuses ?? []}
          divisions={divisions?.getDivisions ?? []}
        ></CustomerDetail>
      )}
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
