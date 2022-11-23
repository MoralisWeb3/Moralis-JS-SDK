import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTsOperation as operation, 
  GetWalletNFTsRequest, 
  GetWalletNFTsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmWalletNFTs = (request: GetWalletNFTsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTsResponse>(
    ['evmApi/getWalletNFTs', {operation, request}], 
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
