import { UnknownOperation } from '@moralisweb3/api-utils';

export type OperationAction = Pick<UnknownOperation, 'name' | 'groupName' | 'method' | 'id'>;

export type Module = 'evmApi' | 'solApi' | 'auth';
