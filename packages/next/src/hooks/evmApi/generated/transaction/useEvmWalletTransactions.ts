import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTransactionsOperation as operation, 
  GetWalletTransactionsRequest, 
  GetWalletTransactionsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmWalletTransactions = (request: GetWalletTransactionsRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetWalletTransactionsResponse>(
    ['evmApi/getWalletTransactions', {operation, request}], 
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
