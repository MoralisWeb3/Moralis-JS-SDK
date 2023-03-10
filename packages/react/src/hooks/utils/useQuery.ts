import { QueryKey, useQuery as useReactQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '../types';

export function useQuery<TQueryFnData, TError, TQueryKey extends QueryKey = QueryKey>(
  queryOptions: UseQueryOptions<TQueryFnData, TError, TQueryKey>,
) {
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
  } = useReactQuery<TQueryFnData, TError, TQueryFnData, TQueryKey>(queryOptions);

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
