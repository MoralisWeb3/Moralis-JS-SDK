import { SWRConfiguration } from 'swr/dist/types';
import { TRequestMessageParams, TRequestMessageReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useAuthRequestMessage = (params: TRequestMessageParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TRequestMessageReturn['result']>(
    [`/moralis/Auth/requestMessage`, params],
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
