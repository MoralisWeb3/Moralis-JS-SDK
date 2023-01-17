import { UnknownOperation } from '@moralisweb3/common-core';

export type OperationAction = Pick<
  UnknownOperation,
  | 'name'
  | 'groupName'
  | 'method'
  | 'id'
  | 'urlSearchParamNames'
  | 'urlPathPattern'
  | 'urlPathParamNames'
  | 'bodyParamNames'
  | 'isNullable'
  | 'firstPageIndex'
>;
