import React, { HTMLAttributes, useEffect, useState } from 'react';

import IconEnabled from './assets/icon-checkbox-enabled.svg';
import IconHover from './assets/icon-checkbox-hover.svg';
import IconChecked from './assets/icon-checkbox-checked-black.svg';
import IconCheckedDisabled from './assets/icon-checkbox-checked-disabled.svg';
import iconDisabled from './assets/icon-checkbox-disabled.svg';
import IconSomeChecked from './assets/icon-checkbox-mutiple-black.svg';

import IconCheckedBrandcolor from './assets/icon-checkbox-checked-brandcolor.svg';
import IconSomeCheckedBrandcolor from './assets/icon-checkbox-multiple-brandcolor.svg';
import styled from 'styled-components';
import { textS14Regular } from '@/styles/typography';

export type TCheckBoxValue = 'checked' | 'unchecked' | 'some' | boolean;
type TVaraint = 'black' | 'brandcolor';

interface ICheckboxProps extends HTMLAttributes<HTMLDivElement> {
  value?: TCheckBoxValue | undefined;
  disabled?: boolean | undefined;
  onCheckedChange?: (v: TCheckBoxValue) => void;
  varaint?: TVaraint;
}

const Checkbox = ({
  value,
  onCheckedChange,
  disabled,
  varaint,
  children,
  ...props
}: ICheckboxProps) => {
  const [checked, setChecked] = useState<TCheckBoxValue>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>(IconEnabled);

  useEffect(() => {
    if (checked != value && value != undefined) setChecked(value ?? false);
  }, [checked, value, setChecked]);

  useEffect(() => {
    const getIcon = () => {
      if (checked == 'unchecked' || !checked) {
        if (disabled) return iconDisabled;
        else if (hover) return IconHover;
      } else if (checked == 'checked' || checked == true) {
        if (disabled) return IconCheckedDisabled;
        if (varaint == 'brandcolor') return IconCheckedBrandcolor;
        else return IconChecked;
      } else if (checked == 'some') {
        if (varaint == 'brandcolor') return IconSomeCheckedBrandcolor;
        else return IconSomeChecked;
      }
      return IconEnabled;
    };
    setIcon(getIcon());
  }, [checked, disabled, hover, setIcon, varaint]);

  const onChecked = () => {
    let val = checked;
    if (checked == 'unchecked') {
      val = 'checked';
    } else if (!checked) {
      val = true;
    } else if (checked == 'checked') {
      val = 'unchecked';
    } else if (checked == true) {
      val = false;
    }
    if (onCheckedChange) onCheckedChange(val);
    setChecked(val);
  };

  return (
    <CheckboxWrapper
      {...props}
      onClick={() => onChecked()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={icon}
        alt="checkbox"
      />
      <span>{children}</span>
    </CheckboxWrapper>
  );
};

export default Checkbox;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  span {
    ${textS14Regular}
    color: $text-neutral-primary;
  }
`;
