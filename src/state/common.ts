import { TConfirm } from "@/types/common";
import { atom } from "recoil";

export const confirmState = atom<TConfirm>({
    key: 'confirmState',
    default: {
      isOpen: false,
      confirmVariant: 'gray',
    },
  });