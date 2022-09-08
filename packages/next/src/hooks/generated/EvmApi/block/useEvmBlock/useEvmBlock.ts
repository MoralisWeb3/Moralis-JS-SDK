import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmblockParams, TUseevmblockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmBlock = (params: TUseevmblockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmblockReturn>(
    [`EvmApi/block/getBlock`, params],
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
