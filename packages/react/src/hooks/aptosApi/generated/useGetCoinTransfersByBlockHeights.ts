import { GetCoinTransfersByBlockHeightsOperationRequest, AptosGetCoinTransfersByBlockHeightsResponse, GetCoinTransfersByBlockHeightsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinTransfersByBlockHeightsParams = Partial<GetCoinTransfersByBlockHeightsOperationRequest>;
export type UseGetCoinTransfersByBlockHeightsQueryOptions = QueryOptions<AptosGetCoinTransfersByBlockHeightsResponse, UseGetCoinTransfersByBlockHeightsParams>;

export function useGetCoinTransfersByBlockHeights({ limit, offset, cursor, blockHeights, network }: UseGetCoinTransfersByBlockHeightsParams = {},  queryOptions: UseGetCoinTransfersByBlockHeightsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinTransfersByBlockHeightsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && blockHeights);
  }, [limit, blockHeights]);

  const queryKey: [string, Partial<GetCoinTransfersByBlockHeightsOperationRequest>] = useMemo(() => {
    return [
      GetCoinTransfersByBlockHeightsOperation.operationId,
      {
        limit, offset, cursor, blockHeights, network
      },
    ];
  }, [limit, offset, cursor, blockHeights, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'blockHeights']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
