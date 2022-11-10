import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmTokenMetadataParams, UseEvmTokenMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenMetadata = (params: UseEvmTokenMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmTokenMetadataReturn>(
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
