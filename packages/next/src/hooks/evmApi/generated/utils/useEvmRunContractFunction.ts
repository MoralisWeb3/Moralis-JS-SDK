import { fetcher } from '../../../../utils/fetcher';
import { 
  runContractFunctionOperation as operation, 
  RunContractFunctionRequest, 
  RunContractFunctionResponse 
} from 'moralis/common-evm-utils';
import { FetchParams } from '../../../types';
import useSWR from 'swr';
import Moralis from 'moralis';

export const useEvmRunContractFunction = (request: RunContractFunctionRequest, fetchParams?: FetchParams) => {
  const { deserializeResponse, serializeRequest } = operation
  const { data, error, mutate, isValidating } = useSWR<RunContractFunctionResponse>(
    ['evmApi/runContractFunction', { deserializeResponse, request: serializeRequest(request, Moralis.Core) }], 
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
