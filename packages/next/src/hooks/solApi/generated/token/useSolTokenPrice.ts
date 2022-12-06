import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenPriceOperation as operation, 
  GetTokenPriceRequest, 
  GetTokenPriceResponse 
} from 'moralis/common-sol-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useSolTokenPrice = (request: GetTokenPriceRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTokenPriceResponse>(
    ['solApi/getTokenPrice', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
