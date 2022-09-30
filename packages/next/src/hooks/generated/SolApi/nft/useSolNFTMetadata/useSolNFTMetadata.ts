import { SWRConfiguration } from 'swr/dist/types';
import { UseSolNftMetadataParams, UseSolNftMetadataReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolNFTMetadata = (params: UseSolNftMetadataParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseSolNftMetadataReturn>(
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
