import { QueryKey, UseQueryOptions as UseReactQueryOptions, useQuery as useReactQuery } from '@tanstack/react-query';

export type QueryOptionKeys =
  | 'cacheTime'
  | 'enabled'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
  | 'refetchInterval'
  | 'staleTime'
  | 'suspense';

export type UseQueryOptions<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = Pick<
  UseReactQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  QueryOptionKeys | 'queryKey' | 'queryFn'
>;

export type QueryOptions<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export function useQuery<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>({
  cacheTime,
  enabled,
  onError,
  onSettled,
  onSuccess,
  refetchInterval,
  suspense,
  queryKey,
  queryFn,
  staleTime,
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const {
    // dataUpdatedAt,
    // errorUpdatedAt,
    // failureCount,
    // failureReason,
    // isInitialLoading,
    // isLoadingError,
    // isPaused,
    // isPlaceholderData,
    // isPreviousData,
    // isRefetchError,
    // isStale,
    // remove,
    data,
    error,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    refetch,
    status,
  } = useReactQuery<TQueryFnData, TError, TData, TQueryKey>({
    // set by user 1
    cacheTime,
    enabled,
    onError,
    onSettled,
    onSuccess,
    refetchInterval,
    suspense,
    staleTime,

    // set bu user 2
    // staleTime,

    // internal only
    queryFn,
    queryKey,

    //unused
    // context
    // meta,
    // networkMode,
    // notifyOnChangeProps,
    // placeholderData,
    // initialData,
    // initialDataUpdatedAt,
    // keepPreviousData,
    // queryKeyHashFn,
    // select,
    // structuralSharing,
    // useErrorBoundary,
    // retry,
    // retryDelay,
    // retryOnMount,
    // refetchIntervalInBackground,
    // refetchOnMount,
    // refetchOnReconnect,
    // refetchOnWindowFocus,
  });

  return {
    data,
    error,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isRefetching,
    isSuccess,
    refetch,
    status,
  };
}
