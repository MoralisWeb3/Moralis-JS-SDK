import { SWRConfiguration } from 'swr/dist/types';
import { TUseauthmessageParams, TUseauthmessageReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useAuthMessage = (params: TUseauthmessageParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseauthmessageReturn>(
    [`Auth/requestMessage`, params],
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
