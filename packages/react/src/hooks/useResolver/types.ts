import { MoralisError } from '@moralisweb3/core';
import { IDefaultCallbacks } from 'hooks/types';

// export type TResponse = unknown;

// export interface IResolverCallbacks extends IDefaultCallbacks<TResponse> {
//   _onComplete?: () => void;
//   _onError?: (error: MoralisError) => void;
//   _onSuccess?: (response: TResponse) => void;
//   _throwOnError?: boolean;
// }

export interface IResolverParams {
  <TResponse = null>(
    func: () => Promise<TResponse>,
    params?: {
      _onComplete?: () => void;
      _onError?: (error?: MoralisError) => void;
      _onSuccess?: (response: TResponse) => void;
      _throwOnError?: boolean;
    },
  ): Promise<TResponse | null>;
}

// export interface IResolverParams<TOnSuccess extends Pick<IDefaultCallbacks<TResponse>, 'onSuccess'>> {
//   (
//     func: Promise<TOnSuccess>,
//     params?: {
// _onComplete?: () => void;
// _onError?: Promise<MoralisError>;
// _onSuccess?: Promise<TOnSuccess>;
// _throwOnError?: boolean;
//     },
//   ): Promise<TOnSuccess>;
// }

// export interface IResolverParams {
//   (func: () => T, params?: IResolverCallbacks);
// }
