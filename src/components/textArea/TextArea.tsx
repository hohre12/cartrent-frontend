import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
// import styles from './textArea.module.scss';
import { SvgIcon } from '../common/SvgIcon';
import styled from 'styled-components';
import { textS14Regular, textXs12Regular } from '@/styles/typography';

interface ITextAreaProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  successMessage?: string;
  isError?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  value: string;
  readOnly?: boolean;
  height?: string;
  onTextChange?: (value: string) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (
    {
      name,
      placeholder = '입력',
      errorMessage = '에러 메세지',
      successMessage = '성공 메세지',
      isError = false,
      isSuccess = false,
      disabled = false,
      readOnly = false,
      height = '200px',
      onTextChange,
      value,
      ...props
    },
    ref,
  ) => {
    const [text, setText] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setText(e.target.value);
      if (onTextChange) onTextChange(e.target.value);
    };
    useEffect(() => {
      setText(value);
    }, [value, setText]);

    return (
      <TextAreaWrapper {...props}>
        <textarea
          name={name}
          ref={ref}
          className={[isError ? 'error' : '', isSuccess ? 'success' : ''].join(
            ' ',
          )}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          value={text}
          placeholder={placeholder}
          style={{ height: height }}
        />
        {(isError || isSuccess) && !disabled ? (
          <div
            className={[
              'MessageWrapper',
              isError ? 'error' : '',
              isSuccess ? 'success' : '',
            ].join(' ')}
          >
            <SvgIcon
              iconName={isError ? 'icon-error' : 'icon-success'}
              width={12}
              height={12}
              alt=""
            />
            {isError ? errorMessage : successMessage}
          </div>
        ) : (
          ''
        )}
      </TextAreaWrapper>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;

const TextAreaWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  ::-webkit-scrollbar {
    display: none;
  }
  textarea {
    ${textXs12Regular}
    resize: none;
    padding: 13px 12px;
    border-radius: 10px;
    transition: 0.2s all;
    color: $text-inputfield-entered;
    border: 1px solid #ddd;
    &::placeholder {
      color: $text-inputfield-placeholder;
    }
    &:focus-visible {
      outline: none !important;
    }
    &:not(:disabled) {
      &:focus,
      &:active,
      &.active {
        border: 1px solid $border-inputfield-focusing;
      }
      &.error {
        border: 1px solid $border-inputfield-danger;
      }
      &.success {
        border: 1px solid $border-inputfield-success;
      }
    }
  }
  .MessageWrapper {
    @extend .text-xs12-regular;
    display: flex;
    gap: 6px;
    align-items: center;
    &.error {
      color: $text-danger;
    }
    &.success {
      color: $text-success;
    }
    img {
      margin-top: -4px;
    }
  }
`;
