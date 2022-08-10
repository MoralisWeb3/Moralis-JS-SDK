export type DateInput = string | Date;

export const dateInputToDate = (value: DateInput): Date => (typeof value === 'string' ? new Date(value) : value);
