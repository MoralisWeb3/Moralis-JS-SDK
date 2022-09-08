import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmnftmetadataParams, TUseevmnftmetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTMetadata = (params: TUseevmnftmetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmnftmetadataReturn>(
    [`EvmApi/nft/getNFTMetadata`, params],
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
