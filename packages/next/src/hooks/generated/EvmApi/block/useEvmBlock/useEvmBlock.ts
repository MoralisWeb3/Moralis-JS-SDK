import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmBlockParams, TUseEvmBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmBlock = (params: TUseEvmBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmBlockReturn>(
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
