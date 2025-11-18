export const TOAST_TIME = 5000;
export const HEALTH_CHECK_TIME = 60000;
export const TOKEN_KEY =
  import.meta.env.VITE_PUBLIC_ACCESS_TOKEN ?? 'app.token';
export const REFRESH_TOKEN_KEY =
  import.meta.env.VITE_PUBLIC_REFRESH_TOKEN ?? 'refresh.token';

export const PAGE_LENGTH_LIST = [10, 50, 100, 150, 200, 250, 300, 500, 1000];

export enum CustomerStatusEnum {
  ACTIVE = '활성화',
  DELETED = '삭제',
}

export enum NotificationTypeEndPointEnum {
  COUNSEL = '/counsel',
  CUSTOMER = '/customer',
}
