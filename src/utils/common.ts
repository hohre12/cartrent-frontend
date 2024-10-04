// list 보기옵션 컬럼 노출 여부
export const isColumnsViewHide = (keys: string[], val: string) => {
  if (!keys) return false;
  return keys.includes(val);
};
