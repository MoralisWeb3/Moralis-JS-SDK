import { SWRConfiguration } from 'swr/dist/types';
import { TGetTokenMetadataBySymbolParams, TGetTokenMetadataBySymbolReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetTokenMetadataBySymbol = (params: TGetTokenMetadataBySymbolParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTokenMetadataBySymbolReturn['result']>(
    [`/moralis/EvmApi/token/getTokenMetadataBySymbol`, params],
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
