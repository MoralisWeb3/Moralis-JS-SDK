import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmtokentransfersParams, TUseevmtokentransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmTokenTransfers = (params: TUseevmtokentransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmtokentransfersReturn>(
    [`EvmApi/token/getTokenTransfers`, params],
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
