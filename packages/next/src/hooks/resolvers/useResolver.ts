import { Operation } from 'moralis/common-core';
import { useCallback } from 'react';
import useSWR from 'swr';
import { fetcher, NoHookParamsError } from '../../utils';
import { FetchParams } from '../types';

export interface useResolverParams<Operation, Request> {
  endpoint: string;
  operation: Operation;
  request: Request;
  fetchParams?: FetchParams;
}

const useResolver = <Request, Response, JSONResponse>({
  endpoint,
  operation,
  request,
  fetchParams,
}: useResolverParams<
  Pick<Operation<Request, unknown, Response, JSONResponse>, 'serializeRequest' | 'deserializeResponse'>,
  Request
>) => {
  const { data, error, mutate, isValidating } = useSWR<Response>(
    [endpoint, request ? { operation, request } : null],
    fetcher,
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
      fetcher(endpoint, {
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

export default useResolver;
