import { GetNFTsByCreatorsOperationRequest, AptosNFTTokensByCreatorsResponse, GetNFTsByCreatorsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTsByCreatorsParams = Partial<GetNFTsByCreatorsOperationRequest>;
export type UseGetNFTsByCreatorsQueryOptions = QueryOptions<AptosNFTTokensByCreatorsResponse, UseGetNFTsByCreatorsParams>;

export function useGetNFTsByCreators({ limit, offset, cursor, creatorAddresses, network }: UseGetNFTsByCreatorsParams = {},  queryOptions: UseGetNFTsByCreatorsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTsByCreatorsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && creatorAddresses);
  }, [limit, creatorAddresses]);

  const queryKey: [string, Partial<GetNFTsByCreatorsOperationRequest>] = useMemo(() => {
    return [
      GetNFTsByCreatorsOperation.operationId,
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
