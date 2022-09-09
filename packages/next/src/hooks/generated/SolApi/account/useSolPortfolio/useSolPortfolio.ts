import { SWRConfiguration } from 'swr/dist/types';
import { TUseSolPortfolioParams, TUseSolPortfolioReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolPortfolio = (params: TUseSolPortfolioParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, fetcherParams: any) =>
    axios.post(`/api/moralis/${endpoint}`, fetcherParams).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseSolPortfolioReturn>(
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
