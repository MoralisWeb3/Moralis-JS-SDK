import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTsOperation as operation, 
  GetWalletNFTsRequest, 
  GetWalletNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmWalletNFTs = (request: GetWalletNFTsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTsResponse>(
    ['evmApi/getWalletNFTs', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
