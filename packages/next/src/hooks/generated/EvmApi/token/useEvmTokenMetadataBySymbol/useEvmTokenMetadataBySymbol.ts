import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmTokenMetadataBySymbolParams, UseEvmTokenMetadataBySymbolReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenMetadataBySymbol = (params: UseEvmTokenMetadataBySymbolParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmTokenMetadataBySymbolReturn>(
    [`EvmApi/token/getTokenMetadataBySymbol`, params],
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
