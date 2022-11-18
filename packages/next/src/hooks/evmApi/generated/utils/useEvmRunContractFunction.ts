import { fetcher } from '../../../../utils/fetcher';
import { 
  runContractFunctionOperation as operation, 
  RunContractFunctionRequest, 
  RunContractFunctionResponse 
} from 'moralis/common-evm-utils';
import { SWRConfiguration } from 'swr/dist/types';
import useSWR from 'swr';

export const useEvmRunContractFunction = (request: RunContractFunctionRequest, SWRConfig?: SWRConfiguration) => {
  const { data, error, mutate, isValidating } = useSWR<RunContractFunctionResponse>(
    ['evmApi/runContractFunction', {operation, request}], 
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
