import { SWRConfiguration } from 'swr/dist/types';
import { UseEvmNftTransfersByBlockParams, UseEvmNftTransfersByBlockReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTransfersByBlock = (params: UseEvmNftTransfersByBlockParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseEvmNftTransfersByBlockReturn>(
    [`EvmApi/nft/getNFTTransfersByBlock`, params],
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
