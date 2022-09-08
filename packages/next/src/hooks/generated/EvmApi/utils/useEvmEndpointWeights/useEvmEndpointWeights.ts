import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmEndpointWeightsParams, TUseEvmEndpointWeightsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmEndpointWeights = (params: TUseEvmEndpointWeightsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmEndpointWeightsReturn>(
    [`/moralis/EvmApi/utils/endpointWeights`, params],
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
