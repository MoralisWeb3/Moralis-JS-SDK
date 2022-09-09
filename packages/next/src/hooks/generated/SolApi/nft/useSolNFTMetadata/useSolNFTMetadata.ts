import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolNftMetadataParams, TUseSolNftMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolNFTMetadata = (params: TUseSolNftMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolNftMetadataReturn>(
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
