import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  getWalletNFTsOperation as operation, 
  GetWalletNFTsRequest, 
  GetWalletNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWalletNFTs = (
  request?: GetWalletNFTsRequest, 
  { revalidateOnMount = true, ...fetchParams }: FetchParams = {},
) => {
  const endpoint = 'evmApi/getWalletNFTs';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTsResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, revalidateOnMount, ...fetchParams }
  );

  const fetch = useCallback((params?: GetWalletNFTsRequest) => {
    const fetchRequest = params ?? request;
    if (!fetchRequest) {
      throw new NoHookParamsError('useEvmNativeBalance');
    }
    return mutate(
      fetcher(endpoint, {
        deserializeResponse,
        request: params ?? request,
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
