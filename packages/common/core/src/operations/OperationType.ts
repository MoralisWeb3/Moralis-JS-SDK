import { Operation } from './Operation';

export enum OperationType {
  NON_NULLABLE = 'nonNullable',
  NULLABLE = 'nullable',
  PAGINATED = 'paginated',
}

export function determineOperationType(operation: Operation<unknown, unknown, unknown, unknown>): OperationType {
  if (operation.firstPageIndex === 0 || operation.firstPageIndex === 1) {
    return OperationType.PAGINATED;
  }
  if (operation.isNullable) {
    return OperationType.NULLABLE;
  }
  return OperationType.NON_NULLABLE;
}
