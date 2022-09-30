import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmTokenPriceParams, UseEvmTokenPriceReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenPrice = (params: UseEvmTokenPriceParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmTokenPriceReturn>(
    [`EvmApi/token/getTokenPrice`, params],
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
