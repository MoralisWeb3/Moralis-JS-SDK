import { _useClient } from '../../context/MoralisProvider';
import { NullableOperationResolver } from '@moralisweb3/api-utils';
import { Operation } from 'moralis/common-core';
import { ResolverFetchParams } from './types';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

export function _useResolverNullable<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  baseUrl: string,
  request?: Request,
  fetchParams?: ResolverFetchParams<Response | null>,
) {
  const { core, swrConfig } = _useClient();
  const { fetch: resolve } = useMemo(
    () => new NullableOperationResolver(operation, baseUrl, core),
    [operation, baseUrl, core],
  );

  const fetcher = useCallback(
    async (_url: string, req: Request) => {
      const response = await resolve(req);
      return response?.result || null;
    },
    [resolve],
  );

  const { data, error, mutate, isValidating } = useSWR<Response | null>(
    [operation.id, request],
    request ? fetcher : null,
    {
      ...swrConfig,
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
