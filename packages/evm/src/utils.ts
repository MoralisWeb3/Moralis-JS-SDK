import { BaseClass } from '@moralis/core';

// TODO: move to Core utils
export const makePromiseFromCallbackInvoker = <Data extends unknown, ClassInstance extends BaseClass>(
  successListener: (fn: (data: Data) => void) => () => ClassInstance,
  errorListener: (fn: (error: Error) => void) => () => ClassInstance,
) => {
  return new Promise<Data>((resolve, reject) => {
    const cleanupSuccess = successListener((data) => {
      cleanupSuccess();
      cleanupError();

      resolve(data);
    });

    const cleanupError = errorListener((error) => {
      cleanupSuccess();
      cleanupError();

      reject(error);
    });
  });
};
