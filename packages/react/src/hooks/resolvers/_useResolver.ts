import { _useMoralisContext } from '../../context/MoralisProvider';
import { Operation } from 'moralis/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { ResolverFetchParams } from './types';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

export function _useResolver<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  baseUrl: string,
  request?: Request,
  fetchParams?: ResolverFetchParams<Response>,
) {
  const { core, fetchConfig } = _useMoralisContext();
  const { fetch: resolve } = useMemo(() => new OperationResolver(operation, baseUrl, core), [operation, baseUrl, core]);

  const fetcher = useCallback(
    async (_url: string, req: Request) => {
      const { result } = await resolve(req);
      return result;
    },
    [resolve],
  );

  const { data, error, mutate, isValidating } = useSWR<Response>(
    [`${baseUrl}/${operation.id}`, request],
    request ? fetcher : null,
    {
      ...fetchConfig,
      ...fetchParams,
    },
  );

  const fetch = useCallback(
    (params?: Request) => {
      const fetchRequest = params ?? request;
      if (!fetchRequest) {
        throw new Error('No params provided to the hook');
      }
      return mutate(fetcher(operation.id, fetchRequest));
    },
    [request],
  );

  return {
    data,
    error,
    fetch,
    isFetching: isValidating,
  };
}
