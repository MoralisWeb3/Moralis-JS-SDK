import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTransactionsOperation as operation, 
  GetWalletTransactionsRequest, 
  GetWalletTransactionsResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmWalletTransactions = (request: GetWalletTransactionsRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletTransactionsResponse>(
    ['evmApi/getWalletTransactions', {operation, request}], 
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
