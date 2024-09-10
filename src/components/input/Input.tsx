import { forwardRef, HTMLAttributes, ReactNode } from "react";

type TInputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'datetime';

interface IInputProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'medium' | 'large';
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  successMessage?: string;
  remove?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  value: string | number;
  readOnly?: boolean;
  type?: TInputType;
  prefixNode?: ReactNode;
  postfixNode?: ReactNode;
  onTextChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(({
    name,
    size = 'medium',
    placeholder = '입력',
    errorMessage = '에러 메세지',
    successMessage = '성공 메세지',
    type = 'text',
    remove = false,
    isError = false,
    isSuccess = false,
    disabled = false,
    readOnly = false,
    onTextChange,
    value = '',
    prefixNode,
    postfixNode,
    ...props

}, ref,) => {
    
})