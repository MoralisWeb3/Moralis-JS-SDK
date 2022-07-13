import { MoralisError } from '@moralisweb3/core';
import { IDefaultCallbacks } from 'hooks/types';

export interface IResolverCallbacks extends IDefaultCallbacks {
  _onComplete?: () => void;
  _onError?: (error: MoralisError) => void;
  _onSuccess?: (data?: any) => void;
  _throwOnError?: boolean;
  onSuccess?: (data?: any) => void;
}

export interface IResolverParams<T = Promise<any>> {
  (func: () => T, params?: IResolverCallbacks): T;
}
