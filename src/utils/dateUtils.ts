import moment from 'moment';

export const DEFAULT_DATE_FORMATTER = 'YYYY.MM.DD';

export const formatDate = (
  date?: string | Date | null,
  formatter = DEFAULT_DATE_FORMATTER,
  defaultValue?: string | null,
): string | undefined => {
  if (!date) return defaultValue === null ? undefined : defaultValue;
  return moment(date).format(formatter);
};
