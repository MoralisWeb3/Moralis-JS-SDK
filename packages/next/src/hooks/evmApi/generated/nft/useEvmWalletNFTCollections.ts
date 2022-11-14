import { getWalletNFTCollectionsOperation, GetWalletNFTCollectionsRequest, GetWalletNFTCollectionsResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWalletNFTCollections = (request: GetWalletNFTCollectionsRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getWalletNFTCollectionsOperation.serializeRequest(request, Moralis.Core));
    return getWalletNFTCollectionsOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetWalletNFTCollectionsResponse>('evmApi/getWalletNFTCollections', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};