import { titleM16Semibold } from '@/styles/typography';
import styled from 'styled-components';
import { SvgIcon } from '../common/SvgIcon';
import Button from '../button/Button';
import {
  useReadAllNotification,
  useDeleteAllNotification,
  useGetNotifications,
} from '@/services/notification';
import NotificationItem from './notificationItem/NotificationItem';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useToast } from '@/hooks/useToast';

type NotificationListProps = {
  onClose: () => void;
};

const NotificationList = ({ onClose }: NotificationListProps) => {
  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(1);
  const limit = 5;

  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { addToast } = useToast();
  const { readAllNotification } = useReadAllNotification();
  const { deleteAllNotification } = useDeleteAllNotification();
  const { data, loading, error, fetchMore } = useGetNotifications({
    offset: 1,
    limit: limit,
  });

  const handleReadAll = async () => {
    try {
      const response = await readAllNotification();
      if (response && response.data.readAllNotification) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `모든 알림을 읽음처리 하였습니다.`,
          type: 'success',
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllNotification();
      if (response && response.data.deleteAllNotification) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `모든 알림을 삭제 하였습니다.`,
          type: 'success',
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchMoreNotifications = async () => {
    if (!data?.getNotifications?.notifications.length) return;
    if (isLastPage) return;
    await fetchMore({
      variables: { offset: offset + 1, limit: limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.getNotifications.notifications.length === 0)
          return prev;
        if (fetchMoreResult.getNotifications.notifications.length >= limit) {
          setOffset((prev) => prev + 1);
        } else {
          setIsLastPage(true);
        }
        return {
          getNotifications: {
            ...prev.getNotifications,
            notifications: [
              ...prev.getNotifications.notifications,
              ...fetchMoreResult.getNotifications.notifications,
            ],
          },
        };
      },
    });
  };

  const handleScroll = debounce(() => {
    if (listWrapperRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listWrapperRef.current;

      // 스크롤이 하단에 도달했는지 확인
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchMoreNotifications();
      }
    }
  }, 300); // 디바운스 시간: 300ms

  useEffect(() => {
    const wrapper = listWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (listWrapperRef.current) {
      listWrapperRef.current.scrollTo({ top: 0 });
    }
  }, []);

  const list = data?.getNotifications.notifications ?? [];
  const count = data?.getNotifications.count ?? 0;
  const isNewCount = data?.getNotifications.isNewNotificationCount ?? 0;

  return (
    <NotificationListWrapper>
      <NotificationListHeader>
        <h2>알림 ({isNewCount})</h2>
        <div>
          <div className="hover">
            <Button
              variant="transparent"
              onClick={handleReadAll}
            >
              <SvgIcon iconName="icon-double-check" />
            </Button>
            <div
              className="tooltip"
              style={{ top: '100%' }}
            >
              <span>모두 읽은 상태로 표시</span>
            </div>
          </div>
          <div className="hover">
            <Button
              variant="transparent"
              onClick={handleDeleteAll}
            >
              <SvgIcon iconName="icon-trash" />
            </Button>
            <div
              className="tooltip"
              style={{ top: '100%' }}
            >
              <span>알림 모두 없애기</span>
            </div>
          </div>
          <Button
            variant="transparent"
            onClick={onClose}
          >
            <SvgIcon iconName="icon-close" />
          </Button>
        </div>
      </NotificationListHeader>
      {count > 0 ? (
        <NotificationListContent ref={listWrapperRef}>
          {list.map((it, idx) => (
            <NotificationItem
              item={it}
              key={idx}
              onClose={onClose}
            ></NotificationItem>
          ))}
        </NotificationListContent>
      ) : (
        <NoList>새로운 알림이 없습니다.</NoList>
      )}
    </NotificationListWrapper>
  );
};

export default NotificationList;

const NotificationListWrapper = styled.div`
  width: 500px;
  height: 440px;
  position: absolute;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 5px;
  right: 0;
`;
const NotificationListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  h2 {
    ${titleM16Semibold}
  }
  & > div {
    display: flex;
    gap: 12px;
    button {
      padding: 5px;
      &:hover {
        background: #eee;
      }
    }
  }
`;
const NotificationListContent = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  overflow-y: auto;
`;

const NoList = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
`;
