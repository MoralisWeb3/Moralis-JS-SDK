import { SWRConfiguration } from 'swr/dist/types';
import { TGetTokenMetadataParams, TGetTokenMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenMetadata = (params: TGetTokenMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTokenMetadataReturn['result']>(
    [`/moralis/EvmApi/token/getTokenMetadata`, params],
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
