import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmTokenMetadataParams, TUseEvmTokenMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenMetadata = (params: TUseEvmTokenMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmTokenMetadataReturn>(
    [`EvmApi/token/getTokenMetadata`, params],
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
