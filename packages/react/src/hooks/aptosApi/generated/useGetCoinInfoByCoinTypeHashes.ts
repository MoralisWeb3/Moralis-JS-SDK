import { GetCoinInfoByCoinTypeHashesOperationRequest, AptosCoinInfoDto, GetCoinInfoByCoinTypeHashesOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinInfoByCoinTypeHashesParams = Partial<GetCoinInfoByCoinTypeHashesOperationRequest>;
export type UseGetCoinInfoByCoinTypeHashesQueryOptions = QueryOptions<AptosCoinInfoDto[], UseGetCoinInfoByCoinTypeHashesParams>;

export function useGetCoinInfoByCoinTypeHashes({ coinTypeHashes, network }: UseGetCoinInfoByCoinTypeHashesParams = {},  queryOptions: UseGetCoinInfoByCoinTypeHashesQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinInfoByCoinTypeHashesOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(coinTypeHashes);
  }, [coinTypeHashes]);

  const queryKey: [string, Partial<GetCoinInfoByCoinTypeHashesOperationRequest>] = useMemo(() => {
    return [
      GetCoinInfoByCoinTypeHashesOperation.operationId,
      {
        coinTypeHashes, network
      },
    ];
  }, [coinTypeHashes, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['coinTypeHashes']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
