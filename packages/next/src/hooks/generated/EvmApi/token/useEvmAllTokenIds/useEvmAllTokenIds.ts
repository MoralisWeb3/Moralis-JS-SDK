import { SWRConfiguration } from 'swr/dist/types';
import { TGetAllTokenIdsParams, TGetAllTokenIdsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmAllTokenIds = (params: TGetAllTokenIdsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetAllTokenIdsReturn['result']>(
    [`/moralis/EvmApi/token/getAllTokenIds`, params],
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
