import { UnknownOperation } from '@moralisweb3/common-core';

export type OperationAction = Pick<UnknownOperation, 'name' | 'groupName' | 'method' | 'id' | 'urlSearchParamNames'>;

export type Module = 'evmApi' | 'solApi' | 'auth';
