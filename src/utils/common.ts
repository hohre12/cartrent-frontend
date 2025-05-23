import { Team } from '@/types/graphql';

// list 보기옵션 컬럼 노출 여부
export const isColumnsViewHide = (
  keys: string[],
  val: string,
  isHide?: boolean,
) => {
  if (isHide) return true;
  if (!keys) return false;
  return keys.includes(val);
};

export const isEmpty = (object: any[] | any): boolean => {
  if (!object) return true;
  if (typeof object === 'number') return false;
  return Array.isArray(object) ? !object.length : !Object.keys(object).length;
};

export const numberFormat = (
  num: number | undefined | null,
): string | number => {
  if (!num) return 0;
  return num.toLocaleString('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8, // 충분히 크게 설정
  });
};

// 입력값 포맷팅 함수
export const autoHypenTel = (str: string) => {
  // 숫자만 남기기
  str = str.replace(/[^0-9]/g, '');
  let tmp = '';

  // 서울 지역번호 (02) 처리
  if (str.startsWith('02')) {
    if (str.length < 3) {
      return str;
    } else if (str.length < 6) {
      tmp += str.slice(0, 2);
      tmp += '-';
      tmp += str.slice(2);
      return tmp;
    } else if (str.length < 10) {
      tmp += str.slice(0, 2);
      tmp += '-';
      tmp += str.slice(2, 5);
      tmp += '-';
      tmp += str.slice(5);
      return tmp;
    } else {
      tmp += str.slice(0, 2);
      tmp += '-';
      tmp += str.slice(2, 6);
      tmp += '-';
      tmp += str.slice(6, 10);
      return tmp;
    }
  }
  // 핸드폰 및 다른 지역번호 처리
  else {
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.slice(0, 3);
      tmp += '-';
      tmp += str.slice(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.slice(0, 3);
      tmp += '-';
      tmp += str.slice(3, 6);
      tmp += '-';
      tmp += str.slice(6);
      return tmp;
    } else {
      tmp += str.slice(0, 3);
      tmp += '-';
      tmp += str.slice(3, 7);
      tmp += '-';
      tmp += str.slice(7, 11);
      return tmp;
    }
  }
};

export const isNumber = (value?: string | number): boolean => {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
};

export const customerStatusColor = (value?: string): string => {
  if (!value) return '111';
  switch (value) {
    case '서류심사':
    case '심사승인':
    case '가망고객':
      return 'ff3126';
    case '계약완료':
      return '0B6CFF';
    case '상담완료':
    case '파기':
      return 'ff8a00';
    default:
      return '111';
  }
};

export const flattenTeams = (
  teams: Team[],
  parentId: number | null = null,
): Team[] => {
  return teams.flatMap((team) => {
    const { subTeams, ...rest } = team;
    const flattenedTeam = { ...rest, parentId };

    // 현재 팀 + 하위 팀 재귀 처리
    return [flattenedTeam, ...flattenTeams(subTeams || [], team.id)];
  });
};
