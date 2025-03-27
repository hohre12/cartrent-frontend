export const USER_LIST_WATCH_OPTIONS = {
  userName: '직원명',
  userEmail: '이메일',
  userPosition: '직책',
  userRole: '권한',
  userCreatedAt: '생성일',
};

export const USER_LIST_WATCH_REQUIRED_OPTIONS = ['userName', 'userCreatedAt'];

export enum UserPositionHangleEnum {
  ADMIN = '관리자',
  ASSISTANT_MANAGER = '대리',
  CEO = '대표',
  DEPARTMENT_MANAGER = '실장',
  GENERAL_MANAGER = '본부장',
  MANAGER = '과장',
  SENIOR_MANAGER = '차장',
  STAFF = '사원',
  TEAM_LEADER = '팀장',
}

export enum UserRoleHangleEnum {
  ADMIN = '관리자 전용',
  USER = '일반 직원',
}
