import { SWRConfiguration } from 'swr/dist/types';
import { TUseAuthMessageParams, TUseAuthMessageReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useAuthMessage = (params: TUseAuthMessageParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseAuthMessageReturn>(
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
