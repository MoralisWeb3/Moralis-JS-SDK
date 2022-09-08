import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmresyncmetadataParams, TUseevmresyncmetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmReSyncMetadata = (params: TUseevmresyncmetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmresyncmetadataReturn>(
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
