import { getNFTTransfersFromToBlockOperation, GetNFTTransfersFromToBlockRequest, GetNFTTransfersFromToBlockResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTTransfersFromToBlock = (request: GetNFTTransfersFromToBlockRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTTransfersFromToBlockOperation.serializeRequest(request, Moralis.Core));
    return getNFTTransfersFromToBlockOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersFromToBlockResponse>('evmApi/getNFTTransfersFromToBlock', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};