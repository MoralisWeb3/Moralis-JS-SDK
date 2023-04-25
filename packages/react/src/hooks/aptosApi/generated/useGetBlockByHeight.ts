import { GetBlockByHeightOperationRequest, AptosBlock, GetBlockByHeightOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetBlockByHeightParams = Partial<GetBlockByHeightOperationRequest>;
export type UseGetBlockByHeightQueryOptions = QueryOptions<AptosBlock, UseGetBlockByHeightParams>;

export function useGetBlockByHeight({ blockHeight, withTransactions, network }: UseGetBlockByHeightParams = {},  queryOptions: UseGetBlockByHeightQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetBlockByHeightOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(blockHeight);
  }, [blockHeight]);

  const queryKey: [string, Partial<GetBlockByHeightOperationRequest>] = useMemo(() => {
    return [
      GetBlockByHeightOperation.operationId,
      {
        blockHeight, withTransactions, network
      },
    ];
  }, [blockHeight, withTransactions, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['blockHeight']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
