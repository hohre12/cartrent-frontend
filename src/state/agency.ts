import { TAgencyContractFiltersStateType } from '@/types/agency';
import { atom } from 'recoil';

export const selectedAgencyContractHideWatchOptionsState = atom<string[]>({
  key: 'selectedAgencyContractHideWatchOptionsState',
  default: [],
});

export const agencyContractFiltersState = atom<TAgencyContractFiltersStateType>(
  {
    key: 'agencyContractFiltersState',
    default: {
      startShippingDate: '',
      endShippingDate: '',
      startAgencyPaymentDate: '',
      endAgencyPaymentDate: '',
    },
  },
);
