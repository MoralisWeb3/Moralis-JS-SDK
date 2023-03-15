import Moralis from 'moralis';
import { ReSyncMetadataRequest, ReSyncMetadataResponse, reSyncMetadataOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmReSyncMetadataParams = Partial<ReSyncMetadataRequest>;
export type UseEvmReSyncMetadataQueryOptions = QueryOptions<ReSyncMetadataResponse, UseEvmReSyncMetadataParams>;

export function useEvmReSyncMetadata({ address, tokenId, chain, flag, mode }: UseEvmReSyncMetadataParams = {}, queryOptions: UseEvmReSyncMetadataQueryOptions = {}) {
  const resolver = useOperationResolver(reSyncMetadataOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && tokenId);
  }, [address, tokenId]);

  const queryKey: [string, Partial<ReSyncMetadataRequest>] = useMemo(() => {
    return [
      reSyncMetadataOperation.id,
      {
        address, tokenId, chain, flag, mode
      },
    ];
  }, [address, tokenId, chain, flag, mode]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'tokenId']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}