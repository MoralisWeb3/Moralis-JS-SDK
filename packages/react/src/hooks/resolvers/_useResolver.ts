import { _useClient } from '../../context/MoralisProvider';
import { Operation } from 'moralis/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { useCallback } from 'react';
import useSWR from 'swr';

export function _useResolver<Request, JSONRequest, Response, JSONResponse>(
  operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  baseUrl: string,
  request?: Request,
) {
  const { core, swrConfig } = _useClient();
  const { fetch: resolve } = new OperationResolver(operation, baseUrl, core);

  const fetcher = async (_url: string, req: Request) => {
    const { result } = await resolve(req);
    return result;
  };

  const { data, error, mutate, isValidating } = useSWR<Response>(
    [operation.id, request],
    request ? fetcher : null,
    swrConfig,
  );

  const fetch = useCallback((params?: Request) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new Error('No fetchRequest params');
    }
    return mutate(fetcher(operation.id, fetchRequest));
  }, []);

  return {
    data,
    error,
    fetch,
    isFetching: isValidating,
  };
}
