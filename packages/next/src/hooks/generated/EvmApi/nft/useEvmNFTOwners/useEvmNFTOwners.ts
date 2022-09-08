import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmnftownersParams, TUseevmnftownersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTOwners = (params: TUseevmnftownersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmnftownersReturn>(
    [`EvmApi/nft/getNFTOwners`, params],
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
