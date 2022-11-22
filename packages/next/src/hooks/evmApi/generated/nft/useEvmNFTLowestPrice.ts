import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTLowestPriceOperation as operation, 
  GetNFTLowestPriceRequest, 
  GetNFTLowestPriceResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTLowestPrice = (request: GetNFTLowestPriceRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTLowestPriceResponse>(
    ['evmApi/getNFTLowestPrice', {operation, request}], 
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
