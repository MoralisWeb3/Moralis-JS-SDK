import { fetcher } from '../../../../utils/fetcher';
import { 
  getPortfolioOperation as operation, 
  GetPortfolioRequest, 
  GetPortfolioResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useSolPortfolio = (request: GetPortfolioRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetPortfolioResponse>(
    ['solApi/getPortfolio', {operation, request}], 
    fetcher, 
    {revalidateOnFocus: false, ...fetchParams}
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
