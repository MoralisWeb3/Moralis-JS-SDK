import { QueryKey, UseQueryOptions, useQuery as useReactQuery } from '@tanstack/react-query';

export type QueryOptionKeys =
  | 'cacheTime'
  | 'enabled'
  | 'onError'
  | 'onSettled'
  | 'onSuccess'
  | 'refetchInterval'
  | 'suspense';

type UseQueryConfig<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = Pick<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  QueryOptionKeys | 'queryKey' | 'queryFn'
>;

export type QueryConfig<TQueryFnData, TError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> = Omit<
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
}: UseQueryConfig<TQueryFnData, TError, TData, TQueryKey>) {
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
