import { fetcher } from '../../../../utils/fetcher';
import { 
  getPortfolioOperation as operation, 
  GetPortfolioRequest, 
  GetPortfolioResponse 
} from 'moralis/common-sol-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useSolPortfolio = (request: GetPortfolioRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetPortfolioResponse>(
    ['solApi/getPortfolio', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...SWRConfig}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
