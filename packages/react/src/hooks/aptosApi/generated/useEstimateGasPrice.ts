import { EstimateGasPriceOperationRequest, AptosEstimateGasPriceResult, EstimateGasPriceOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';

export type UseEstimateGasPriceParams = EstimateGasPriceOperationRequest;
export type UseEstimateGasPriceQueryOptions = QueryOptions<AptosEstimateGasPriceResult, UseEstimateGasPriceParams>;

export function useEstimateGasPrice({ network }: UseEstimateGasPriceParams = {},  queryOptions: UseEstimateGasPriceQueryOptions = {}) {
  const resolver = useOperationV3Resolver(EstimateGasPriceOperation);

  const queryKey: [string, EstimateGasPriceOperationRequest] = useMemo(() => {
    return [
      EstimateGasPriceOperation.operationId,
      {
        network
      },
    ];
  }, [network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      return resolver.resolve(request, {});
    },
    enabled: queryOptions.enabled,
  });
}
