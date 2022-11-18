import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTradesOperation as operation, 
  GetNFTTradesRequest, 
  GetNFTTradesResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmNFTTrades = (request: GetNFTTradesRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTradesResponse>(
    ['evmApi/getNFTTrades', {operation, request}], 
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
