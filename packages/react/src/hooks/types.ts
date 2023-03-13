import { QueryKey, UseQueryOptions as UseReactQueryOptions } from '@tanstack/react-query';

export type MoralisQueryOptionKeys =
  | 'cacheTime'
  | 'enabled'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
  | 'refetchInterval'
  | 'refetchOnWindowFocus'
  | 'staleTime'
  | 'suspense';

export type UseQueryOptions<TQueryFnData, TError, TQueryKey extends QueryKey = QueryKey> = Pick<
  UseReactQueryOptions<TQueryFnData, TError, TQueryFnData, TQueryKey>,
  MoralisQueryOptionKeys | 'queryKey' | 'queryFn'
>;

export type QueryOptions<TQueryFnData, TError, TQueryKey extends QueryKey = QueryKey> = Omit<
  UseQueryOptions<TQueryFnData, TError, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export type UseMoralisQueryParams<Response, Request> = UseQueryOptions<Response, Error, [string, Request]> &
  Partial<Request>;
