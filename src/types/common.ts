import { HTMLAttributes, ReactNode } from 'react';

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

export type TModal = {
  isOpen: boolean;
  isFixedModal?: boolean;
  title?: string;
  content?: string;
  onCancel?: () => void;
  onConfirm?: (value?: any) => void;
  disabled?: boolean;
  children?: ReactNode;
  customFooter?: ReactNode;
  wrapperClass?: string;
  withHFDivider?: boolean;
  size?: 'small' | 'medium' | 'large' | number;
  footerOption?: TFooterBtnOption;
};

type TFooterBtnOption = {
  footerBtnPosition?: 'center' | 'right' | 'left';
  size?: 'small' | 'medium' | 'large';
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: TVariant;
};

export interface TModalContent extends HTMLAttributes<HTMLElement> {
  title?: string;
  titleLineBtn?: ReactNode;
  children?: ReactNode;
  isBorderBottom?: boolean;
}

export type TDefaultResponse<T> = {
  data: T;
  error: any;
};

export type TListResponse<T> = {
  list: T[];
  count: number;
};

export type TPagination = {
  totalCount: number;
  length: number;
  propsCurrentPage?: number;
  getPage?: (offset: number, length: number) => void;
};
