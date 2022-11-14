import { syncNFTContractOperation, SyncNFTContractRequest, SyncNFTContractResponse } from '@moralisweb3/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import axios from 'axios';
import Moralis from 'moralis';
import useSWR from 'swr';

export const useEvmSyncNFTContract = (request: SyncNFTContractRequest, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string) => {
    const jsonResponse = await axios.post(`/api/moralis/${endpoint}`, syncNFTContractOperation.serializeRequest(request, Moralis.Core));
    return syncNFTContractOperation.deserializeResponse(jsonResponse.data, request, Moralis.Core);
  };

  const { data, error, mutate, isValidating } = useSWR<SyncNFTContractResponse>('evmApi/syncNFTContract', axiosFetcher, SWRConfig);

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};