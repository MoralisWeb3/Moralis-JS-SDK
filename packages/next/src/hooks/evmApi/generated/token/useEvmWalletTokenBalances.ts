import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTokenBalancesOperation as operation, 
  GetWalletTokenBalancesRequest, 
  GetWalletTokenBalancesResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWalletTokenBalances = (request: GetWalletTokenBalancesRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletTokenBalancesResponse>(
    ['evmApi/getWalletTokenBalances', {operation, request}], 
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
