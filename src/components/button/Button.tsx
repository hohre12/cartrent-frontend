import { HTMLAttributes, MouseEvent } from 'react';
import styles from './Button.module.scss';
import { TVariant } from '@/types/common';
import { SvgIcon } from '../common/SvgIcon';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  configuration?: 'fill' | 'stroke';
  disabled?: boolean;
  leadingIcon?: string;
  label?: string;
  trailingIcon?: string;
  variant?: TVariant;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  className,
  size = 'medium',
  configuration = 'fill',
  disabled = false,
  leadingIcon,
  label,
  trailingIcon,
  variant = 'gray',
  onClick,
  type = 'button',
  ...props
}: IButtonProps) => {
  const isLeading = leadingIcon != null;
  const isTrailing = trailingIcon != null;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      disabled={disabled}
      className={[
        className,
        styles.button,
        `${styles[size]}`,
        `${styles[configuration]}`,
        `${isLeading && styles.isLeading}`,
        `${isTrailing && styles.isTrailing}`,
        `${styles[variant]}`,
      ].join(' ')}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {isLeading && (
        <SvgIcon
          iconName={leadingIcon}
          alt="icon1"
        />
      )}
      {props.children}
      {isTrailing && (
        <SvgIcon
          iconName={trailingIcon}
          alt="icon2"
        />
      )}
      {/* <style jsx>{`
                button {
                    background-color: ${backgroundColor},
                    border-color: ${borderColor},
                }
            `}</style> */}
    </button>
  );
};

export default Button;
