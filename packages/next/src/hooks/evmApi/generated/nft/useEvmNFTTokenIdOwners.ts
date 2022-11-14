import { getNFTTokenIdOwnersOperation, GetNFTTokenIdOwnersRequest, GetNFTTokenIdOwnersResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (request: GetNFTTokenIdOwnersRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getNFTTokenIdOwnersOperation.serializeRequest(request, Moralis.Core));
    return getNFTTokenIdOwnersOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetNFTTokenIdOwnersResponse>('evmApi/getNFTTokenIdOwners', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};