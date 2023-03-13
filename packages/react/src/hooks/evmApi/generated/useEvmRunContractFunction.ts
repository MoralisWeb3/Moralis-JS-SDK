import Moralis from 'moralis';
import { RunContractFunctionRequest, RunContractFunctionResponse, runContractFunctionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmRunContractFunctionParams = UseMoralisQueryParams<RunContractFunctionResponse, Partial<RunContractFunctionRequest>>

export function useEvmRunContractFunction({ address, abi, params, chain, functionName, ...queryParams }: UseEvmRunContractFunctionParams = {}) {
  const resolver = useOperationResolver(runContractFunctionOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && abi && address && abi && functionName);
  }, [address , abi , address , abi , functionName]);

  const queryKey: [string, Partial<RunContractFunctionRequest>] = useMemo(() => {
    return [
      runContractFunctionOperation.id,
      {
        address, abi, params, chain, functionName
      },
    ];
  }, [address, abi, params, chain, functionName]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'abi' , 'address' , 'abi' , 'functionName']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}