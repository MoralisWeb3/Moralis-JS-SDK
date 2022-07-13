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

export const useResolver = () => {
  const resolver = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func: () => Promise<unknown> | Promise<any>,
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
      return successData;
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
