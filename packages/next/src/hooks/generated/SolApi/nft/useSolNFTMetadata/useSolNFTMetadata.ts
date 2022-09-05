import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolNFTMetadataParams, TUseSolNFTMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolNFTMetadata = (params: TUseSolNFTMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolNFTMetadataReturn>(
    [`/moralis/SolApi/nft/getNFTMetadata`, params],
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
