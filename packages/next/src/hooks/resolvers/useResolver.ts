import Moralis from 'moralis';
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

const useResolver = <Request, Response>({
  endpoint,
  operation,
  request,
  fetchParams,
}: useResolverParams<
  Pick<Operation<Request, unknown, Response, unknown>, 'serializeRequest' | 'deserializeResponse'>,
  Request
>) => {
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<Response>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null],
    fetcher,
    { revalidateOnFocus: false, ...fetchParams },
  );

  const fetch = useCallback((params?: Request) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new NoHookParamsError('useEvmNativeBalance');
    }
    return mutate(
      fetcher(endpoint, {
        deserializeResponse,
        request: serializeRequest(fetchRequest, Moralis.Core),
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
