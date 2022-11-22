import { fetcher } from '../../../../utils/fetcher';
import { 
  getTransactionOperation as operation, 
  GetTransactionRequest, 
  GetTransactionResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmTransaction = (request: GetTransactionRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<GetTransactionResponse>(
    ['evmApi/getTransaction', {operation, request}], 
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
