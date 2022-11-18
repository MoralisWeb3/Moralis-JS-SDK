import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTLowestPriceOperation as operation, 
  GetNFTLowestPriceRequest, 
  GetNFTLowestPriceResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTLowestPrice = (request: GetNFTLowestPriceRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTLowestPriceResponse>(
    ['evmApi/getNFTLowestPrice', {operation, request}], 
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
