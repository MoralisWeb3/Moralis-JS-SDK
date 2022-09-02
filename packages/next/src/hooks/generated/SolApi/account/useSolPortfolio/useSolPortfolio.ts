import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolPortfolioParams, TUseSolPortfolioReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolPortfolio = (params: TUseSolPortfolioParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolPortfolioReturn>(
    [`/moralis/SolApi/account/getPortfolio`, params],
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
