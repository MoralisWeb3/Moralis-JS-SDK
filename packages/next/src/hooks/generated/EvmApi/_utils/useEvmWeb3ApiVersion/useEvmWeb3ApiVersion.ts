import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmWeb3ApiVersionParams, TUseEvmWeb3ApiVersionReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmWeb3ApiVersion = (params: TUseEvmWeb3ApiVersionParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmWeb3ApiVersionReturn>(
    [`/moralis/EvmApi/_utils/web3ApiVersion`, params],
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
