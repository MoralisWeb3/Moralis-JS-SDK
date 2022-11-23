import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTCollectionsOperation as operation, 
  GetWalletNFTCollectionsRequest, 
  GetWalletNFTCollectionsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmWalletNFTCollections = (request: GetWalletNFTCollectionsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTCollectionsResponse>(
    ['evmApi/getWalletNFTCollections', {operation, request}], 
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
