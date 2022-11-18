import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTTransfersOperation as operation, 
  GetWalletNFTTransfersRequest, 
  GetWalletNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWalletNFTTransfers = (request: GetWalletNFTTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTTransfersResponse>(
    ['evmApi/getWalletNFTTransfers', {operation, request}], 
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
