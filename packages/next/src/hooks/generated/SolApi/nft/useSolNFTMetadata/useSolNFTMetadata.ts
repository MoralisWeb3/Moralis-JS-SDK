import { SWRConfiguration } from 'swr/dist/types';
import { TUsesolnftmetadataParams, TUsesolnftmetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolNFTMetadata = (params: TUsesolnftmetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUsesolnftmetadataReturn>(
    [`SolApi/nft/getNFTMetadata`, params],
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
