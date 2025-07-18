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

export type TToast = {
  id: number;
  isImage: boolean;
  imgUrl?: string;
  title?: string;
  content: string;
  type: 'warning' | 'success' | 'error';
  children?: ReactNode;
};

export type TToastList = TToast[];

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
  currentPage: number;
  // propsCurrentPage?: number;
  getPage?: (offset: number, length: number) => void;
};

export type TFilterList<T> = {
  value: T;
  name: string;
};

export type TUIOptions = {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  isError?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};
