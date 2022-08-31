import { SWRConfiguration } from 'swr/dist/types';
import { TReSyncMetadataParams, TReSyncMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmReSyncMetadata = (params: TReSyncMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TReSyncMetadataReturn['result']>(
    [`/moralis/EvmApi/token/reSyncMetadata`, params],
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
