import { fetcher } from '../../../../utils/fetcher';
import { 
  getTokenPriceOperation as operation, 
  GetTokenPriceRequest, 
  GetTokenPriceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmTokenPrice = (request: GetTokenPriceRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTokenPriceResponse>(
    ['evmApi/getTokenPrice', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
