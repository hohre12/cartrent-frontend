import { Fragment, useEffect, useState } from 'react';
import styles from './confirm.module.scss';
import Button from '@c/button/Button';
import { useRecoilValue } from 'recoil';
import { confirmState } from '@/state/common';
import { SvgIcon } from '../common/SvgIcon';
import Input from '../input/Input';
import TextArea from '../textArea/TextArea';

const Confirm = () => {
  const {
    isOpen,
    title,
    content,
    onCancel,
    cancelText,
    inputPlaceHolder,
    onConfirm,
    confirmText,
    onClose,
    confirmVariant,
    children,
    ...props
  } = useRecoilValue(confirmState);
  const [text, setText] = useState<string>('');

  const formattedContent =
    content &&
    content.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  if (!isOpen) return null;
  return (
    <div
      className={styles.overlayStyle}
      {...props}
    >
      <div className={styles.confirmWrapper}>
        <div className={styles.confirmHeader}>
          <h1>{title}</h1>
          <SvgIcon
            iconName="icon-close"
            alt="close"
            onClick={onClose}
          />
        </div>
        {content && (
          <div className={styles.confirmContent}>
            <p>{formattedContent}</p>
          </div>
        )}
        {inputPlaceHolder && (
          <Input
            value={text}
            size="large"
            onTextChange={(text) => setText(text)}
            placeholder={inputPlaceHolder}
          ></Input>
        )}
        {children}
        <div className={styles.confirmFooter}>
          {cancelText && <Button onClick={onCancel}>{cancelText}</Button>}
          {confirmText && onConfirm && (
            <Button
              variant={confirmVariant}
              onClick={() => {
                onConfirm(text);
                setText('');
              }}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
