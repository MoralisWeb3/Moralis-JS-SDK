import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmsyncnftcontractParams, TUseevmsyncnftcontractReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmSyncNFTContract = (params: TUseevmsyncnftcontractParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmsyncnftcontractReturn>(
    [`EvmApi/nft/syncNFTContract`, params],
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
