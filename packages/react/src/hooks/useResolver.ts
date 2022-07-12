import { IDefaultCallbacks } from './types';

export interface IResolver extends IDefaultCallbacks {
  onSuccess?: any;
}

export interface IUseResolverParams extends IResolver {
  _onComplete?: () => void;
  _onError?: (error: Error) => void;
  _onSuccess?: any;
  _throwOnError?: boolean;
}

export const useResolver = <T>() => {
  const resolver = async (
    func: () => Promise<T>,
    {
      _onComplete,
      _onError,
      _onSuccess,
      _throwOnError,
      onComplete,
      onError,
      onSuccess,
      throwOnError,
    }: IUseResolverParams = {},
  ) => {
    try {
      const successData = await func();
      if (_onSuccess) {
        _onSuccess(successData);
      }
      if (onSuccess) {
        onSuccess(successData);
      }
    } catch (error) {
      if (_throwOnError) {
        throw error;
      }
      if (throwOnError) {
        throw error;
      }
      if (_onError) {
        _onError(error);
      }
      if (onError) {
        onError(error);
      }
    } finally {
      if (_onComplete) {
        _onComplete();
      }
      if (onComplete) {
        onComplete();
      }
    }
  };
  return resolver;
};
