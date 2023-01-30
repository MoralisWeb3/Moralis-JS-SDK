import { _useClient } from '../../context/MoralisProvider';
import { PaginatedOperation, PaginatedRequest } from 'moralis/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

export function _useResolverPaginated<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
  operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  baseUrl: string,
  request?: Request,
) {
  const { core, swrConfig } = _useClient();
  const { fetch: resolve } = useMemo(
    () => new PaginatedOperationResolver(operation, baseUrl, core),
    [operation, baseUrl, core],
  );

  const fetcher = async (_url: string, req: Request) => {
    const { result } = await resolve(req);
    return result;
  };

  const { data, error, mutate, isValidating } = useSWR<Response>(
    [operation.id, request],
    request ? fetcher : null,
    swrConfig,
  );

  const fetch = useCallback(
    (params?: Request) => {
      const fetchRequest = params ?? request;
      if (!fetchRequest) {
        throw new Error('No fetchRequest params');
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
