import { _useMoralisContext } from '../../context/MoralisProvider';
import { PaginatedOperation, PaginatedRequest } from 'moralis/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { ResolverFetchParams } from './types';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

export function _useResolverPaginated<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
  operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  baseUrl: string,
  request?: Request,
  fetchParams?: ResolverFetchParams<Response>,
) {
  const { core, fetchConfig } = _useMoralisContext();
  const { fetch: resolve } = useMemo(
    () => new PaginatedOperationResolver(operation, baseUrl, core),
    [operation, baseUrl, core],
  );

  const fetcher = useCallback(
    async (_url: string, req: Request) => {
      const { result } = await resolve(req);
      return result;
    },
    [resolve],
  );

  const { data, error, mutate, isValidating } = useSWR<Response>([request ? operation.id : null, request], fetcher, {
    ...fetchConfig,
    ...fetchParams,
  });

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
