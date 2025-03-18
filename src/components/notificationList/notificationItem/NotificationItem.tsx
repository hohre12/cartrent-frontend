import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/common/SvgIcon';
import Dropdown from '@/components/dropdown/Dropdown';
import {
  NotificationTypeEndPointEnum,
  NotificationTypeEnumRecord,
  YnEnum,
} from '@/constants/common';
import useClickOutside from '@/hooks/useClickOutside';
import { useConfirm } from '@/hooks/useConfirm';
import {
  useGetNotificationIsNew,
  useReadNotification,
  useDeleteNotification,
} from '@/services/notification';
import { notificationIsNewState } from '@/state/notification';
import {
  textS14Medium,
  textS14Regular,
  textXs12Medium,
} from '@/styles/typography';
import { Notification } from '@/types/graphql';
import { formatDate } from '@/utils/dateUtils';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

type NotificationItemProps = {
  item: Notification;
  onClose: () => void;
};
const NotificationItem = (props: NotificationItemProps) => {
  const { item, onClose } = props;
  const navigate = useNavigate();
  //   const { getNotificationIsNew } = useGetNotificationIsNew();
  const { readNotification } = useReadNotification();
  const { deleteNotification } = useDeleteNotification();
  const { showConfirm, hideConfirm } = useConfirm();

  const handleRead = async (id: Notification['id']) => {
    try {
      const response = await readNotification(id);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDelete = async (id: Notification['id']) => {
    try {
      const response = await deleteNotification(id);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <>
      <NotificationItemWrapper
        className={item.isRead === false ? 'new' : ''}
        onClick={() => {
          if (NotificationTypeEndPointEnum[item.type]) {
            handleRead(item.id);
            navigate(NotificationTypeEndPointEnum[item.type]);
            onClose();
          }
        }}
      >
        <NotificationItemHeader>
          <h3>{item.title}</h3>
          {item.isRead === false && <Dot></Dot>}
        </NotificationItemHeader>
        <NotificationItemContent>
          <h5>{item.content}</h5>
          <Button
            variant="black"
            onClick={() =>
              showConfirm({
                isOpen: true,
                title: '알림 삭제',
                content: `해당 알림을 삭제하시겠습니까?`,
                cancelText: '취소',
                confirmText: '삭제',
                confirmVariant: 'primaryDanger',
                onClose: hideConfirm,
                onCancel: hideConfirm,
                onConfirm: () => handleDelete(item.id),
              })
            }
          >
            삭제
          </Button>
        </NotificationItemContent>
        <NotificationItemFooter>
          <h6>{formatDate(item.created_at, 'YYYY-MM-DD HH:mm:ss')}</h6>
        </NotificationItemFooter>
      </NotificationItemWrapper>
    </>
  );
};

export default NotificationItem;

const NotificationItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  &.new {
    background: #e5f0ff;
    &:hover {
      background: #d0e3ff;
    }
  }
  &:hover {
    background: #eee;
  }
`;
const NotificationItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h3 {
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #ff8a00;
`;
const NotificationItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  h5 {
    ${textS14Regular}
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  button {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
const NotificationItemFooter = styled.div`
  h6 {
    ${textXs12Medium}
    color: #999;
    text-align: left;
  }
`;
