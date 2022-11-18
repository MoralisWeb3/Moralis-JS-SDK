import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTsOperation as operation, 
  GetWalletNFTsRequest, 
  GetWalletNFTsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWalletNFTs = (request: GetWalletNFTsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTsResponse>(
    ['evmApi/getWalletNFTs', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...SWRConfig}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
