import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTTransfersOperation as operation, 
  GetWalletNFTTransfersRequest, 
  GetWalletNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmWalletNFTTransfers = (request: GetWalletNFTTransfersRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTTransfersResponse>(
    ['evmApi/getWalletNFTTransfers', {operation, request}], 
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
