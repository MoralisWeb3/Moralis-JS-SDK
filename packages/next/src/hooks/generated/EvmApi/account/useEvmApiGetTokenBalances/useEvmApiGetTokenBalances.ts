import { SWRConfiguration } from 'swr/dist/types';
import { TGetTokenBalancesParams, TGetTokenBalancesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

const axiosFetcher = async (endpoint: string, params: any) => {
  const result = await axios.get(`/api${endpoint}`, params);
  return result.data;
};

export const useEvmApiGetTokenBalances = (params: TGetTokenBalancesParams, SWRConfig?: SWRConfiguration) => {
  console.log('hookParams2:', params)
  const { data, error, mutate, isValidating } = useSWR<TGetTokenBalancesReturn['result']>(
    [`/moralis/EvmApi/account/getNativeBalance`, params],
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
