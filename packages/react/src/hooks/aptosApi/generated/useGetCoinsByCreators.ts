import { GetCoinsByCreatorsOperationRequest, AptosGetCoinsByCreatorsResponse, GetCoinsByCreatorsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetCoinsByCreatorsParams = Partial<GetCoinsByCreatorsOperationRequest>;
export type UseGetCoinsByCreatorsQueryOptions = QueryOptions<AptosGetCoinsByCreatorsResponse, UseGetCoinsByCreatorsParams>;

export function useGetCoinsByCreators({ limit, offset, cursor, creatorAddresses, network }: UseGetCoinsByCreatorsParams = {},  queryOptions: UseGetCoinsByCreatorsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetCoinsByCreatorsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && creatorAddresses);
  }, [limit, creatorAddresses]);

  const queryKey: [string, Partial<GetCoinsByCreatorsOperationRequest>] = useMemo(() => {
    return [
      GetCoinsByCreatorsOperation.operationId,
      {
        limit, offset, cursor, creatorAddresses, network
      },
    ];
  }, [limit, offset, cursor, creatorAddresses, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['limit', 'creatorAddresses']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
