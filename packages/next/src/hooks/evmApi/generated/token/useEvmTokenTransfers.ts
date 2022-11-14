import { getTokenTransfersOperation, GetTokenTransfersRequest, GetTokenTransfersResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmTokenTransfers = (request: GetTokenTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getTokenTransfersOperation.serializeRequest(request, Moralis.Core));
    return getTokenTransfersOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetTokenTransfersResponse>('evmApi/getTokenTransfers', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};