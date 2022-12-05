import { fetcher, NoHookParamsError } from '../../../../utils';
import { 
  getNFTContractMetadataOperation as operation, 
  GetNFTContractMetadataRequest, 
  GetNFTContractMetadataResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import { useCallback } from 'react';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTContractMetadata = (
  request?: GetNFTContractMetadataRequest, 
  { revalidateOnMount = true, ...fetchParams }: FetchParams = {},
) => {
  const endpoint = 'evmApi/getNFTContractMetadata';
  const { deserializeResponse, serializeRequest } = operation;

  const { data, error, mutate, isValidating } = useSWR<GetNFTContractMetadataResponse>(
    [endpoint, request ? { deserializeResponse, request: serializeRequest(request, Moralis.Core) } : null], 
    fetcher, 
    { revalidateOnFocus: false, revalidateOnMount, ...fetchParams }
  );

  const fetch = useCallback((params?: GetNFTContractMetadataRequest) => {
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
