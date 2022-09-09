import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmUploadFolderParams, TUseEvmUploadFolderReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmUploadFolder = (params: TUseEvmUploadFolderParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmUploadFolderReturn>(
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
