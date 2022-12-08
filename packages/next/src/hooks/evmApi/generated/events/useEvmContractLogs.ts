import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  getContractLogsOperation as operation, 
  GetContractLogsRequest, 
  GetContractLogsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmContractLogs = (
  request?: GetContractLogsRequest, 
  fetchParams?: FetchParams,
) => {
  const endpoint = 'evmApi/getContractLogs';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<GetContractLogsResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, ...fetchParams }
  );

  const fetch = useCallback((params?: GetContractLogsRequest) => {
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
