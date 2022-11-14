import { getNFTContractTransfersOperation, GetNFTContractTransfersRequest, GetNFTContractTransfersResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTContractTransfers = (request: GetNFTContractTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTContractTransfersOperation.serializeRequest(request, Moralis.Core));
    return getNFTContractTransfersOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTContractTransfersResponse>('evmApi/getNFTContractTransfers', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};