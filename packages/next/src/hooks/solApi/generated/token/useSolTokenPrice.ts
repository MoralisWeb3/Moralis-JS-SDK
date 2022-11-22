import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenPriceOperation as operation, 
  GetTokenPriceRequest, 
  GetTokenPriceResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useSolTokenPrice = (request: GetTokenPriceRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetTokenPriceResponse>(
    ['solApi/getTokenPrice', {operation, request}], 
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
