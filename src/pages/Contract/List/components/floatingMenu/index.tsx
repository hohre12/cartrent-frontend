import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { selectedCustomerState } from '@/state/customer';
import { TConfirm, TToast } from '@/types/common';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const FloatingMenu = () => {
  const [selectedCustomer, setSelectedCustomer] = useRecoilState(
    selectedCustomerState,
  );
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();

  const handleCustomerDelete = () => {
    try {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `${selectedCustomer.length}명의 고객이 삭제되었습니다.`,
        type: 'success',
      });
      hideConfirm();
      setSelectedCustomer([]);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCustomerDeleteConfirm = useCallback(() => {
    showConfirm({
      isOpen: true,
      title: '고객 삭제',
      content: `${selectedCustomer.length}명의 고객을 삭제하시겠습니까?`,
      cancelText: '취소',
      confirmText: '완료',
      confirmVariant: 'primaryInfo',
      onClose: () => hideConfirm(),
      onCancel: () => hideConfirm(),
      onConfirm: handleCustomerDelete,
    });
  }, [showConfirm, hideConfirm, selectedCustomer, handleCustomerDelete]);

  return (
    <FloatingWrapper>
      <h4>
        <span>{selectedCustomer.length}명</span>
        선택
      </h4>
      <div>
        <Button
          variant="transparent"
          onClick={handleCustomerDeleteConfirm}
        >
          <SvgIcon
            iconName="icon-trash"
            alt="trash"
          />
          <p>고객삭제</p>
        </Button>
      </div>
    </FloatingWrapper>
  );
};

export default FloatingMenu;

const FloatingWrapper = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 2;
  & > h4 {
    word-break: break-word;
    padding: 5px;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    width: 112px;
    text-align: center;
    span {
      font-size: 16px;
      display: inline-block;
      color: #005cd6;
      padding-right: 3px;
      font-weight: 700;
    }
  }
  & > div {
    padding: 0 12px;
    border-left: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-items: center;
    & > button {
      display: flex;
      flex-direction: column;
      height: auto;
      opacity: 0.5;
      width: 78px;
      height: 63px;
      white-space: nowrap;
      &:hover {
        opacity: 1;
        background: #f5f5f5;
      }
      &.active {
        background: #f5f5f5;
      }
    }
    & > ul {
      position: absolute;
      background: #fff;
      bottom: 65px;
      display: flex;
      flex-direction: column;
      padding: 5px;
      width: 110px;
      border-radius: 10px;
      border: 1px solid #ddd;
      box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
      li {
        @extend .text-s14-medium;
        padding: 3px 10px;
        border-radius: 5px;
        align-items: center;
        display: flex;
        cursor: pointer;
        &:hover {
          background: #f9f9f9;
        }
      }
    }
  }
`;
