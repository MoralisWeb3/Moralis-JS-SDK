import { OperationResolver } from '@moralisweb3/api-utils';
import { Operation } from '@moralisweb3/common-core';
import { useMemo } from 'react';
import { _useMoralisContext } from '../../context/MoralisProvider';
import { QueryConfig, useQuery } from '../useQuery';

export function _useResolver<Request, JSONRequest, Response, JSONResponse>(
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
  }: QueryConfig<Response, Error> & Partial<Request> = {},
) {
  const { core } = _useMoralisContext();
  const resolver = useMemo(() => new OperationResolver(operation, baseUrl, core), [operation, core]);

  return useQuery({
    queryKey: [request as Request],
    queryFn: async ({ queryKey: [req] }) => {
      const { result } = await resolver.fetch(req);
      return result;
    },
  });
}
