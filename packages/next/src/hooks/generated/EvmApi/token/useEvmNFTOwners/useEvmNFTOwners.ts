import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTOwnersParams, TUseEvmNFTOwnersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTOwners = (params: TUseEvmNFTOwnersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTOwnersReturn>(
    [`/moralis/EvmApi/token/getNFTOwners`, params],
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
