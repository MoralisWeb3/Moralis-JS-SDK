import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTCollectionsOperation as operation, 
  GetWalletNFTCollectionsRequest, 
  GetWalletNFTCollectionsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWalletNFTCollections = (request: GetWalletNFTCollectionsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTCollectionsResponse>(
    ['evmApi/getWalletNFTCollections', {operation, request}], 
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
