import { OperationResolver } from '@moralisweb3/api-utils';
import { Operation } from '@moralisweb3/common-core';
import { useMemo } from 'react';
import { _useMoralisContext } from '../../context/MoralisProvider';
import { QueryOptions, useQuery } from '../useQuery';

// const areArgsDefined = <Request>(args: Request, requiredArgs: (keyof Request)[]): boolean => {
//   return requiredArgs.every((arg) => args[arg] !== undefined);
// };

// export const func = (args: Partial<Args>) => {
//   const requiredArgs = ['arg1', 'arg2'];
//   if (areArgsDefined(args, requiredArgs)) {
//     // eslint-disable-next-line no-console
//     console.log(args);
//   }
// };

export type UseResolverParams<Response, Request> = QueryOptions<Response, Error, Response, [Request]> &
  Partial<Request>;

export function _useResolver<Request extends object, JSONRequest, Response, JSONResponse>(
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
    staleTime,
    ...request
  }: QueryOptions<Response, Error, Response, [Request]> & Partial<Request> = {},
) {
  const { core } = _useMoralisContext();
  const resolver = useMemo(() => new OperationResolver(operation, baseUrl, core), [operation, core]);

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
