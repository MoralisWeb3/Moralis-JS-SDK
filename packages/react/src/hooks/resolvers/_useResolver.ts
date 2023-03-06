import { _useMoralisContext } from '../../context/MoralisProvider';
import { Operation } from 'moralis/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { useMemo } from 'react';
import { UseQueryConfig, useQuery } from '../useQuery';
import { QueryKey } from '@tanstack/react-query';
// import { useQuery } from '@tanstack/react-query';

const splitRequestAndQueryConfig = <Request, Request, TError, TData, TQueryKey extends QueryKey = QueryKey>({
  cacheTime,
  enabled,
  onError,
  onSettled,
  onSuccess,
  refetchInterval,
  suspense,
  ...request
}: Request & UseQueryConfig<Request, TError, TData, TQueryKey>): {
  request: Request;
  queryConfig: UseQueryConfig<Request, TError, TData, TQueryKey>;
} => {
  return {
    request: request as Request,
    queryConfig: { cacheTime, enabled, onError, onSettled, onSuccess, refetchInterval, suspense },
  };
};

export function _useResolver<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  baseUrl: string,
  params: Request & UseQueryConfig<Request, TError, TData, TQueryKey>,
) {
  const { request, queryConfig } = splitRequestAndQueryConfig<Request, Response>(params);
  const { core } = _useMoralisContext();
  const { fetch: resolve } = useMemo(() => new OperationResolver(operation, baseUrl, core), [operation, baseUrl, core]);

  return useQuery({
    // ...queryConfig,
    queryKey: [operation.id, request] as const,
    queryFn: async ({ queryKey: [_id, requestToResolve] }) => {
      const { result } = await resolve(requestToResolve);
      return result;
    },
  });
}
