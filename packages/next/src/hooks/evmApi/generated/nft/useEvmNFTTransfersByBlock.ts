import { getNFTTransfersByBlockOperation, GetNFTTransfersByBlockRequest, GetNFTTransfersByBlockResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTTransfersByBlock = (request: GetNFTTransfersByBlockRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTTransfersByBlockOperation.serializeRequest(request, Moralis.Core));
    return getNFTTransfersByBlockOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTTransfersByBlockResponse>('evmApi/getNFTTransfersByBlock', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};