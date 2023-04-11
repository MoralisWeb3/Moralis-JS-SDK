import { QueryKey, useQuery as useReactQuery } from '@tanstack/react-query';
import { UseQueryOptions } from '../types';

export function useQuery<TQueryFnData, TError, TQueryKey extends QueryKey = QueryKey>(
  options: UseQueryOptions<TQueryFnData, TError, TQueryKey>,
) {
  const {
    data,
    error,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isPreviousData,
    isRefetching,
    isSuccess,
    refetch,
    status,
  } = useReactQuery<TQueryFnData, TError, TQueryFnData, TQueryKey>(options);

  return {
    data,
    error,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isLoading,
    isPreviousData,
    isRefetching,
    isSuccess,
    refetch,
    status,
  };
}
