import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNftContractTransfersParams, TUseEvmNftContractTransfersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTContractTransfers = (params: TUseEvmNftContractTransfersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNftContractTransfersReturn>(
    [`EvmApi/nft/getNFTContractTransfers`, params],
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
