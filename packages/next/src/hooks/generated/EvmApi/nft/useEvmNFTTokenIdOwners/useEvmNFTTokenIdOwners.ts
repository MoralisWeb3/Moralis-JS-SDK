import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftTokenIdOwnersParams, TUseEvmNftTokenIdOwnersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (params: TUseEvmNftTokenIdOwnersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

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
