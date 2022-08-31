import { SWRConfiguration } from 'swr/dist/types';
import { TGetTokenAddressTransfersParams, TGetTokenAddressTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetTokenAddressTransfers = (params: TGetTokenAddressTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetTokenAddressTransfersReturn['result']>(
    [`/moralis/EvmApi/token/getTokenAddressTransfers`, params],
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
