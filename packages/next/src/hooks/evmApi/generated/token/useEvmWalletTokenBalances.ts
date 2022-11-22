import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTokenBalancesOperation as operation, 
  GetWalletTokenBalancesRequest, 
  GetWalletTokenBalancesResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmWalletTokenBalances = (request: GetWalletTokenBalancesRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenBalancesResponse>(
    ['evmApi/getWalletTokenBalances', {operation, request}], 
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
