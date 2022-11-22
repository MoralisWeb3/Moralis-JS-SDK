import { fetcher } from '../../../../utils/fetcher';
import { 
  runContractFunctionOperation as operation, 
  RunContractFunctionRequest, 
  RunContractFunctionResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';

export const useEvmRunContractFunction = (request: RunContractFunctionRequest, fetchParams?: FetchParams) => {
  const { data, error, mutate, isValidating } = useSWR<RunContractFunctionResponse>(
    ['evmApi/runContractFunction', {operation, request}], 
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
