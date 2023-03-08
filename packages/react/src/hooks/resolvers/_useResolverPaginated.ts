import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { PaginatedOperation, PaginatedRequest } from '@moralisweb3/common-core';
import { useMemo } from 'react';
import { _useMoralisContext } from '../../context/MoralisProvider';
import { QueryOptions, useQuery } from '../useQuery';

export function _useResolverPaginated<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
  operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  baseUrl: string,
  {
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    refetchInterval,
    staleTime,
    suspense,
    ...request
  }: QueryOptions<Response, Error, Response, [Request]> & Partial<Request> = {},
) {
  const { core } = _useMoralisContext();
  const resolver = useMemo(() => new PaginatedOperationResolver(operation, baseUrl, core), [operation, core]);

  return useQuery({
    queryKey: [request as Request],
    queryFn: async ({ queryKey: [req] }) => {
      const { result } = await resolver.fetch(req);
      return result;
    },
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    staleTime,
    refetchInterval,
    suspense,
  });
}
