import { GetNFTTransfersByCreatorsOperationRequest, AptosGetNFTTransfersByCreatorsResponse, GetNFTTransfersByCreatorsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetNFTTransfersByCreatorsParams = Partial<GetNFTTransfersByCreatorsOperationRequest>;
export type UseGetNFTTransfersByCreatorsQueryOptions = QueryOptions<AptosGetNFTTransfersByCreatorsResponse, UseGetNFTTransfersByCreatorsParams>;

export function useGetNFTTransfersByCreators({ limit, offset, cursor, creatorAddresses, collectionBlacklist, collectionWhitelist, network }: UseGetNFTTransfersByCreatorsParams = {},  queryOptions: UseGetNFTTransfersByCreatorsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetNFTTransfersByCreatorsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(limit && creatorAddresses);
  }, [limit, creatorAddresses]);

  const queryKey: [string, Partial<GetNFTTransfersByCreatorsOperationRequest>] = useMemo(() => {
    return [
      GetNFTTransfersByCreatorsOperation.operationId,
      {
        limit, offset, cursor, creatorAddresses, collectionBlacklist, collectionWhitelist, network
      },
    ];
  }, [limit, offset, cursor, creatorAddresses, collectionBlacklist, collectionWhitelist, network]);

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
