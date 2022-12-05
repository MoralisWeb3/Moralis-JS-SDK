import { fetcher } from '../../../../utils/fetcher';
import { 
  getPortfolioOperation as operation, 
  GetPortfolioRequest, 
  GetPortfolioResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useSolPortfolio = (request: GetPortfolioRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetPortfolioResponse>(
    ['solApi/getPortfolio', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
