import { NullableOperationResolver } from '@moralisweb3/api-utils';
import { Operation } from '@moralisweb3/common-core';
import { useMemo } from 'react';
import { _useMoralisContext } from '../../context/MoralisProvider';
import { QueryOptions, useQuery } from '../useQuery';

export function _useResolverNullable<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  baseUrl: string,
  {
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    refetchInterval,
    suspense,
    ...request
  }: QueryOptions<NonNullable<Response> | null, Error, NonNullable<Response> | null, [Request]> & Partial<Request> = {},
) {
  const { core } = _useMoralisContext();
  const resolver = useMemo(() => new NullableOperationResolver(operation, baseUrl, core), [operation, core]);

  return useQuery({
    queryKey: [request as Request],
    queryFn: async ({ queryKey: [req] }) => {
      const response = await resolver.fetch(req);
      return response?.result || null;
    },
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    refetchInterval,
    suspense,
  });
}
