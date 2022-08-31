import { SWRConfiguration } from 'swr/dist/types';
import { TGetContractEventsParams, TGetContractEventsReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmApiGetContractEvents = (params: TGetContractEventsParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.get(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetContractEventsReturn['result']>(
    [`/moralis/EvmApi/account/getNativeBalance`, params],
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
