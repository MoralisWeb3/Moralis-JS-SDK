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

export type QueryOptions<TQueryFnData, Request, TQueryKey extends QueryKey = [string, Request]> = Omit<
  UseQueryOptions<TQueryFnData, Error, TQueryKey>,
  'queryKey' | 'queryFn'
>;
