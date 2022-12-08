import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  getNFTsOperation as operation, 
  GetNFTsRequest, 
  GetNFTsResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useSolNFTs = (
  request?: GetNFTsRequest, 
  fetchParams?: FetchParams,
) => {
  const endpoint = 'solApi/getNFTs';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<GetNFTsResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, ...fetchParams }
  );

  const fetch = useCallback((params?: GetNFTsRequest) => {
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
