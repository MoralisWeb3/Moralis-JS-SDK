import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmReSyncMetadataParams, TUseEvmReSyncMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmReSyncMetadata = (params: TUseEvmReSyncMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmReSyncMetadataReturn>(
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
