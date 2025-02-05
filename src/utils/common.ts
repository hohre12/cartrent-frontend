// list 보기옵션 컬럼 노출 여부
export const isColumnsViewHide = (keys: string[], val: string) => {
  if (!keys) return false;
  return keys.includes(val);
};

export const isEmpty = (object: any[] | any): boolean => {
  if (!object) return true;
  if (typeof object === 'number') return false;
  return Array.isArray(object) ? !object.length : !Object.keys(object).length;
};

export const numberFormat = (num: number | undefined | null): string => {
  if (!num) return '-';
  return num.toLocaleString('ko-KR');
};
