import { fetcher } from '../../../../utils/fetcher';
import { 
  getWalletTransactionsOperation as operation, 
  GetWalletTransactionsRequest, 
  GetWalletTransactionsResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmWalletTransactions = (request: GetWalletTransactionsRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetWalletTransactionsResponse>(
    ['evmApi/getWalletTransactions', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
