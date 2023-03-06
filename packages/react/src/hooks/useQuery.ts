import { QueryFunction, QueryKey, UseQueryOptions, useQuery as useReactQuery } from '@tanstack/react-query';

export type UseQueryConfig<Data> = Pick<
  UseQueryOptions<Data>,
  'cacheTime' | 'enabled' | 'onError' | 'onSettled' | 'onSuccess' | 'refetchInterval' | 'suspense'
  // | 'queryKey'
  // | 'queryFn'
>;
// export type UseQueryConfig<Data, Error> = Pick<
//   UseQueryOptions<Data, Error>,
//   | 'cacheTime'
//   | 'enabled'
//   | 'onError'
//   | 'onSettled'
//   | 'onSuccess'
//   | 'refetchInterval'
//   | 'suspense'
//   | 'queryKey'
//   | 'queryFn'
// >;

export function useQuery<Data>({
  cacheTime,
  enabled,
  onError,
  onSettled,
  onSuccess,
  refetchInterval,
  suspense,
  queryKey,
  queryFn,
}: UseQueryConfig<Data> & { queryKey: QueryKey; queryFn: QueryFunction<Data, QueryKey> }) {
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
  } = useReactQuery({
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
