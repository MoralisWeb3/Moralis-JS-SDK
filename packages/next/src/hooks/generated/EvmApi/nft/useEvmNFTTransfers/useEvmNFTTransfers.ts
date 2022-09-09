import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftTransfersParams, TUseEvmNftTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfers = (params: TUseEvmNftTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftTransfersReturn>(
    [`EvmApi/nft/getNFTTransfers`, params],
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
