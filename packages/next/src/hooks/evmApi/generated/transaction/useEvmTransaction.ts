import { fetcher } from '../../../../utils/fetcher';
import { 
  getTransactionOperation as operation, 
  GetTransactionRequest, 
  GetTransactionResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmTransaction = (request: GetTransactionRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<GetTransactionResponse>(
    ['evmApi/getTransaction', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
