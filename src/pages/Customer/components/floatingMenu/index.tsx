import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import { selectedCustomerState } from '@/state/customer';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import UpdateCustomersModal from '../updateCustomersModal';

const FloatingMenu = () => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>();
  const selectedCustomer = useRecoilValue(selectedCustomerState);

  return (
    <>
      <FloatingWrapper>
        <h4>
          <span>{selectedCustomer.length}개</span>
          선택
        </h4>
        <div>
          <Button
            variant="transparent"
            onClick={() => setIsOpenUpdateModal(!isOpenUpdateModal)}
          >
            <SvgIcon
              iconName="icon-reset"
              alt="trash"
            />
            <p>고객일괄수정</p>
          </Button>
        </div>
      </FloatingWrapper>
      {isOpenUpdateModal && (
        <UpdateCustomersModal
          isOpen={isOpenUpdateModal}
          onCancel={() => setIsOpenUpdateModal(false)}
          onConfirm={() => setIsOpenUpdateModal(false)}
        ></UpdateCustomersModal>
      )}
    </>
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
