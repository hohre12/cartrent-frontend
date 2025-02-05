export const TOAST_TIME = 5000;
export const TOKEN_KEY =
  import.meta.env.VITE_PUBLIC_ACCESS_TOKEN ?? 'app.token';
export const REFRESH_TOKEN_KEY = 'refresh.token';

export const PAGE_LENGTH_LIST = [10, 50, 100, 150, 200, 250, 300];

export enum CustomerStatusEnum {
  ACTIVE = '활성화',
  DELETED = '삭제',
}
