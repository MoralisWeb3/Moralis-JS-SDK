import { fetcher } from '../../../../utils/fetcher';
import { 
  getNFTTradesOperation as operation, 
  GetNFTTradesRequest, 
  GetNFTTradesResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmNFTTrades = (request: GetNFTTradesRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetNFTTradesResponse>(
    ['evmApi/getNFTTrades', {operation, request}], 
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
