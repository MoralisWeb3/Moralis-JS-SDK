import { fetcher } from '../../../../utils/fetcher';
import { 
  getTransactionOperation as operation, 
  GetTransactionRequest, 
  GetTransactionResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmTransaction = (request: GetTransactionRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<GetTransactionResponse>(
    ['evmApi/getTransaction', {operation, request}], 
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
