import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftTokenIdOwnersParams, TUseEvmNftTokenIdOwnersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (params: TUseEvmNftTokenIdOwnersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftTokenIdOwnersReturn>(
    [`EvmApi/nft/getNFTTokenIdOwners`, params],
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
