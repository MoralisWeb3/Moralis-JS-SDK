import { SWRConfiguration } from 'swr/dist/types';
import { UseSolPortfolioParams, UseSolPortfolioReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolPortfolio = (params: UseSolPortfolioParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<UseSolPortfolioReturn>(
    [`SolApi/account/getPortfolio`, params],
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
