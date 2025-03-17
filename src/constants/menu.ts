import { PermissionType } from '@/types/graphql';

export const SIDE_MENU = [
  {
    title: '고객',
    engTitle: 'customer',
    icon: 'icon-member',
    path: '/customer',
    auth: [PermissionType.Admin, PermissionType.User],
  },
  {
    title: '상담',
    engTitle: 'counsel',
    icon: 'icon-board',
    path: '/counsel',
    auth: [PermissionType.Admin, PermissionType.User],
  },
  {
    title: '계약',
    engTitle: 'contract',
    icon: 'icon-draft',
    path: '/contract',
    auth: [PermissionType.Admin, PermissionType.User],
  },
  {
    title: '급여',
    engTitle: 'payStub',
    icon: 'icon-expense',
    path: '/payStub',
    auth: [PermissionType.Admin, PermissionType.User],
  },
  {
    title: '정산',
    engTitle: 'adjustment',
    icon: 'icon-time',
    path: '/adjustment',
    auth: [PermissionType.Admin],
  },
  {
    title: '출고',
    engTitle: 'delivery',
    icon: 'icon-shipOutDirect',
    path: '/delivery',
    auth: [PermissionType.Admin],
  },
  {
    title: '관리자',
    engTitle: 'admin',
    icon: 'icon-harmfulNspecial',
    path: '/admin',
    auth: [PermissionType.Admin],
  },
];
