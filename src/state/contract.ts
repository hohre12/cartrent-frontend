import { TContract } from '@/types/contract';
import { TContractFiltersStateType } from '@/types/contract';
import { atom } from 'recoil';

export const selectedContractState = atom<TContract[]>({
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
