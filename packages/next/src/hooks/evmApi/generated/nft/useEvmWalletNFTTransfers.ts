import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  getWalletNFTTransfersOperation as operation, 
  GetWalletNFTTransfersRequest, 
  GetWalletNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWalletNFTTransfers = (
  request?: GetWalletNFTTransfersRequest, 
  { revalidateOnMount = true, ...fetchParams }: FetchParams = {},
) => {
  const endpoint = 'evmApi/getWalletNFTTransfers';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTTransfersResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, revalidateOnMount, ...fetchParams }
  );

  const fetch = useCallback((params?: GetWalletNFTTransfersRequest) => {
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
