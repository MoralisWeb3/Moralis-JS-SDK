/* eslint-disable etc/no-commented-out-code */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { _useClient } from '../../context/MoralisProvider';
import { Operation } from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export function _useResolver<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  request?: Request,
) {
  const { core, swrConfig } = _useClient();
  const { fetch: resolve } = new OperationResolver(operation, Moralis.EvmApi.baseUrl, core);

  const fetcher = async (_url: string, req: Request) => {
    const { result } = await resolve(req);
    return result;
  };

  const { data, error, mutate, isValidating } = useSWR([operation.id, request], request ? fetcher : null, swrConfig);

  const fetch = useCallback((params?: Request) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new Error('No fetchRequest params');
      // throw new NoHookParamsError('useEvmNativeBalance');
    }
    return mutate(fetcher(operation.id, fetchRequest));
  }, []);

  return {
    data,
    error,
    fetch,
    isFetching: isValidating,
  };
}
