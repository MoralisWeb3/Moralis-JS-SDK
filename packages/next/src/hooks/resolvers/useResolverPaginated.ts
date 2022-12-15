import Moralis from 'moralis';
import { PaginatedOperation, PaginatedRequest } from 'moralis/common-core';
import { useCallback } from 'react';
import useSWR from 'swr';
import { fetcherPaginated, NoHookParamsError } from '../../utils';
import { FetcherPaginatedResponse } from '../../utils/fetchers/fetcherPaginated';
import { FetchParams } from '../types';

export interface useResolverParams<Operation, Request> {
  endpoint: string;
  operation: Operation;
  request: Request;
  fetchParams?: FetchParams;
}

const useResolverPaginated = <Request, Response, JSONResponse>({
  endpoint,
  operation,
  request,
  fetchParams,
}: useResolverParams<
  Pick<
    PaginatedOperation<PaginatedRequest, unknown, Response, JSONResponse>,
    'serializeRequest' | 'deserializeResponse'
  >,
  Request
>) => {
  const { data, error, mutate, isValidating } = useSWR<FetcherPaginatedResponse<Response>>(
    [endpoint, request ? { operation, request: operation.serializeRequest(request, Moralis.Core) } : null],
    fetcherPaginated,
    {
      revalidateOnFocus: false,
      ...fetchParams,
    },
  );

  const fetch = useCallback((params?: Request) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new NoHookParamsError('useEvmNativeBalance');
    }
    return mutate(
      fetcherPaginated(endpoint, {
        operation,
        request: fetchRequest,
      }),
    );
  }, []);

  return {
    data,
    error,
    fetch,
    isFetching: isValidating,
  };
};

export default useResolverPaginated;
