import Button from '@c/button/Button';
import { SvgIcon } from '../common/SvgIcon';
import React from 'react';
import { TModal, TModalContent } from '@/types/common';
import styled from 'styled-components';
import palette from '@/styles/variables';
import { isEmpty } from '@/utils/common';

export const Modal = (props: TModal) => {
  const {
    isOpen,
    title = '',
    children,
    onCancel,
    onConfirm,
    isFixedModal = true, // 모달 화면에 고정 여부
    footerOption = {}, // footer 옵션
    size, // Modal 크기 : string | number
    disabled = false,
    wrapperClass = '',
    withHFDivider = false, // header, footer divider 여부
    customFooter,
    ...rest
  } = props;

  const {
    cancelText = '취소',
    confirmText = '확인',
    confirmVariant = 'primaryBrandcolor',
    footerBtnPosition = 'right',
    size: footerBtnSize = 'medium',
  } = footerOption;

  if (!isOpen) return <></>;

  return (
    <Root
      {...rest}
      $size={size}
    >
      <div
        className={[isFixedModal ? 'fixedModal' : '', `${wrapperClass}`].join(
          ' ',
        )}
      >
        <div className={`modalWrapper`}>
          {title && (
            <div className="modalHeader">
              <h1>{title}</h1>
              <SvgIcon
                iconName="icon-close"
                alt="close"
                onClick={onCancel}
              />
            </div>
          )}
          {withHFDivider && <div className="withHFDivider"></div>}
          <div className="modalContentBody">
            {children && <React.Fragment>{children}</React.Fragment>}
          </div>
          {withHFDivider && <div className="withHFDivider"></div>}
          {customFooter && <React.Fragment>{customFooter}</React.Fragment>}
          {!customFooter && (
            <div className={`modalFooter ${footerBtnPosition}`}>
              {cancelText && (
                <Button
                  onClick={onCancel}
                  size={footerBtnSize}
                >
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button
                  variant={confirmVariant}
                  onClick={onConfirm}
                  disabled={disabled}
                  size={footerBtnSize}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Root>
  );
};

export const ModalContent = (props: TModalContent) => {
  const { title, titleLineBtn, children, isBorderBottom, ...rest } = props;
  return (
    <SModalContent
      {...rest}
      className="modalContent"
      $isBorderBottom={isBorderBottom}
      $hasTitle={isEmpty(title)}
    >
      {title && (
        <div className="titleWrapper">
          <span className="title">{title}</span>
          {titleLineBtn && <div>{titleLineBtn}</div>}
        </div>
      )}
      {children && <div className="contentBody">{children}</div>}
    </SModalContent>
  );
};

const Root = styled.div<{ $size?: string | number }>`
  .fixedModal {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    height: 100%;
    overflow-y: auto;
  }
  .withHFDivider {
    border-top: 2px solid
      var(--System-Token-color-border-border-devider-neutral-secondary, #eee);
    /* border-bottom: 2px solid
      var(--System-Token-color-border-border-devider-neutral-secondary, #eee); */
  }
  .modalWrapper {
    display: flex;
    flex-direction: column;
    text-align: left;

    position: fixed;
    top: 50%;
    left: calc(50% - 100px);

    margin: 0 100px 0 100px;
    min-height: 110px;
    max-height: 900px;
    /* padding: 20px; */

    border-radius: 16px;
    background-color: #ffffff;
    z-index: 1001;
    box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
    transform: translate(-50%, -50%);

    ${({ $size }) => {
      if (typeof $size === 'number') {
        return { width: $size };
      }

      if ($size === 'small') {
        return { width: 600 };
      } else if ($size === 'large') {
        return { width: 1200 };
      } else if ($size === 'medium') {
        return { width: 800 };
      }
    }}

    .modalHeader {
      display: flex;
      justify-content: space-between;
      padding: 30px;
      h1 {
        ${palette['titleXxl24Bold']};
      }
      svg {
        cursor: pointer;
      }
    }
    .modalContentBody {
      padding: 30px;
      overflow: auto;

      .modalContent:first-child {
        padding-top: 0;
      }
      .modalContent:last-child {
        padding-bottom: 0;
      }
    }

    .modalFooter {
      display: flex;
      gap: 10px;
      padding: 25px 30px;
      justify-content: flex-start;

      &.center {
        justify-content: center;
      }

      &.right {
        justify-content: flex-end;
      }
      button {
        ${palette['titleS14Semibold']};
      }
    }
  }
`;
const SModalContent = styled.div<{
  $isBorderBottom?: boolean;
  $hasTitle?: boolean;
}>`
  padding: 30px 0;
  ${({ $isBorderBottom }) =>
    $isBorderBottom
      ? `
        background-image: linear-gradient(to right, var(--System-Token-color-border-border-devider-neutral-strong, #ddd) 60%, rgba(255,255,255,0) 0%);
        background-size: 17px 2px;
        background-repeat: repeat-x;
        background-position: bottom;
        `
      : ''}

  .titleWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      ${palette['titleL18Bold']}
    }
  }

  .contentBody {
    display: flex;
    flex-direction: column;
    gap: 20px;

    ${({ $hasTitle }) => ($hasTitle ? '' : `padding-top: 20px;`)}
  }
`;
