import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTTransfersOperation as operation, 
  GetWalletNFTTransfersRequest, 
  GetWalletNFTTransfersResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmWalletNFTTransfers = (request: GetWalletNFTTransfersRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTTransfersResponse>(
    ['evmApi/getWalletNFTTransfers', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
