import { QueryKey, useQuery as useReactQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '../types';

export function useQuery<TQueryFnData, TError, TQueryKey extends QueryKey = QueryKey>({
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
}: UseQueryOptions<TQueryFnData, TError, TQueryKey>) {
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
  } = useReactQuery<TQueryFnData, TError, TQueryFnData, TQueryKey>({
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
