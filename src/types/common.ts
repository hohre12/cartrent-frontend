import { ReactNode } from 'react';

export type TVariant =
  | 'gray'
  | 'black'
  | 'white'
  | 'primaryBrandcolor'
  | 'primaryInfo'
  | 'primaryDanger'
  | 'primarySuccess'
  | 'secondaryBrandcolor'
  | 'secondaryInfo'
  | 'secondaryDanger'
  | 'secondarySuccess'
  | 'transparent';

export type TConfirm = {
  isOpen: boolean;
  title?: string;
  content?: string;
  onCancel?: () => void;
  cancelText?: string;
  onConfirm?: (val: string) => void;
  confirmText?: string;
  inputPlaceHolder?: string;
  onClose?: () => void;
  confirmVariant?: TVariant;
  children?: ReactNode;
};

export type TDefaultResponse<T> = {
  data: T;
  error: any;
};

export type TListResponse<T> = {
  list: T[];
  count: number;
};
