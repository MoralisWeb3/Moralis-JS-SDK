import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmSyncNFTContractParams, TUseEvmSyncNFTContractReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmSyncNFTContract = (params: TUseEvmSyncNFTContractParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmSyncNFTContractReturn>(
    [`/moralis/EvmApi/token/syncNFTContract`, params],
    axiosFetcher,
    SWRConfig,
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
