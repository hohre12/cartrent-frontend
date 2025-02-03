import { TContractFiltersStateType } from '@/types/contract';
import { Contract } from '@/types/graphql';
import { atom } from 'recoil';

export const selectedContractState = atom<Contract[]>({
  key: 'selectedContractState',
  default: [],
});

export const selectedContractHideWatchOptionsState = atom<string[]>({
  key: 'selectedContractHideWatchOptionsState',
  default: [],
});

export const contractFiltersState = atom<TContractFiltersStateType>({
  key: 'contractFiltersState',
  default: {
    status: [],
    createdAt: undefined,
  },
});
