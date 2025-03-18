import Button from '@/components/button/Button';
import { NotificationTypeEndPointEnum } from '@/constants/common';
import {
  useReadNotification,
  useDeleteNotification,
} from '@/services/notification';
import { textS14Regular, textXs12Medium } from '@/styles/typography';
import { Notification } from '@/types/graphql';
import { formatDate } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type NotificationItemProps = {
  item: Notification;
  onClose: () => void;
};
const NotificationItem = (props: NotificationItemProps) => {
  const { item, onClose } = props;
  const navigate = useNavigate();

  const { readNotification } = useReadNotification();
  const { deleteNotification } = useDeleteNotification();

  const handleRead = async (id: Notification['id']) => {
    try {
      const response = await readNotification(id);
      console.log('handleRead', response);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDelete = async (id: Notification['id']) => {
    try {
      const response = await deleteNotification(id);
      console.log('handleDelete', response);
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
            console.log(item.id);
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
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              variant="black"
              onClick={() => handleDelete(item.id)}
            >
              삭제
            </Button>
          </div>
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
    text-align: left;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all; // 문단으로 끊어져서 줄바꿈 됨
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
