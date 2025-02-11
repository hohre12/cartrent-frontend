import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { ChangeEvent, forwardRef } from 'react';
import { SvgIcon } from '../common/SvgIcon';
import styled from 'styled-components';
import palette from '@/styles/variables';

type TInputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'date'
  | 'datetime-local';

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
  value?: string | number;
  readOnly?: boolean;
  type?: TInputType;
  prefixNode?: ReactNode;
  postfixNode?: ReactNode;
  onTextChange?: (value: string) => void;
  max?: number;
  isNumber?: boolean;
  isRegister?: boolean;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      name,
      size = 'medium',
      placeholder = '입력',
      errorMessage,
      successMessage,
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
      isRegister = false,
      max,
      isNumber = false,
      ...props
    },
    ref,
  ) => {
    const [text, setText] = useState<any>('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (
        !isNumber ||
        (isNumber && !isNaN(Number(e.target.value.replace(/,/g, ''))))
      ) {
        setText(e.target.value);
        if (onTextChange) onTextChange(e.target.value);
      }
    };
    const onRemoveClick = () => {
      setText('');
      if (onTextChange) onTextChange('');
    };

    useEffect(() => {
      setText(value);
    }, [value, setText]);

    return (
      <Root {...props}>
        <div
          className={[
            'inputBox',
            `${size}`,
            isError ? 'error' : '',
            isSuccess ? 'success' : '',
            remove ? 'remove' : '',
            disabled ? 'disabled' : '',
            readOnly ? 'readOnly' : '',
          ].join(' ')}
        >
          {prefixNode ? <div className="prefixNode">{prefixNode}</div> : ''}
          {type === 'date' || type === 'datetime-local' ? (
            <input
              name={name}
              ref={ref}
              onChange={handleChange}
              type={type}
              disabled={disabled}
              readOnly={readOnly}
              value={text}
              placeholder={placeholder}
              onClick={(e) => e.currentTarget.showPicker()}
            />
          ) : (
            <>
              {!isRegister && (
                <input
                  name={name}
                  ref={ref}
                  onChange={handleChange}
                  type={type}
                  disabled={disabled}
                  readOnly={readOnly}
                  value={text}
                  placeholder={placeholder}
                  max={max}
                />
              )}
              {isRegister && (
                <input
                  name={name}
                  ref={ref}
                  type={type}
                  disabled={disabled}
                  readOnly={readOnly}
                  placeholder={placeholder}
                  max={max}
                  {...props}
                />
              )}
            </>
          )}
          {remove && text?.length > 0 && !disabled && !readOnly ? (
            <SvgIcon
              iconName="icon-close-round"
              onClick={() => onRemoveClick()}
              className={['iconRemove', `${size}`].join(' ')}
              width={24}
              height={24}
            />
          ) : (
            ''
          )}
          {postfixNode ? <div className="postfixNode">{postfixNode}</div> : ''}
        </div>
        {(errorMessage || successMessage) && !disabled ? (
          <div
            className={[
              'messageWrapper',
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

            {errorMessage ? errorMessage : successMessage}
          </div>
        ) : (
          ''
        )}

        {props.children}
      </Root>
    );
  },
);

Input.displayName = 'Input';

export default Input;

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  .inputBox {
    display: flex;
    gap: 2px;
    align-items: center;
    transition: 0.2s all;
    color: ${palette['$text-inputfield-entered']};
    border: 1px solid ${palette['$border-inputfield-enable']};

    &.medium {
      padding: 5px 12px;
      border-radius: ${palette['$radius-s']};
      max-height: 36px;
    }
    &.large {
      padding: 13px 12px;
      border-radius: ${palette['$radius-l']};
      max-height: 50px;
    }
    input {
      flex: 1;
      width: 100%;
      ${palette['textS14Regular']};

      &::placeholder {
        color: ${palette['$text-inputfield-placeholder']};
      }
      &:focus-visible {
        outline: none !important;
      }
    }
    input[type='date'],
    input[type='datetime-local'] {
      cursor: pointer;
    }

    &:not(:disabled) {
      &:focus,
      &:active,
      &.active {
        border: 1px solid ${palette['$border-inputfield-focusing']};
      }
      &.error {
        border: 1px solid ${palette['$border-inputfield-danger']};
      }
      &.success {
        border: 1px solid ${palette['$border-inputfield-success']};
      }
    }
    &.disabled,
    &.readOnly {
      background: #f9f9f9;
      input {
        background: #f9f9f9;
      }
    }
    &.remove {
      padding-right: 28px;
    }

    /* .preFixNode {} */
    /* .postfixNode {} */
  }

  .messageWrapper {
    ${palette['textXs12Regular']};
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: flex-start;

    &.error {
      color: ${palette['$text-danger']};
    }
    &.success {
      color: ${palette['$text-success']};
    }
    img {
      margin-top: -4px;
    }
  }
  .iconRemove {
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
    &.large {
      top: 12px;
    }
  }
`;
