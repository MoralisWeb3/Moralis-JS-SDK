import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNftTokenIdOwnersParams, UseEvmNftTokenIdOwnersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (params: UseEvmNftTokenIdOwnersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNftTokenIdOwnersReturn>(
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
