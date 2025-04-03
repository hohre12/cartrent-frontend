/* eslint-disable react-hooks/exhaustive-deps */
import { HTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SvgIcon } from '../common/SvgIcon';
import palette from '@/styles/variables';
import { TUIOptions } from '@/types/common';
import { isEmpty } from '@/utils/common';
import React from 'react';
import Input from '../input/Input';
import useClickOutside from '@/hooks/useClickOutside';

interface TSelectProps<T> extends TUIOptions, HTMLAttributes<HTMLDivElement> {
  value: T;
  list: T[];
  trackBy?: string;
  valueBy?: string;
  onChange?: (value: any) => void;
  onTextChange?: (value: any) => void;
  placeholder?: string;
  autoCopmlete?: boolean;

  size?: 'small' | 'medium' | 'large';
}

/**
 * README *!important* list depends on value type
 
 * usaging: 
 * value - type: string | object
           object: {[trackBy]: key,[valueBy]: value | undefined}
           string: string | undefined
           value = {'ml'}
           list = [ "kl", "l", "ml", "μl", "oz", "gal", "dl", "bbl", "cc"]
 * list - type: string[] | object[]
           object: {[trackBy]: key,[valueBy]: value | undefined}[]
           string: string[] | undefined
           value = {{ key: 0, value: 'ml' }} | {{ key: 0 }} 
           list = [{ key: 0, value: "kl"}, { key: 1, value: "l"}, { key: 2, value: "ml"}]
 * @param props 
 * @returns 
 */
const Select = (props: TSelectProps<any>) => {
  const {
    value,
    list = [],
    onChange,
    onTextChange,
    placeholder,
    trackBy = 'key',
    valueBy = 'value',
    autoCopmlete = false,

    size = 'large',
    isError = false,
    isSuccess = false,
    disabled = false,
    readOnly = false,
    message,

    ...rest
  } = props;

  const [selected, setSelected] = useState<any>({
    [trackBy]: '',
    [valueBy]: '',
  });

  const [storedDisplayList, setStoredDisplayList] = useState<any[]>([]);
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isShow, setIsShow] = useState(false);
  const isObject = typeof value === 'object';
  const selectRef = useClickOutside(() => setIsShow(false));

  useEffect(() => {
    if (isObject) {
      let defaultValue = value[valueBy];
      if (!defaultValue && !isEmpty(list)) {
        defaultValue = list.find((item) => item[trackBy] === value[trackBy])?.[
          valueBy
        ];
      }

      setSelected({ [trackBy]: value[trackBy], [valueBy]: defaultValue });
    } else {
      setSelected({ [trackBy]: value, [valueBy]: value });
    }
    setStoredDisplayList(valueBinderByObject(list));
    setDisplayList(valueBinderByObject(list));
  }, [value, list]);

  useEffect(() => {
    if (searchText) {
      const filtered = [...storedDisplayList].filter(
        (item) =>
          String(item[valueBy])
            .toLocaleLowerCase()
            .indexOf(String(searchText).toLocaleLowerCase()) !== -1,
      );
      setDisplayList(filtered);
    } else {
      setDisplayList(valueBinderByObject(list));
    }
  }, [searchText]);

  const valueBinderByObject = (list: any[]) => {
    if (isObject) {
      return list.map((item: any) => ({
        [trackBy]: item[trackBy],
        [valueBy]: item[valueBy],
        ...item,
      }));
    } else {
      return list.map((item) => ({ [trackBy]: item, [valueBy]: item }));
    }
  };

  const handleOnClick = (item: string) => {
    setSelected(item);
    onChange && onChange(item);
    setIsShow(false);
  };

  const handleTextChange = (text: string) => {
    setIsShow(true);
    setSearchText(text);

    // setSelected({
    //   [trackBy]: text,
    //   [valueBy]: text,
    // });

    onTextChange && onTextChange(text);
  };

  return (
    <Root
      ref={selectRef}
      {...rest}
    >
      {autoCopmlete ? (
        <Input
          onClick={() => setIsShow(true)}
          value={selected[valueBy]}
          onTextChange={handleTextChange}
          placeholder={placeholder}
          size={size}
          isError={isError}
          isSuccess={isSuccess}
          disabled={disabled}
          readOnly={readOnly}
          remove={true}
        />
      ) : (
        <React.Fragment>
          <div
            onClick={() => !props.onClick && !disabled && setIsShow(!isShow)}
            className={[
              'selectBox',
              `${size}`,
              isError ? 'error' : '',
              isSuccess ? 'success' : '',
              disabled ? 'disabled' : '',
              readOnly ? 'readOnly' : '',
            ].join(' ')}
          >
            <div className="displayWrap">
              {!isEmpty(selected[trackBy]) && (
                <div className="display">{selected[valueBy]}</div>
              )}
              {isEmpty(selected[trackBy]) && (
                <div className="placeholder">{placeholder}</div>
              )}
              <SvgIcon iconName="icon-arrowDown" />
            </div>
          </div>
        </React.Fragment>
      )}
      {isShow && (
        <div className="dropdown">
          <div>
            <ul>
              {displayList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleOnClick(item)}
                >
                  <div>{item[valueBy]}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Root>
  );
};

export default Select;

const Root = styled.div`
  width: 100%;
  display: block;
  position: relative;
  /* flex-direction: column;
  gap: 4px; */
  .selectBox {
    display: flex;
    gap: 2px;

    transition: 0.2s all;
    color: ${palette['$text-inputfield-entered']};
    border: 1px solid ${palette['$border-inputfield-enable']};
    height: fit-content;
    cursor: pointer;

    &.small {
      padding: 4px 4px 4px 10px;
      border-radius: ${palette['$radius-s']};
      max-height: 36px;
    }

    &.medium {
      padding: 5px 13px;
      border-radius: ${palette['$radius-s']};
      max-height: 36px;
    }
    &.large {
      padding: 13px 13px;
      border-radius: ${palette['$radius-l']};
      max-height: 50px;
    }

    input {
      flex: 1;
      ${palette['textS14Regular']};

      &::placeholder {
        color: ${palette['$text-inputfield-placeholder']};
      }
      &:focus-visible {
        outline: none !important;
      }
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

  .displayWrap {
    flex: 1;
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;

    cursor: pointer;

    .display {
      position: relative;
      top: 1px;
      /* ${palette['titleS14Semibold']} */
    }

    .placeholder {
      color: ${palette['$text-inputfield-placeholder']};
    }
  }
  .dropdown {
    position: absolute;
    width: 100%;
    min-height: 100px;
    overflow: auto;

    margin-top: 2px;
    padding: 5px;

    border-radius: 5px;
    background: white;
    border: 1px solid ${palette['$border-inputfield-enable']};
    z-index: 11;

    ul {
      li {
        > div {
          display: flex;
          align-items: center;
          min-width: 60px;
          height: 30px;
          padding-left: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }

        &:hover,
        &:active {
          background: ${palette['$bg-button-gray-hover']};
        }
      }
    }
  }
`;
