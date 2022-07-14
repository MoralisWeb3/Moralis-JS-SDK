import { MoralisError } from '@moralisweb3/core';
export interface IDefaultCallbacks<TResponse> {
  onError?: (error?: MoralisError) => void;
  onComplete?: () => void;
  throwOnError?: boolean;
  onSuccess?: (data: TResponse) => void;
}
