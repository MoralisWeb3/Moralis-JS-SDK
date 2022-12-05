import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTLowestPriceOperation as operation, 
  GetNFTLowestPriceRequest, 
  GetNFTLowestPriceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmNFTLowestPrice = (request: GetNFTLowestPriceRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetNFTLowestPriceResponse>(
    ['evmApi/getNFTLowestPrice', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
