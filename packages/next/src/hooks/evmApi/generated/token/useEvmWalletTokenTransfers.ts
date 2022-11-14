import { getWalletTokenTransfersOperation, GetWalletTokenTransfersRequest, GetWalletTokenTransfersResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmWalletTokenTransfers = (request: GetWalletTokenTransfersRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, getWalletTokenTransfersOperation.serializeRequest(request, Moralis.Core));
    return getWalletTokenTransfersOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenTransfersResponse>('evmApi/getWalletTokenTransfers', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};