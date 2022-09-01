import { SWRConfiguration } from 'swr/dist/types';
import { TGetNFTTransfersParams, TGetNFTTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfers = (params: TGetNFTTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TGetNFTTransfersReturn['result']>(
    [`/moralis/EvmApi/account/getNFTTransfers`, params],
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
