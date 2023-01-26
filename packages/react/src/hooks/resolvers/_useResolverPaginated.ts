import { _useClient } from '../../context/MoralisProvider';
import { PaginatedOperation, PaginatedRequest } from '@moralisweb3/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export function _useResolverPaginated<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
  operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  request?: Request,
) {
  const { core, swrConfig } = _useClient();
  const { fetch: resolve } = new PaginatedOperationResolver(operation, Moralis.EvmApi.baseUrl, core);

  const fetcher = async (_url: string, req: Request) => {
    const { result } = await resolve(req);
    return result;
  };

  const { data, error, mutate, isValidating } = useSWR<Response>(
    [operation.id, request],
    request ? fetcher : null,
    swrConfig,
  );

  const fetch = useCallback((params?: Request) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new Error('No fetchRequest params');
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
