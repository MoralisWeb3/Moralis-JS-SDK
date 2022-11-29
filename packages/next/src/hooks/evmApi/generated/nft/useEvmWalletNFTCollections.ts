import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletNFTCollectionsOperation as operation, 
  GetWalletNFTCollectionsRequest, 
  GetWalletNFTCollectionsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmWalletNFTCollections = (request: GetWalletNFTCollectionsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTCollectionsResponse>(
    ['evmApi/getWalletNFTCollections', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
