import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import { useConfirm } from '@/hooks/useConfirm';
import { useToast } from '@/hooks/useToast';
import { useDeleteCounsel } from '@/services/counsel';
import { selectedCounselState } from '@/state/counsel';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const FloatingMenu = () => {
  const [selectedCounsel, setSelectedCounsel] =
    useRecoilState(selectedCounselState);
  const { showConfirm, hideConfirm } = useConfirm();
  const { addToast } = useToast();

  const { deleteCounsel } = useDeleteCounsel();

  const handleCounselDelete = async () => {
    try {
      const response = await deleteCounsel(selectedCounsel.map((it) => it.id));
      if (response && response.data.deleteCounsel === 'success') {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `${selectedCounsel.length}개의 상담이 삭제되었습니다.`,
          type: 'success',
        });
        hideConfirm();
        setSelectedCounsel([]);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCounselDeleteConfirm = useCallback(() => {
    showConfirm({
      isOpen: true,
      title: '상담 삭제',
      content: `${selectedCounsel.length}개의 상담을 삭제하시겠습니까?`,
      cancelText: '취소',
      confirmText: '삭제',
      confirmVariant: 'primaryDanger',
      onClose: () => hideConfirm(),
      onCancel: () => hideConfirm(),
      onConfirm: handleCounselDelete,
    });
  }, [showConfirm, hideConfirm, selectedCounsel, handleCounselDelete]);

  return (
    <FloatingWrapper>
      <h4>
        <span>{selectedCounsel.length}개</span>
        선택
      </h4>
      <div>
        <Button
          variant="transparent"
          onClick={handleCounselDeleteConfirm}
        >
          <SvgIcon
            iconName="icon-trash"
            alt="trash"
          />
          <p>상담삭제</p>
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
