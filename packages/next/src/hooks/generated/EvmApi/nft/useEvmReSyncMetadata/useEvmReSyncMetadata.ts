import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmReSyncMetadataParams, UseEvmReSyncMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmReSyncMetadata = (params: UseEvmReSyncMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmReSyncMetadataReturn>(
    [`EvmApi/nft/reSyncMetadata`, params],
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
