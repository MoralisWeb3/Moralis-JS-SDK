import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmDateToBlockParams, TUseEvmDateToBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmDateToBlock = (params: TUseEvmDateToBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmDateToBlockReturn>(
    [`/moralis/EvmApi/block/getDateToBlock`, params],
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
