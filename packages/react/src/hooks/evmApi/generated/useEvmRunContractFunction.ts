import Moralis from 'moralis';
import { RunContractFunctionRequest, RunContractFunctionResponse, runContractFunctionOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';

export type UseEvmRunContractFunctionParams = UseMoralisQueryParams<RunContractFunctionResponse, RunContractFunctionRequest>

export function useEvmRunContractFunction({ address, abi, params, chain, functionName, ...queryParams }: UseEvmRunContractFunctionParams = {}) {
  const resolver = useOperationResolver(runContractFunctionOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, RunContractFunctionRequest] | undefined = useMemo(() => {
    if (functionName && address && abi) {
      return [
      runContractFunctionOperation.id,
      {
        address, abi, params, chain, functionName
      },
    ];
    }
      return;
  }, [address, abi, params, chain, functionName]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}