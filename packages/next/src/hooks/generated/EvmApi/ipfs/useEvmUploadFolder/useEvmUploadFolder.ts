import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmuploadfolderParams, TUseevmuploadfolderReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmUploadFolder = (params: TUseevmuploadfolderParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmuploadfolderReturn>(
    [`EvmApi/ipfs/uploadFolder`, params],
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
