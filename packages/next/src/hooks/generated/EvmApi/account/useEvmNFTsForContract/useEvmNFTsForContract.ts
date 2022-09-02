import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTsForContractParams, TUseEvmNFTsForContractReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTsForContract = (params: TUseEvmNFTsForContractParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTsForContractReturn>(
    [`/moralis/EvmApi/account/getNFTsForContract`, params],
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
