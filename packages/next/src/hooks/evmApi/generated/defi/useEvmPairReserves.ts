import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  getPairReservesOperation as operation, 
  GetPairReservesRequest, 
  GetPairReservesResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmPairReserves = (
  request?: GetPairReservesRequest, 
  fetchParams?: FetchParams,
) => {
  const endpoint = 'evmApi/getPairReserves';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<GetPairReservesResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, ...fetchParams }
  );

  const fetch = useCallback((params?: GetPairReservesRequest) => {
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
    /**
     * @deprecated use `fetch()` instead
     */
    refetch: () => fetch(),
    isFetching: isValidating,
    /**
     * @deprecated use `isFetching` instead
     */
    isValidating,
  };
};
