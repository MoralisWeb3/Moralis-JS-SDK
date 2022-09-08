import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmaddressParams, TUseevmaddressReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmAddress = (params: TUseevmaddressParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmaddressReturn>(
    [`EvmApi/resolve/resolveAddress`, params],
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
