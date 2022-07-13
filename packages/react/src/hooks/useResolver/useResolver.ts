import { IResolverParams } from './types';

export const useResolver = () => {
  const resolver: IResolverParams = async (
    func,
    {
      _onComplete,
      _onError,
      _onSuccess,
      _throwOnError,
      // onComplete, onError, onSuccess, throwOnError
    } = {},
  ) => {
    let successData = null;
    try {
      successData = await func();
      if (_onSuccess) {
        _onSuccess(successData);
      }
      // if (onSuccess) {
      //   onSuccess(successData);
      // }
    } catch (error) {
      if (_throwOnError) {
        throw error;
      }
      // if (throwOnError) {
      //   throw error;
      // }
      if (_onError) {
        _onError(error);
      }
      // if (onError) {
      //   onError(error);
      // }
    } finally {
      if (_onComplete) {
        _onComplete();
      }
      // if (onComplete) {
      //   onComplete();
      // }
    }
    return successData;
  };
  return resolver;
};
